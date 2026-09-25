const moonPath = 'M8 5H51V29H8ZM3 41H56M30 41V53M8 57V74H53'
const seokPath = 'M96 7L80 32M96 7L112 32M130 5V36M115 21H130M81 50H130V75'
const junPath = 'M159 6H204M181 11L159 33M181 11L204 33M155 45H208M182 45V56M161 61V77H207'

export const Wordmark = () => <svg class="name-logo" viewBox="0 0 225 86" width="125" height="48" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"><path d={moonPath}/><path d={seokPath}/><path d={junPath}/></g><circle cx="219" cy="76" r="3" fill="currentColor" /></svg>

export const SiteHeader = ({ home = false }: { home?: boolean }) => {
  const root = home ? '' : '/'
  return <header class="site-header" id="top">
    <a href={home ? '#top' : '/'} class="brand wordmark-brand" aria-label="치과의사 문석준, 처음으로"><span class="brand-profession">치과의사</span><Wordmark /></a>
    <span class="header-note">한 사람의 이야기에서 시작하는 진료</span>
    <button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="main-nav"><span>메뉴</span><span class="menu-lines" aria-hidden="true"></span></button>
    <nav id="main-nav" aria-label="주 메뉴"><a href={`${root}#approach`}>진료의 태도</a><a href={`${root}#records`}>글과 영상</a><a href={`${root}#about`}>문석준</a><a href={`${root}#visit`} class="nav-visit">진료 안내 <span aria-hidden="true">↗</span></a></nav>
  </header>
}

export const SiteFooter = () => <footer class="site-footer"><div class="footer-top"><a href="/" class="brand wordmark-brand" aria-label="치과의사 문석준, 처음으로"><span class="brand-profession">치과의사</span><Wordmark /></a><p>진료실 안의 대화가,<br />진료실 밖에서도 도움이 되기를.</p><a href="#top" class="back-top">처음으로 <span aria-hidden="true">↑</span></a></div><div class="footer-wordmark" aria-hidden="true">충분히 듣습니다.</div><div class="footer-bottom"><span>© {new Date().getFullYear()} 문석준</span><span>치과의사 문석준의 독립 개인 홈페이지</span><span>LISTEN. UNDERSTAND. TOGETHER.</span></div></footer>
