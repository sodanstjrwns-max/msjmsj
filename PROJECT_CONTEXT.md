# 문석준 개인 홈페이지 공통 작업기록

- 공통 로컬 원본: `/Users/msj/msjmsj`
- 원격: sodanstjrwns-max/msjmsj main (Genspark 수정 가능: 작업 전 fetch/status 확인)
- 운영: https://moon.bdbddc.com/ · Cloudflare Pages webapp

## 진행 중 작업

- Codex · 2026-09-25T21:12:55.340215+09:00 · 소개 영역 실사진 확대, 데스크톱/모바일 레이아웃 확인 및 운영 배포. 범위 public/static/style.css, src/renderer.tsx, 공통 기록. 인스타 고정 소개글은 읽기 확인만, 로그인 대기. [moon-portrait-20260925]

- Codex · 2026-09-25 Naver 서치어드바이저 기존 소유 계정 로그인 대기. Chrome 로그인 탭 유지. 로그인 후 moon.bdbddc.com 소유권 확인·sitemap.xml 제출만 재개. Google/Bing 재제출 불필요. [moon-search-launch-20260925]

## 최근 완료

- 2026-09-25 검색 공개 코드 fbe8b24a main push, Cloudflare Pages webapp/main 4a26f057-c3ec-454c-9b58-547ed038b53e 배포. 정식 호스트 index/robots Allow, canonical·단일 URL sitemap·구 Pages 호스트 301·미리보기 noindex. Bing meta 및 공개 IndexNow 키 포함. 디자인·분석코드 변경 없음.
- GSC URL-prefix 소유권 확인 및 사이트맵 처리 완료(1 URL), 첫 색인 요청 접수. Bing 소유권 인증·사이트맵 Success(1 URL). Naver IndexNow200, Bing202. 검색 색인 완료와 구분.
- TypeScript/build/diff 통과, 로컬16·운영7 HTTP 검사 통과. robots.txt 구 캐시만 선택 purge 후 새 응답 확인. 운영 브라우저 본문/공식 의료진 링크 정상. 증거 /Users/msj/bddc/reports/2026-09-25-moon-search-launch/.

- 2026-09-25 개인 도메인 연결 및 병원 원장 소개에서 개인 홈페이지 링크 완료. 이번 요청부터 기존 검색 제외를 공식 도메인에서 해제한다.
