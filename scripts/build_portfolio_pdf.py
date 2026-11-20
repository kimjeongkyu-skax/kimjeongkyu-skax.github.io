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
    page.emulate_media(media="print")  # style.css 의 @media print 규칙 적용
    page.pdf(
        path=str(OUT),
        format="A4",
        margin={"top": "10mm", "bottom": "10mm", "left": "8mm", "right": "8mm"},
        print_background=True,
        scale=0.72,
    )
    browser.close()

print(f"saved: {OUT} ({OUT.stat().st_size / 1024 / 1024:.1f} MB)")
