/* ================= geometry drawing (SVG strings) ================= */
const G = (() => {
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mul = (a, k) => [a[0] * k, a[1] * k];
  const len = a => Math.hypot(a[0], a[1]);
  const unit = a => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const cen = pts => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
  const f = x => Math.round(x * 10) / 10;
  const ang = (v, a) => Math.atan2(a[1] - v[1], a[0] - v[0]);
  const COL = { ink: '#1d2a3a', a: '#dc2626', b: '#2563eb', c: '#16a34a', d: '#7c3aed', e: '#ea580c' };

  function open(w, h) { return `<svg viewBox="0 0 ${w} ${h}" width="${w}" style="max-width:100%;font-family:Nunito,'Noto Sans TC',sans-serif">`; }
  function line(p, q, o = {}) { return `<line x1="${f(p[0])}" y1="${f(p[1])}" x2="${f(q[0])}" y2="${f(q[1])}" stroke="${o.c || COL.ink}" stroke-width="${o.w || 2}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} stroke-linecap="round"/>`; }
  function poly(pts, o = {}) { return `<polygon points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" fill="${o.fill || 'none'}" stroke="${o.c || COL.ink}" stroke-width="${o.w || 2}" stroke-linejoin="round"/>`; }
  function txt(p, s, o = {}) { return `<text x="${f(p[0])}" y="${f(p[1])}" text-anchor="${o.anchor || 'middle'}" dominant-baseline="middle" font-size="${o.size || 15}" font-weight="${o.weight || 700}" fill="${o.c || COL.ink}" ${o.italic ? 'font-style="italic" font-family="Times New Roman,serif"' : ''}>${s}</text>`; }
  /* angle arc at v between rays v→a and v→b ; n arcs ; label */
  function arc(v, a, b, o = {}) {
    const r = o.r || 22; const a1 = ang(v, a); let d = ang(v, b) - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d <= -Math.PI) d += 2 * Math.PI;
    const sweep = d > 0 ? 1 : 0; let s = '';
    for (let i = 0; i < (o.n || 1); i++) { const rr = r + i * 4; const p1 = add(v, [rr * Math.cos(a1), rr * Math.sin(a1)]), p2 = add(v, [rr * Math.cos(a1 + d), rr * Math.sin(a1 + d)]); s += `<path d="M${f(p1[0])},${f(p1[1])} A${rr},${rr} 0 0 ${sweep} ${f(p2[0])},${f(p2[1])}" fill="${o.fill ? o.fill : 'none'}" stroke="${o.c || COL.a}" stroke-width="1.8"/>`; }
    if (o.label != null) { const bm = a1 + d / 2; const lr = r + (o.n || 1) * 4 + (o.lpad || 12); s += txt(add(v, [lr * Math.cos(bm), lr * Math.sin(bm)]), o.label, { c: o.c || COL.a, size: o.size || 13, italic: o.italic }); }
    return s;
  }
  function right(v, a, b, o = {}) { const k = o.k || 11; const u1 = mul(unit(sub(a, v)), k), u2 = mul(unit(sub(b, v)), k); const p1 = add(v, u1), p2 = add(add(v, u1), u2), p3 = add(v, u2); return `<polyline points="${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])} ${f(p3[0])},${f(p3[1])}" fill="none" stroke="${o.c || COL.ink}" stroke-width="1.6"/>`; }
  function ticks(p, q, n, o = {}) { const m = mid(p, q), u = unit(sub(q, p)), nr = [-u[1], u[0]]; let s = ''; for (let i = 0; i < n; i++) { const c = add(m, mul(u, (i - (n - 1) / 2) * 5)); s += line(add(c, mul(nr, 6)), add(c, mul(nr, -6)), { c: o.c || COL.b, w: 1.8 }); } return s; }
  function arrows(p, q, n, o = {}) { const m = mid(p, q), u = unit(sub(q, p)), nr = [-u[1], u[0]]; let s = ''; for (let i = 0; i < n; i++) { const c = add(m, mul(u, i * 7)); s += `<polyline points="${f(c[0] - u[0] * 7 + nr[0] * 5)},${f(c[1] - u[1] * 7 + nr[1] * 5)} ${f(c[0])},${f(c[1])} ${f(c[0] - u[0] * 7 - nr[0] * 5)},${f(c[1] - u[1] * 7 - nr[1] * 5)}" fill="none" stroke="${o.c || COL.ink}" stroke-width="1.8"/>`; } return s; }
  function vlabel(v, c, name, o = {}) { const u = unit(sub(v, c)); return txt(add(v, mul(u, o.d || 14)), name, { size: 15, italic: true, c: o.c }); }
  function slabel(p, q, c, s, o = {}) { const m = mid(p, q); const u = unit(sub(m, c)); const dd = o.d || (14 + Math.abs(u[0]) * 4 * String(s).replace(/<[^>]+>/g, '').length); return txt(add(m, mul(u, dd)), s, { size: 13, c: o.c || COL.ink, weight: 700 }); }
  /* transform a point set: rotate deg, flip (mirror x), scale, then place bbox at (x,y) */
  function place(pts, { rot = 0, flip = false, s = 1, x = 0, y = 0 } = {}) {
    const c = cen(pts); const r = rot * Math.PI / 180;
    let q = pts.map(p => { let d = sub(p, c); if (flip) d = [-d[0], d[1]]; d = [d[0] * Math.cos(r) - d[1] * Math.sin(r), d[0] * Math.sin(r) + d[1] * Math.cos(r)]; return mul(d, s); });
    const mx = Math.min(...q.map(p => p[0])), my = Math.min(...q.map(p => p[1]));
    return q.map(p => [p[0] - mx + x, p[1] - my + y]);
  }
  const bbox = pts => ({ w: Math.max(...pts.map(p => p[0])) - Math.min(...pts.map(p => p[0])), h: Math.max(...pts.map(p => p[1])) - Math.min(...pts.map(p => p[1])) });
  /* draw a triangle with marks.
     t = {pts:[A,B,C], names:[..], sides:{0:{t:n|lab:''},1..,2..} (side i = pts[i]→pts[(i+1)%3]), angles:{i:{n,lab,right}}, fill} */
  function tri(t) {
    const P = t.pts, c = cen(P); let s = poly(P, { fill: t.fill || '#f8fafc' });
    for (const i in t.sides || {}) { const sd = t.sides[i]; const p = P[i], q = P[(+i + 1) % 3]; if (sd.t) s += ticks(p, q, sd.t, { c: sd.c }); if (sd.lab != null) s += slabel(p, q, c, sd.lab, { c: sd.lc }); if (sd.arr) s += arrows(p, q, sd.arr); }
    for (const i in t.angles || {}) { const an = t.angles[i]; const v = P[i], a = P[(+i + 1) % 3], b = P[(+i + 2) % 3]; if (an.right) s += right(v, a, b); else s += arc(v, a, b, { n: an.n || 1, label: an.lab, c: an.c, r: an.r || 20 }); }
    (t.names || []).forEach((nm, i) => { if (nm) s += vlabel(P[i], c, nm); });
    return s;
  }
  return { open, line, poly, txt, arc, right, ticks, arrows, vlabel, slabel, place, bbox, tri, cen, mid, add, sub, mul, unit, COL };
})();

