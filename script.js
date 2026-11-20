const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// ---- 내용은 여기서 본인 것으로 바꾸세요 (ko / en 둘 다) ----
const I18N = {
  ko: {
    title: '김정규 | 포트폴리오',
    'nav.home': '홈', 'nav.projects': '프로젝트', 'nav.skills': '기술', 'nav.about': '소개', 'nav.cv': '이력서', 'nav.contact': '연락',
    cord: '줄을\n당기세요!',
    'hero.chip': 'AI ENGINEERING, DATA ENGINEERING', 'hero.name': '김정규', 'hero.title': '복잡한 현장의 문제를 이해하고, 기술로 해결하는 엔지니어.',
    'hero.lead': '컴퓨터공학 석사로 약 5년간 바이오 데이터 파이프라인과 백엔드 시스템을 개발하고 운영해 왔습니다. AWS 기반 AI Gateway 구축 경험을 바탕으로 AI Agent와 기업 업무 자동화로 전문성을 확장하고 있습니다.',
    'hero.stack': '기술 스택', 'hero.know': '나를 알아보기 ↘', 'hero.cv': '이력서 다운로드 ↗',
    'hero.hlTitle': '약 5년의 경력', 'hero.hlText': '바이오 데이터 파이프라인과 백엔드 시스템을 개발하고 운영했습니다.',
    'hero.focus': '데이터 & AI 엔지니어링', 'hero.focusSub': 'Data Pipeline, AWS, AI Agent', 'hero.role': 'AI, AX Engineering',
    'proj.chip': '대표 작업', 'proj.title': '대표 프로젝트', 'proj.details': '프로젝트 상세', 'proj.demo': '데모',
    'skills.chip': '기술 스택 & 도구', 'skills.title': '실무에서 다루는 기술',
    'skills.note': '실무 개발, 운영, 직접 구현, 학습 및 검토 경험을 표시했습니다.',
    'skills.hint': '화살표, 키보드, 스와이프, 마우스 드래그로 넘겨볼 수 있습니다.',
    'auto.on': '자동 스크롤 켜짐', 'auto.off': '자동 스크롤 꺼짐', pause: '❚❚ 일시정지', play: '▶ 재생',
    'cat.all': '전체', 'level.production': '실무 개발, 운영했습니다', 'level.implemented': '직접 구현했습니다', 'level.exploring': '학습 및 검토했습니다',
    'nav.cases': '문제 해결', 'nav.ax': 'AI / AX', 'cases.title': '기술 문제 해결 사례', 'ax.title': 'AI Agent와 엔터프라이즈 AX',
    'project.close': '닫기', 'project.overview': '프로젝트 개요', 'project.problem': '문제', 'project.role': '담당 범위',
    'project.architecture': '시스템 아키텍처', 'project.implementation': '구현 및 해결', 'project.validation': '검증',
    'project.outcome': '결과', 'project.tools': '기술 스택', 'project.connection': 'SK AX 직무 연결',
    'case.investigation': '조사', 'case.decision': '판단', 'unavailable': '추가 확인 중',
    'about.summary': '연구 및 분석 업무에서 요구하는 데이터 품질을 운영 시스템에 반영해 왔습니다. 파이프라인 개발과 결과 검증부터 외부 기관 연동, 병원 현장 장애 대응, AWS 기반 AI 도구 도입까지 경험했습니다.',
    'about.chip': '경력 & 학력', 'about.title': '주요 이력',
    'tab.all': '전체', 'tab.exp': '경력', 'tab.edu': '학력', 'kind.exp': '경력', 'kind.edu': '학력', 'tab.pub': '해외 논문', 'kind.pub': '해외 논문', 'tab.award': '수상', 'kind.award': '수상', 'tab.conf': '학술대회', 'kind.conf': '학술대회 논문 및 발표',
    'contact.chip': '연락처', 'contact.title': '함께 이야기해 보세요',
    'form.title': '메시지 보내기', 'form.req': '모든 항목은 필수입니다.',
    'f.name': '이름', 'f.nameHelp': '어떻게 불러 드리면 될까요?',
    'f.email': '이메일', 'f.emailHelp': '답장을 보낼 주소로 사용합니다.',
    'f.msg': '메시지', 'f.msgHelp': '어떤 일을 하고 계신지 간단히 알려 주세요.', 'f.send': '메시지 보내기',
    'err.name': '이름을 입력해 주세요.', 'err.email': '올바른 이메일 주소를 입력해 주세요.', 'err.msg': '메시지를 입력해 주세요.',
    direct: '연락 채널', 'direct.sub': '이메일로 연락하실 수 있습니다.',
    'ch.email': '이메일', 'ch.emailSub': '메일 보내기', 'ch.inSub': '프로필 열기', domains: '주요 기술 분야',
    'st.err': '모든 항목을 올바르게 입력해 주세요.', 'st.sending': '전송 중...', 'st.sent': '메시지가 전송되었습니다. 감사합니다!',
    'st.fail': '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'st.nokey': '문의 양식 준비 중입니다. 이메일 링크를 이용해 주세요.',
    foot: '© 2026 김정규',
  },
  en: {
    title: 'Kim Jeongkyu | Portfolio',
    'nav.home': 'Home', 'nav.projects': 'Projects', 'nav.skills': 'Skills', 'nav.about': 'About Me', 'nav.cv': 'Resume', 'nav.contact': 'Contact',
    cord: 'Pull the\ncord!',
    'hero.chip': 'AI ENGINEERING, DATA ENGINEERING', 'hero.name': 'Kim Jeongkyu', 'hero.title': 'An engineer who understands complex on-site problems and solves them with technology.',
    'hero.lead': 'I hold a master’s degree in Computer Science and have nearly five years of experience building and operating bioinformatics pipelines and backend systems. My work building an AWS AI Gateway is a foundation for developing AI agents and enterprise automation.',
    'hero.stack': 'Tech Stack', 'hero.know': 'Know Me ↘', 'hero.cv': 'Download CV ↗',
    'hero.hlTitle': 'Nearly 5 years of experience', 'hero.hlText': 'Building and operating bioinformatics data pipelines and backend systems.',
    'hero.focus': 'Data & AI Engineering', 'hero.focusSub': 'Data Pipeline, AWS, AI Agent', 'hero.role': 'AI, AX Engineering',
    'proj.chip': 'SELECTED WORK', 'proj.title': 'Featured projects', 'proj.details': 'Project details', 'proj.demo': 'Demo',
    'skills.chip': 'TECHNICAL STACK & TOOLING', 'skills.title': 'Technologies I Work With',
    'skills.note': 'Production work, hands-on implementation, and areas of exploration.',
    'skills.hint': 'Use the arrow controls, keyboard, swipe, or drag with the mouse to browse.',
    'auto.on': 'Auto-scroll on', 'auto.off': 'Auto-scroll off', pause: '❚❚ Pause', play: '▶ Play',
    'cat.all': 'All', 'level.production': 'Production', 'level.implemented': 'Implemented', 'level.exploring': 'Exploring',
    'nav.cases': 'Case studies', 'nav.ax': 'AI / AX', 'cases.title': 'Engineering case studies', 'ax.title': 'AI agents and enterprise AX',
    'project.close': 'Close', 'project.overview': 'Overview', 'project.problem': 'Problem', 'project.role': 'My role',
    'project.architecture': 'System architecture', 'project.implementation': 'Implementation', 'project.validation': 'Validation',
    'project.outcome': 'Outcome', 'project.tools': 'Technology', 'project.connection': 'Relevance to SK AX',
    'case.investigation': 'Investigation', 'case.decision': 'Decision', 'unavailable': 'Pending confirmation',
    'about.summary': 'I have built systems that meet the data quality needs of research and analysis. My work spans pipeline development, output validation, integration with external partners, hospital-site troubleshooting, and AI tool adoption on AWS.',
    'about.chip': 'EXPERIENCE & EDUCATION', 'about.title': 'Professional Milestones',
    'tab.all': 'All', 'tab.exp': 'Experience', 'tab.edu': 'Education', 'kind.exp': 'Experience', 'kind.edu': 'Education', 'tab.pub': 'International Papers', 'kind.pub': 'International paper', 'tab.award': 'Awards', 'kind.award': 'Award', 'tab.conf': 'Conferences', 'kind.conf': 'Conference paper',
    'contact.chip': 'CONTACT', 'contact.title': 'Let’s talk',
    'form.title': 'Send a message', 'form.req': 'All fields are required.',
    'f.name': 'Name', 'f.nameHelp': 'How should I address you?',
    'f.email': 'Email', 'f.emailHelp': "I'll use this address to reply.",
    'f.msg': 'Message', 'f.msgHelp': "Briefly tell me what you're working on.", 'f.send': 'Send message',
    'err.name': 'Enter your name.', 'err.email': 'Enter a valid email address.', 'err.msg': 'Enter a message.',
    direct: 'Direct Channels', 'direct.sub': 'You can reach me by email.',
    'ch.email': 'Email', 'ch.emailSub': 'Write me a message', 'ch.inSub': 'Open profile', domains: 'Areas of Focus',
    'st.err': 'Please fill in every field correctly.', 'st.sending': 'Sending...', 'st.sent': 'Your message was sent. Thank you!',
    'st.fail': 'Sending failed. Please try again in a moment.', 'st.nokey': 'The form is unavailable. Please use the email link.',
    foot: '© 2026 Kim Jeongkyu',
  },
};

