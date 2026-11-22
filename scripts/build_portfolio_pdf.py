"""포트폴리오 사이트를 assets/portfolio.pdf 로 만든다.

사용법은 PDF.md 참고.
    python scripts/build_portfolio_pdf.py
"""
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SRC = (ROOT / "index.html").as_uri()
OUT = ROOT / "assets" / "portfolio.pdf"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1000, "height": 900})
    page.goto(SRC)
    page.wait_for_timeout(2500)  # script.js 가 프로젝트/기술/이력을 그릴 시간
    # 접혀 있는 "프로젝트 상세"를 모두 펼친다 (headless 에서는 beforeprint 가 불안정)
    page.evaluate("document.querySelectorAll('details').forEach(d => d.open = true)")
    # 기술 스택 카드를 모두 ON 으로 고정한다 (마우스가 없으면 로고가 회색으로 나온다)
    page.evaluate("document.querySelectorAll('.sk-card').forEach(c => c.classList.add('on'))")
    # 라이트 화면 기준으로 출력한다
    page.evaluate("document.documentElement.dataset.theme = 'light'")
    page.wait_for_timeout(300)  # 클래스 변경이 반영될 시간
    # loading="lazy" 사진은 화면에 보이지 않으면 로드되지 않아 PDF 에서 빈칸으로 나온다.
    # eager 로 바꾸고 페이지를 한 번 훑어 모든 사진을 불러온 뒤 로드 완료를 기다린다.
    page.evaluate("document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; })")
    page.evaluate("""() => new Promise((done) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 80);
        else { window.scrollTo(0, 0); done(); }
      };
      step();
    })""")
    page.wait_for_function(
        "Array.from(document.images).every(i => i.complete)", timeout=60000
    )
    page.emulate_media(media="print")  # style.css 의 @media print 규칙 적용
    page.pdf(
        path=str(OUT),
        format="A4",
        margin={"top": "10mm", "bottom": "10mm", "left": "8mm", "right": "8mm"},
        print_background=True,
        scale=0.68,
    )
    browser.close()

print(f"saved: {OUT} ({OUT.stat().st_size / 1024 / 1024:.1f} MB)")