/* nice triangle shapes (in roughly 170 x 120) */
const SHAPES = [
  [[0, 120], [170, 120], [55, 0]],
  [[0, 120], [160, 120], [110, 10]],
  [[0, 110], [180, 120], [70, 0]],
  [[10, 120], [150, 120], [0, 10]],
  [[0, 120], [170, 100], [95, 0]]
];
const RSHAPES = [[[0, 120], [160, 120], [0, 10]], [[0, 0], [0, 120], [150, 120]]]; /* right angle at vertex 0 for first, vertex 1 for second */

/* two triangles side by side; t2 is a transformed copy of t1 */
function triPair(base, m1, m2, o = {}) {
  const s2 = o.s || 1;
  const p1 = G.place(base, { x: 30, y: 30 });
  let p2 = G.place(base, { rot: o.rot || 0, flip: !!o.flip, s: s2, x: 0, y: 0 });
  const b1 = G.bbox(p1), b2 = G.bbox(p2);
  const H = Math.max(b1.h, b2.h) + 70;
  p2 = G.place(base, { rot: o.rot || 0, flip: !!o.flip, s: s2, x: b1.w + 110, y: 30 + (Math.max(b1.h, b2.h) - b2.h) / 2 });
  const W = b1.w + 110 + b2.w + 40;
  return G.open(W, H) + G.tri({ ...m1, pts: p1 }) + G.tri({ ...m2, pts: p2 }) + '</svg>';
}

/* slide-style animation: each frame replaces the picture */
function SL(title, frames, minH) {
  return {
    title, minH,
    setup(stage) { const d = el('div'); d.style.cssText = 'width:100%;text-align:center'; stage.appendChild(d); return { d }; },
    frames: frames.map(fr => ({ c: fr.c, d: fr.d, f(st, fast) { st.d.innerHTML = fr.h; if (!fast) { st.d.classList.remove('fadein'); void st.d.offsetWidth; st.d.classList.add('fadein'); } } }))
  };
}
/* angle at vertex i of triangle (degrees) */
function triAngles(P) { const a = []; for (let i = 0; i < 3; i++) { const v = P[i], p = P[(i + 1) % 3], q = P[(i + 2) % 3]; const u = G.sub(p, v), w = G.sub(q, v); a.push(Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))) * 180 / Math.PI); } const r = a.map(Math.round); r[2] = 180 - r[0] - r[1]; return r; }
const LETTERS = [['A', 'B', 'C'], ['P', 'Q', 'R'], ['X', 'Y', 'Z'], ['D', 'E', 'F'], ['L', 'M', 'N'], ['H', 'K', 'J'], ['S', 'T', 'U']];
const TRI = '△';