// theme
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem('theme') || 'light'; } catch { root.dataset.theme = 'light'; }
const toggle = () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
};

// language
let lang = 'ko';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'ko'; } catch {}
const tr = (k) => I18N[lang][k];
const pick = (o) => o[lang];

// pull the cord
const cord = $('#cord'), rope = $('#rope'), knob = $('#knob');
const AX = 40, REST_Y = 176, PULL_AT = 36, MAX_PULL = 90;
const p = { x: AX, y: REST_Y, vx: 0, vy: 0 };
let dragging = false, raf = null, grab = null;

const draw = () => {
  // 줄이 손잡이 쪽으로 늘어지며 휘도록 제어점을 어긋나게 둔다
  const dx = p.x - AX, dy = p.y - REST_Y;
  const c1x = AX + dx * 0.15, c1y = p.y * 0.4;
  const c2x = p.x - dx * 0.55 + p.vx * 1.5, c2y = p.y * 0.72 - dy * 0.1;
  rope.setAttribute('d', `M${AX} 0 C${c1x} ${c1y} ${c2x} ${c2y} ${p.x} ${p.y}`);
  // 손잡이는 줄이 끝나는 방향으로 기울어져 매달린다
  const tilt = Math.atan2(-(p.x - c2x), p.y - c2y) * 180 / Math.PI;
  knob.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${tilt})`);
};

const settle = () => {
  if (dragging) return;
  // 스프링 + 감쇠: 놓으면 출렁이다 제자리로 돌아온다
  p.vx += (AX - p.x) * 0.1; p.vy += (REST_Y - p.y) * 0.1;
  p.vx *= 0.84; p.vy *= 0.84;
  p.x += p.vx; p.y += p.vy;
  draw();
  const still = Math.abs(p.vx) + Math.abs(p.vy) < 0.05 && Math.abs(p.x - AX) + Math.abs(p.y - REST_Y) < 0.3;
  if (still) { p.x = AX; p.y = REST_Y; draw(); raf = null; } else raf = requestAnimationFrame(settle);
};
const release = () => { if (!raf) raf = requestAnimationFrame(settle); };

const svgPoint = (e) => {
  const r = cord.getBoundingClientRect();
  return { x: (e.clientX - r.left) * (80 / r.width), y: (e.clientY - r.top) * (300 / r.height) };
};
const follow = (e) => {
  const pt = svgPoint(e);
  let dx = pt.x - AX - grab.x, dy = pt.y - REST_Y - grab.y;
  dy = Math.max(-10, Math.min(MAX_PULL, dy));
  // 당길수록 저항이 생기는 느낌
  const rubber = (v, lim) => lim * Math.tanh(v / lim);
  p.vx = rubber(dx, 38) + AX - p.x; p.vy = 0;
  p.x = AX + rubber(dx, 38);
  p.y = REST_Y + dy;
  draw();
};

knob.addEventListener('pointerdown', (e) => {
  dragging = true; cord.setPointerCapture(e.pointerId);
  if (raf) { cancelAnimationFrame(raf); raf = null; }
  const pt = svgPoint(e);
  grab = { x: pt.x - p.x, y: pt.y - p.y };
});
cord.addEventListener('pointermove', (e) => { if (dragging) follow(e); });
const drop = () => {
  if (!dragging) return;
  dragging = false;
  if (p.y - REST_Y > PULL_AT) toggle();   // 충분히 당겼을 때만 스위치 동작
  release();
};
cord.addEventListener('pointerup', drop);
cord.addEventListener('pointercancel', drop);

// 키보드: 엔터/스페이스로도 당길 수 있다
cord.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  e.preventDefault();
  p.y = REST_Y + 60; p.vy = 0; draw(); toggle(); release();
});
draw();

// mobile menu
const burger = $('#burger'), menu = $('#menu');
const setMenu = (open) => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// active nav link
const links = $$('#menu a');
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-40% 0px -55% 0px' });
$$('main section').forEach((s) => io.observe(s));

// Projects and case studies share their source facts.
const projectDialog = $('#projectDialog');
const projectFields = ['overview', 'problem', 'role', 'architecture', 'implementation', 'validation', 'outcome', 'tools', 'connection'];
const fieldText = (value) => Array.isArray(value) ? value.join(', ') : value && pick(value);
const definition = (label, value, flow = false) => {
  const content = flow && value
    ? `<ol class="process-flow">${value.map((step) => `<li>${pick(step)}</li>`).join('')}</ol>`
    : fieldText(value) || tr('unavailable');
  return `<div><dt>${label}</dt><dd>${content}</dd></div>`;
};

const drawProjects = () => {
  $('#projectGrid').innerHTML = portfolioProjects.filter((p) => p.featured).map((project) =>
    `<article class="card"><a class="project-media" href="project.html?id=${project.id}" aria-label="${pick(project.title)}">${projectImg(project.id)}<span class="project-media-overlay" aria-hidden="true">↗</span></a>
      <h3>${pick(project.title)}</h3><p>${pick(project.overview)}</p>
      ${project.tools && project.tools.length ? `<ul class="tags">${project.tools.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}
      <div class="card-foot"><a class="btn soft" href="project.html?id=${project.id}">${tr('proj.details')} ↗</a></div></article>`).join('');
};

