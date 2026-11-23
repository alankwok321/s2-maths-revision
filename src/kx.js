/* ================= KaTeX: turn the page's maths into KaTeX automatically ================= */
const KX = (() => {
  const SKIP = 'svg,script,style,input,textarea,.katex,.qhead,nav,header,.ctrl,.chips,.pagetabs,.score,.lnum,.chnum,.sl,.nokx,h1,.title,.brand,.langs';
  const SUPS = { '²': '2', '³': '3', '¹': '1', '⁰': '0', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', 'ᵐ': 'm', 'ⁿ': 'n', '⁺': '+', '⁻': '-' };
  const SUBS = { 'ₙ': 'n', '₁': '1', '₂': '2', '₃': '3' };
  const MAP = { '−': '-', '×': '\\times ', '÷': '\\div ', '∠': '\\angle ', '△': '\\triangle ', '≅': '\\cong ', '≡': '\\equiv ', '≠': '\\ne ', '∴': '\\therefore ', '∵': '\\because ', '→': '\\to ', '⇄': '\\rightleftarrows ', '↔': '\\leftrightarrow ', '±': '\\pm ', '≈': '\\approx ', '·': '\\cdot ', '…': '\\dots ', '~': '\\sim ', '%': '\\%', '$': '\\$', '°': '^{\\circ}', '<': '<', '>': '>', '|': '\\mid ', '{': '\\{', '}': '\\}', ' ': '\\ ' };
  const ANCH = /[0-9=+−×÷<>≡≅≠±→⇄↔≈·%$²³¹⁰⁴-⁹ᵐⁿ⁺⁻ₙ₁₂₃°∴∵~]/;
  const NEUT = /[\s ()\[\],.:;'∠△…|/]/;
  const WORDS = /^(SAS|SSS|ASA|AAS|RHS|AAA|SSA|MTR|PE|OK|EN|II|I)$/;
  const SPECIAL = /(\b1[A-D]\b|Book 1B|L\.H\.S\.|R\.H\.S\.|H\.C\.F\.|L\.C\.M\.|[∠△]s\b|e\.g\.|i\.e\.|S\.S\.S\.|S\.A\.S\.|A\.S\.A\.|A\.A\.S\.|R\.H\.S\.|A\.A\.A\.)/;
  const INLINE_MATH = el => {
    const t = el.tagName; const c = el.classList;
    if (t === 'I' && c.contains('v')) return true;
    if (t === 'SUP' || t === 'SUB' || t === 'S' || t === 'B' || t === 'STRONG') return true;
    if (t === 'SPAN' && (c.contains('frac') || c.contains('mixed') || c.contains('hl') || c.contains('hl2') || c.contains('hl3') || c.length === 0 || ['red', 'green', 'blue', 'org', 'pur'].some(k => c.contains(k)))) return true;
    return false;
  };
  /* pure-math text → TeX (null if it contains words) */
  function texText(s) {
    if (SPECIAL.test(s)) return null;
    let out = ''; let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/[A-Za-z]/.test(ch)) { let j = i; while (j < s.length && /[A-Za-z]/.test(s[j])) j++; const w = s.slice(i, j); if (w.length > 1 && (WORDS.test(w) || (/[a-z]/.test(w) && !(/^[a-z]{2,3}$/.test(w) && !/^(an|as|at|be|by|do|if|in|is|it|of|on|or|so|to|up|we|no|and|the|for|are|not|all|can|cm|kg|km|mm|ml)$/.test(w))))) return null; out += w; i = j; continue; }
      if (/[0-9]/.test(ch)) { out += ch; i++; continue; }
      if (SUPS[ch]) { let t = ''; while (i < s.length && SUPS[s[i]]) t += SUPS[s[i++]]; out += `^{${t}}`; continue; }
      if (SUBS[ch]) { let t = ''; while (i < s.length && SUBS[s[i]]) t += SUBS[s[i++]]; out += `_{${t}}`; continue; }
      if (ch === '/' && s[i + 1] === '/') { out += '\\parallel '; i += 2; continue; }
      if (MAP[ch] != null) { out += MAP[ch]; i++; continue; }
      if (ch === ' ') { if (out.endsWith(',')) out += '\\,'; i++; continue; }
      if (/[+=()\[\],.:;'!/*-]/.test(ch)) { out += ch; i++; continue; }
      return null;
    }
    return out;
  }
  function texEl(el) {
    const inner = () => texKids(el);
    const t = el.tagName, c = el.classList;
    if (t === 'I' && c.contains('v')) { const s = el.textContent; return /^[A-Za-z]+$/.test(s) ? s : null; }
    if (t === 'SUP') { const x = inner(); return x == null ? null : `^{${x}}`; }
    if (t === 'SUB') { const x = inner(); return x == null ? null : `_{${x}}`; }
    if (t === 'S') { const x = inner(); return x == null ? null : `\\cancel{${x}}`; }
    if (t === 'SPAN' && c.contains('frac')) { const k = el.children; if (k.length !== 2) return null; const a = texKids(k[0]), b = texKids(k[1]); return a == null || b == null ? null : `\\dfrac{${a}}{${b}}`; }
    if (!INLINE_MATH(el)) return null;
    let x = inner(); if (x == null) return null;
    if (t === 'B' || t === 'STRONG') x = `\\boldsymbol{${x}}`;
    ['hl', 'hl2', 'hl3', 'red', 'green', 'blue', 'org', 'pur'].forEach(k => { if (c.contains(k)) x = `\\htmlClass{${k}}{${x}}`; });
    return x;
  }
  function texKids(el) { let out = ''; for (const nd of el.childNodes) { if (nd.nodeType === 3) { const t = texText(nd.nodeValue); if (t == null) return null; out += t; } else if (nd.nodeType === 1) { const t = texEl(nd); if (t == null) return null; out += t; } } return out; }

  /* tokenise a container's children into runs of maths and text */
  function tokens(el) {
    const T = [];
    for (const nd of [...el.childNodes]) {
      if (nd.nodeType === 3) {
        const parts = nd.nodeValue.split(SPECIAL);
        parts.forEach((p, k) => {
          if (!p) return;
          if (k % 2 === 1) { T.push({ s: p, c: 'W' }); return; }
          const re = /[A-Za-z]+|[\s\S]/g; let m;
          while ((m = re.exec(p))) {
            const s = m[0]; let c;
            if (/^[A-Za-z]+$/.test(s)) c = (s.length > 1 && (/[a-z]/.test(s) || WORDS.test(s))) ? 'W' : 'L';
            else if (ANCH.test(s)) c = 'A';
            else if (NEUT.test(s)) c = 'N';
            else c = 'W';
            T.push({ s, c });
          }
        });
      } else if (nd.nodeType === 1) {
        if (nd.matches(SKIP)) { T.push({ node: nd, c: 'B' }); continue; }
        const tex = INLINE_MATH(nd) ? texEl(nd) : null;
        if (tex != null && tex !== '') T.push({ node: nd, c: 'A', tex });
        else { T.push({ node: nd, c: 'B' }); walk(nd); }
      } else T.push({ node: nd, c: 'B' });
    }
    /* short lowercase groups (ab, xy, 2ab) next to numbers/operators are maths, not words */
    const STOP = /^(an|as|at|be|by|do|if|in|is|it|of|on|or|so|to|up|we|no|and|the|for|are|not|all|can|has|its|one|two|use|get|put|add|new|but|set|any|how|out|way|top|end|cm|kg|km|mm|ml|opp|int|alt|adj|ext|sum|pt|st|inc|corr|equ|th|nd|rd|st|eg|ie|min|max|sec|hr|mon|tue|wed|thu|fri|jan|feb|mar|apr|may|jun|yes|ok)$/;
    const near = (i, d) => { for (let j = i + d; j >= 0 && j < T.length; j += d) { const t = T[j]; if (t.s && /^\s$/.test(t.s)) continue; return t.c === 'A' || t.c === 'L'; } return false; };
    /* units after a number ("100 m", "12.8 s", "5 kg") stay as text */
    T.forEach((t, i) => { if (t.c === 'L' && /^[msgh]$/.test(t.s) && T[i - 1] && /^\s$/.test(T[i - 1].s || '') && T[i - 2] && /[0-9]$/.test(T[i - 2].s || '')) t.c = 'W'; });
    T.forEach((t, i) => { if (t.c === 'W' && t.s && /^[a-z]{2,3}$/.test(t.s) && !STOP.test(t.s) && ((T[i - 1] && T[i - 1].s && /[0-9)]/.test(T[i - 1].s)) || near(i, -1) && near(i, 1) || near(i, 1) && T[i + 1] && T[i + 1].c === 'A')) t.c = 'L'; });
    return T;
  }
  function render(tex) { const sp = document.createElement('span'); try { katex.render(tex, sp, { throwOnError: true, strict: 'ignore', trust: c => c.command === '\\htmlClass' }); return sp.firstChild; } catch (e) { return null; } }
  function walk(el) {
    if (!el || el.nodeType !== 1 || el.matches(SKIP) || el.closest('.katex')) return;
    const T = tokens(el); if (!T.some(t => t.c === 'A')) return;
    /* group into runs separated by W/B */
    const out = []; let run = [];
    const flush = () => {
      if (!run.length) return;
      let a = 0, b = run.length - 1;
      const trimmable = t => t.c === 'N' && t.s !== ')' && t.s !== ']';
      while (a <= b && (run[a].c === 'N' && t0(run[a]))) a++;
      while (b >= a && trimmable(run[b])) b--;
      const mid = run.slice(a, b + 1); let ok = mid.some(t => t.c === 'A');
      if (ok && mid.length === 1 && mid[0].s && /^[.|/~]$/.test(mid[0].s)) ok = false;
      let node = null;
      if (ok) { const tex = mid.map(t => t.tex != null ? t.tex : texText(t.s)).join(''); if (!/^\s*$/.test(tex)) node = render(tex); }
      run.slice(0, a).forEach(t => out.push(t));
      if (node) out.push({ node, c: 'K' }); else mid.forEach(t => out.push(t));
      run.slice(b + 1).forEach(t => out.push(t));
      run = [];
    };
    const t0 = t => t.s !== '(' && t.s !== '[' && t.s !== '∠' && t.s !== '△';
    for (const t of T) { if (t.c === 'W' || t.c === 'B') { flush(); out.push(t); } else run.push(t); }
    flush();
    if (!out.some(t => t.c === 'K')) return;
    const frag = document.createDocumentFragment(); let buf = '';
    const fb = () => { if (buf) { frag.appendChild(document.createTextNode(buf)); buf = ''; } };
    for (const t of out) { if (t.node) { fb(); frag.appendChild(t.node); } else buf += t.s; }
    fb();
    el.replaceChildren(frag);
  }
  let obs = null, pending = new Set(), sched = false;
  function run() { sched = false; if (obs) obs.disconnect(); const items = [...pending]; pending.clear(); items.forEach(n => { if (n.isConnected) walk(n); }); if (obs) { obs.takeRecords(); obs.observe(document.body, { childList: true, subtree: true }); } }
  function start() {
    if (typeof katex === 'undefined') return;
    obs = new MutationObserver(ms => { for (const m of ms) { const t = m.target.nodeType === 1 ? m.target : m.target.parentElement; if (t && !t.closest('.katex,svg')) pending.add(t); } if (!sched) { sched = true; requestAnimationFrame(run); } });
    pending.add(document.body); run();
  }
  return { start, walk, texText };
})();
