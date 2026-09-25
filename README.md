# 치과의사 문석준 — 개인 홈페이지

## 현재 상태

- 코드명 `webapp`, `/home/user/webapp`, Git `main`.
- 2026-09-25: **브라운 그라데이션 + 리퀴드 글라스 스타일 + 시스템 우선 타이포그래피 + 감속 스크롤 모션** 적용.
- 미리보기: https://3000-izzaj9m15pt6fbzab9xou-de59bda9.sandbox.novita.ai/?v=5-logo
- **사용자 승인으로 본인 Cloudflare 계정에 Pages 배포 완료.** 운영 주소: https://webapp-bp7.pages.dev
- GitHub 저장소: https://github.com/sodanstjrwns-max/msjmsj (`main`).
- 2026-09-25: 공식 개인 홈페이지 주소 https://moon.bdbddc.com 연결. 기존 Pages 프로젝트 `webapp`과 배포를 그대로 사용한다. 검색 제외 메타·헤더·robots.txt는 유지하며, 검색 공개는 별도 작업이다. 인증/접근 제한이 아니므로 주소를 아는 사람은 접근 가능하다.
- Hono JSX/TypeScript, Vite, 자체 CSS/JS, Cloudflare Pages 호환. 사용자 데이터 저장·문의 폼·가입·결제·추적 없음.

## 이번 수정: 문석준 한글 워드마크

- 이름 자체를 읽을 수 있는 기하학적 한글 SVG를 직접 제작. 둥근 획과 끝의 마침표를 사용하며 외부 폰트에 의존하지 않는다.
- `src/brand.tsx`에서 상단과 하단의 공통 로고를 관리. 브라운/밝은 배경에서는 currentColor로 대응.
- `/static/moon-wordmark.svg`: 브라운 벡터 원본. `/static/favicon.svg`: 정사각형 ‘문’ 모노그램.
- 기존 사각 심벌을 교체. AI 이미지 생성 모델 추가 호출 없음.
- 모바일·데스크톱 실화면 캡처와 로고 판독 검토 완료. 22개 회귀 테스트 통과.
- 로고 원본: https://www.genspark.ai/api/files/s/1vMDvwG5
- 로고 미리보기: https://www.genspark.ai/api/files/s/0DVJF2sH
- 현재 요청 범위는 로고 교체다. 이전 요청인 질문 콘텐츠 확장과 줄 단위 제목 등장 모션은 아직 미구현이며 다음 작업으로 남아 있다. 미구현 `/questions` 링크는 노출하지 않는다.
- 로고 적용 후 사용자 승인으로 Pages 배포. 이후 사용자 승인으로 `moon.bdbddc.com` 연결 완료. 검색 노출 전환은 보류.

## 이전 수정: 서체, 모션, 유리 표현

사용자는 애플 같은 폰트와 움직임, 갈색 그라데이션 및 강한 리퀴드 글라스 표현을 요청했다. 인물·콘텐츠·비디 브랜드 갈색·기존 인사 영상은 유지했다. 이번 수정에서는 이미지/영상 모델을 추가 호출하지 않았다.

### 참고한 공개 스타일

- https://www.apple.com/kr/airpods-pro/
- https://www.apple.com/v/airpods-pro/t/built/styles/overview.built.css
- https://www.apple.com/kr/airpods-pro/styles/overview.built.css

공개 CSS에서 확인한 대표값: 제목 80/64/40px, 굵기 600, 기본 본문 17px, hover `0.3s cubic-bezier(0,0,.5,1)`. 이 위계와 절제된 모션 규칙을 참조했으며 페이지/자산/애플 로고를 복제하지 않았다.

### 타이포그래피

- `-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', MoonSans, 'Segoe UI', sans-serif` 순서.
- Apple 기기는 사용 가능한 시스템 서체를 우선 사용. 다른 기기는 자체 호스팅 MoonSans로 대체.
- **SF Pro/SF Pro KR 파일을 다운로드하거나 재배포하지 않았다.** 애플 웹사이트와 모든 OS에서 픽셀 단위 동일한 서체를 보장하지 않는다.
- 장식 세리프와 이탤릭, 과도한 음수 자간을 제거하고 제목 굵기 600, 명확한 크기 위계와 읽기 쉬운 본문으로 조정.
- MoonSans는 Pretendard v1.3.9의 본문 문자 부분집합. Reserved Font Name을 변경했고 OFL은 `/static/font-license.txt`. 새 한글 문안 추가 시 부분집합 갱신.

