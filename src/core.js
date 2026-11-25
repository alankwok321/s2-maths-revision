/* ================= helpers ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const nz = (a, b) => { let x; do x = ri(a, b); while (x === 0); return x; };
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
const MI = '−';
const rnd = x => Math.round(x * 1e9) / 1e9;
/* number → text with a proper minus sign */
const n = x => { x = rnd(x); return x < 0 ? MI + Math.abs(x) : '' + x; };
/* negative numbers in brackets: (−3) */
const nb = x => x < 0 ? '(' + n(x) + ')' : n(x);
const pb = x => '(' + n(x) + ')';
/* directed number with sign in brackets: (+3) (−3) */
const sg = x => '(' + (x < 0 ? MI : '+') + Math.abs(rnd(x)) + ')';
const v = s => `<i class="v">${s}</i>`;
const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const L = (en, zh) => en === zh ? `<span>${en}</span>` : `<span class="en">${en}</span><span class="zh">${zh}</span>`;
const B = (en, zh) => en === zh ? `<div class="blk"><span>${en}</span></div>` : `<div class="blk"><span class="en">${en}</span><span class="zh">${zh}</span></div>`;
const T = (en, zh) => `<span class="term">${en}<span class="tz">${zh}</span></span>`;
const box = (kind, title, html) => `<div class="box ${kind}">${title ? `<div class="bt">${title}</div>` : ''}${html}</div>`;
const ul = items => `<ul class="explain">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;

/* ================= Fractions ================= */
class F {
  constructor(a, b = 1) { if (b < 0) { a = -a; b = -b; } const g = gcd(a, b); this.n = a / g; this.d = b / g; if (this.n === 0) this.n = 0; }
  static of(x) {
    if (x instanceof F) return x;
    if (Number.isInteger(x)) return new F(x, 1);
    const s = String(rnd(x)); const k = (s.split('.')[1] || '').length; const p = 10 ** k;
    return new F(Math.round(x * p), p);
  }
  add(o) { o = F.of(o); return new F(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = F.of(o); return new F(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = F.of(o); return new F(this.n * o.n, this.d * o.d); }
  div(o) { o = F.of(o); return new F(this.n * o.d, this.d * o.n); }
  eq(o) { o = F.of(o); return this.n === o.n && this.d === o.d; }
  get val() { return this.n / this.d; }
  get isInt() { return this.d === 1; }
  /* html: improper fraction by default; mixed=true gives mixed number */
  html(mixed = false) {
    if (this.d === 1) return n(this.n);
    const s = this.n < 0 ? MI : ''; const a = Math.abs(this.n);
    if (mixed && a > this.d) { const w = Math.floor(a / this.d), r = a % this.d; return `<span class="mixed">${s}${w}${fr(r, this.d)}</span>`; }
    return s + fr(a, this.d);
  }
  hb(mixed) { return this.n < 0 ? '(' + this.html(mixed) + ')' : this.html(mixed); }
  text() { return this.d === 1 ? n(this.n) : n(this.n) + '/' + this.d; }
}
const frh = (a, b, mixed) => new F(a, b).html(mixed);
const rawfr = (a, b) => (a < 0 ? MI : '') + fr(Math.abs(a), b); /* not simplified */

/* ================= Algebra formatting ================= */
const SUP = { 2: '<sup>2</sup>' };
const pw = (b, e) => e === 1 ? b : e === 0 ? '' : `${b}<sup>${e}</sup>`;
/* one term: coefficient c (number or F) with vars like {x:2,y:1}; first=true means no leading + */
function termH(c, vars = {}, first = false) {
  const cf = F.of(c);
  if (cf.n === 0) return '';
  const vs = Object.entries(vars).filter(([, e]) => e !== 0).map(([k, e]) => pw(v(k), e)).join('');
  const neg = cf.n < 0; const a = neg ? new F(-cf.n, cf.d) : cf;
  let body;
  if (vs && a.n === 1 && a.d === 1) body = vs;
  else body = a.html() + vs;
  if (first) return (neg ? MI : '') + body;
  return (neg ? ` ${MI} ` : ' + ') + body;
}
/* polynomial from list of [c, vars] in given order */
function polyH(terms) {
  let out = ''; let first = true;
  for (const [c, vars] of terms) { if (F.of(c).n === 0) continue; out += termH(c, vars, first); first = false; }
  return out || '0';
}
/* polynomial in x from coefficient array by degree (descending output default) */
function px(coefs, varName = 'x', asc = false) {
  const ts = []; const degs = Object.keys(coefs).map(Number).sort((a, b) => asc ? a - b : b - a);
  for (const d of degs) ts.push([coefs[d], d ? { [varName]: d } : {}]);
  return polyH(ts);
}
/* linear ax + b */
const lin = (a, b, x = 'x') => polyH([[a, { [x]: 1 }], [b, {}]]);
/* multiply two coefficient maps */
function pmul(p, q) { const r = {}; for (const i in p) for (const j in q) { const d = +i + +j; r[d] = (r[d] || 0) + p[i] * q[j]; } return r; }
function padd(p, q, s = 1) { const r = { ...p }; for (const j in q) r[j] = (r[j] || 0) + s * q[j]; return r; }
const pkey = p => Object.keys(p).map(Number).sort((a, b) => b - a).map(d => d + ':' + (p[d] || 0)).filter(s => !s.endsWith(':0')).join(',');

/* ================= language ================= */
let LANG = 'both';
function setLang(m) {
  LANG = m; document.body.classList.remove('m-en', 'm-zh'); if (m !== 'both') document.body.classList.add('m-' + m);
  $$('.langs button').forEach(b => b.classList.toggle('on', b.dataset.l === m));
  try { localStorage.setItem('s2rev-lang', m); } catch (e) { }
}

/* ================= storage ================= */
const store = {
  get() { try { return JSON.parse(localStorage.getItem('s2rev') || '{}'); } catch (e) { return {}; } },
  set(o) { try { localStorage.setItem('s2rev', JSON.stringify(o)); } catch (e) { } },
  best(id, score, total) { const o = this.get(); const p = o[id] || {}; if (!p.best || score / total > p.best[0] / p.best[1]) p.best = [score, total]; p.done = (p.done || 0); o[id] = p; this.set(o); },
  count(id, ok) { const o = this.get(); const p = o[id] || {}; p.done = (p.done || 0) + 1; if (ok) p.ok = (p.ok || 0) + 1; o[id] = p; this.set(o); }
};

/* ================= Stepper (animation player) ================= */
/* cfg = {title, setup(stage)->state, frames:[{c:[en,zh], f(state, fast)}], minH} */
function Stepper(host, cfg) {
  const box = el('div', 'anim');
  box.innerHTML = `<div class="title">▶ ${cfg.title || L('Animation', '動畫')}</div><div class="stage"></div><div class="cap"></div>
  <div class="ctrl"><button class="rs" title="Restart">⟲</button><button class="pv" title="Back">◀</button><button class="play">${'▶ ' + L('Play', '播放')}</button><button class="nx" title="Next">▶</button><div class="dots"></div></div>`;
  host.appendChild(box);
  const stage = $('.stage', box), cap = $('.cap', box), dots = $('.dots', box), playB = $('.play', box);
  if (cfg.minH) stage.style.minHeight = cfg.minH + 'px';
  const N = cfg.frames.length; let k = 0, timer = null, token = 0;
  dots.innerHTML = cfg.frames.map((_, i) => `<i data-i="${i}"></i>`).join('');
  function go(t, animate = true) {
    t = Math.max(0, Math.min(N - 1, t)); const my = ++token;
    stage.innerHTML = ''; stage.classList.add('noanim');
    const st = cfg.setup(stage);
    for (let i = 0; i < t; i++) cfg.frames[i].f(st, true);
    if (!animate) cfg.frames[t].f(st, true);
    void stage.offsetWidth; stage.classList.remove('noanim');
    if (animate) requestAnimationFrame(() => requestAnimationFrame(() => { if (my === token) cfg.frames[t].f(st, false); }));
    const c = cfg.frames[t].c; cap.innerHTML = c ? B(c[0], c[1]) : '';
    $$('i', dots).forEach((d, i) => { d.className = i === t ? 'on' : i < t ? 'done' : ''; });
    k = t;
  }
  function stop() { clearTimeout(timer); timer = null; playB.innerHTML = '▶ ' + L('Play', '播放'); }
  function tick() { if (k >= N - 1) { stop(); return; } go(k + 1); timer = setTimeout(tick, cfg.frames[k].d || 3000); }
  playB.onclick = () => { if (timer) { stop(); return; } if (k >= N - 1) go(0); playB.innerHTML = '❚❚ ' + L('Pause', '暫停'); timer = setTimeout(tick, 1500); };
  $('.nx', box).onclick = () => { stop(); go(k + 1); };
  $('.pv', box).onclick = () => { stop(); go(k - 1, false); };
  $('.rs', box).onclick = () => { stop(); go(0); };
  dots.onclick = e => { const i = e.target.dataset.i; if (i != null) { stop(); go(+i); } };
  go(0, false);
  return box;
}
/* Working-lines animation: each frame adds (or replaces) a line of working */
/* lines: [{h, c:[en,zh], eq:bool, n:note, r:bool(replace current line)}] */
function W(title, lines, extra = {}) {
  return {
    title, minH: extra.minH,
    setup(stage) { const d = el('div', 'work'); stage.appendChild(d); if (extra.top) d.insertAdjacentHTML('beforebegin', extra.top); return { d }; },
    frames: lines.map(Ln => ({
      c: Ln.c, d: Ln.d, f(st, fast) {
        const make = () => (Ln.eq ? '<span class="eq">=</span>' : '<span class="eq"></span>') + `<span>${Ln.h}</span>` + (Ln.n ? `<span class="note">${Ln.n}</span>` : '');
        const cur = st.d.lastElementChild;
        if (Ln.r && cur) { cur.innerHTML = make(); if (!fast) { cur.classList.remove('new'); void cur.offsetWidth; cur.classList.add('new'); } return; }
        $$('.ln', st.d).forEach(x => { x.classList.remove('cur'); x.classList.add('old'); });
        const ln = el('div', 'ln cur' + (fast ? '' : ' new'), make()); st.d.appendChild(ln);
      }
    }))
  };
}
const svgNS = 'http://www.w3.org/2000/svg';
function S(tag, attrs = {}, parent) { const e = document.createElementNS(svgNS, tag); for (const k in attrs) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); } if (parent) parent.appendChild(e); return e; }
function svgRoot(stage, w, h) { const s = S('svg', { viewBox: `0 0 ${w} ${h}`, width: w }); s.style.fontFamily = 'Nunito, sans-serif'; stage.appendChild(s); return s; }
const mv = (e, x, y) => { e.style.transform = `translate(${x}px,${y}px)`; };

/* ================= chips animation (shared) ================= */
  /* moving chips engine. chips:[{id,h,bg}], frames:[{c, pos:{id:[x,y,opacity]}, show:{id:opacity}}], extras: [{id, h, x, y, w, h2, style}] */
function Chips(title, H, chips, extras, frames) {
    return {
      title, minH: H + 20,
      setup(stage) {
        const wrap = el('div'); wrap.style.cssText = `position:relative;width:560px;max-width:100%;height:${H}px`; stage.appendChild(wrap);
        const st = { c: {}, e: {} };
        (extras || []).forEach(x => { const d = el('div', 'tr', x.h); d.style.cssText = `position:absolute;left:${x.x}px;top:${x.y}px;width:${x.w || 'auto'}px;${x.hh ? 'height:' + x.hh + 'px;' : ''}opacity:${x.o == null ? 0 : x.o};${x.style || ''}`; wrap.appendChild(d); st.e[x.id] = d; });
        chips.forEach(c => { const d = el('div', 'tr', c.h); d.style.cssText = `position:absolute;left:0;top:0;padding:6px 12px;border-radius:10px;font-size:22px;font-weight:700;background:${c.bg || '#fff'};border:2px solid ${c.bd || '#cbd5e1'};white-space:nowrap`; wrap.appendChild(d); st.c[c.id] = d; });
        const apply = fr => { for (const id in fr.html || {}) st.c[id].innerHTML = fr.html[id]; for (const id in fr.pos || {}) { const [x, y, o] = fr.pos[id]; st.c[id].style.transform = `translate(${x}px,${y}px)`; st.c[id].style.opacity = o == null ? 1 : o; } for (const id in fr.show || {}) st.e[id].style.opacity = fr.show[id]; };
        st.apply = apply; apply(frames[0]);
        return st;
      },
      frames: frames.map(fr => ({ c: fr.c, d: fr.d, f(st) { st.apply(fr); } }))
    };
  }

/* ================= answer parsing ================= */
function parseAns(s) {
  s = (s || '').trim().replace(/[−–—]/g, '-').replace(/[＄$,，]/g, '').replace(/\s+/g, ' ');
  s = s.replace(/^[a-z]\s*=\s*/i, '').replace(/\s*(%|°|cm|kg|km|m|g|mm|ml|years?|歲|元|個|人|分)$/i, '').replace(/^\+/, '').trim();
  let m;
  if ((m = s.match(/^(-?)(\d+) (\d+)\/(\d+)$/))) { const w = +m[2], a = +m[3], b = +m[4]; if (!b) return null; const f = new F((w * b + a) * (m[1] ? -1 : 1), b); return { f, simplest: gcd(a, b) === 1 && a < b, form: 'mixed' }; }
  if ((m = s.match(/^(-?\d+)\/(-?\d+)$/))) { const a = +m[1], b = +m[2]; if (!b) return null; return { f: new F(a, b), simplest: gcd(a, b) === 1, form: 'frac' }; }
  if ((m = s.match(/^-?(\d+\.?\d*|\.\d+)$/))) { return { f: F.of(parseFloat(s)), simplest: true, form: 'dec' }; }
  return null;
}

/* ================= Practice engine ================= */
const PRAISE = [['Correct!', '正確！']];
const OOPS = [['Not quite.', '不正確。']];
const KEYS = 'ABCDEFG';

class Practice {
  /* gens: [{id, name:[en,zh], gen:()=>question}] */
  constructor(host, gens, opt = {}) {
    this.host = host; this.gens = gens; this.opt = opt; this.id = opt.id || 'x';
    this.filter = 'all'; this.mode = 'practice'; this.ok = 0; this.tot = 0; this.testN = opt.testN || 10;
    this.root = el('div'); host.appendChild(this.root); this.build(); this.next();
  }
  build() {
    const r = this.root;
    r.innerHTML = `<div class="modebar">
      <button class="mode on" data-m="practice">✏️ ${L('Practice', '練習')}</button>
      <button class="mode" data-m="test">⏱ ${L('Test (' + this.testN + ')', '小測（' + this.testN + '）')}</button>
      <div class="score"></div></div>
      <div class="chips"></div><div class="qwrap"></div>`;
    $$('.mode', r).forEach(b => b.onclick = () => { $$('.mode', r).forEach(x => x.classList.toggle('on', x === b)); this.mode = b.dataset.m; this.start(); });
    const chips = $('.chips', r);
    if (this.gens.length > 1 && !this.opt.noChips) {
      chips.innerHTML = `<button class="on" data-g="all">🔀 ${L('Mixed', '混合')}</button>` + this.gens.map(g => `<button data-g="${g.id}">${L(g.name[0], g.name[1])}</button>`).join('');
      chips.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', chips).forEach(x => x.classList.toggle('on', x === b)); this.filter = b.dataset.g; if (this.mode === 'test') { this.mode = 'practice'; $$('.mode', r).forEach(x => x.classList.toggle('on', x.dataset.m === 'practice')); } this.start(); };
    }
    this.chips = chips;
    if (this.opt.testOnly) $$('.mode', r).forEach(b => b.style.display = 'none');
  }
  start() {
    this.ok = 0; this.tot = 0;
    if (this.mode === 'test') {
      this.chips.style.display = 'none';
      /* pick a spread of question types */
      let pool = []; while (pool.length < this.testN) pool = pool.concat(shuffle(this.gens));
      this.testList = pool.slice(0, this.testN); this.ti = 0; this.results = [];
    } else this.chips.style.display = '';
    this.next();
  }
  score() {
    const s = $('.score', this.root);
    if (this.mode === 'test') s.innerHTML = `${L('Question', '第')} ${Math.min(this.ti + 1, this.testN)} / ${this.testN} ${L('', '題')} · ${L('Score', '得分')} <b>${this.ok}</b>`;
    else s.innerHTML = this.tot ? `${L('Correct', '答對')} <b>${this.ok}</b> / ${this.tot}` : '';
  }
  makeQ(g) {
    for (let t = 0; t < 30; t++) { try { const q = g.gen(); if (q) { q.gname = g.name; return q; } } catch (e) { console.error(g.id, e); } }
    return null;
  }
  next() {
    let g;
    if (this.mode === 'test') { if (this.ti >= this.testN) return this.showResult(); g = this.testList[this.ti]; }
    else g = this.filter === 'all' ? pick(this.gens) : this.gens.find(x => x.id === this.filter);
    const q = this.makeQ(g); this.q = q; this.answered = false; this.render(q); this.score();
  }
  render(q) {
    const w = $('.qwrap', this.root);
    const qno = this.mode === 'test' ? this.ti + 1 : this.tot + 1;
    let ansH = '';
    if (q.kind === 'mc') {
      let ch = []; const seen = new Set();
      q.choices.forEach((c, i) => { const key = c.replace(/\s+/g, ''); if (!seen.has(key)) { seen.add(key); ch.push({ h: c, ok: i === 0 }); } });
      ch = q.keep ? ch : shuffle(ch); q._ch = ch;
      ansH = `<div class="mcs">${ch.map((c, i) => `<button data-i="${i}"><span class="k">${KEYS[i]}</span><span>${c.h}</span></button>`).join('')}</div>`;
    } else if (q.kind === 'proof') {
      /* a proof: each line is a list of text segments and blanks {opts:[correct,...]} */
      q._blanks = [];
      ansH = `<div class="proof">${q.lines.map(ln => `<div class="pl">${ln.map(sg => {
        if (typeof sg === 'string') return `<span>${sg}</span>`;
        const ord = shuffle(sg.opts.map((_, k) => k)); const id = q._blanks.length; q._blanks.push(ord);
        return `<select class="pb" data-b="${id}"><option value="">${LANG === 'zh' ? '選擇…' : 'choose…'}</option>${ord.map((k, m) => `<option value="${m}">${sg.opts[k]}</option>`).join('')}</select>`;
      }).join(' ')}</div>`).join('')}</div><div class="ans"><button class="btn chk">${L('Check', '檢查')}</button></div>`;
    } else {
      ansH = `<div class="ans">${q.pre || ''}<input inputmode="text" autocomplete="off">${q.post || ''}<button class="btn chk">${L('Check', '檢查')}</button></div>`;
    }
    w.innerHTML = `<div class="qcard"><div class="qhead"><span>Q${qno}</span><span class="qtype">${L(q.gname[0], q.gname[1])}</span></div>
      <div class="qtext">${q.q}</div>${q.fig ? `<div class="qfig">${q.fig}</div>` : ''}${ansH}
      <div class="fb"></div><div class="hintbox">💡 ${q.hint || ''}</div>
      <div class="qbtns">${q.hint ? `<button class="btn ghost hint">💡 ${L('Hint', '提示')}</button>` : ''}<button class="btn ghost showsol">📖 ${L('Show steps', '看步驟')}</button><button class="btn go nxt" style="margin-left:auto">${this.mode === 'test' && this.ti === this.testN - 1 ? L('See result', '看結果') + ' ➜' : L('Next question', '下一題') + ' ➜'}</button></div>
      <div class="sol"><b>${L('Solution', '解答')}</b><ol>${q.steps.map(s => `<li class="st">${s}</li>`).join('')}</ol></div></div>`;
    const card = $('.qcard', w);
    if (q.kind === 'mc') $('.mcs', card).onclick = e => { const b = e.target.closest('button'); if (b && !this.answered) this.checkMC(+b.dataset.i, card); };
    else if (q.kind === 'proof') { $('.chk', card).onclick = () => this.checkProof(card); $$('select.pb', card).forEach(sl => sl.onchange = () => sl.classList.toggle('set', sl.value !== '')); }
    else {
      const inp = $('input', card); $('.chk', card).onclick = () => this.checkNum(inp.value, card);
      inp.onkeydown = e => { if (e.key === 'Enter') { if (this.answered) $('.nxt', card).click(); else this.checkNum(inp.value, card); } };
      if (this.opt.autofocus !== false && window.innerWidth > 700) setTimeout(() => inp.focus({ preventScroll: true }), 50);
    }
    const sh = $('.showsol', card); sh.onclick = () => { $('.sol', card).classList.toggle('show'); if (this.mode === 'test' && !this.answered) { this.mark(false, card, true); } };
    const hb = $('.hint', card); if (hb) hb.onclick = () => $('.hintbox', card).classList.toggle('show');
    $('.nxt', card).onclick = () => {
      if (this.mode === 'test') { if (!this.answered) this.mark(false, card, true); this.ti++; }
      this.next();
    };
    if (this.mode === 'test') sh.style.display = 'none';
  }
  mark(ok, card, silent) {
    if (this.answered) return; this.answered = true; this.tot++; if (ok) this.ok++;
    store.count(this.id, ok);
    if (this.mode === 'test') { this.results.push({ ok, q: this.q }); $('.showsol', card).style.display = ''; }
    const fb = $('.fb', card);
    if (!silent) { const m = ok ? pick(PRAISE) : pick(OOPS); fb.className = 'fb ' + (ok ? 'ok' : 'no'); fb.innerHTML = (ok ? '✅ ' : '❌ ') + L(m[0], m[1]) + (this.extraFb || ''); }
    else { fb.className = 'fb no'; fb.innerHTML = '⏭ ' + L('Skipped', '略過'); }
    this.extraFb = '';
    if (!ok) $('.sol', card).classList.add('show');
    this.score();
  }
  checkProof(card) {
    if (this.answered) return;
    const sels = $$('select.pb', card); const fb = $('.fb', card);
    if (sels.some(sl => sl.value === '')) { fb.className = 'fb no'; fb.innerHTML = '⚠️ ' + L('Choose an answer for every blank.', '每個空格都要選擇答案。'); return; }
    let right = 0;
    sels.forEach(sl => { const ok = this.q._blanks[+sl.dataset.b][+sl.value] === 0; if (ok) right++; sl.classList.add(ok ? 'right' : 'wrong'); sl.disabled = true; });
    $('.chk', card).disabled = true;
    if (right < sels.length) this.extraFb = `<div style="font-weight:600;margin-top:4px">${L(`${right} of ${sels.length} correct.`, `${sels.length} 個中答對 ${right} 個。`)}</div>`;
    this.mark(right === sels.length, card);
  }
  checkMC(i, card) {
    const ch = this.q._ch; const bs = $$('.mcs button', card);
    bs.forEach((b, j) => { b.disabled = true; if (ch[j].ok) b.classList.add('right'); });
    if (!ch[i].ok) bs[i].classList.add('wrong');
    this.mark(ch[i].ok, card);
  }
  checkNum(val, card) {
    if (this.answered) return;
    const p = parseAns(val); const fb = $('.fb', card);
    if (!p) { fb.className = 'fb no'; fb.innerHTML = '⚠️ ' + L('Enter a number.', '請輸入數字。'); return; }
    if (this.q.needFrac && p.form === 'dec') { fb.className = 'fb no'; fb.innerHTML = '⚠️ ' + L('Answer as a fraction.', '請用分數作答。'); return; }
    const ans = F.of(this.q.ans); let ok = p.f.eq(ans);
    if (!ok && this.q.tol != null) ok = Math.abs(p.f.val - ans.val) <= this.q.tol;
    if (ok && !p.simplest && p.form !== 'dec') this.extraFb = `<div style="font-weight:600;margin-top:4px">${L('Simplest form', '最簡形式')}: ${ans.html()}</div>`;
    $('input', card).disabled = true; $('.chk', card).disabled = true;
    if (!ok) fb.dataset.ans = 1;
    this.mark(ok, card);
    if (!ok) fb.innerHTML += `<div style="margin-top:4px">${L('Answer', '答案')}: <b>${this.q.pre || ''} ${this.q.ansH || (typeof this.q.ans === 'number' ? n(this.q.ans) : ans.html(this.q.mixed))} ${this.q.post || ''}</b></div>`;
  }
  showResult() {
    const w = $('.qwrap', this.root); const pct = this.ok / this.testN;
    store.best(this.id, this.ok, this.testN);
    const stars = pct >= .9 ? '⭐⭐⭐' : pct >= .6 ? '⭐⭐☆' : pct >= .3 ? '⭐☆☆' : '☆☆☆';
    const msg = pct >= .9 ? ['Excellent!', '非常好！'] : pct >= .6 ? ['Good. Review your mistakes.', '不錯。溫習錯題。'] : ['Review the Learn pages, then try again.', '重溫「學習」頁，再試一次。'];
    const wrong = this.results.filter(r => !r.ok);
    w.innerHTML = `<div class="qcard result"><div class="stars">${stars}</div><div class="big">${this.ok} / ${this.testN}</div><p>${L(msg[0], msg[1])}</p>
      ${wrong.length ? `<p class="sub">${L('Review', '溫習')}: ${[...new Set(wrong.map(r => L(r.q.gname[0], r.q.gname[1])))].join(' · ')}</p>` : ''}
      <button class="btn again">${L('Try again', '再試')}</button> <button class="btn sec back">${L('Practice', '練習')}</button></div>`;
    $('.again', w).onclick = () => this.start(); if (this.opt.testOnly) $('.back', w).style.display = 'none';
    $('.back', w).onclick = () => { $$('.mode', this.root).forEach(x => x.classList.toggle('on', x.dataset.m === 'practice')); this.mode = 'practice'; this.start(); };
    $('.score', this.root).innerHTML = '';
  }
}

/* helper to build multiple-choice numeric distractors */
function numChoices(ans, wrongs) {
  const a = F.of(ans); const out = [a.html()]; const seen = new Set([a.text()]);
  for (const w of wrongs) { const f = F.of(w); if (!seen.has(f.text())) { seen.add(f.text()); out.push(f.html()); } if (out.length >= 4) break; }
  let k = 1; while (out.length < 4) { const f = a.add(k * (k % 2 ? 1 : -1)); if (!seen.has(f.text())) { seen.add(f.text()); out.push(f.html()); } k++; }
  return out;
}

/* ================= chapter registry & router ================= */
const CH = [];
const COLORS = { 12: '#0d9488', 1: '#2563eb', 2: '#dc2626', 3: '#7c3aed', 4: '#ea580c', 5: '#0891b2', 11: '#16a34a' };

function renderHome() {
  const m = $('main'); const st = store.get();
  m.innerHTML = `<h2>${L('Chapters', '章節')}</h2><div class="grid">${CH.map(c => {
      const p = st[c.id] || {}; const best = p.best ? `${L('Best test', '最佳小測')}: ${p.best[0]}/${p.best[1]}` : (p.done ? `${p.done} ${L('done', '題')}` : '');
      return `<div class="card chcard" data-go="${c.id}"><div class="chnum" style="background:${c.color}">${c.no}</div><div><b>${c.title[0]}</b><div>${c.title[1]}</div><div class="sub" style="font-size:.85em">${best}</div></div></div>`;
    }).join('')}
    <div class="card chcard" data-go="final" style="background:var(--acc-soft)"><div class="chnum" style="background:var(--acc)">⏰</div><div><b>Last 10 Minutes</b><div>考前十分鐘</div><div class="sub" style="font-size:.85em"></div></div></div>
    <div class="card chcard" data-go="mock" style="background:var(--pur-soft)"><div class="chnum" style="background:var(--pur)">🎯</div><div><b>Mock Test</b><div>模擬測驗</div><div class="sub" style="font-size:.85em">${st.mock && st.mock.best ? `${L('Best', '最佳')}: ${st.mock.best[0]}/${st.mock.best[1]}` : ''}</div></div></div></div>`;
  $$('[data-go]', m).forEach(d => d.onclick = () => { location.hash = d.dataset.go; });
}

let CUR = null; /* currently rendered chapter id */
const SUBS = [['learn', '📺', ['Learn', '學習']], ['practice', '✏️', ['Practice', '練習']], ['keys', '⭐', ['Key points', '重點']]];
function renderChapter(c, sub) {
  const m = $('main');
  if (CUR !== c.id) {
    CUR = c.id;
    m.innerHTML = `<div class="chhead"><div class="chnum" style="background:${c.color}">${c.no}</div><div><h1>${c.title[0]}<br><span style="font-size:.8em">${c.title[1]}</span></h1></div></div>
    <div class="pagetabs">${SUBS.map(([k, ic, t], i) => `<a href="#${c.id}-${k}" data-s="${k}"><span class="pn">${i + 1}</span>${ic} ${L(t[0], t[1])}</a>`).join('')}</div>
    <section id="s-learn" class="page"></section><section id="s-practice" class="page"></section><section id="s-keys" class="page"></section>`;
    const learn = $('#s-learn', m);
    c.lessons.forEach((ls, i) => {
      const card = el('div', 'card lesson');
      card.innerHTML = `<h3><span class="lnum">${c.no}.${i + 1}</span>${L(ls.t[0], ls.t[1])}</h3>${ls.body || ''}`;
      learn.appendChild(card);
      const anims = ls.anim ? (Array.isArray(ls.anim) ? ls.anim : [ls.anim]) : [];
      anims.forEach(a => Stepper(card, typeof a === 'function' ? a() : a));
      if (ls.after) card.insertAdjacentHTML('beforeend', ls.after);
    });
    learn.insertAdjacentHTML('beforeend', `<div class="pagenext"><a class="btn go" href="#${c.id}-practice">${L('Practice', '練習')} ➜</a></div>`);
    const pr = $('#s-practice', m);
    pr.innerHTML = '';
    const pc = el('div', 'card'); pr.appendChild(pc);
    new Practice(pc, c.gens, { id: c.id });
    pr.insertAdjacentHTML('beforeend', `<div class="pagenext"><a class="btn sec" href="#${c.id}-learn">⬅ ${L('Learn', '學習')}</a><a class="btn go" href="#${c.id}-keys">${L('Key points', '重點')} ➜</a></div>`);
    const ks = $('#s-keys', m);
    const idx = CH.indexOf(c), nxt = CH[idx + 1];
    ks.innerHTML = `<h2>⭐ ${L('Key points', '重點')}</h2><div class="card">${ul(c.keys)}</div>
      <h2>⚠️ ${L('Common mistakes', '常犯錯誤')}</h2><div class="card">${c.traps.map(t => box('trap', '', t)).join('')}</div>
      <div class="pagenext"><a class="btn sec" href="#${c.id}-practice">⬅ ${L('Practice', '練習')}</a>${nxt ? `<a class="btn go" href="#${nxt.id}-learn">${L(nxt.short[0], nxt.short[1])} ➜</a>` : `<a class="btn go" href="#final">⏰ ${L('Last 10 Minutes', '考前十分鐘')} ➜</a>`}</div>`;
  }
  $$('section.page', m).forEach(s => s.style.display = s.id === 's-' + sub ? '' : 'none');
  $$('.pagetabs a', m).forEach(a => a.classList.toggle('on', a.dataset.s === sub));
}

function route() {
  const h = location.hash.replace('#', '');
  const [cid, sub0] = h.split('-');
  const sub = SUBS.some(s => s[0] === sub0) ? sub0 : 'learn';
  $$('nav.tabs a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cid || (h === '' && a.getAttribute('href') === '#home')));
  const c = CH.find(x => x.id === cid);
  if (c) renderChapter(c, sub); else { CUR = null; if (h === 'final') renderFinal(); else if (h === 'mock') renderMock(); else renderHome(); }
  window.scrollTo(0, 0);
}

function boot() {
  const tabs = $('nav.tabs');
  tabs.innerHTML = `<a href="#home">🏠 ${L('Home', '主頁')}</a>` + CH.map(c => `<a href="#${c.id}">${c.no}. ${L(c.short[0], c.short[1])}</a>`).join('') + `<a href="#final" class="final">⏰ ${L('Last 10 Min', '考前十分鐘')}</a><a href="#mock" class="final">🎯 ${L('Mock test', '模擬測驗')}</a>`;
  $('.brand').onclick = () => { location.hash = 'home'; };
  $$('.langs button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  let lg = 'both'; try { lg = localStorage.getItem('s2rev-lang') || 'both'; } catch (e) { }
  setLang(lg);
  window.addEventListener('hashchange', route); route();
}
