# 문석준 개인 홈페이지 공통 작업기록

- 공통 로컬 원본: `/Users/msj/msjmsj`
- 원격: sodanstjrwns-max/msjmsj main (Genspark 수정 가능: 작업 전 fetch/status 확인)
- 운영: https://moon.bdbddc.com/ · Cloudflare Pages webapp

## 진행 중 작업



- Codex · 2026-09-25 Naver 서치어드바이저 기존 소유 계정 로그인 대기. Chrome 로그인 탭 유지. 로그인 후 moon.bdbddc.com 소유권 확인·sitemap.xml 제출만 재개. Google/Bing 재제출 불필요. [moon-search-launch-20260925]

## 최근 완료

- 2026-09-25 Codex: 사용자 승인에 따라 인스타 소개글(Cw6ewtKyHaW)의 실제 경험을 개인 홈페이지에 반영. 도입부·듣는 태도·원장 소개를 어린 시절 두려움→환자분의 용기→충분히 듣고 싶은 이유로 정리, 원문 링크·메타 소개 갱신. 큰 실사진/디자인 유지. 코드58c4d3a main push, webapp/main de0a4b51 운영 배포. strict tsc/build/diff·1440/390px 시각·운영 본문/링크/canonical/index 9개 검사 통과. reports/2026-09-25-moon-story/verification.json.

- 2026-09-25 Codex: 소개 실사진 확대 완료. 1440px 화면 사진폭270→510px, 390px 모바일80→342px; 이름 아래 배치, 원본 비율·디자인 유지. strict tsc/build/diff, 두 화면 시각/가로넘침 검사, 운영 HTML·CSS SHA 일치 확인. 코드83763b4 main push, Pages webapp/main ffd3c90c 배포. 보고서 /Users/msj/bddc/reports/2026-09-25-moon-portrait/verification.json. 인스타 소개글 https://www.instagram.com/dentalpresidentm/p/Cw6ewtKyHaW/ 본문 확인 완료; 원장님의 경험과 환자분 용기를 존중하는 내용이 핵심. 홈페이지 원고는 이번에 변경하지 않음.

- 2026-09-25 검색 공개 코드 fbe8b24a main push, Cloudflare Pages webapp/main 4a26f057-c3ec-454c-9b58-547ed038b53e 배포. 정식 호스트 index/robots Allow, canonical·단일 URL sitemap·구 Pages 호스트 301·미리보기 noindex. Bing meta 및 공개 IndexNow 키 포함. 디자인·분석코드 변경 없음.
- GSC URL-prefix 소유권 확인 및 사이트맵 처리 완료(1 URL), 첫 색인 요청 접수. Bing 소유권 인증·사이트맵 Success(1 URL). Naver IndexNow200, Bing202. 검색 색인 완료와 구분.
- TypeScript/build/diff 통과, 로컬16·운영7 HTTP 검사 통과. robots.txt 구 캐시만 선택 purge 후 새 응답 확인. 운영 브라우저 본문/공식 의료진 링크 정상. 증거 /Users/msj/bddc/reports/2026-09-25-moon-search-launch/.

- 2026-09-25 개인 도메인 연결 및 병원 원장 소개에서 개인 홈페이지 링크 완료. 이번 요청부터 기존 검색 제외를 공식 도메인에서 해제한다.
