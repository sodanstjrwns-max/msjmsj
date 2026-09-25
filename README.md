# 치과의사 문석준 — 독립 개인 홈페이지

## 현재 상태

- 코드명 `webapp`, `/home/user/webapp`, Git `main`.
- 업데이트: 2026-09-25. 현재 버전은 브라운 디자인에 **사진 기반 스크롤 인사 시퀀스**를 추가했다.
- 미리보기: https://3000-izzaj9m15pt6fbzab9xou-de59bda9.sandbox.novita.ai/?v=3
- **정식 배포·도메인 연결은 하지 않았다.** 검색 제외 메타/헤더/robots.txt 유지. 이는 인증이 아니므로 주소를 아는 사람은 접근할 수 있다.
- Hono JSX/TypeScript, Vite, 자체 CSS/JS, Cloudflare Pages 호환. 사용자 데이터 저장 없음.

## 사용자 승인과 편집 원칙

사용자가 자신의 사진을 바탕으로 약 100도의 깊은 인사를 하는 영상을 만들고, 약 30컷으로 나눠 스크롤에 연결해 달라고 명시적으로 요청했다. 고품질 이미지·영상 모델 및 추가 크레딧 사용을 승인했다.

따라서 새 인사 장면은 **사용자 동의를 받은 사진 기반 AI 연출**이다. 실제 촬영된 인사 영상으로 설명하지 않는다. 첫 화면에 '실제 사진 기반 AI 인사 영상'을 표시하고 이미지 설명에도 명시했다. 원본 약력과 진료 관련 검증 기준은 유지하며, 임상 장면·환자 후기·성과를 생성하지 않았다.

## 제작된 미디어

### 원본 인물 사진

https://raw.githubusercontent.com/sodanstjrwns-max/bdbddc/main/images/doctors/moon-profile.webp

`public/static/moon-profile.webp`는 실제 촬영본(600×840). 기존 `moon-cutout.webp`는 비생성형 배경 분리본이다. 인물 소개 하단과 로딩 실패 대체에는 실제 원본을 유지했다.

### 시작·끝 이미지

- 모델: **GPT Image 2**, 2K 설정, 원본 인물 참조.
- 서 있는 자세: https://www.genspark.ai/api/files/s/OGBg8NIJ
- 깊이 숙인 자세: https://www.genspark.ai/api/files/s/BYQecfQR
- 실제 출력: 1296×1808.
- 로컬: `artifacts/moon-standing-reference.png`, `moon-bowed-reference.png`.
- 원본의 얼굴 특징과 의상을 참조해 팔을 내린 전신 자세 및 인사 자세를 생성했다. 전신/신발은 원본 상반신 사진 밖 영역을 AI로 확장한 것이다. 생체 동일성이나 픽셀 동일성을 보장하지 않는다.

### 인사 영상

- 모델: **Seedance 2.0**, standard 고품질, 1080p 요청, 시작·끝 프레임 지정, 무음.
- 최초 6초 영상은 숙임이 부족해 사용하지 않음: https://www.genspark.ai/api/files/s/9Nbqr0nd
- 채택한 깊은 인사 원본: https://www.genspark.ai/api/files/s/GncLhGte
- 실제 출력: 1248×1664, 24fps, 4.041667초. 모델의 1080p 요청 결과가 이 해상도로 반환됐다.
- 로컬 원본: `artifacts/moon-deep-bow-master.mp4`.
- 약 0~2.5초의 하강 동작을 사용하고 복귀는 역순 편집했다. 같은 시작 얼굴·자세로 돌아오도록 설계.
- 약 5초의 최종 양방향 영상: `artifacts/moon-greeting-final.mp4`.
- 다운로드: https://www.genspark.ai/api/files/s/wnoqlxOy
- 영상은 기술적으로 정확한 100도 각도 측정을 보장하지 않는다. 정면 영상에서 깊은 허리 인사와 무릎 쪽으로 내려가는 머리, 고정된 발·카메라를 확인했다.
- 고품질 미디어 검수에서 심각한 형태 왜곡·하드 컷은 발견하지 못했다. 역재생 복귀에는 옷 주름 움직임이 실제 정방향 촬영과 조금 다를 수 있다는 한계가 있다. 본인의 얼굴·말투·인사 방식 최종 승인이 필요하다.

## 스크롤 구현과 최적화

