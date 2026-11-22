# 포트폴리오 PDF 다시 만들기

사이트의 "포트폴리오 다운로드 ↗" 버튼은 `assets/portfolio.pdf` 를 내려받는다.
이 파일은 **사이트의 스냅샷**이라서, 사이트 내용을 바꾸면 자동으로 갱신되지 않는다.
내용(소개 문구, 프로젝트, 경력, 논문 등)을 수정한 뒤에는 아래 순서로 다시 만든다.

## 1. 최초 1회: 환경 준비

```bash
python3 -m venv .venv-pdf
.venv-pdf/bin/pip install playwright
.venv-pdf/bin/playwright install chromium
```

`.venv-pdf/` 는 커밋하지 않는다 (`.gitignore` 에 추가할 것).

## 2. PDF 생성

```bash
.venv-pdf/bin/python scripts/build_portfolio_pdf.py
```

`assets/portfolio.pdf` 가 덮어써진다 (현재 8페이지, 5.5MB 안팎).

## 3. 확인

아래 "출력 후 확인할 것" 을 본다.

## 4. 배포

`assets/portfolio.pdf` 를 커밋하고 푸시한다 (GitHub Pages).
캐시 때문에 이전 파일이 보이면 `index.html` 의 링크에 `?v=날짜` 를 붙인다.

## 출력 후 확인할 것

- 기술 스택 7개 카드(Languages, Frontend, DB, Cloud & Container, AI,
  Workflow & Observation, Developer Tools)의 로고가 모두 **컬러**인지.
  스크립트가 `.sk-card` 에 `on` 을 붙여 색을 고정하므로 회색이면 그 줄이 동작하지 않은 것이다.
- 타임라인(주요 이력)의 프로젝트 사진이 **빈칸이 아닌지**.
  사이트는 `loading="lazy"` 를 쓰기 때문에, 스크립트가 페이지를 끝까지 훑어
  모든 사진을 불러온 뒤 출력한다. 빈칸이 보이면 이 과정이 실패한 것이다.
- 빈 페이지나, 제목만 남고 내용이 다음 페이지로 넘어간 곳이 없는지.

## 동작 방식과 주의점

- 헤드리스 Chromium 으로 `index.html` 을 열고 `print` 미디어로 PDF 를 만든다.
  PDF 모양은 `style.css` 의 `@media print` 블록이 결정한다.
  - 숨기는 요소: 상단 메뉴, 버튼(`.cta`), 맨 위로 버튼, 줄 당기기, 언어 전환,
    필터(`.filters`), 섹션 라벨(`section > .chip`)
  - 섹션 라벨(chip)은 혼자 이전 페이지 끝에 남는 일이 생겨서 숨긴다. 의미는 h2 제목이 담는다.
  - 대표 작업 카드 그리드는 Chromium 에서 쪼개지지 않고 통째로 다음 페이지로 밀린다.
    그래서 `#projects .title{break-before:page}` 로 제목부터 새 페이지에서 시작시킨다.
  - 긴 경력 카드(`.tl-card`)는 쪼개지게 두고, 안쪽의 작은 덩어리(`.tl-project`, `.tl-sub`)만 묶는다.
    카드 전체를 묶으면 한 페이지에 안 들어갈 때 통째로 밀려 큰 공백이 생긴다.
- 스크립트가 출력 전에 하는 일
  - 접혀 있는 `<details>` 를 모두 펼친다 (headless 에서는 `beforeprint` 가 불안정).
  - 기술 스택 카드에 `on` 을 붙여 로고 색을 고정한다.
  - 테마를 `light` 로 고정한다. 다크 모드로 출력하지 않는다.
  - 모든 `img` 를 `eager` 로 바꾸고 페이지를 한 화면씩 끝까지 스크롤해 사진을 전부 불러온 뒤,
    `document.images` 가 모두 `complete` 가 될 때까지 기다린다.
- **한국어 화면 기준**으로만 만든다. 영어판 PDF 는 따로 없다.
  영어판이 필요하면 스크립트에서 페이지 로드 후 `localStorage.lang = 'en'` 을 설정하고
  새로고침한 다음 출력 파일명을 달리하면 된다.
- 글자 크기는 `scale=0.68` 로 조절한다. 크면 값을 낮추고, 작으면 올린다.
  값을 바꾸면 페이지 수와 쪽 나눔이 함께 달라지므로 출력 후 다시 확인한다.
- 사이트가 렌더링할 시간을 위해 로드 후 2.5초를 기다린다. 내용이 비면 이 값을 늘린다.
- 접속 환경에 따라 외부 폰트가 로드되지 않으면 PDF 글꼴이 달라질 수 있다.
