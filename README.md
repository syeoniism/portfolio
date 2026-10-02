# Seoyeon Kim — Portfolio

컴퓨터공학을 전공하며 경험한 프로젝트와 관심사를 담은 개인 포트폴리오 웹사이트입니다.  
웹·앱 개발부터 AI/ML, HCI, 컴퓨터 그래픽스까지 탐색해 온 과정을 소개합니다.

[포트폴리오 바로가기](https://syeoniism.github.io/portfolio/) · [GitHub 프로필](https://github.com/syeoniism)

## 주요 내용

- **About** — 관심 분야와 개발 경험 소개
- **Selected Projects** — BOOKUS와 Career Balance의 역할, 기능, 문제 해결 과정 정리
- **Project Timeline** — 2024년부터 진행한 웹, 앱, 데이터 분석, 하드웨어 프로젝트 기록
- **Contact** — 이메일과 소셜 채널 안내

## 대표 프로젝트

| 프로젝트 | 소개 | 담당 | 기술 |
| --- | --- | --- | --- |
| [BOOKUS](https://github.com/syeoniism/BOOKUS_android) | 머신러닝 독서 인증과 책 교환 흐름을 담은 독서 모임 Android 앱 | ML 모델, 프론트엔드, UI | Kotlin, Firebase, TensorFlow Lite |
| [Career Balance](https://github.com/syeoniism/career-balance) | 문서 작성과 커뮤니티를 연결한 취업 준비 웹 플랫폼 | 프론트엔드, 커뮤니티 기능, 시연 영상 | Node.js, Express, MySQL, JavaScript |

## 인터랙션

- 포인터에 반응하는 히어로 캔버스 애니메이션
- 스크롤 위치에 연동되는 섹션 내비게이션과 등장 효과
- 키보드와 스와이프를 지원하는 프로젝트 화면 캐러셀
- 프로젝트 상세 정보 및 타임라인 갤러리 토글
- 프로젝트 이미지를 크게 볼 수 있는 라이트박스
- `prefers-reduced-motion` 설정을 고려한 모션 처리

## 기술 구성

별도의 프레임워크나 빌드 과정 없이 HTML, CSS, JavaScript로 만든 정적 웹사이트입니다.

```text
.
├── index.html      # 페이지 콘텐츠와 구조
├── styles.css      # 반응형 레이아웃과 스타일
├── script.js       # 애니메이션 및 인터랙션
└── assets/         # 폰트, 프로젝트 이미지, PDF 자료
```

## 로컬에서 실행하기

저장소를 내려받은 뒤 `index.html`을 브라우저에서 열면 바로 확인할 수 있습니다.

```bash
git clone https://github.com/syeoniism/portfolio.git
cd portfolio
```

로컬 서버를 사용하려면 다음과 같이 실행할 수 있습니다.

```bash
python -m http.server 8000
```

이후 브라우저에서 `http://localhost:8000`으로 접속합니다.

## Contact

- Email: [seoyeon5442@pusan.ac.kr](mailto:seoyeon5442@pusan.ac.kr)
- GitHub: [@syeoniism](https://github.com/syeoniism)
- Blog: [blog.naver.com/padoobaq](https://blog.naver.com/padoobaq)

---

Designed and built by **Seoyeon Kim**.
