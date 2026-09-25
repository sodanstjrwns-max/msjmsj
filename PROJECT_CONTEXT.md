# 문석준 개인 홈페이지 공통 작업기록

- 공통 로컬 원본: `/Users/msj/msjmsj`
- 원격: sodanstjrwns-max/msjmsj main (Genspark 수정 가능: 작업 전 fetch/status 확인)
- 운영: https://moon.bdbddc.com/ · Cloudflare Pages webapp

## 진행 중 작업

- Codex · 2026-09-26T00:48:05.151355+09:00 · moon.bdbddc.com 네이버 인증 meta 배포 완료(a32a820/Pages690a56ae), strict tsc/build/diff·운영8검사 통과. 로그인 완료한 기존 병원 계정에서 소유확인 진행 중 네이버 CAPTCHA 표시; 사용자 직접 입력 요청/탭7 유지. 소유확인 결과 및 사이트맵 제출 미완료. 다음 입력 완료 후 결과 확인→sitemap.xml 1회 제출. reports/2026-09-26-moon-naver/progress.json. [moon-naver-20260926]





## 최근 완료

- 2026-09-25T22:35:25.120178+09:00 Codex: 개인 자기소개를 인스타 확인 원문(Cw6ewtKyHaW)에 근거한 5장·16문단 이야기로 확대. 기존 본문395자→새 이야기 본문2245자(목차/제목 포함2621자), 소개 2문단 별도. 페디랩 어린 기억·뒤늦은 목표·서울대 치과병원 경험·깨지기 쉬운 용기·진료 보람을 연결. 나의 이야기를 첫 메뉴/인사 다음 배치, 큰 실사진 유지. src/index.tsx·brand.tsx·renderer.tsx, public/static/style.css·app.js 변경. code58907e1 main push, Pages webapp/main128eb9c1 운영 배포. build/strict tsc/JS syntax/diff,1440·390px 시각/넘침/목차/모바일메뉴/현재메뉴 확인, 운영 HTTP200·본문·canonical/index·CSS/JS SHA·사이트맵/robots13검사 통과. 근거 /Users/msj/bddc/reports/2026-09-25-moon-story-expanded/verification.json. 이 작업 미완료 없음; Naver 로그인 대기는 별도 기존 항목 유지.

- 2026-09-25 Codex: 사용자 승인에 따라 인스타 소개글(Cw6ewtKyHaW)의 실제 경험을 개인 홈페이지에 반영. 도입부·듣는 태도·원장 소개를 어린 시절 두려움→환자분의 용기→충분히 듣고 싶은 이유로 정리, 원문 링크·메타 소개 갱신. 큰 실사진/디자인 유지. 코드58c4d3a main push, webapp/main de0a4b51 운영 배포. strict tsc/build/diff·1440/390px 시각·운영 본문/링크/canonical/index 9개 검사 통과. reports/2026-09-25-moon-story/verification.json.

- 2026-09-25 Codex: 소개 실사진 확대 완료. 1440px 화면 사진폭270→510px, 390px 모바일80→342px; 이름 아래 배치, 원본 비율·디자인 유지. strict tsc/build/diff, 두 화면 시각/가로넘침 검사, 운영 HTML·CSS SHA 일치 확인. 코드83763b4 main push, Pages webapp/main ffd3c90c 배포. 보고서 /Users/msj/bddc/reports/2026-09-25-moon-portrait/verification.json. 인스타 소개글 https://www.instagram.com/dentalpresidentm/p/Cw6ewtKyHaW/ 본문 확인 완료; 원장님의 경험과 환자분 용기를 존중하는 내용이 핵심. 홈페이지 원고는 이번에 변경하지 않음.

- 2026-09-25 검색 공개 코드 fbe8b24a main push, Cloudflare Pages webapp/main 4a26f057-c3ec-454c-9b58-547ed038b53e 배포. 정식 호스트 index/robots Allow, canonical·단일 URL sitemap·구 Pages 호스트 301·미리보기 noindex. Bing meta 및 공개 IndexNow 키 포함. 디자인·분석코드 변경 없음.
- GSC URL-prefix 소유권 확인 및 사이트맵 처리 완료(1 URL), 첫 색인 요청 접수. Bing 소유권 인증·사이트맵 Success(1 URL). Naver IndexNow200, Bing202. 검색 색인 완료와 구분.
- TypeScript/build/diff 통과, 로컬16·운영7 HTTP 검사 통과. robots.txt 구 캐시만 선택 purge 후 새 응답 확인. 운영 브라우저 본문/공식 의료진 링크 정상. 증거 /Users/msj/bddc/reports/2026-09-25-moon-search-launch/.

- 2026-09-25 개인 도메인 연결 및 병원 원장 소개에서 개인 홈페이지 링크 완료. 이번 요청부터 기존 검색 제외를 공식 도메인에서 해제한다.
