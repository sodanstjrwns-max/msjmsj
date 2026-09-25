"""Offline, reproducible frame preparation; never runs in the Cloudflare runtime."""
from pathlib import Path
import io
import json
import subprocess
from PIL import Image
import numpy as np
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'artifacts/moon-deep-bow-master.mp4'
DEST = ROOT / 'public/static/greeting/v1'
COUNT = 30
source_frames = [round(i * 60 / (COUNT - 1)) for i in range(COUNT)]
variants = {'desktop': (810, 1080), 'mobile': (432, 576)}
sizes = {name: 0 for name in variants}
for name in variants:
    (DEST / name).mkdir(parents=True, exist_ok=True)
for index, source_frame in enumerate(source_frames):
    result = subprocess.run([
        'ffmpeg', '-v', 'error', '-i', str(SOURCE),
        '-vf', f'select=eq(n\\,{source_frame})', '-frames:v', '1',
        '-f', 'image2pipe', '-vcodec', 'png', '-'
    ], check=True, capture_output=True)
    frame = Image.open(io.BytesIO(result.stdout)).convert('RGB')
    rgb = np.asarray(frame).astype(np.float32)
    # Remove only edge-connected studio brown. Preserve face, hands and uniform.
    background = (rgb[:, :, 0] > 58) & (rgb[:, :, 0] < 142) & (rgb[:, :, 1] > 27) & (rgb[:, :, 1] < 101) & (rgb[:, :, 2] > 10) & (rgb[:, :, 2] < 70) & ((rgb[:, :, 0] - rgb[:, :, 1]) > 12) & ((rgb[:, :, 0] - rgb[:, :, 1]) < 65)
    labels, _ = ndimage.label(background)
    edge_labels = np.unique(np.concatenate((labels[0], labels[-1], labels[:, 0], labels[:, -1])))
    edge_labels = edge_labels[edge_labels != 0]
    foreground = ~np.isin(labels, edge_labels)
    labels, _ = ndimage.label(foreground)
    populations = np.bincount(labels.ravel()); populations[0] = 0
    foreground = labels == populations.argmax()
    foreground = ndimage.binary_fill_holes(foreground)
    alpha = ndimage.gaussian_filter(foreground.astype(np.float32), 0.55)
    rgba = np.dstack((rgb, np.round(alpha * 255))).astype(np.uint8)
    frame = Image.fromarray(rgba)
    for variant, dimensions in variants.items():
        destination = DEST / variant / f'frame-{index:02d}.webp'
        frame.resize(dimensions, Image.Resampling.LANCZOS).save(
            destination, 'WEBP', quality=88 if variant == 'desktop' else 85, method=6)
        sizes[variant] += destination.stat().st_size
manifest = {
    'version': 1, 'frameCount': COUNT, 'sourceFps': 24,
    'sourceFrameIndices': source_frames,
    'sourceDurationUsed': 2.5,
    'playback': 'standing-to-bow, then same frames in reverse',
    'aiGeneratedFromPersonalPhoto': True, 'alphaMatte': 'edge-connected brown backdrop only',
    'variants': {name: {'width': size[0], 'height': size[1], 'totalBytes': sizes[name]}
                 for name, size in variants.items()}
}
(DEST / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(manifest, indent=2))