const drawProjectDetail = (project) => {
  $('#projectTitle').textContent = pick(project.title);
  $('#projectDetail').innerHTML = projectFields.map((key) => definition(tr('project.' + key), project[key], key === 'architecture')).join('');
};

$('#projectGrid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  drawProjectDetail(portfolioProjects.find((project) => project.id === button.dataset.project));
  projectDialog.showModal();
});

// skills carousel + category filter
const track = $('#track');
const cats = ['all', ...new Set(skills.map((s) => s.c))];
let cat = 'all', idx = 0, paused = true;
const visible = () => skills.filter((s) => cat === 'all' || s.c === cat);
const step = 266;
const trackWrap = $('.track-wrap');
const maxOffset = () => Math.max(0, track.scrollWidth - trackWrap.clientWidth);
const max = () => Math.ceil(maxOffset() / step);
const go = (i) => {
  idx = i > max() ? 0 : i < 0 ? max() : i;
  pos = Math.min(idx * step, maxOffset());
  track.style.transition = '';
  track.style.transform = `translateX(${-pos}px)`;
};
// smooth auto-scroll: slow continuous drift, reverses at the ends
let pos = 0, dir = 1, last = 0, hover = false;
const drift = (t) => {
  const dt = Math.min(t - (last || t), 50);
  last = t;
  if (!paused && !hover && maxOffset() > 0) {
    pos += dir * dt * 0.03;
    if (pos >= maxOffset()) { pos = maxOffset(); dir = -1; }
    if (pos <= 0) { pos = 0; dir = 1; }
    idx = Math.round(pos / step);
    track.style.transition = 'none';
    track.style.transform = `translateX(${-pos}px)`;
  }
  requestAnimationFrame(drift);
};
requestAnimationFrame(drift);
trackWrap.addEventListener('pointerenter', () => { hover = true; });
trackWrap.addEventListener('pointerleave', () => { hover = false; });
const drawSkills = () => {
  track.innerHTML = visible().map((s) => `<div class="skill"><img class="tool-logo" src="assets/tools/${s.icon}.svg" alt="" loading="lazy"><small>${pick(skillGroups[s.c])}, ${tr('level.' + s.level)}</small><h3>${s.n}</h3><p>${pick(s.d)}</p></div>`).join('');
  $('#filters').innerHTML = cats.map((c) => {
    const n = c === 'all' ? skills.length : skills.filter((s) => s.c === c).length;
    return `<button class="${c === cat ? 'active' : ''}" data-c="${c}" aria-pressed="${c === cat}">${c === 'all' ? tr('cat.all') : pick(skillGroups[c])} (${n})</button>`;
  }).join('');
  go(0);
};
const drawCtrl = () => {
  $('#pause').textContent = paused ? tr('play') : tr('pause');
  $('#autoLabel').textContent = paused ? tr('auto.off') : tr('auto.on');
};
$('#filters').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (b) { cat = b.dataset.c; drawSkills(); $('#filters button.active').focus(); }
});
window.addEventListener('resize', () => go(Math.min(idx, max())));
$('#next').onclick = () => go(idx + 1);
$('#prev').onclick = () => go(idx - 1);
$('#pause').onclick = () => { paused = !paused; drawCtrl(); };
$('#skills').addEventListener('keydown', (e) => {
  if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  e.preventDefault();
  if (e.key === 'ArrowRight') go(idx + 1);
  if (e.key === 'ArrowLeft') go(idx - 1);
});
let startX = null;
track.addEventListener('pointerdown', (e) => { startX = e.clientX; });
window.addEventListener('pointerup', (e) => {
  if (startX === null) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
  startX = null;
});