### 브라운과 글라스

- 비디 공식 CSS https://bdbddc.com/css/site-v5.css 의 `#6B4226`, `#8B6344`, `#4A2E1A`를 기준으로 에스프레소·브라운·앰버 그라데이션.
- 헤더, 인사 컨트롤, 콘텐츠 필터, 재생 버튼: 반투명 레이어, backdrop blur, saturation, 밝은 가장자리, 내부/외부 그림자.
- 정밀 포인터에서는 작은 하이라이트가 포인터 위치를 따라간다. 터치·움직임 감소 환경에서는 동적 반사 없음.
- 인물 뒤의 유리형 타원은 장식 레이어다. 얼굴과 영상 픽셀을 왜곡하거나 흐리지 않는다.
- CSS 기반 리퀴드 글라스 유사 표현이며 Apple의 네이티브 렌더링 엔진/실제 광학 굴절 효과와 동일하지 않다.
- backdrop-filter 미지원 환경에서는 불투명 브라운/밝은 배경으로 대체. 모바일 blur는 낮춰 렌더링 부담을 제한.

### 감속 모션

- 스크롤 자체는 브라우저 기본 동작을 유지한다. wheel/touch 이벤트를 차단하지 않는다.
- 표시 진행률이 목표 진행률을 따라가는 프레임률 독립 지수 감쇠: 시간상수 90ms, 스프링 오버슈트 없음.
- 목표 오차가 0.0001보다 작으면 정확히 맞추고 requestAnimationFrame 반복을 멈춘다. 숨겨진 탭에서도 중지.
- 문장 등장·퇴장은 smoothstep 곡선, 작은 수직 이동. 순서: 등장 → 유지 → 퇴장.
- 일반 hover 300ms, 본문 reveal 800ms. 본문을 장시간 숨기거나 글자를 한 자씩 날리지 않는다.
- 위치·높이 정보는 resize/ResizeObserver/글꼴 로딩 시 측정하고 반복 프레임마다 레이아웃을 다시 읽지 않는다.
- 테스트 상태 속성: `data-progress`, `data-target-progress`, `data-settled`, `data-render-count`.

## 스크롤 인사와 미디어 이력

사용자가 실제 자신의 사진을 참조한 깊은 인사 영상 및 고품질 모델의 추가 크레딧 사용을 승인했다. 인사 장면은 실제 촬영이 아니라 **사진 기반 AI 연출**이며 화면과 이미지 설명에 명시한다. 임상 장면·환자 후기·성과를 생성하지 않았다.

### 원본 사진

https://raw.githubusercontent.com/sodanstjrwns-max/bdbddc/main/images/doctors/moon-profile.webp

`public/static/moon-profile.webp`는 실제 600×840 촬영본. 인물 소개와 네트워크 실패 대체에 사용한다. `moon-cutout.webp`는 이전 시안의 비생성형 배경 분리본이다.

### 생성 이미지·영상

- GPT Image 2, 2K 요청, 실제 결과 1296×1808.
- 서 있는 자세: https://www.genspark.ai/api/files/s/OGBg8NIJ
- 숙인 자세: https://www.genspark.ai/api/files/s/BYQecfQR
- `artifacts/moon-standing-reference.png`, `moon-bowed-reference.png`.
- 전신/신발은 원본 상반신 사진 밖 영역을 AI로 확장했다. 생체 동일성 또는 픽셀 동일성을 보장하지 않는다.
- Seedance 2.0, standard 고품질, 1080p 요청, 시작·끝 프레임 지정, 무음.
- 최초 영상 https://www.genspark.ai/api/files/s/9Nbqr0nd 는 숙임이 부족해 제외.
- 채택 원본 https://www.genspark.ai/api/files/s/GncLhGte 는 실제 1248×1664, 24fps, 4.041667초. 로컬 `artifacts/moon-deep-bow-master.mp4`.
- 약 0~2.5초 하강 + 역순 복귀로 약 5초 인사 편집: `artifacts/moon-greeting-final.mp4`, https://www.genspark.ai/api/files/s/wnoqlxOy
- 정면 영상이므로 정확한 100도 계측은 보장하지 않는다. 깊은 허리 인사·무릎 방향의 머리·고정된 발·카메라를 확인했다. 역순 복귀의 옷 주름 움직임은 실제 정방향 촬영과 조금 다를 수 있다.