- 경로: `/static/greeting/v1/{desktop|mobile}/frame-00.webp` ~ `frame-29.webp`.
- **고유 프레임 30장**을 하강·복귀에 양방향 사용. 별도의 복귀 프레임 다운로드 없음.
- 데스크톱: 810×1080 RGBA WebP, 전체 1,029,110바이트(약 1.03MB).
- 모바일: 432×576 RGBA WebP, 전체 454,808바이트(약 455KB).
- 원본 배경과 연결된 갈색 영역만 비생성형 매트 처리하여 웹의 비디 갈색에 자연스럽게 합성. 네 가지 주요 자세의 손·피부·신발·가장자리 검수 완료.
- 브라우저는 선택한 해상도 한 종류만 로드하고 동시 요청 4개로 제한한다. 시작/가장 깊은 인사/중간 자세부터 로드한다.
- Canvas + requestAnimationFrame, CSS sticky. 휠·터치 이벤트를 막거나 강제 스크롤하지 않는다.
- 진행률 0~6% 서기, 6~47% 숙임, 47~56% 잠깐 멈춤, 56~94% 복귀, 이후 서기. 마지막에 '충분히 듣습니다'가 나타난다.
- 스크롤을 멈추면 프레임도 정지. 위로 스크롤하면 해당 자세로 되감김.
- 인사 건너뛰기, 모션 끄기/켜기 제공. 끌 때 시퀀스를 접으면서 읽는 위치가 갑자기 아래로 튀지 않도록 처리.
- prefers-reduced-motion 환경에서는 정지 이미지와 최종 문장을 표시하고 시퀀스를 다운로드하지 않는다. 데이터 절약 모드에서는 기본 정지, 사용자가 켤 수 있다.
- 실패한 프레임은 한 번 재시도. 시작 프레임 실패 시 실제 원본 사진으로 대체하고 긴 고정 구간을 제거한다. 다른 프레임이 끝내 실패해도 정지 화면으로 전환한다.
- 모바일에서 인물 발끝과 컨트롤이 겹치지 않도록 별도 높이 계산 적용.
- 브라우저에서 AI API를 호출하거나 영상 처리하지 않는다. 공개 시 별도 모델 API 키 필요 없음.

프레임 제작을 재현하려면 개발 환경에서 다음을 실행한다(Cloudflare 런타임에서 실행하지 않음):

```sh
cd /home/user/webapp
python3 scripts/build-greeting.py
```

필요 도구: ffmpeg, Python Pillow/numpy/scipy. `public/static/greeting/v1/manifest.json`에 원본 프레임 번호, 크기와 용량이 기록된다. 최대 약 105MB의 데스크톱 디코딩 이미지 메모리, 모바일 약 30MB를 사용하므로 대량의 추가 프레임을 무조건 늘리지 않는다.

## 디자인과 나머지 사이트

비디 공식 CSS `https://bdbddc.com/css/site-v5.css`에서 확인한 갈색 `#6B4226`, 보조색 `#8B6344`, `#4A2E1A`를 중심으로 구성. 딥 브라운 `#281B14`, 밝은 종이색과 구릿빛을 사용한다. 첫 화면의 움직이는 인물과 문장을 중심으로, 아래에는 비대칭 글·영상, 넓은 저술 목록, 어두운 소개, 원형 진료 안내가 이어진다.

| 경로 | 내용 |
| --- | --- |
| `/`, `/#greeting` | 스크롤 인사 |
| `/#opening-title` | 인사 건너뛰기 목적지, 대화의 시작 |
| `/#approach` | 경청·이해·선택 질문 탭 |
| `/#records` | 실제 소개 영상 1개, 칼럼 1편, 책 2권; 유형 필터 |
| `/#about` | 약력 및 접힌 운영 관련 저술 |
| `/#visit` | 서울비디치과 예약 및 위치·이용 안내 |
| `/robots.txt` | 검색 제외 요청 |

질문 탭은 방향키/Home/End와 ARIA를 지원한다. 모바일 메뉴에는 Escape·외부 클릭 닫기가 있다. 외부 링크는 새 탭을 알리고 noopener noreferrer를 사용한다. YouTube 플레이어는 클릭 후 삽입하며 최초 방문에는 외부 요청이 없다. 개인 예약/문의 폼, 가입·결제·추적 기능은 없다.

## 실제 정보 출처와 공개 범위

- 공식 약력: https://bdbddc.com/doctors/moon
  - 치과의사 문석준, 서울비디치과 대표원장, 서울대학교 치의학과, 서울대학교 치의학대학원 석사, 임플란트·정밀 진단 관심 분야. 학위 원본 대조는 하지 않았고 상충하는 전문의 자격은 제외.
- 기존 소개 영상: https://www.youtube.com/watch?v=JV7JDndC3ug
  - 실제 썸네일 https://i.ytimg.com/vi/JV7JDndC3ug/maxresdefault.jpg 를 축소한 `intro-video.webp`. 이번 생성 인사 영상과는 별개다.
