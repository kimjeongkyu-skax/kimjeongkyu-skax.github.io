// Project detail page: renders one entry of portfolioProjects (portfolio-data.js) chosen by ?id=
const L = {
  ko: {
    back: '← 프로젝트 목록', nav: '프로젝트', client: '고객사 / Domain', period: '수행 기간', story: '프로젝트 스토리', storyEmpty: '작성 예정', star: { situation: '배경', task: '과제', action: '해결 과정', test: 'PoC 테스트' },
    role: '업무 내용 및 담당 역할', outcome: '주요 성과', tools: '보유 및 활용 Skill', gallery: '관련 이미지', unavailable: '추가 확인 중',
    gPrev: '이전 이미지', gNext: '다음 이미지', prev: '← 이전 프로젝트', next: '다음 프로젝트 →', missing: '프로젝트를 찾을 수 없습니다.',
  },
  en: {
    back: '← All projects', nav: 'Projects', client: 'Customer / Domain', period: 'Period', story: 'Project story', storyEmpty: 'Coming soon', star: { situation: 'Situation', task: 'Task', action: 'Action', test: 'PoC test' },
    role: 'Work and responsibilities', outcome: 'Key results', tools: 'Skills used', gallery: 'Images', unavailable: 'Pending confirmation',
    gPrev: 'Previous image', gNext: 'Next image', prev: '← Previous project', next: 'Next project →', missing: 'Project not found.',
  },
};
let lang = 'ko';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'ko'; } catch {}
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pick = (o) => (o && typeof o === 'object' && !Array.isArray(o) ? o[lang] : o);
const FIELDS = ['client', 'period', 'story', 'role', 'outcome', 'tools'];
const id = new URLSearchParams(location.search).get('id');
const index = portfolioProjects.findIndex((p) => p.id === id);

const field = (key, value) => {
  const t = L[lang];
  let body;
  if (Array.isArray(value) && key === 'tools') body = `<ul class="tags">${value.map((v) => `<li>${esc(v)}</li>`).join('')}</ul>`;
  else if (Array.isArray(value)) body = esc(value.join(', '));
  else if (value && Array.isArray(pick(value))) body = `<ul class="duty-list">${pick(value).map((v) => `<li>${esc(v)}</li>`).join('')}</ul>`;
  else if (key === 'story') {
    const STAR = ['situation', 'task', 'action', 'test'];
    const rows = value && typeof value === 'object' && !('ko' in value)
      ? STAR.filter((k) => value[k] && pick(value[k])).map((k) => `<div class="star-row"><b>${t.star[k]}</b>${pick(value[k]).split('\n').map((x) => (/^\[.+\]$/.test(x) ? `<h5 class="star-sub">${esc(x.slice(1, -1))}</h5>` : `<p>${esc(x)}</p>`)).join('')}</div>`)
      : [];
    if (rows.length) body = `<div class="star">${rows.join('')}</div>`;
    else if (value && pick(value)) body = `<p class="story-text">${esc(pick(value))}</p>`;
    else return ''; // 스토리가 없으면 "프로젝트 스토리" 항목 자체를 숨긴다
  }
  else body = value ? esc(pick(value)) : t.unavailable;
  return `<div><dt>${t[key]}</dt><dd>${body}</dd></div>`;
};