### 30프레임 구현

- `/static/greeting/v1/{desktop|mobile}/frame-00.webp` ~ `frame-29.webp`.
- 고유 30장을 내려가는 동작과 복귀에 재사용. 프레임 수·실제 영상은 이번 폰트/글라스 수정에서 변경하지 않았다.
- 데스크톱 810×1080 RGBA WebP, 전체 1,029,110바이트.
- 모바일 432×576 RGBA WebP, 전체 454,808바이트.
- 배경과 연결된 갈색만 매트 처리. 피부·손·다리·신발 누락 여부를 주요 프레임에서 확인.
- 화면에 맞는 한 해상도만, 동시 4개 요청. 시작/끝/중간을 우선 로드. 스크롤 중 재다운로드 없음.
- 0~6% 서기, 6~47% 숙임, 47~56% 유지, 56~94% 복귀, 이후 서기. 감쇠된 표시 진행률을 기준으로 프레임/문장을 함께 렌더링한다.
- 모션 끄기/켜기, 인사 건너뛰기. 움직임 감소 환경에서는 정지 이미지와 최종 문장, 전체 시퀀스 미요청. 데이터 절약 모드에서는 기본 정지.
- 이미지 실패 시 한 번 재시도. 시작 실패는 실제 원본 사진, 미완성 시퀀스도 정지 모드로 전환. 고정 구간을 제거해 탐색을 막지 않는다.
- 브라우저/Cloudflare 런타임에서 AI API 호출이나 영상 처리 없음.

프레임 재현은 로컬 개발 환경에서 `python3 scripts/build-greeting.py`. ffmpeg/Pillow/numpy/scipy 필요. 세부 인덱스와 용량은 `public/static/greeting/v1/manifest.json`. 30장 디코딩 메모리는 데스크톱 약 105MB, 모바일 약 30MB이므로 무조건 프레임을 늘리지 않는다.

## 기능과 경로

| 경로 | 내용 |
| --- | --- |
| `/`, `/#greeting` | 인사 및 글라스 컨트롤 |
| `/#opening-title` | 인사 건너뛰기 목적지 |
| `/#approach` | 경청·이해·선택 질문 탭 |
| `/#records` | 실제 소개 영상·칼럼·책 2권, 콘텐츠 필터 |
| `/#about` | 검증 가능한 약력, 접힌 운영 관련 저서 |
| `/#visit` | 실제 병원 예약·위치·이용 안내 |
| `/robots.txt` | 검색 제외 요청 |

키보드 탭/Home/End/방향키, ARIA, 메뉴 Escape·외부 클릭 닫기, 본문 건너뛰기 지원. 외부 링크 새 탭 안내 및 noopener noreferrer. YouTube는 선택 후에만 연결. JS가 없어도 본문과 실제 목적지 유지. 영구 저장·쿠키·localStorage·추적 없음.

## 실제 정보 출처와 문안

- 프로필: https://bdbddc.com/doctors/moon — 이름·직업·소속·학력·진료 관심 분야. 학위 원본 대조는 하지 않았으며 상충하는 전문의 자격 제외.
- 실제 소개 영상: https://www.youtube.com/watch?v=JV7JDndC3ug (AI 인사와 별개).
- 해당 영상 실제 썸네일: https://i.ytimg.com/vi/JV7JDndC3ug/maxresdefault.jpg 의 축소본 `intro-video.webp`.
- 칼럼: https://bdbddc.com/column/implant-cost-comparison — 제목·문석준 표기 확인, 짧은 소개 및 원문 링크. 일화·성공률·보장·법률 주장 재사용 없음.
- 《쉽디쉬운 임플란트 이야기》 2023 단독: https://product.kyobobook.co.kr/detail/S000201305749
- 《쉽디쉬운 치과 이야기》 2022 공저: https://product.kyobobook.co.kr/detail/S000200319528
- 《개원 5년, 연 매출 100억 원을 만든 질문들》 2025 단독: https://product.kyobobook.co.kr/detail/S000218133454 — 하단 접힘 영역. 매출 숫자는 책 제목이며 현재 실적 주장이 아님. 가상 표지 없음.
- https://brunch.co.kr/@writertbtu
- https://www.youtube.com/@%EC%A7%84%EC%A0%95%EC%9E%84%ED%94%8C%EB%9E%80%ED%8A%B8%EB%AC%B8%EC%84%9D%EC%A4%80
- 진료: https://bdbddc.com/reservation?doctor=moon 및 https://bdbddc.com