// timeline
const tl = $('#timeline');
let tlFilter = 'all';
// 기간 표시: start/end는 'YYYY-MM'(end 생략 시 현재). 예) Oct. 2023 — Jan. 2024  4 months
const MONTHS_EN = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const fmtYM = (ym) => {
  const [y, mo] = ym.split('-').map(Number);
  return lang === 'en' ? `${MONTHS_EN[mo - 1]} ${y}` : `${y}.${String(mo).padStart(2, '0')}`;
};
const fmtPeriod = (m) => {
  if (!m.start) return m.date ? pick(m.date) : '';
  const [sy, sm] = m.start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = m.end ? m.end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const total = (ey - sy) * 12 + (em - sm) + 1;
  const yrs = Math.floor(total / 12), mos = total % 12;
  const dur = lang === 'en'
    ? [yrs && `${yrs} year${yrs > 1 ? 's' : ''}`, mos && `${mos} month${mos > 1 ? 's' : ''}`].filter(Boolean).join(' ')
    : [yrs && `${yrs}년`, mos && `${mos}개월`].filter(Boolean).join(' ');
  const end = m.end ? fmtYM(m.end) : (lang === 'en' ? 'Present' : '현재');
  return `${fmtYM(m.start)} — ${end} <span class="tl-dur">${dur}</span>`;
};
const drawTl = () => {
  tl.innerHTML = milestones.filter((m) => tlFilter === 'all' || m.f === tlFilter).map((m) => {
    const head = `<div class="tl-top"><span class="k">${tr('kind.' + m.f)}</span>${fmtPeriod(m) ? `<time>${fmtPeriod(m)}</time>` : ''}</div>`;
    const name = m.f !== 'exp'
      ? `<h3>${pick(m.org)}</h3>${m.inst ? `<p class="tl-inst">${pick(m.inst)}</p>` : ''}`
      : m.logo
      ? `<div class="tl-org"><img class="tl-logo" src="assets/orgs/${m.logo}" alt="" onerror="this.remove()"><h3>${pick(m.org)}</h3></div>`
      : `<h3>${pick(m.org)}</h3>`;
    const role = m.role ? `<p class="tl-role">${pick(m.role)}</p>` : '';
    const projHtml = (ids) => (ids || []).map((id) => portfolioProjects.find((p) => p.id === id)).filter(Boolean).map((p) =>
      `<section class="tl-project"><h4>${pick(p.title)}</h4><div class="tl-project-row">${projectImg(p.id)}<div class="tl-project-copy"><p>${pick(p.overview)}</p>${p.tools && p.tools.length ? `<ul class="tags">${p.tools.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}<a class="btn soft" href="project.html?id=${p.id}">${tr('proj.details')} ↗</a></div></div></section>`).join('');
    const projects = projHtml(m.projects);
    const subs = (m.children || []).map((c) => {
      const logo = c.logo ? `<img class="tl-logo tl-logo-sm" src="assets/orgs/${c.logo}" alt="" onerror="this.remove()">` : '';
      return `<details class="tl-sub"><summary class="tl-sub-head">${logo}<div class="tl-sub-title"><h4>${pick(c.org)}</h4>${c.role ? `<p class="tl-role">${pick(c.role)}</p>` : ''}</div>${fmtPeriod(c) ? `<time>${fmtPeriod(c)}</time>` : ''}<span class="tl-chev" aria-hidden="true"></span></summary>${projHtml(c.projects)}</details>`;
    }).join('');
    return `<li><article class="tl-card">${head}${name}${role}${m.text ? `<div class="tl-body"><p>${pick(m.text)}</p></div>` : ''}${projects || subs ? `<div class="tl-projects">${projects}${subs}</div>` : ''}</article></li>`;
  }).join('');
};
$('#tabs').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  tlFilter = b.dataset.f;
  $$('#tabs button').forEach((x) => {
    x.classList.toggle('active', x === b);
    x.setAttribute('aria-pressed', x === b);
  });
  drawTl();
});

// apply language: 고정 문구 + 동적 목록을 모두 다시 그린다
const applyLang = (l) => {
  lang = l;
  try { localStorage.setItem('lang', l); } catch {}
  root.lang = l;
  document.title = tr('title');
  $('meta[name=description]').content = tr('hero.lead');
  $$('[data-i18n]').forEach((el) => { el.textContent = tr(el.dataset.i18n); });
  $$('.flag').forEach((b) => {
    const on = b.dataset.lang === l;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
  drawProjects(); drawSkills(); drawTl(); drawCtrl();
};
$$('.flag').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));

applyLang(lang);
