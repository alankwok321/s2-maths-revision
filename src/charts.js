/* ================= chart drawing (SVG strings) ================= */
const PAL = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316'];
function axes(W, H, m, maxV, step, ylabel) {
  let s = '';
  for (let y = 0; y <= maxV; y += step) {
    const py = H - m.b - (y / maxV) * (H - m.t - m.b);
    s += `<line x1="${m.l}" y1="${py}" x2="${W - m.r}" y2="${py}" stroke="#e3e8f0"/><text x="${m.l - 6}" y="${py + 4}" text-anchor="end" font-size="12" fill="#475569">${y}</text>`;
  }
  s += `<line x1="${m.l}" y1="${m.t - 6}" x2="${m.l}" y2="${H - m.b}" stroke="#334155" stroke-width="1.5"/><line x1="${m.l}" y1="${H - m.b}" x2="${W - m.r}" y2="${H - m.b}" stroke="#334155" stroke-width="1.5"/>`;
  if (ylabel) s += `<text x="14" y="${(H - m.b + m.t) / 2}" transform="rotate(-90 14 ${(H - m.b + m.t) / 2})" text-anchor="middle" font-size="12" fill="#334155">${ylabel}</text>`;
  return s;
}
function barChart({ title, labels, values, step, ylabel, xlabel, color = PAL[0] }) {
  const W = 470, H = 290, m = { l: 56, r: 14, t: 34, b: 52 };
  const maxV = Math.ceil(Math.max(...values) / step) * step + step;
  const bw = (W - m.l - m.r) / labels.length;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;font-family:Nunito,sans-serif"><text x="${W / 2}" y="18" text-anchor="middle" font-weight="800" font-size="14">${title}</text>` + axes(W, H, m, maxV, step, ylabel);
  labels.forEach((lb, i) => {
    const h = values[i] / maxV * (H - m.t - m.b); const x = m.l + i * bw + bw * .2;
    s += `<rect x="${x}" y="${H - m.b - h}" width="${bw * .6}" height="${h}" fill="${color}" rx="3"/><text x="${x + bw * .3}" y="${H - m.b + 17}" text-anchor="middle" font-size="12">${lb}</text>`;
  });
  if (xlabel) s += `<text x="${(W + m.l) / 2}" y="${H - 8}" text-anchor="middle" font-size="12" fill="#334155">${xlabel}</text>`;
  return s + '</svg>';
}
function compBar({ title, labels, series, step, ylabel, xlabel }) {
  const W = 490, H = 300, m = { l: 56, r: 14, t: 52, b: 52 };
  const maxV = Math.ceil(Math.max(...series.flatMap(s => s.values)) / step) * step + step;
  const gw = (W - m.l - m.r) / labels.length; const bw = gw * .7 / series.length;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;font-family:Nunito,sans-serif"><text x="${W / 2}" y="18" text-anchor="middle" font-weight="800" font-size="14">${title}</text>` + axes(W, H, m, maxV, step, ylabel);
  series.forEach((se, k) => { s += `<rect x="${m.l + 10 + k * 120}" y="28" width="14" height="12" fill="${se.color}"/><text x="${m.l + 30 + k * 120}" y="39" font-size="12">${se.name}</text>`; });
  labels.forEach((lb, i) => {
    series.forEach((se, k) => { const h = se.values[i] / maxV * (H - m.t - m.b); const x = m.l + i * gw + gw * .15 + k * bw; s += `<rect x="${x}" y="${H - m.b - h}" width="${bw - 2}" height="${h}" fill="${se.color}" rx="2"/>`; });
    s += `<text x="${m.l + i * gw + gw / 2}" y="${H - m.b + 17}" text-anchor="middle" font-size="12">${lb}</text>`;
  });
  if (xlabel) s += `<text x="${(W + m.l) / 2}" y="${H - 8}" text-anchor="middle" font-size="12" fill="#334155">${xlabel}</text>`;
  return s + '</svg>';
}
function lineChart({ title, labels, values, step, ylabel, xlabel, color = '#ef4444', min = 0 }) {
  const W = 470, H = 290, m = { l: 56, r: 20, t: 34, b: 52 };
  const maxV = Math.ceil(Math.max(...values) / step) * step + step;
  const gx = (W - m.l - m.r) / (labels.length - 1 + 1);
  const pt = i => [m.l + gx * (i + .5), H - m.b - values[i] / maxV * (H - m.t - m.b)];
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;font-family:Nunito,sans-serif"><text x="${W / 2}" y="18" text-anchor="middle" font-weight="800" font-size="14">${title}</text>` + axes(W, H, m, maxV, step, ylabel);
  s += `<polyline fill="none" stroke="${color}" stroke-width="2.5" points="${values.map((_, i) => pt(i).join(',')).join(' ')}"/>`;
  labels.forEach((lb, i) => { const [x, y] = pt(i); s += `<circle cx="${x}" cy="${y}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/><text x="${x}" y="${H - m.b + 17}" text-anchor="middle" font-size="12">${lb}</text>`; });
  if (xlabel) s += `<text x="${(W + m.l) / 2}" y="${H - 8}" text-anchor="middle" font-size="12" fill="#334155">${xlabel}</text>`;
  return s + '</svg>';
}
function pieChart({ title, labels, angles, showAngles = true }) {
  const W = 420, H = 300, cx = 210, cy = 165, r = 115;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;font-family:Nunito,sans-serif"><text x="${W / 2}" y="20" text-anchor="middle" font-weight="800" font-size="14">${title}</text>`;
  let a0 = -90;
  angles.forEach((a, i) => {
    const a1 = a0 + a; const rad = d => d * Math.PI / 180;
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0)), x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    s += `<path d="M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${a > 180 ? 1 : 0} 1 ${x1},${y1} Z" fill="${PAL[i % PAL.length]}" stroke="#fff" stroke-width="2"/>`;
    const mid = rad(a0 + a / 2); const tx = cx + r * .62 * Math.cos(mid), ty = cy + r * .62 * Math.sin(mid);
    s += `<text x="${tx}" y="${ty - 2}" text-anchor="middle" font-size="12.5" font-weight="800" fill="#fff">${labels[i]}</text>`;
    if (showAngles && a !== null) s += `<text x="${tx}" y="${ty + 13}" text-anchor="middle" font-size="12" fill="#fff">${a}°</text>`;
    a0 = a1;
  });
  return s + '</svg>';
}
/* pie with one unknown angle: angles array may contain null for "x°" */
function pieChartX({ title, labels, angles, unknown }) {
  const real = angles.slice(); const W = 420, H = 300, cx = 210, cy = 165, r = 115;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;font-family:Nunito,sans-serif"><text x="${W / 2}" y="20" text-anchor="middle" font-weight="800" font-size="14">${title}</text>`;
  let a0 = -90;
  real.forEach((a, i) => {
    const a1 = a0 + a; const rad = d => d * Math.PI / 180;
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0)), x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    s += `<path d="M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${a > 180 ? 1 : 0} 1 ${x1},${y1} Z" fill="${PAL[i % PAL.length]}" stroke="#fff" stroke-width="2"/>`;
    const mid = rad(a0 + a / 2); const tx = cx + r * .62 * Math.cos(mid), ty = cy + r * .62 * Math.sin(mid);
    s += `<text x="${tx}" y="${ty - 2}" text-anchor="middle" font-size="12.5" font-weight="800" fill="#fff">${labels[i]}</text><text x="${tx}" y="${ty + 13}" text-anchor="middle" font-size="12.5" fill="#fff" font-weight="${i === unknown ? 900 : 400}">${i === unknown ? '?' : a + '°'}</text>`;
    a0 = a1;
  });
  return s + '</svg>';
}
/* number line string: min..max, points {value: label} */
function numberLineSVG(min, max, points = {}, opt = {}) {
  const W = 520, H = 78, pad = 26; const X = t => pad + (t - min) / (max - min) * (W - 2 * pad);
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;font-family:Nunito,sans-serif"><line x1="6" y1="40" x2="${W - 6}" y2="40" stroke="#334155" stroke-width="2"/><path d="M${W - 6},40 l-9,-5 v10z M6,40 l9,-5 v10z" fill="#334155"/>`;
  for (let t = min; t <= max; t++) { s += `<line x1="${X(t)}" y1="34" x2="${X(t)}" y2="46" stroke="#334155" stroke-width="1.5"/>`; if (!opt.hideNums || t === 0) s += `<text x="${X(t)}" y="64" text-anchor="middle" font-size="13" fill="${t === 0 ? '#111' : '#475569'}" font-weight="${t === 0 ? 800 : 400}">${n(t)}</text>`; }
  for (const k in points) { s += `<circle cx="${X(+k)}" cy="40" r="7" fill="#dc2626"/><text x="${X(+k)}" y="20" text-anchor="middle" font-size="15" font-weight="900" fill="#dc2626">${points[k]}</text>`; }
  return s + '</svg>';
}
/* stem-and-leaf table html from sorted data */
function stemLeaf(data, opt = {}) {
  const sorted = data.slice().sort((a, b) => a - b);
  const unit = opt.unit || 10;
  const lo = Math.floor(sorted[0] / unit), hi = Math.floor(sorted[sorted.length - 1] / unit);
  let rows = '';
  for (let s = lo; s <= hi; s++) { const leaves = sorted.filter(x => Math.floor(x / unit) === s).map(x => x % unit); rows += `<tr><td class="stem">${s}</td><td class="lv">${leaves.join(' ')}</td></tr>`; }
  return `<table class="sl"><tr><th>${opt.sh || L('Stem (tens)', '幹（十位）')}</th><th style="text-align:left">${opt.lh || L('Leaf (units)', '葉（個位）')}</th></tr>${rows}</table>`;
}
function stemLeaf2(A, Bd, nameA, nameB) {
  const a = A.slice().sort((x, y) => x - y), b = Bd.slice().sort((x, y) => x - y);
  const all = a.concat(b); const lo = Math.floor(Math.min(...all) / 10), hi = Math.floor(Math.max(...all) / 10);
  let rows = '';
  for (let s = lo; s <= hi; s++) {
    const la = a.filter(x => Math.floor(x / 10) === s).map(x => x % 10).reverse(); const lb = b.filter(x => Math.floor(x / 10) === s).map(x => x % 10);
    rows += `<tr><td class="lvl">${la.join(' ')}</td><td class="stemc">${s}</td><td class="lv">${lb.join(' ')}</td></tr>`;
  }
  return `<table class="sl"><tr><th style="text-align:right">${nameA}</th><th>${L('Stem', '幹')}</th><th style="text-align:left">${nameB}</th></tr>${rows}</table>`;
}