// 갤러리 슬라이더: 스크롤 스냅 + 화살표 + 마우스 드래그(터치는 기본 스와이프)
const setupGallery = (captions) => {
  const g = $('.project-gallery'), prev = $('.g-prev'), next = $('.g-next'), cap = $('.gallery-caption'), count = $('.gallery-count');
  if (!g) return;
  const step = () => g.clientWidth;
  const update = () => {
    const more = g.scrollWidth > g.clientWidth + 4;
    prev.hidden = next.hidden = !more;
    prev.disabled = g.scrollLeft <= 2;
    next.disabled = g.scrollLeft >= g.scrollWidth - g.clientWidth - 2;
    // 현재 보이는 사진의 제목 표시
    const imgs = [...g.querySelectorAll('img')];
    const cur = imgs[Math.min(imgs.length - 1, Math.max(0, Math.round(g.scrollLeft / Math.max(1, g.clientWidth))))];
    const text = cur && captions ? pick(captions[Number(cur.dataset.name) - 1]) : '';
    cap.textContent = text || '';
    cap.hidden = !text;
    // 현재 사진 번호 (예: 3/9)
    count.textContent = `${imgs.indexOf(cur) + 1}/${imgs.length}`;
    count.hidden = imgs.length < 2;
  };
  prev.onclick = () => g.scrollBy({ left: -step(), behavior: 'smooth' });
  next.onclick = () => g.scrollBy({ left: step(), behavior: 'smooth' });
  g.addEventListener('scroll', update, { passive: true });
  g.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
  });
  g.tabIndex = 0;
  // 마우스 드래그
  let x0 = null, s0 = 0, moved = false, downImg = null;
  g.addEventListener('pointerdown', (e) => {
    downImg = e.target.closest('img'); // 포인터 캡처 후에는 click 대상이 g로 바뀌므로 미리 기억
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    x0 = e.clientX; s0 = g.scrollLeft; moved = false;
    g.setPointerCapture(e.pointerId);
  });
  g.addEventListener('pointermove', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    if (!moved && Math.abs(dx) < 4) return;
    moved = true; g.classList.add('dragging'); g.scrollLeft = s0 - dx;
  });
  const end = (e) => {
    if (x0 === null) return;
    const dx = (e && e.clientX !== undefined ? e.clientX : x0) - x0;
    x0 = null; g.classList.remove('dragging');
    if (!moved) return;
    // 조금만 끌어도(약 15%) 끈 방향의 다음 이미지로 넘긴다
    const base = Math.round(s0 / step());
    const to = Math.abs(dx) > step() * 0.15 ? base + (dx < 0 ? 1 : -1) : base;
    g.scrollTo({ left: Math.max(0, to) * step(), behavior: 'smooth' });
  };
  g.addEventListener('pointerup', end);
  g.addEventListener('pointercancel', end);
  g.addEventListener('dragstart', (e) => e.preventDefault());
  // 클릭(드래그 아님)하면 원본 크기로 새 탭에서 열기
  g.addEventListener('click', (e) => {
    if (moved) return;
    const img = e.target.closest('img') || downImg;
    if (img) window.open(img.currentSrc || img.src, '_blank', 'noopener');
  });
  // 이미지가 로드되거나 없는 이미지가 제거될 때 상태 갱신
  g.addEventListener('load', update, true);
  new MutationObserver(update).observe(g, { childList: true });
  window.addEventListener('resize', update);
  update();
};

const render = () => {
  const t = L[lang];
  document.documentElement.lang = lang;
  $('#back').textContent = t.back;
  $('#back-top').textContent = t.nav;
  document.querySelectorAll('.flag').forEach((b) => {
    const on = b.dataset.lang === lang;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
  if (index < 0) { $('#project').innerHTML = `<p>${t.missing}</p>`; return; }
  const p = portfolioProjects[index];
  document.title = `${pick(p.title)} | Kim Jeongkyu`;
  $('#project').innerHTML = `
    <div class="project-hero">${projectImg(p.id)}</div>
    <h1 class="project-title">${esc(pick(p.title))}</h1>
    <p class="project-lead">${esc(pick(p.overview))}</p>
    ${p.abbr ? `<p class="abbr-note">* ${esc(pick(p.abbr))}</p>` : ''}<dl class="definitions">${FIELDS.map((k) => field(k, p[k])).join('')}</dl>
    <div class="gallery-wrap">
      <div class="project-gallery" aria-label="${t.gallery}">${Array.from({ length: 12 }, (_, i) => i + 1).map((n) => projectImg(p.id, String(n), 'png,webp,jpg', 'hide').replace('loading="lazy"', 'loading="eager"')).join('')}</div>
      <button type="button" class="g-btn g-prev" aria-label="${t.gPrev}" hidden>‹</button>
      <button type="button" class="g-btn g-next" aria-label="${t.gNext}" hidden>›</button>
      <span class="gallery-count" aria-hidden="true" hidden></span>
      <p class="gallery-caption" aria-live="polite" hidden></p>
    </div>`;
  setupGallery(p.gallery);
};

// 화면 밝기 전환: 메인의 램프 줄과 같은 'theme' 값을 쓴다 (초기 적용은 project.html 의 head 스크립트)
// 아이콘은 CSS 가 바꾼다. 여기서는 읽어 주는 이름만 현재 언어와 상태에 맞춘다.
const themeBtn = $('#theme-btn');
const syncTheme = () => {
  if (!themeBtn) return;
  const dark = document.documentElement.dataset.theme === 'dark';
  themeBtn.setAttribute('aria-label', lang === 'en'
    ? (dark ? 'Switch to light mode' : 'Switch to dark mode')
    : (dark ? '밝게 전환' : '어둡게 전환'));
};
if (themeBtn) themeBtn.addEventListener('click', () => {
  const r = document.documentElement;
  r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', r.dataset.theme); } catch {}
  syncTheme();
});

document.querySelectorAll('.flag').forEach((b) => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  try { localStorage.setItem('lang', lang); } catch {}
  render();
  syncTheme();
}));
syncTheme();

render();
