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

`assets/portfolio.pdf` 가 덮어써진다 (현재 약 9페이지, 2MB 안팎).

## 3. 확인

- PDF 를 열어 페이지가 어색하게 잘리거나 빈 페이지가 없는지 본다.
- 기술 스택 카드, 프로젝트 카드, 경력 타임라인이 모두 나오는지 본다.

## 4. 배포

`assets/portfolio.pdf` 를 커밋하고 푸시한다 (GitHub Pages).
캐시 때문에 이전 파일이 보이면 `index.html` 의 링크에 `?v=날짜` 를 붙인다.

## 동작 방식과 주의점

- 헤드리스 Chromium 으로 `index.html` 을 열고 `print` 미디어로 PDF 를 만든다.
  PDF 모양은 `style.css` 맨 아래의 `@media print` 블록이 결정한다.
  - 숨기는 요소: 상단 메뉴, 버튼(`.cta`), 맨 위로 버튼, 줄 당기기, 언어 전환, 필터
  - 기술 스택 슬라이더(`.track`)는 여러 줄로 펼쳐서 출력
  - 카드는 페이지 중간에서 잘리지 않도록 `break-inside:avoid`
- 접혀 있는 `<details>` 는 스크립트가 미리 펼친다.
- **한국어 화면 기준**으로만 만든다. 영어판 PDF 는 따로 없다.
  영어판이 필요하면 스크립트에서 페이지 로드 후 `localStorage.lang = 'en'` 을 설정하고
  새로고침한 다음 출력 파일명을 달리하면 된다.
- 글자 크기는 `scale=0.72` 로 조절한다. 크면 값을 낮추고, 작으면 올린다.
- 사이트가 렌더링할 시간을 위해 로드 후 2.5초를 기다린다. 내용이 비면 이 값을 늘린다.
- 접속 환경에 따라 외부 폰트가 로드되지 않으면 PDF 글꼴이 달라질 수 있다.