- 칼럼: https://bdbddc.com/column/implant-cost-comparison
  - 실제 제목과 문석준 저자 표기 확인. 환자 일화·성공률·보장·법률 주장을 옮기지 않고 짧은 소개와 원문 링크만 제공.
- 《쉽디쉬운 임플란트 이야기》, 2023, 단독 저서: https://product.kyobobook.co.kr/detail/S000201305749
- 《쉽디쉬운 치과 이야기》, 2022, 공저: https://product.kyobobook.co.kr/detail/S000200319528
- 《개원 5년, 연 매출 100억 원을 만든 질문들》, 2025, 단독 저서: https://product.kyobobook.co.kr/detail/S000218133454
  - 공식 프로필/사용자 자료에 근거. 마지막 책은 하단 접힘 영역. 제목의 매출을 현재 실적으로 주장하지 않음. 가상 책 표지 없음.
- 외부 채널: https://brunch.co.kr/@writertbtu 및 https://www.youtube.com/@%EC%A7%84%EC%A0%95%EC%9E%84%ED%94%8C%EB%9E%80%ED%8A%B8%EB%AC%B8%EC%84%9D%EC%A4%80
- 병원 연결: https://bdbddc.com/reservation?doctor=moon 및 https://bdbddc.com

'충분히 듣습니다'는 본인의 직접 정정 표현. 나머지 문구는 제공된 초안에 근거해 새로 쓴 홈페이지 문안이며 실제 인터뷰 발췌로 표시하지 않는다. 새 인사 문구 '반갑습니다. 문석준입니다', '인사를 건네고, 당신의 이야기를 듣겠습니다'도 검토 대상이다.

전문의 자격, 공식 영문 이름, 가족·어린 시절 일화, 경력 연수, 실적·후기·수상, 미출간 원고, 미확인 서비스 기능·가격·연락처는 계속 제외한다.

## 검증

`npm test`: **19개 통과**.

- 320~1920px 8개 너비 가로 넘침·제목·탭 검사.
- 390/1440px에서 30프레임 로드, 0→29→0, 정방향·역방향, 동일 시작/종료 Canvas 픽셀, 추가 네트워크 없이 되감김 확인.
- sticky 위치 유지, 모션 껐다 켜기, 건너뛰기 동작.
- 움직임 감소 환경에서 첫 프레임만 요청, 전체 시퀀스 미요청.
- 첫 프레임 네트워크 실패 시 실제 사진 대체, 스크롤 고정 제거.
- 기존 메뉴·탭·필터·원본 YouTube 연결 및 JS 비활성 본문 유지.
- axe WCAG A/AA: 390/1440px 움직임 감소 환경 위반 0. 추가로 정상 모션의 시작/가장 깊은 인사/복귀 상태 각각에서도 위반 0 확인.
- 이는 모든 브라우저·실기기·보조기기의 수동 인증을 뜻하지 않는다. 실제 iPhone/Android에서 최종 체감 검토 권장.
- 기존 YouTube 영상은 자동화 브라우저에서 로그인 확인을 요구할 수 있다. 이번 자체 서빙 인사에는 해당 제한이 없다.

`artifacts/greeting-{desktop|mobile}-{start|bow|end}.png`는 최신 실제 캡처. `greeting-sequence-overview.jpg`는 3단계 합본. `website-scroll-demo.mp4`는 실제 미리보기 조작 녹화. 기존 `desktop-full.png` 등은 이전 브라운 시안 기록이며 현재 첫 화면의 증거로 사용하지 않는다.

## 실행·유지보수·공개 전 작업

```sh
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
curl http://localhost:3000
npm test
```

이미 실행 중인 서버를 중복 시작하지 않는다. 재시작 시 PM2 정지, 포트 3000 확인, 빌드, PM2 재시작 순서. 로그는 `pm2 logs webapp --nostream`.

글꼴은 Pretendard v1.3.9 부분집합이며 내부/CSS 이름은 MoonSans, OFL은 `/static/font-license.txt`. 새 한글 문안 추가 시 부분집합 갱신.

공개 전: 본인 얼굴·동작·문안 채택 승인, 생성 인사 사용 범위, 대표 콘텐츠와 저술 노출 검토. 의료 자격·약력 증빙은 별도. 이후 배포 경로와 도메인을 선택하고 DNS/HTTPS, canonical/OG/사이트맵, 검색 제외 해제를 진행한다. 서울비디치과 의료진 페이지에서 개인 사이트로 연결하는 작업은 병원 운영 측 별도 반영이며 아직 수정하지 않았다.