'충분히 듣습니다'는 본인의 직접 정정 표현. 나머지는 제공 초안을 재편집한 새 홈페이지 문안이며 인터뷰 발췌로 주장하지 않는다. 미확인 자격·영문 이름·가족·어린 시절·경력 연수·실적·후기·수상·미출간 원고·서비스 기능/가격/연락처는 계속 제외.

## 검증과 결과 파일

`npm test`: **22개 통과**. 로고 접근성 이름·SVG 원본·파비콘·내부 경로 검사 포함.

- 320~1920px 8개 너비의 가로 넘침/제목/탭, 메뉴·필터·키보드·외부 링크.
- 390/1440px 30프레임 0→29→0 및 동일 시작/종료 Canvas 픽셀, 되감김 시 추가 요청 없음.
- 감쇠 진행률이 목표에 수렴하고 오버슈트하지 않으며 정지 후 렌더링 횟수가 늘지 않음.
- 시스템 우선 폰트, 굵기 600, gradient/backdrop blur, 외부 폰트 요청 없음.
- 모션 해제·움직임 감소·시작 이미지 실패·JS 비활성 시 대체 경로.
- axe WCAG A/AA: 390/1440px 움직임 감소 환경 위반 0. 추가로 정상 모션 시작/깊은 인사/복귀 상태에서도 각각 위반 0.
- 실제 미리보기 JS 오류 0, 데스크톱/모바일 페이지 가로 넘침 없음.
- 전체 접근성 인증이나 모든 실기기 검증은 아님. iPhone/Android 실기기에서 최종 체감 확인 필요.

최신 로고 캡처: `artifacts/wordmark-{desktop|mobile|footer|header}.png`, `artifacts/moon-wordmark-preview.png`.
이전 글라스 캡처: `artifacts/glass-{desktop|mobile}-{start|end|records}.png`.
합본: `artifacts/liquid-glass-overview.jpg`.
실제 모션 녹화: `artifacts/liquid-glass-demo.mp4`.
그 밖의 greeting-* 및 desktop-full 등은 이전 버전 기록이다.

## 배포 상태와 재배포

- 방식: 사용자 소유 Cloudflare 계정, Wrangler 직접 업로드.
- Pages 프로젝트 이름: `webapp` (프로젝트 이름과 실제 서브도메인 `webapp-bp7`은 다름).
- 운영 브랜치: `main`.
- 공식 주소: https://moon.bdbddc.com — Cloudflare Pages Custom Domain과 `moon` CNAME → `webapp-bp7.pages.dev` 연결. 기존 병원 루트 도메인 및 앱과 독립 운영.
- 최초 배포: https://b11ff7aa.webapp-bp7.pages.dev (앱 커밋 `293bca7`).
- 로컬 및 운영 주소에서 각각 Playwright 22개 테스트 통과.
- GitHub 코드는 별도 push로 동기화한다. **GitHub push 자동 배포 파이프라인은 구성하지 않았다.**
- 재배포: Deploy 패널의 API 토큰 설정 후 `npm run build && npx wrangler pages deploy dist --project-name webapp --branch main`.
- 운영 검증: `TEST_URL=https://webapp-bp7.pages.dev npm test`.
- 토큰은 환경변수로만 사용하고 저장소에 포함하지 않는다. 런타임 외부 API·데이터베이스 없음.

## 실행과 검색 공개 전 작업

```sh
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
curl http://localhost:3000
npm test
```

기존 서버 중복 시작 금지. 재시작은 PM2 정지 → 포트 3000 확인 → 빌드 → PM2 재시작. 로그 `pm2 logs webapp --nostream`.

공개 전 본인 얼굴·동작·문안·생성 인사 사용 범위, 대표 콘텐츠 및 저술 노출을 검토한다. 의료 자격 증빙은 별도. `moon.bdbddc.com` DNS/HTTPS 연결은 완료했다. 검색 공개를 진행할 때 canonical/OG/사이트맵 및 검색 제외 해제를 함께 처리한다. 병원 의료진 페이지에서 개인 사이트로 연결하는 작업은 별도이며 병원 사이트는 수정하지 않았다.
