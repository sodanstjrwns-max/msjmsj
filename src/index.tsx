import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { SiteHeader, SiteFooter } from './brand'
import { isPublicSite, SITE_ORIGIN, SITE_URL, SITE_LAST_MODIFIED } from './site'

const app = new Hono()
app.use('*', async (c, next) => {
  const url = new URL(c.req.url)
  if (url.hostname === 'webapp-bp7.pages.dev') {
    return c.redirect(`${SITE_ORIGIN}${url.pathname}${url.search}`, 301)
  }
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  await next()
  if (!isPublicSite(c.req.url) || c.res.status >= 400) {
    c.header('X-Robots-Tag', 'noindex, nofollow')
  }
})
app.use('/static/*', serveStatic({ root: './public' }))
app.get('/robots.txt', (c) => c.text(isPublicSite(c.req.url)
  ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'))
app.get('/sitemap.xml', (c) => c.body(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE_URL}</loc><lastmod>${SITE_LAST_MODIFIED}</lastmod></url></urlset>\n`,
  200, { 'Content-Type': 'application/xml; charset=utf-8' }
))
app.use(renderer)

const Arrow = ({ diagonal = false, down = false }: { diagonal?: boolean; down?: boolean }) => <svg class={`arrow ${down ? 'arrow-down' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>
const External = ({ href, children, class: className = '' }: { href: string; children: any; class?: string }) => <a href={href} class={className} target="_blank" rel="noopener noreferrer">{children}<span class="sr-only"> (새 탭)</span></a>

app.get('/', (c) => c.render(
  <>
    <a class="skip-link" href="#main-content">본문으로 건너뛰기</a>
    <SiteHeader home />
    <main id="main-content">
      <section class="greeting-sequence" id="greeting" aria-labelledby="hero-title">
        <div class="hero greeting-stage">
          <div class="hero-rules" aria-hidden="true"></div>
          <div class="hero-orbit liquid-halo" aria-hidden="true"><span></span><span></span></div>
          <div class="hero-topline"><span>한 사람을 만나는 마음으로.</span><span>SEOUL BD DENTAL CLINIC</span></div>
          <div class="greeting-copy">
            <p class="greeting-eyebrow">치과의사 문석준 · 서울비디치과 대표원장</p>
            <p class="greeting-intro" aria-hidden="true">반갑습니다.<br /><strong>문석준입니다.</strong></p>
            <h1 id="hero-title"><span class="hero-word hero-word-first">충분히</span><span class="sr-only"> </span><span class="hero-word hero-word-last">듣습니다<span class="hero-period">.</span></span></h1>
            <p class="greeting-subtitle">인사를 건네고,<br />당신의 이야기를 듣겠습니다.</p>
          </div>
          <figure class="portrait greeting-portrait">
            <picture><source media="(max-width: 780px)" srcSet="/static/greeting/v1/mobile/frame-00.webp" /><img id="greeting-poster" src="/static/greeting/v1/desktop/frame-00.webp" width="810" height="1080" alt="문석준의 실제 사진을 바탕으로 제작한 인사 장면" fetchpriority="high" /></picture>
            <canvas id="greeting-canvas" width="810" height="1080" aria-hidden="true"></canvas>
            <figcaption class="sr-only">아래로 스크롤하면 문석준이 허리를 깊이 숙여 인사하고 다시 일어납니다. 실제 사진 기반 AI 연출 영상입니다.</figcaption>
          </figure>
          <div class="greeting-side-note" aria-hidden="true"><span>01</span><i></i><span>인사로 시작하는 대화</span></div>
          <div class="greeting-controls"><a class="greeting-skip" href="#opening-title">인사 건너뛰기 <Arrow /></a><button id="greeting-motion" class="greeting-motion" aria-pressed="false">모션 끄기</button></div>
          <div class="greeting-bottom"><span class="greeting-scroll-cue"><Arrow down /><span id="greeting-cue">스크롤로 인사를 나눠보세요</span></span><div class="greeting-timeline" aria-hidden="true"><span>HELLO</span><i><b></b></i><span>LISTEN</span></div><span class="greeting-disclosure">실제 사진 기반 AI 인사 영상</span></div>
        </div>
      </section>

      <section class="opening-section" aria-labelledby="opening-title">
        <div class="opening-meta"><span class="eyebrow">A CONVERSATION, FIRST</span><span>치료 이야기에 앞서</span></div>
        <h2 id="opening-title" class="reveal">잘 정리된 말이<br />아니어도 <span class="soft-word">괜찮습니다.</span></h2>
        <div class="opening-lower"><span class="opening-symbol" aria-hidden="true">↳</span><p>지금 어디가 불편한지, 어떤 경험 때문에 걱정되는지.<br class="desktop-break" /> 치료에 대한 설명을 시작하기 전에 듣고 싶은 이야기입니다.<br /><br />저는 치과의사 문석준입니다.<br />충분히 듣고, 이해할 수 있게 설명하는 진료를 생각합니다.</p><span class="opening-footnote">나의 말보다,<br />당신의 이야기부터.</span></div>
      </section>

      <section class="approach-section" id="approach" aria-labelledby="approach-title">
        <div class="section-heading"><span><i>01</i> THE WAY I CARE</span><span>진료의 태도</span></div>
        <div class="approach-layout">
          <div class="approach-opening"><h2 id="approach-title" class="reveal">어떤 마음으로<br />오셨나요<span class="serif-punctuation">?</span></h2><p>같은 치료 이름을 이야기하더라도<br />사람마다 기대와 걱정은 다릅니다.<br />마음에 가까운 질문부터 읽어보세요.</p>
            <div class="question-tabs" aria-label="진료에 대한 생각 주제">
              <button id="question-listen" class="question-tab is-active" data-panel="thought-listen"><span class="tab-number">01</span><span>치과에 가는 게 걱정돼요</span><Arrow /></button>
              <button id="question-understand" class="question-tab" data-panel="thought-understand"><span class="tab-number">02</span><span>설명을 듣고도 잘 모르겠어요</span><Arrow /></button>
              <button id="question-decide" class="question-tab" data-panel="thought-decide"><span class="tab-number">03</span><span>무엇을 선택할지 고민돼요</span><Arrow /></button>
            </div>
          </div>
          <div class="thought-panels">
            <article class="thought-panel" id="thought-listen" aria-labelledby="listen-title"><div class="thought-top"><span class="thought-verb" aria-hidden="true">Listen.</span><span>01 / 03<br />먼저, 듣는 일</span></div><h3 id="listen-title">걱정도,<br />진료에 필요한 이야기입니다.</h3><p>치과에 오기까지 각자 다른 시간이 있었을 거라고 생각합니다. 예전의 기억 때문에 망설였던 분도, 무엇부터 물어봐야 할지 어려운 분도 계실 것입니다.</p><p>지금의 불편뿐 아니라 걱정되는 이유에도 귀 기울이고 싶습니다. 처음부터 잘 정리해서 말씀하지 않으셔도 괜찮습니다. 필요한 질문을 함께 찾아가겠습니다.</p><div class="thought-bottom"><span class="small-dot"></span>충분히 듣습니다.</div></article>
            <article class="thought-panel" id="thought-understand" aria-labelledby="understand-title"><div class="thought-top"><span class="thought-verb" aria-hidden="true">Explain.</span><span>02 / 03<br />그다음, 이해하는 일</span></div><h3 id="understand-title">설명의 양보다,<br />이해할 수 있는 설명.</h3><p>설명을 듣고도 질문이 남을 수 있습니다. 익숙하지 않은 용어와 여러 선택지를 한 번에 이해하기는 쉽지 않습니다.</p><p>확인한 상태와 아직 더 살펴봐야 할 것을 나누고, 그림과 영상으로 설명할 방법을 찾습니다. 자료가 일반적인 구조를 보여주면, 대화에서는 환자분의 상태와 질문에 더 집중할 수 있습니다.</p><a class="thought-bottom" href="#records">글과 영상을 만드는 이유 <Arrow /></a></article>
            <article class="thought-panel" id="thought-decide" aria-labelledby="decide-title"><div class="thought-top"><span class="thought-verb" aria-hidden="true">Together.</span><span>03 / 03<br />함께, 선택을 생각하는 일</span></div><h3 id="decide-title">선택을 생각하는 과정에,<br />환자분의 생각도 함께.</h3><p>치료를 생각할 때에는 현재의 불편만큼 이후의 생활도 중요합니다. 무엇을 바라는지, 어떤 점이 부담스러운지 함께 이야기하고 싶습니다.</p><p>확인한 상태와 생각할 수 있는 방법, 각각의 한계를 살펴보려 합니다. 더 알고 싶은 것이 무엇인지 질문을 나누는 일도 그 과정에 포함되어야 한다고 생각합니다.</p><div class="thought-bottom"><span class="small-dot"></span>생활과 부담까지 함께 살핍니다.</div></article>
          </div>
        </div>
      </section>

      <section class="records-section" id="records" aria-labelledby="records-title">
        <div class="section-heading"><span><i>02</i> THOUGHTS & RECORDS</span><span>글과 영상</span></div>
        <div class="records-intro"><h2 id="records-title" class="reveal">대화의<br /><span class="offset-word">다음 장.</span></h2><div><span class="records-script" aria-hidden="true">Notes</span><p>진료실에서 들었던 설명을 다시 펼쳐볼 수 있도록.<br />듣고 나서, 쓰고 만듭니다.</p></div></div>
        <div class="record-filters" aria-label="콘텐츠 종류 필터"><button class="filter-button is-active" data-filter="all" aria-pressed="true">전체 <sup>04</sup></button><button class="filter-button" data-filter="article" aria-pressed="false">글 <sup>01</sup></button><button class="filter-button" data-filter="book" aria-pressed="false">책 <sup>02</sup></button><button class="filter-button" data-filter="video" aria-pressed="false">영상 <sup>01</sup></button></div>
        <p class="sr-only" role="status" id="filter-status" aria-live="polite"></p>
        <div class="records-grid">
          <article class="record-card video-card" data-type="video"><div class="video-stage" id="intro-video"><img src="/static/intro-video.webp" width="960" height="540" loading="lazy" alt="문석준 원장 소개 영상의 실제 화면" /><span class="video-overline">IN CONVERSATION</span><button id="play-intro" class="play-button" aria-label="문석준 원장 소개 영상 재생 (YouTube 연결)"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor" /></svg><span>PLAY</span></button><span class="video-footnote">재생하면 YouTube에 연결됩니다.</span></div><div class="record-body"><div class="record-meta"><span>FILM / 영상</span><span>서울비디치과</span></div><h3>진료를 대하는 마음,<br />목소리로 전합니다.</h3><p>치과가 두려운 환자분과의 대화, 그리고 진료를 대하는 태도를 이야기합니다.</p><External href="https://www.youtube.com/watch?v=JV7JDndC3ug" class="text-link">YouTube에서 소개 영상 보기 <Arrow diagonal /></External></div></article>
          <article class="record-card article-card" data-type="article"><div class="article-visual"><span class="record-meta">ESSAY / 글</span><span class="large-question" aria-hidden="true">?</span><p>같은 임플란트인데,<br />왜 가격은<br /><em>다를까요?</em></p><span class="visual-bottom">금액보다 먼저 살펴볼 것</span></div><div class="record-body"><h3>임플란트 가격이 차이 나는 진짜 이유,<br class="desktop-break" /> 7가지로 정리합니다</h3><p>견적에 무엇이 포함되어 있는지, 어떤 항목을 비교해야 하는지 살펴보는 글입니다.</p><External href="https://bdbddc.com/column/implant-cost-comparison" class="text-link">병원 홈페이지에서 원문 읽기 <Arrow diagonal /></External></div></article>
          <article class="record-card book-card" data-type="book"><span class="book-marker" aria-hidden="true">01</span><div class="book-info"><div class="record-meta"><span>BOOK / 책</span><span>2023 · 문석준 단독 저서</span></div><h3>쉽디쉬운<br />임플란트 이야기</h3></div><p>임플란트가 필요한 이유와 종류, 장단점.<br />치료를 알아보는 분들을 위한 이야기입니다.</p><External href="https://product.kyobobook.co.kr/detail/S000201305749" class="book-link"><span>서점에서<br />책 정보 보기</span><Arrow diagonal /></External></article>
          <article class="record-card book-card" data-type="book"><span class="book-marker" aria-hidden="true">02</span><div class="book-info"><div class="record-meta"><span>BOOK / 책</span><span>2022 · 문석준 공저</span></div><h3>쉽디쉬운<br />치과 이야기</h3></div><p>치과에서 들었던 설명을 다시 살펴볼 수 있도록.<br />사진과 설명으로 치과 진료의 이해를 돕는 책입니다.</p><External href="https://product.kyobobook.co.kr/detail/S000200319528" class="book-link"><span>서점에서<br />책 정보 보기</span><Arrow diagonal /></External></article>
        </div>
        <div class="channel-row"><p>더 이어서 읽고, 보고 싶으시다면</p><div><External href="https://brunch.co.kr/@writertbtu">브런치 <Arrow diagonal /></External><External href="https://www.youtube.com/@%EC%A7%84%EC%A0%95%EC%9E%84%ED%94%8C%EB%9E%80%ED%8A%B8%EB%AC%B8%EC%84%9D%EC%A4%80">진정 임플란트 문석준 <Arrow diagonal /></External></div></div>
      </section>

      <section class="about-section" id="about" aria-labelledby="about-title"><div class="about-inner"><div class="section-heading"><span><i>03</i> THE PERSON BEHIND</span><span>치과의사 문석준</span></div><div class="about-layout"><div class="about-name"><span class="eyebrow">치과의사 · 서울비디치과 대표원장</span><h2 id="about-title">문석준</h2><figure class="about-portrait"><img src="/static/moon-profile.webp" width="600" height="840" loading="lazy" alt="서울비디치과 문석준 대표원장 프로필" /><figcaption>진료하고, 기록하고,<br />더 나은 방법을 고민합니다.</figcaption></figure></div><div class="about-content"><span class="eyebrow">IN PRACTICE, AND BEYOND</span><h3 class="reveal">좋은 설명을<br />고민하는 일도,<br /><span>진료에서 시작합니다.</span></h3><p>서울비디치과에서 임플란트와 정밀 진단을 중심으로 진료하고 있습니다. 환자분의 말씀을 충분히 듣고, 확인한 내용을 이해할 수 있는 말로 나누는 과정을 중요하게 생각합니다.</p><p>말만으로 전하기 어려운 부분은 글과 그림, 영상으로 풀어갑니다. 안내가 더 잘 이어질 방법을 고민하고, 반복되는 불편이 있다면 도구와 절차도 살펴봅니다. 무엇을 새로 만들었는지보다, 무엇을 더 잘 이해하고 나눌 수 있는지가 중요하다고 생각합니다.</p><dl class="credentials"><div><dt>소속</dt><dd>서울비디치과 대표원장</dd></div><div><dt>학력</dt><dd>서울대학교 치의학과<br />서울대학교 치의학대학원 석사</dd></div><div><dt>진료 관심</dt><dd>임플란트 · 정밀 진단</dd></div></dl><External href="https://bdbddc.com/doctors/moon" class="text-link">병원 공식 의료진 소개 <Arrow diagonal /></External></div></div><aside class="colleagues"><span class="eyebrow">동료에게 전하는 작업</span><div><p>진료와 병원 운영에서 마주한 질문을 동료들과 나누는 작업도 하고 있습니다. 설명이 잘 전달되는 방법, 환자분의 경험을 놓치지 않는 과정을 공부하고 정리합니다.</p><details><summary>운영 관련 저술 이력 <span class="details-plus" aria-hidden="true">+</span></summary><div class="colleague-book"><span class="record-meta">2025 · 문석준 단독 저서</span><h3>개원 5년, 연 매출 100억 원을 만든 질문들</h3><External href="https://product.kyobobook.co.kr/detail/S000218133454" class="text-link">서점에서 책 정보 보기 <Arrow diagonal /></External></div></details></div></aside></div></section>

      <section class="visit-section" id="visit" aria-labelledby="visit-title"><div class="section-heading"><span><i>04</i> SEE YOU IN PERSON</span><span>진료 안내</span></div><div class="visit-layout"><div><h2 id="visit-title" class="reveal">다음 이야기는,<br /><span>진료실에서.</span></h2><p>천안의 서울비디치과에서 진료하고 있습니다.<br />진료 일정과 예약 방법은 병원 공식 안내를 확인해 주세요.</p></div><External href="https://bdbddc.com/reservation?doctor=moon" class="visit-primary"><span class="eyebrow">SEOUL BD</span><Arrow diagonal /><span>문석준 원장<br />진료 예약 안내</span></External></div><div class="visit-bottom"><span>예약 및 진료 문의는 병원에서 안내해 드립니다.</span><External href="https://bdbddc.com" class="text-link">서울비디치과 위치·이용 안내 <Arrow diagonal /></External></div></section>
    </main>
    <SiteFooter />
    <div class="reading-progress" aria-hidden="true"></div>
  </>
))
export default app
