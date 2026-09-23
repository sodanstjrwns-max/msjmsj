import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()
app.use('*', async (c, next) => {
  c.header('X-Robots-Tag', 'noindex, nofollow, noarchive')
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  await next()
})
app.use('/static/*', serveStatic({ root: './public' }))
app.get('/robots.txt', (c) => c.text('User-agent: *\nDisallow: /\n'))
app.use(renderer)

const Arrow = ({ diagonal = false, down = false }: { diagonal?: boolean; down?: boolean }) => (
  <svg class={`arrow ${down ? 'arrow-down' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
  </svg>
)
const Mark = () => <svg class="brand-mark" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M3 5h10v14H8l-5 6V5ZM17 5h10v14h-5l-5 6V5Z" fill="currentColor" /></svg>
const External = ({ href, children, class: className = '' }: { href: string; children: any; class?: string }) => <a href={href} class={className} target="_blank" rel="noopener noreferrer">{children}<span class="sr-only"> (새 탭)</span></a>

app.get('/', (c) => c.render(
  <>
    <a class="skip-link" href="#main-content">본문으로 건너뛰기</a>
    <header class="site-header" id="top">
      <a href="#top" class="brand" aria-label="치과의사 문석준, 처음으로"><Mark /><span><span class="brand-role">치과의사</span> 문석준</span></a>
      <button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="main-nav"><span>메뉴</span><span class="menu-lines" aria-hidden="true"></span></button>
      <nav id="main-nav" aria-label="주 메뉴">
        <a href="#approach">진료에 대한 생각</a>
        <a href="#records">글과 영상</a>
        <a href="#about">문석준 소개</a>
        <a href="#visit" class="nav-visit">진료 안내 <Arrow diagonal /></a>
      </nav>
    </header>

    <main id="main-content">
      <section class="hero page-width" aria-labelledby="hero-title">
        <div class="hero-kicker"><span><i class="blue-dot" aria-hidden="true"></i>환자분의 이야기에서 시작하는 진료</span><span class="small-label">듣고, 이해하고, 함께 생각합니다</span></div>
        <h1 id="hero-title">충분히 듣습니다<span class="blue-period">.</span></h1>
        <div class="hero-story">
          <figure class="portrait">
            <img src="/static/moon-profile.webp" width="600" height="840" alt="검은 진료복을 입은 치과의사 문석준" fetchpriority="high" />
            <figcaption><span>치과의사 <strong>문석준</strong></span><span>서울비디치과 대표원장</span></figcaption>
          </figure>
          <div class="hero-intro">
            <span class="section-label"><span class="tiny-line"></span> 대화의 시작</span>
            <h2>잘 정리된 말이<br />아니어도 괜찮습니다.</h2>
            <p>지금 어디가 불편한지, 어떤 경험 때문에 걱정되는지.<br class="desktop-break" /> 치료에 대한 설명을 시작하기 전에 듣고 싶은 이야기입니다.</p>
            <p>치과의사 문석준입니다.<br />충분히 듣고, 이해할 수 있게 설명하는 진료를 생각합니다.</p>
            <a class="text-link" href="#approach">제가 진료를 대하는 생각 <Arrow /></a>
          </div>
          <div class="hero-side" aria-hidden="true"><span>진료실 안의 대화,<br />진료실 밖의 기록.</span><svg viewBox="0 0 60 120" width="60" height="120" fill="none"><path d="M30 0v110m-20-20 20 20 20-20" stroke="currentColor" stroke-width="1" /></svg></div>
        </div>
        <a class="hero-next" href="#approach"><span>당신의 질문에서, 이야기를 시작해 볼까요.</span><span>아래로 읽기 <Arrow down /></span></a>
      </section>

      <section class="approach-section" id="approach" aria-labelledby="approach-title">
        <div class="page-width">
          <div class="section-heading"><span class="section-label"><span class="section-number">01</span> 진료에 대한 생각</span><span class="section-aside">어떤 치료인지보다, 어떤 마음으로 오셨는지부터.</span></div>
          <div class="approach-layout">
            <div class="approach-opening">
              <h2 id="approach-title">어떤 점이 가장<br />걱정되셨나요<span class="blue-period">?</span></h2>
              <p>같은 치료 이름을 이야기하더라도<br />사람마다 기대와 걱정은 다릅니다.<br />마음에 가까운 질문부터 읽어보세요.</p>
              <div class="question-tabs" aria-label="진료에 대한 생각 주제">
                <button id="question-listen" class="question-tab is-active" data-panel="thought-listen"><span>치과에 가는 게 걱정돼요</span><Arrow /></button>
                <button id="question-understand" class="question-tab" data-panel="thought-understand"><span>설명을 듣고도 잘 모르겠어요</span><Arrow /></button>
                <button id="question-decide" class="question-tab" data-panel="thought-decide"><span>무엇을 선택할지 고민돼요</span><Arrow /></button>
              </div>
            </div>
            <div class="thought-panels">
              <article class="thought-panel" id="thought-listen" aria-labelledby="listen-title">
                <div class="thought-top"><span>먼저, 듣는 일</span><span class="thought-index">01 / 03</span></div>
                <div class="conversation-art" aria-hidden="true"><span class="bubble bubble-outline"></span><span class="bubble bubble-solid"></span><i></i><i></i><i></i></div>
                <h3 id="listen-title">걱정도,<br />진료에 필요한 이야기입니다.</h3>
                <p>치과에 오기까지 각자 다른 시간이 있었을 거라고 생각합니다. 예전의 기억 때문에 망설였던 분도, 무엇부터 물어봐야 할지 어려운 분도 계실 것입니다.</p>
                <p>지금의 불편뿐 아니라 걱정되는 이유에도 귀 기울이고 싶습니다. 처음부터 잘 정리해서 말씀하지 않으셔도 괜찮습니다. 필요한 질문을 함께 찾아가겠습니다.</p>
                <div class="thought-bottom"><span class="blue-dot"></span><span>충분히 듣습니다.</span></div>
              </article>
              <article class="thought-panel" id="thought-understand" aria-labelledby="understand-title">
                <div class="thought-top"><span>그다음, 이해하는 일</span><span class="thought-index">02 / 03</span></div>
                <div class="understand-art" aria-hidden="true"><span></span><span></span><span></span></div>
                <h3 id="understand-title">설명의 양보다,<br />이해할 수 있는 설명.</h3>
                <p>설명을 듣고도 질문이 남을 수 있습니다. 익숙하지 않은 용어와 여러 선택지를 한 번에 이해하기는 쉽지 않습니다.</p>
                <p>확인한 상태와 아직 더 살펴봐야 할 것을 나누고, 그림과 영상으로 설명할 방법을 찾습니다. 자료가 일반적인 구조를 보여주면, 대화에서는 환자분의 상태와 질문에 더 집중할 수 있습니다.</p>
                <a class="thought-bottom" href="#records">글과 영상을 만드는 이유 <Arrow /></a>
              </article>
              <article class="thought-panel" id="thought-decide" aria-labelledby="decide-title">
                <div class="thought-top"><span>함께, 선택을 생각하는 일</span><span class="thought-index">03 / 03</span></div>
                <div class="choice-art" aria-hidden="true"><span></span><span></span><span></span></div>
                <h3 id="decide-title">선택을 생각하는 과정에,<br />환자분의 생각도 함께.</h3>
                <p>치료를 생각할 때에는 현재의 불편만큼 이후의 생활도 중요합니다. 무엇을 바라는지, 어떤 점이 부담스러운지 함께 이야기하고 싶습니다.</p>
                <p>확인한 상태와 생각할 수 있는 방법, 각각의 한계를 살펴보려 합니다. 더 알고 싶은 것이 무엇인지 질문을 나누는 일도 그 과정에 포함되어야 한다고 생각합니다.</p>
                <div class="thought-bottom"><span class="blue-dot"></span><span>생활과 부담까지 함께 살핍니다.</span></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="records-section page-width" id="records" aria-labelledby="records-title">
        <div class="section-heading"><span class="section-label"><span class="section-number">02</span> 글과 영상</span><span class="section-aside">진료실의 질문을, 다시 펼쳐볼 수 있도록.</span></div>
        <div class="records-intro"><h2 id="records-title">듣고 나서,<br />쓰고 만듭니다<span class="blue-period">.</span></h2><p>한 번 들은 설명도 시간이 지나면 다시 궁금해질 수 있습니다.<br class="desktop-break" /> 필요할 때 차분히 읽고, 다음 진료에서 질문할 수 있도록.<br class="desktop-break" /> 글과 책, 영상으로 이야기를 이어갑니다.</p></div>
        <div class="record-filters" aria-label="콘텐츠 종류 필터"><button class="filter-button is-active" data-filter="all" aria-pressed="true">전체 <span>4</span></button><button class="filter-button" data-filter="article" aria-pressed="false">글</button><button class="filter-button" data-filter="book" aria-pressed="false">책</button><button class="filter-button" data-filter="video" aria-pressed="false">영상</button></div>
        <p class="sr-only" role="status" id="filter-status" aria-live="polite"></p>
        <div class="records-grid">
          <article class="record-card video-card" data-type="video">
            <div class="video-stage" id="intro-video">
              <span class="video-overline">서울비디치과 · 원장 소개 영상</span>
              <div class="video-art" aria-hidden="true"><span></span><span></span></div>
              <p class="video-heading">진료를 대하는 마음,<br />목소리로 전합니다.</p>
              <button id="play-intro" class="play-button" aria-label="문석준 원장 소개 영상 재생 (YouTube 연결)"><svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="m8 4 11 7-11 7V4Z" fill="currentColor" /></svg><span>소개 영상 보기</span></button>
              <span class="video-footnote">재생하면 YouTube에 연결됩니다.</span>
            </div>
            <div class="record-body"><div class="record-meta"><span>영상</span><span>서울비디치과</span></div><h3>문석준 원장 소개</h3><p>치과가 두려운 환자분과의 대화, 그리고 진료를 대하는 태도를 이야기합니다.</p><External href="https://www.youtube.com/watch?v=JV7JDndC3ug" class="text-link">YouTube에서 보기 <Arrow diagonal /></External></div>
          </article>
          <article class="record-card article-card" data-type="article">
            <div class="article-visual"><span class="visual-label">진료실에서 이어진 질문</span><span class="large-question" aria-hidden="true">?</span><p>같은 임플란트인데,<br />왜 가격은 다를까요?</p><span class="visual-bottom">금액보다 먼저 살펴볼 것 <Arrow /></span></div>
            <div class="record-body"><div class="record-meta"><span>글</span><span>서울비디치과 원장 칼럼</span></div><h3>임플란트 가격이 차이 나는 진짜 이유,<br class="desktop-break" /> 7가지로 정리합니다</h3><p>견적에 무엇이 포함되어 있는지, 어떤 항목을 비교해야 하는지 살펴보는 글입니다.</p><External href="https://bdbddc.com/column/implant-cost-comparison" class="text-link">병원 홈페이지에서 원문 읽기 <Arrow diagonal /></External></div>
          </article>
          <article class="record-card book-card" data-type="book"><div class="book-marker" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><path d="M10 12h19c5 0 7 3 7 6v37c0-4-3-6-7-6H10V12Zm44 0H42c-4 0-6 3-6 6v37c0-4 3-6 7-6h11V12Z" /><path d="M16 22h12m-12 7h12m-12 7h8m18-14h6m-6 7h6" /></svg></div><div class="book-info"><div class="record-meta"><span>책 · 2023</span><span>문석준 단독 저서</span></div><h3>쉽디쉬운 임플란트 이야기</h3><p>임플란트가 필요한 이유와 종류, 장단점.<br />치료를 알아보는 분들을 위한 이야기입니다.</p><External href="https://product.kyobobook.co.kr/detail/S000201305749" class="text-link">서점에서 책 정보 보기 <Arrow diagonal /></External></div></article>
          <article class="record-card book-card" data-type="book"><div class="book-marker secondary" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><path d="M10 12h19c5 0 7 3 7 6v37c0-4-3-6-7-6H10V12Zm44 0H42c-4 0-6 3-6 6v37c0-4 3-6 7-6h11V12Z" /><path d="M16 22h12m-12 7h12m-12 7h8m18-14h6m-6 7h6" /></svg></div><div class="book-info"><div class="record-meta"><span>책 · 2022</span><span>문석준 공저</span></div><h3>쉽디쉬운 치과 이야기</h3><p>치과에서 들었던 설명을 다시 살펴볼 수 있도록.<br />사진과 설명으로 치과 진료의 이해를 돕는 책입니다.</p><External href="https://product.kyobobook.co.kr/detail/S000200319528" class="text-link">서점에서 책 정보 보기 <Arrow diagonal /></External></div></article>
        </div>
        <div class="channel-row"><p>더 이어서 읽고, 보고 싶으시다면</p><div><External href="https://brunch.co.kr/@writertbtu">브런치 <Arrow diagonal /></External><External href="https://www.youtube.com/@%EC%A7%84%EC%A0%95%EC%9E%84%ED%94%8C%EB%9E%80%ED%8A%B8%EB%AC%B8%EC%84%9D%EC%A4%80">진정 임플란트 문석준 <Arrow diagonal /></External></div></div>
      </section>

      <section class="about-section" id="about" aria-labelledby="about-title"><div class="page-width">
        <div class="section-heading"><span class="section-label"><span class="section-number">03</span> 문석준 소개</span><span class="section-aside">진료하고, 기록하고, 더 나은 방법을 고민합니다.</span></div>
        <div class="about-layout"><div class="about-name"><span>치과의사</span><h2 id="about-title">문석준<span class="blue-period">.</span></h2><p>서울비디치과 대표원장</p><div class="about-mark" aria-hidden="true"><Mark /></div></div><div class="about-content"><h3>좋은 설명을 고민하는 일도,<br />진료에서 시작합니다.</h3><p>서울비디치과에서 임플란트와 정밀 진단을 중심으로 진료하고 있습니다. 환자분의 말씀을 충분히 듣고, 확인한 내용을 이해할 수 있는 말로 나누는 과정을 중요하게 생각합니다.</p><p>말만으로 전하기 어려운 부분은 글과 그림, 영상으로 풀어갑니다. 안내가 더 잘 이어질 방법을 고민하고, 반복되는 불편이 있다면 도구와 절차도 살펴봅니다. 무엇을 새로 만들었는지보다, 무엇을 더 잘 이해하고 나눌 수 있는지가 중요하다고 생각합니다.</p><dl class="credentials"><div><dt>소속</dt><dd>서울비디치과 대표원장</dd></div><div><dt>학력</dt><dd>서울대학교 치의학과<br />서울대학교 치의학대학원 석사</dd></div><div><dt>진료 관심</dt><dd>임플란트 · 정밀 진단</dd></div></dl><External href="https://bdbddc.com/doctors/moon" class="text-link">병원 공식 의료진 소개 <Arrow diagonal /></External></div></div>
        <aside class="colleagues"><span class="section-label">동료에게 전하는 작업</span><div><p>진료와 병원 운영에서 마주한 질문을 동료들과 나누는 작업도 하고 있습니다. 설명이 잘 전달되는 방법, 환자분의 경험을 놓치지 않는 과정을 공부하고 정리합니다.</p><details><summary>운영 관련 저술 이력 <span class="details-plus" aria-hidden="true">+</span></summary><div class="colleague-book"><span class="record-meta">2025 · 문석준 단독 저서</span><h3>개원 5년, 연 매출 100억 원을 만든 질문들</h3><External href="https://product.kyobobook.co.kr/detail/S000218133454" class="text-link">서점에서 책 정보 보기 <Arrow diagonal /></External></div></details></div></aside>
      </div></section>

      <section class="visit-section" id="visit" aria-labelledby="visit-title"><div class="page-width visit-layout"><div><span class="section-label">진료실에서 만나요</span><h2 id="visit-title">진료는<br />서울비디치과에서.</h2><p>천안의 서울비디치과에서 진료하고 있습니다.<br />진료 일정과 예약 방법은 병원 공식 안내를 확인해 주세요.</p></div><div class="visit-links"><External href="https://bdbddc.com/reservation?doctor=moon" class="visit-primary"><span><small>서울비디치과 공식 홈페이지</small>문석준 원장 진료 예약 안내</span><Arrow diagonal /></External><External href="https://bdbddc.com" class="visit-secondary">병원 위치·이용 안내 <Arrow diagonal /></External><span class="visit-note">예약 및 진료 문의는 병원에서 안내해 드립니다.</span></div></div></section>
    </main>
    <footer class="site-footer page-width"><div class="footer-top"><a href="#top" class="brand"><Mark /><span><span class="brand-role">치과의사</span> 문석준</span></a><p>진료실 안의 대화가,<br />진료실 밖에서도 도움이 되기를.</p><a href="#top" class="back-top">처음으로 <Arrow down /></a></div><div class="footer-bottom"><span>© {new Date().getFullYear()} 문석준</span><span>치과의사 문석준의 개인 홈페이지입니다.</span></div></footer>
  </>
))

export default app
