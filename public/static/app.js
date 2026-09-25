(() => {
  const menuButton = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#main-nav');
  function closeMenu(returnFocus = false) {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 781px)').addEventListener('change', () => closeMenu());

  const tabList = document.querySelector('.question-tabs');
  const tabs = [...tabList.querySelectorAll('button')];
  tabList.setAttribute('role', 'tablist');
  tabList.setAttribute('aria-orientation', 'vertical');
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.dataset.panel).hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', tab.dataset.panel);
    const panel = document.getElementById(tab.dataset.panel);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
    });
  });
  selectTab(tabs[0]);

  const filters = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.record-card')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => {
      filter.classList.toggle('is-active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    let count = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.type !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.querySelector('.records-grid').classList.toggle('filtered', button.dataset.filter !== 'all');
    document.querySelector('#filter-status').textContent = `${button.textContent.trim().replace(/\s*\d+$/, '')} 콘텐츠 ${count}개를 표시합니다.`;
  }));

  document.querySelector('#play-intro').addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/JV7JDndC3ug?autoplay=1&rel=0';
    frame.title = '서울비디치과 문석준 원장 소개 영상';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    const stage = document.querySelector('#intro-video');
    stage.replaceChildren(frame);
    frame.focus();
  });

  // Decode 30 unique frames once, then use the same frames in reverse to stand up.
  // No wheel/touch interception, video autoplay, runtime image processing or timers
  // that keep rendering after the scroll position has settled.
  function initGreeting() {
    const section = document.querySelector('#greeting');
    const stage = section?.querySelector('.greeting-stage');
    const canvas = document.querySelector('#greeting-canvas');
    const button = document.querySelector('#greeting-motion');
    const cue = document.querySelector('#greeting-cue');
    if (!section || !canvas || !button) return;
    const context = canvas.getContext('2d', { alpha: true });
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean(navigator.connection?.saveData);
    const variant = window.innerWidth <= 780 ? 'mobile' : 'desktop';
    const dimensions = variant === 'mobile' ? [432, 576] : [810, 1080];
    const images = new Array(30);
    const attempts = new Array(30).fill(0);
    const ordered = [0, 29, 15, 7, 22, ...Array.from({ length: 30 }, (_, i) => i)]
      .filter((value, index, list) => list.indexOf(value) === index);
    let queueIndex = 0, activeLoads = 0, loaded = 0;
    let paused = saveData, failed = !context, enabled = false, requested = false;
    let lastFrame = -1;
    let lastCue = '';
    let displayedProgress = 0, previousTime = 0, hasPosition = false, animationId = 0;
    let renderCount = 0;
    const geometry = { start: 0, range: 1 };
    canvas.width = dimensions[0]; canvas.height = dimensions[1];
    section.dataset.variant = variant;
    section.dataset.frameCount = '30';
    section.dataset.loadedFrames = '0';
    button.dataset.initialized = 'true';

    const clamp = value => Math.max(0, Math.min(1, value));
    function setCue(text) {
      if (text !== lastCue) { cue.textContent = text; lastCue = text; }
    }
    function measure() {
      const headerHeight = parseFloat(getComputedStyle(section).getPropertyValue('--header-height')) || 0;
      geometry.start = section.getBoundingClientRect().top + window.scrollY - headerHeight;
      geometry.range = Math.max(1, section.offsetHeight - stage.offsetHeight);
      schedule();
    }
    function schedule() {
      if (!requested && enabled && !document.hidden) {
        requested = true;
        animationId = requestAnimationFrame(render);
      }
    }
    function render(time) {
      requested = false;
      if (!enabled || !context || document.hidden) { previousTime = 0; return; }
      const targetProgress = clamp((window.scrollY - geometry.start) / geometry.range);
      const elapsed = previousTime ? Math.min(40, time - previousTime) : 16.67;
      previousTime = time;
      // Frame-rate-independent exponential damping: no spring overshoot, no scroll hijack.
      // A 90 ms time constant gives responsive movement with a gentle, finite settling tail.
      if (!hasPosition) { displayedProgress = targetProgress; hasPosition = true; }
      else displayedProgress += (targetProgress - displayedProgress) * (1 - Math.exp(-elapsed / 90));
      const settled = Math.abs(targetProgress - displayedProgress) < 0.0001;
      if (settled) displayedProgress = targetProgress;
      const position = displayedProgress;
      section.dataset.targetProgress = targetProgress.toFixed(4);
      section.dataset.settled = String(settled);
      section.dataset.renderCount = String(++renderCount);
      // A brief greeting, a slow descent, a pause, then the same natural return.
      let bow = 0;
      if (position > 0.06 && position < 0.47) bow = (position - 0.06) / 0.41;
      else if (position >= 0.47 && position <= 0.56) bow = 1;
      else if (position > 0.56 && position < 0.94) bow = 1 - (position - 0.56) / 0.38;
      const target = Math.round(clamp(bow) * 29);
      const smoothstep = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
      const outro = smoothstep((position - 0.73) / 0.2);
      const intro = 1 - smoothstep((position - 0.13) / 0.14);
      section.style.setProperty('--intro-opacity', String(intro));
      section.style.setProperty('--outro-opacity', String(outro));
      section.style.setProperty('--intro-y', `${-12 * (1 - intro)}px`);
      section.style.setProperty('--outro-y', `${18 * (1 - outro)}px`);
      section.style.setProperty('--greeting-progress', String(position));
      section.dataset.progress = position.toFixed(3);
      section.dataset.targetFrame = String(target);
      let available = target;
      if (!images[available]) {
        let distance = 31;
        images.forEach((image, index) => {
          if (image && Math.abs(index - target) < distance) {
            distance = Math.abs(index - target); available = index;
          }
        });
      }
      if (images[available] && available !== lastFrame) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[available], 0, 0, canvas.width, canvas.height);
        lastFrame = available;
        section.dataset.frame = String(available);
        section.classList.add('is-ready');
      }
      setCue(position < 0.09 ? '스크롤로 인사를 나눠보세요' : position < 0.57 ? '반가운 마음을 담아 인사합니다' : position < 0.93 ? '이제, 당신의 이야기를 듣겠습니다' : '아래로 이야기가 이어집니다');
      if (!settled) schedule();
      else previousTime = 0;
    }
    function loadFrame(index) {
      activeLoads++; attempts[index]++;
      const image = new Image(); image.decoding = 'async';
      let settled = false;
      const finish = success => {
        if (settled) return;
        settled = true; clearTimeout(timeout); activeLoads--;
        image.onload = image.onerror = null;
        if (success) {
          images[index] = image; loaded++;
          section.dataset.loadedFrames = String(loaded);
          if (loaded === 30) section.dataset.sequenceComplete = 'true';
          schedule();
        } else if (attempts[index] < 2) ordered.push(index);
        else if (index === 0) {
          failed = true;
          const poster = document.querySelector('#greeting-poster');
          poster.parentElement.querySelectorAll('source').forEach(source => source.remove());
          poster.src = '/static/moon-profile.webp';
          poster.alt = '치과의사 문석준의 실제 프로필 사진';
          configure();
        }
        else section.dataset.sequencePartial = 'true';
        pump();
      };
      const timeout = setTimeout(() => finish(false), 10000);
      image.onload = () => finish(image.naturalWidth > 0);
      image.onerror = () => finish(false);
      image.src = `/static/greeting/v1/${variant}/frame-${String(index).padStart(2, '0')}.webp`;
    }
    function pump() {
      if (!enabled || document.hidden) return;
      while (activeLoads < 4 && queueIndex < ordered.length) loadFrame(ordered[queueIndex++]);
      if (activeLoads === 0 && queueIndex >= ordered.length && loaded < 30) {
        failed = true;
        configure();
      }
    }
    function configure() {
      const previouslyEnabled = enabled;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const inside = window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight;
      enabled = !preference.matches && !paused && !failed;
      section.classList.toggle('is-enabled', enabled);
      section.classList.toggle('is-static', !enabled);
      button.disabled = preference.matches || failed;
      button.setAttribute('aria-pressed', String(!enabled));
      button.textContent = preference.matches ? '움직임 감소 설정 적용' : failed ? '정지 이미지로 보기' : enabled ? '모션 끄기' : '모션 켜기';
      if (!enabled) {
        cancelAnimationFrame(animationId);
        requested = false; previousTime = 0; hasPosition = false;
        section.dataset.settled = 'true';
        section.style.removeProperty('--intro-opacity'); section.style.removeProperty('--outro-opacity');
        section.style.removeProperty('--outro-y');
        setCue(failed ? '아래로 이야기가 이어집니다' : '정지 이미지로 보고 있습니다');
      } else {
        measure(); pump(); schedule();
      }
      // Collapsing a pinned section must not throw the visitor down the page.
      if (previouslyEnabled && !enabled && inside) {
        const headerHeight = parseFloat(getComputedStyle(section).getPropertyValue('--header-height')) || 0;
        window.scrollTo({ top: sectionTop - headerHeight, behavior: 'instant' });
      }
    }
    button.addEventListener('click', () => { paused = !paused; configure(); });
    preference.addEventListener('change', configure);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(animationId); requested = false; previousTime = 0; }
      else { measure(); pump(); schedule(); }
    });
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(stage);
    document.fonts.ready.then(measure);
    configure();
  }
  initGreeting();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // CSS-only glass material, with a small pointer-following highlight on fine pointers.
  // The reflection does not warp the portrait, run on touch, or animate indefinitely.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.greeting-controls,.record-filters,.play-button,.visit-primary').forEach(surface => {
      let bounds, pending = false, x = 50, y = 18;
      surface.addEventListener('pointerenter', () => { bounds = surface.getBoundingClientRect(); });
      surface.addEventListener('pointermove', event => {
        if (reducedMotion.matches || !bounds) return;
        x = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
        y = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
        if (!pending) {
          pending = true;
          requestAnimationFrame(() => {
            surface.style.setProperty('--glass-x', `${x.toFixed(1)}%`);
            surface.style.setProperty('--glass-y', `${y.toFixed(1)}%`);
            pending = false;
          });
        }
      });
      surface.addEventListener('pointerleave', () => {
        x = 50; y = 18;
        surface.style.removeProperty('--glass-x'); surface.style.removeProperty('--glass-y');
      });
    });
  }
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  const orbit = document.querySelector('.hero-orbit');
  let scheduled = false;
  const paintScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 80);
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.min(1, y / range) : 0})`;
    if (!document.querySelector('#greeting') && !reducedMotion.matches && window.innerWidth > 900 && y < 1100) {
      orbit.style.transform = `translate(-41%, -50%) rotate(${Math.min(y * 0.014, 12)}deg)`;
    }
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(paintScroll); }
  }, { passive: true });
  paintScroll();

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-waiting');
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(element => {
      // Never delay the hero or content already on screen.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('is-waiting');
        revealObserver.observe(element);
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navLinks.forEach(link => {
          const current = link.hash === `#${entry.target.id}`;
          link.classList.toggle('is-current', current);
          if (current) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
  }
})();
