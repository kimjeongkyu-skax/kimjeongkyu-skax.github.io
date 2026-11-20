// Project detail page: renders one entry of portfolioProjects (portfolio-data.js) chosen by ?id=
const L = {
  ko: {
    back: '← 프로젝트 목록', nav: '프로젝트', client: '고객사 / Domain', period: '수행 기간',
    role: '업무 내용 및 담당 역할', outcome: '주요 성과', tools: '보유 및 활용 Skill', gallery: '관련 이미지', unavailable: '추가 확인 중',
    prev: '← 이전 프로젝트', next: '다음 프로젝트 →', missing: '프로젝트를 찾을 수 없습니다.',
  },
  en: {
    back: '← All projects', nav: 'Projects', client: 'Customer / Domain', period: 'Period',
    role: 'Work and responsibilities', outcome: 'Key results', tools: 'Skills used', gallery: 'Images', unavailable: 'Pending confirmation',
    prev: '← Previous project', next: 'Next project →', missing: 'Project not found.',
  },
};
let lang = 'ko';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'ko'; } catch {}
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pick = (o) => (o && typeof o === 'object' && !Array.isArray(o) ? o[lang] : o);
const FIELDS = ['client', 'period', 'role', 'outcome', 'tools'];
const id = new URLSearchParams(location.search).get('id');
const index = portfolioProjects.findIndex((p) => p.id === id);

const field = (key, value) => {
  const t = L[lang];
  let body;
  if (Array.isArray(value) && key === 'tools') body = `<ul class="tags">${value.map((v) => `<li>${esc(v)}</li>`).join('')}</ul>`;
  else if (Array.isArray(value)) body = esc(value.join(', '));
  else if (value && Array.isArray(pick(value))) body = `<ul class="duty-list">${pick(value).map((v) => `<li>${esc(v)}</li>`).join('')}</ul>`;
  else body = value ? esc(pick(value)) : t.unavailable;
  return `<div><dt>${t[key]}</dt><dd>${body}</dd></div>`;
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
  if (index < 0) { $('#project').innerHTML = `<p>${t.missing}</p>`; $('#pager').innerHTML = ''; return; }
  const p = portfolioProjects[index];
  document.title = `${pick(p.title)} | Kim Jeongkyu`;
  $('#project').innerHTML = `
    <div class="project-hero">${projectImg(p.id)}</div>
    <h1 class="project-title">${esc(pick(p.title))}</h1>
    <p class="project-lead">${esc(pick(p.overview))}</p>
    <dl class="definitions">${FIELDS.map((k) => field(k, p[k])).join('')}</dl>
    <div class="project-gallery" aria-label="${t.gallery}">${[1, 2, 3, 4, 5, 6].map((n) => projectImg(p.id, String(n), 'png,webp', 'hide')).join('')}</div>`;
  const prev = portfolioProjects[index - 1], next = portfolioProjects[index + 1];
  $('#pager').innerHTML =
    (prev ? `<a href="project.html?id=${esc(prev.id)}">${t.prev}</a>` : '<span></span>') +
    (next ? `<a href="project.html?id=${esc(next.id)}">${t.next}</a>` : '<span></span>');
};

document.querySelectorAll('.flag').forEach((b) => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  try { localStorage.setItem('lang', lang); } catch {}
  render();
}));
render();
