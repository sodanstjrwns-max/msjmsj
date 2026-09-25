import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => (
  <html lang="ko">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>치과의사 문석준 — 충분히 듣습니다</title>
      <meta name="description" content="치과의사 문석준의 개인 홈페이지. 서울비디치과 대표원장으로서 진료를 대하는 생각과 환자분의 이해를 돕는 글, 책, 영상을 소개합니다." />
      <meta name="robots" content="noindex, nofollow, noarchive" />
      <meta name="theme-color" content="#6b4226" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="치과의사 문석준 — 충분히 듣습니다" />
      <meta property="og:description" content="환자분의 이야기에서 시작하는 진료. 진료실 안의 생각과 밖으로 이어지는 기록을 나눕니다." />
      <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      <link rel="preload" href="/static/greeting/v1/desktop/frame-00.webp" as="image" media="(min-width: 781px)" />
      <link rel="preload" href="/static/greeting/v1/mobile/frame-00.webp" as="image" media="(max-width: 780px)" />
      <link rel="stylesheet" href="/static/style.css" />
      <script src="/static/app.js" defer></script>
    </head>
    <body>{children}</body>
  </html>
))
