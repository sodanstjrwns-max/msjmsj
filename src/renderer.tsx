import { jsxRenderer } from 'hono/jsx-renderer'
import { isPublicSite, SITE_ORIGIN, SITE_URL } from './site'

export const renderer = jsxRenderer(({ children }, c) => (
  <html lang="ko">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>치과의사 문석준 — 충분히 듣습니다</title>
      <meta name="description" content="치과의사 문석준의 개인 홈페이지. 서울비디치과 대표원장으로서 진료를 대하는 생각과 환자분의 이해를 돕는 글, 책, 영상을 소개합니다." />
      <meta name="robots" content={isPublicSite(c.req.url) ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'} />
      <link rel="canonical" href={SITE_URL} />
      <meta name="msvalidate.01" content="DE25BB74F967C93899AB1AF1C912A5D9" />
      <meta name="theme-color" content="#6b4226" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="치과의사 문석준 — 충분히 듣습니다" />
      <meta property="og:description" content="환자분의 이야기에서 시작하는 진료. 진료실 안의 생각과 밖으로 이어지는 기록을 나눕니다." />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="치과의사 문석준" />
      <meta property="og:image" content={`${SITE_ORIGIN}/static/moon-profile.webp`} />
      <meta property="og:image:alt" content="문석준 원장의 실제 프로필 사진" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebSite', '@id': `${SITE_URL}#website`, url: SITE_URL, name: '치과의사 문석준', inLanguage: 'ko-KR', publisher: { '@id': `${SITE_URL}#person` } },
          { '@type': 'ProfilePage', '@id': `${SITE_URL}#profile`, url: SITE_URL, name: '치과의사 문석준 — 충분히 듣습니다', isPartOf: { '@id': `${SITE_URL}#website` }, mainEntity: { '@id': `${SITE_URL}#person` } },
          { '@type': 'Person', '@id': `${SITE_URL}#person`, name: '문석준', url: SITE_URL, image: `${SITE_ORIGIN}/static/moon-profile.webp`, jobTitle: '치과의사 · 서울비디치과 대표원장', worksFor: { '@type': 'Organization', name: '서울비디치과', url: 'https://bdbddc.com/' }, sameAs: ['https://bdbddc.com/doctors/moon', 'https://brunch.co.kr/@writertbtu'] }
        ]
      }) }} />
      <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      <link rel="preload" href="/static/greeting/v1/desktop/frame-00.webp" as="image" media="(min-width: 781px)" />
      <link rel="preload" href="/static/greeting/v1/mobile/frame-00.webp" as="image" media="(max-width: 780px)" />
      <link rel="stylesheet" href="/static/style.css" />
      <script src="/static/app.js" defer></script>
    </head>
    <body>{children}</body>
  </html>
))
