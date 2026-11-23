/* ================= Ch2 Angles Related to Triangles and Polygons ================= */
(function () {
  const PN = { 3: ['triangle', '三角形'], 4: ['quadrilateral', '四邊形'], 5: ['pentagon', '五邊形'], 6: ['hexagon', '六邊形'], 7: ['heptagon', '七邊形'], 8: ['octagon', '八邊形'], 9: ['nonagon', '九邊形'], 10: ['decagon', '十邊形'], 12: ['12-sided polygon', '十二邊形'], 15: ['15-sided polygon', '十五邊形'], 18: ['18-sided polygon', '十八邊形'], 20: ['20-sided polygon', '二十邊形'] };
  const pn = k => PN[k] ? L(PN[k][0], PN[k][1]) : L(`${k}-sided polygon`, `${k} 邊形`);
  function polyPts(nn, kind = 'reg', R = 90, cx = 120, cy = 110) {
    const pts = []; const cave = ri(0, nn - 1);
    for (let i = 0; i < nn; i++) { const t = -Math.PI / 2 + 2 * Math.PI * i / nn + (kind === 'reg' ? 0 : (i % 2 ? .12 : -.08)); let r = R; if (kind === 'irr') r = R * (0.8 + 0.2 * ((i * 7) % 3) / 2); if (kind === 'cave' && i === cave) r = R * 0.3; pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]); }
    return pts;
  }
  function polyFig(pts, labs = []) {
    const c = G.cen(pts); let s = G.open(240, 230) + G.poly(pts, { fill: '#f8fafc' });
    pts.forEach((p, i) => { if (labs[i] != null) { const u = G.unit(G.sub(c, p)); s += G.txt(G.add(p, G.mul(u, 26)), labs[i], { size: 13, c: labs[i] === 'x' ? G.COL.a : G.COL.ink, italic: labs[i] === 'x' }); } });
    return s + '</svg>';
  }
  /* triangle with BC extended to D */
  function extFig(labA, labB, labX, labC) {
    const A = [110, 20], Bp = [20, 170], C = [200, 170], D = [300, 170];
    let s = G.open(320, 200) + G.poly([A, Bp, C], { fill: '#f8fafc' }) + G.line(C, D);
    s += G.arc(A, Bp, C, { label: labA, r: 22 }) + G.arc(Bp, C, A, { label: labB, c: G.COL.b, r: 22 }) + G.arc(C, D, A, { label: labX, c: G.COL.c, r: 22 });
    if (labC) s += G.arc(C, A, Bp, { label: labC, c: G.COL.d, r: 18 });
    s += G.txt([110, 8], 'A', { italic: true }) + G.txt([10, 185], 'B', { italic: true }) + G.txt([200, 188], 'C', { italic: true }) + G.txt([305, 188], 'D', { italic: true });
    return s + '</svg>';
  }
  function isoFig(apexLab, baseLab, baseLab2, o = {}) {
    const A = [130, 15], Bp = [30, 190], C = [230, 190];
    let s = G.open(260, 215) + G.poly([A, Bp, C], { fill: '#f8fafc' });
    if (!o.noTicks) s += G.ticks(A, Bp, 1) + G.ticks(A, C, 1);
    if (apexLab != null) s += G.arc(A, Bp, C, { label: apexLab, r: 24 });
    if (baseLab != null) s += G.arc(Bp, C, A, { label: baseLab, c: G.COL.b, r: 24 });
    if (baseLab2 != null) s += G.arc(C, A, Bp, { label: baseLab2, c: G.COL.b, r: 24 });
    if (o.side) s += G.slabel(A, Bp, [130, 130], o.side[0]) + G.slabel(A, C, [130, 130], o.side[1], { c: G.COL.a });
    s += G.txt([130, 5], 'A', { italic: true }) + G.txt([18, 202], 'B', { italic: true }) + G.txt([242, 202], 'C', { italic: true });
    return s + '</svg>';
  }

  const diagAnim = () => {
    const P = polyPts(6, 'reg', 95, 130, 115); const tri = k => `<polygon points="${[P[0], P[k], P[k + 1]].map(p => p.join(',')).join(' ')}" fill="${PAL[k - 1]}" opacity=".45"/>`;
    const frame = k => G.open(260, 230) + [...Array(k)].map((_, i) => tri(i + 1)).join('') + G.poly(P) + [...Array(Math.max(0, k - 1))].map((_, i) => G.line(P[0], P[i + 2], { c: '#dc2626', dash: '5 4' })).join('') + '</svg>';
    return SL(L('Sum of interior angles of a hexagon', '六邊形的內角和'), [
      { h: frame(0), c: ['A hexagon has 6 sides.', '六邊形有 6 條邊。'] },
      { h: frame(1), c: ['Draw lines from ONE corner…', '由一個頂點畫對角線……'] },
      { h: frame(2), c: ['…cutting it into triangles.', '……把它分成三角形。'] },
      { h: frame(4), c: ['6 sides → 6 − 2 = 4 triangles.', '6 條邊 → 6 − 2 = 4 個三角形。'] },
      { h: frame(4) + `<div class="ex">4 × 180° = <b class="green">720°</b></div>`, c: ['Sum = (n − 2) × 180° = 4 × 180° = 720°', '內角和 = (n − 2) × 180° = 4 × 180° = 720°'] }
    ], 280);
  };
  const extSumAnim = () => {
    const P = polyPts(5, 'irr', 80, 150, 110);
    const ext = s => { let o = ''; P.forEach((p, i) => { const q = P[(i + 1) % 5], pr = P[(i + 4) % 5]; const e = G.add(p, G.mul(G.unit(G.sub(p, pr)), 45)); o += G.line(p, e, { c: '#94a3b8', dash: '4 3' }) + G.arc(p, e, q, { c: PAL[i], r: 18 * s, n: 1, fill: PAL[i] + '55' }); }); return o; };
    return SL(L('Sum of exterior angles = 360°', '外角和 = 360°'), [
      { h: G.open(300, 230) + G.poly(P) + ext(1) + '</svg>', c: ['Extend each side: these are the exterior angles.', '延長每條邊：這些就是外角。'] },
      { h: G.open(300, 230) + G.poly(P) + ext(1) + '</svg>' + `<div class="ex">🚶 ${L('Walk round the shape: you turn one full circle', '沿圖形走一圈：剛好轉了一個圓周')}</div>`, c: ['Walking round, you turn at each corner by the exterior angle.', '沿邊走，每個頂點都轉了一個外角。'] },
      { h: `<div class="ex" style="font-size:1.4em">${L('Exterior angles', '外角')} = <b class="green">360°</b></div><div class="sub">${L('for ANY convex polygon', '任何凸多邊形都適用')}</div>`, c: ['So the sum of exterior angles is always 360°.', '所以外角和一定是 360°。'] }
    ], 280);
  };

  const lessons = [
    {
      t: ['Exterior angle of a triangle', '三角形的外角'],
      body: box('rule', '', `<div class="ex">${L('Exterior angle', '外角')} = ${L('sum of the 2 interior opposite angles', '兩個內對角之和')}</div>` + B('Reason: (ext. ∠ of △)', '理由：（三角形外角）')),
      anim: W(L('Find x', '求 x'), [
        { h: '', c: ['Exterior angle x at C. The angles NOT next to it are 50° and 70°.', 'C 的外角是 x。不相鄰的兩個角是 50° 和 70°。'] },
        { h: `${v('x')} = 50° + 70° &nbsp;<span class="note">ext. ∠ of △</span>`, c: ['Add the two opposite interior angles.', '把兩個內對角相加。'] },
        { h: `<b class="green">${v('x')} = 120°</b>`, c: ['x = 120°', 'x = 120°'] }
      ], { top: `<div>${extFig('50°', '70°', 'x')}</div>` })
    },
    {
      t: ['Isosceles and equilateral triangles', '等腰三角形及等邊三角形'],
      body: ul([B(`${T('Isosceles triangle', '等腰三角形')}: 2 equal sides → the 2 base angles are equal (base ∠s, isos. △).`, '等腰三角形：兩邊相等 → 兩底角相等（等腰三角形底角）。'), B('2 equal angles → the sides opposite them are equal (sides opp. equal ∠s).', '兩角相等 → 它們的對邊相等（等角對邊相等）。'), B(`${T('Equilateral triangle', '等邊三角形')}: each angle = 60°.`, '等邊三角形：每個角 = 60°。')]),
      anim: SL(L('Base angles', '底角'), [
        { h: isoFig('40°', null, null), c: ['AB = AC (marked), apex ∠A = 40°.', 'AB = AC（有記號），頂角 ∠A = 40°。'] },
        { h: isoFig('40°', 'x', 'x'), c: ['The base angles ∠B and ∠C are equal.', '底角 ∠B 和 ∠C 相等。'] },
        { h: isoFig('40°', '70°', '70°') + `<div class="ex">x = (180° − 40°) ÷ 2 = <b class="green">70°</b></div>`, c: ['x + x + 40° = 180°, so x = 70°.', 'x + x + 40° = 180°，所以 x = 70°。'] }
      ], 280)
    },
    {
      t: ['Polygons', '多邊形'],
      body: ul([B(`${T('Regular polygon', '正多邊形')}: all sides equal AND all angles equal.`, '正多邊形：所有邊相等，而且所有角相等。'), B(`${T('Convex polygon', '凸多邊形')}: every interior angle < 180°.`, '凸多邊形：每個內角都 < 180°。'), B(`${T('Concave polygon', '凹多邊形')}: at least one interior angle > 180° (a “dent”).`, '凹多邊形：最少有一個內角 > 180°（有「凹位」）。')]) +
        `<div class="qfig" style="gap:10px;flex-wrap:wrap">${['reg', 'irr', 'cave'].map((k, i) => `<div style="text-align:center">${polyFig(polyPts(6, k)).replace('width="240"', 'width="150"')}<div><b>${[L('Regular', '正多邊形'), L('Convex', '凸多邊形'), L('Concave', '凹多邊形')][i]}</b></div></div>`).join('')}</div>`
    },
    {
      t: ['Interior angles of a polygon', '多邊形的內角'],
      body: box('rule', '', `<div class="ex">${L('Sum of interior angles', '內角和')} = (n − 2) × 180°</div>` + B('Regular n-sided polygon: each interior angle = (n − 2) × 180° ÷ n', '正 n 邊形：每個內角 = (n − 2) × 180° ÷ n')),
      anim: diagAnim
    },
    {
      t: ['Exterior angles of a polygon', '多邊形的外角'],
      body: box('rule', '', `<div class="ex">${L('Sum of exterior angles', '外角和')} = 360°</div>` + B('Regular n-sided polygon: each exterior angle = 360° ÷ n. Interior + exterior = 180°.', '正 n 邊形：每個外角 = 360° ÷ n。內角 + 外角 = 180°。')),
      anim: [extSumAnim, W(L('A regular polygon has each exterior angle 30°. How many sides?', '正多邊形的每個外角是 30°。它有多少條邊？'), [
        { h: `n × 30° = 360°`, c: ['All n exterior angles add up to 360°.', 'n 個外角加起來是 360°。'] },
        { h: `n = 360° ÷ 30°`, c: ['Divide.', '相除。'] },
        { h: '<b class="green">n = 12</b>', c: ['12 sides.', '12 條邊。'] }
      ])]
    }
  ];

  const gens = [
    {
      id: 'ext', name: ['Exterior angle of △', '三角形外角'], gen() {
        const a = ri(30, 80), b = ri(30, 80); if (a + b >= 170) return null; const t = Math.random() < .55;
        if (t) return { kind: 'num', fig: extFig(a + '°', b + '°', 'x'), q: L('BCD is a straight line. Find x.', 'BCD 是一條直線。求 x。'), pre: v('x') + ' =', post: '°', ans: a + b, steps: [`${v('x')} = ${a}° + ${b}° (ext. ∠ of △)`, `${v('x')} = <b>${a + b}°</b>`], hint: L('Exterior angle = sum of the 2 opposite interior angles.', '外角 = 兩個內對角之和。') };
        return { kind: 'num', fig: extFig('x', b + '°', (a + b) + '°'), q: L('BCD is a straight line. Find x.', 'BCD 是一條直線。求 x。'), pre: v('x') + ' =', post: '°', ans: a, steps: [`${v('x')} + ${b}° = ${a + b}° (ext. ∠ of △)`, `${v('x')} = ${a + b}° − ${b}° = <b>${a}°</b>`] };
      }
    },
    {
      id: 'isos', name: ['Isosceles triangle', '等腰三角形'], gen() {
        const t = ri(0, 2);
        if (t === 0) { const ap = ri(10, 70) * 2; const x = (180 - ap) / 2; return { kind: 'num', fig: isoFig(ap + '°', 'x', null), q: L('AB = AC. Find x.', 'AB = AC。求 x。'), pre: v('x') + ' =', post: '°', ans: x, steps: [L('∠C = x (base ∠s, isos. △)', '∠C = x（等腰三角形底角）'), `${v('x')} + ${v('x')} + ${ap}° = 180° (∠ sum of △)`, `2${v('x')} = ${180 - ap}° → ${v('x')} = <b>${x}°</b>`] }; }
        if (t === 1) { const bs = ri(30, 80); return { kind: 'num', fig: isoFig('x', bs + '°', null), q: L('AB = AC. Find x.', 'AB = AC。求 x。'), pre: v('x') + ' =', post: '°', ans: 180 - 2 * bs, steps: [L(`∠C = ∠B = ${bs}° (base ∠s, isos. △)`, `∠C = ∠B = ${bs}°（等腰三角形底角）`), `${v('x')} = 180° − ${bs}° − ${bs}° = <b>${180 - 2 * bs}°</b> (∠ sum of △)`] }; }
        const bs = ri(35, 75), s = ri(4, 15); return { kind: 'num', fig: isoFig(null, bs + '°', bs + '°', { noTicks: true, side: [s + ' cm', 'x cm'] }), q: L('Find x.', '求 x。'), pre: v('x') + ' =', ans: s, steps: [L('∠B = ∠C, so the sides opposite them are equal.', '∠B = ∠C，所以它們的對邊相等。'), `AC = AB (sides opp. equal ∠s)`, `${v('x')} = <b>${s}</b>`], hint: L('Equal angles → equal opposite sides.', '等角 → 對邊相等。') };
      }
    },
    {
      id: 'intsum', name: ['Sum of interior angles', '內角和'], gen() {
        const k = pick([4, 5, 6, 7, 8, 9, 10, 12, 15, 20]); const s = (k - 2) * 180;
        return { kind: 'num', post: '°', q: L(`Find the sum of the interior angles of a ${PN[k] ? PN[k][0] : k + '-sided polygon'}.`, `求${PN[k] ? PN[k][1] : k + ' 邊形'}的內角和。`), ans: s, steps: [`(n − 2) × 180°`, `= (${k} − 2) × 180°`, `= <b>${s}°</b>`], hint: L('(n − 2) × 180°', '(n − 2) × 180°') };
      }
    },
    {
      id: 'polyx', name: ['Unknown angle in a polygon', '多邊形中的未知角'], gen() {
        const k = pick([4, 5, 6]); const S = (k - 2) * 180; const angs = [];
        for (let i = 0; i < k - 1; i++) angs.push(ri(Math.round(S / k) - 30, Math.round(S / k) + 25)); const x = S - angs.reduce((a, b) => a + b); if (x < 40 || x > 175) return null;
        const labs = shuffle([...angs.map(a => a + '°'), 'x']);
        return { kind: 'num', fig: polyFig(polyPts(k, 'irr'), labs), q: L(`Find x in the ${PN[k][0]}.`, `求${PN[k][1]}中的 x。`), pre: v('x') + ' =', post: '°', ans: x, steps: [`${L('Sum', '內角和')} = (${k} − 2) × 180° = ${S}°`, `${v('x')} = ${S}° − ${angs.join('° − ')}°`, `${v('x')} = <b>${x}°</b>`] };
      }
    },
    {
      id: 'reg', name: ['Regular polygons', '正多邊形'], gen() {
        const k = pick([5, 6, 8, 9, 10, 12, 15, 18, 20]); const e = 360 / k, it = 180 - e; const t = ri(0, 3);
        const nm = PN[k] || [k + '-sided polygon', k + ' 邊形'];
        if (t === 0) return { kind: 'num', post: '°', q: L(`Find each interior angle of a regular ${nm[0]}.`, `求正${nm[1]}的每個內角。`), ans: it, steps: [L(`Each exterior angle = 360° ÷ ${k} = ${e}°`, `每個外角 = 360° ÷ ${k} = ${e}°`), `${L('Interior', '內角')} = 180° − ${e}° = <b>${it}°</b>`], hint: L('Find the exterior angle first.', '先求外角。') };
        if (t === 1) return { kind: 'num', post: '°', q: L(`Find each exterior angle of a regular ${nm[0]}.`, `求正${nm[1]}的每個外角。`), ans: e, steps: [`360° ÷ ${k} = <b>${e}°</b>`] };
        if (t === 2) return { kind: 'num', q: L(`Each exterior angle of a regular polygon is ${e}°. How many sides does it have?`, `正多邊形的每個外角是 ${e}°。它有多少條邊？`), ans: k, steps: [`n = 360° ÷ ${e}°`, `n = <b>${k}</b>`] };
        return { kind: 'num', q: L(`Each interior angle of a regular polygon is ${it}°. How many sides does it have?`, `正多邊形的每個內角是 ${it}°。它有多少條邊？`), ans: k, steps: [L(`Exterior angle = 180° − ${it}° = ${e}°`, `外角 = 180° − ${it}° = ${e}°`), `n = 360° ÷ ${e}° = <b>${k}</b>`], hint: L('Change to the exterior angle first.', '先轉為外角。') };
      }
    },
    {
      id: 'extsum', name: ['Sum of exterior angles', '外角和'], gen() {
        const k = pick([4, 5, 6]); const angs = []; for (let i = 0; i < k - 1; i++) angs.push(ri(40, 100)); const x = 360 - angs.reduce((a, b) => a + b); if (x < 20 || x > 140) return null;
        return { kind: 'num', post: '°', q: L(`The exterior angles of a ${PN[k][0]} are ${angs.join('°, ')}° and x. Find x.`, `一個${PN[k][1]}的外角是 ${angs.join('°、')}° 和 x。求 x。`), pre: v('x') + ' =', ans: x, steps: [L('Sum of exterior angles = 360°', '外角和 = 360°'), `${v('x')} = 360° − ${angs.join('° − ')}°`, `${v('x')} = <b>${x}°</b>`] };
      }
    },
    {
      id: 'type', name: ['Regular, convex or concave?', '正、凸或凹多邊形？'], gen() {
        const k = pick(['reg', 'irr', 'cave']); const nn = ri(5, 8);
        const C = { reg: L('Regular polygon', '正多邊形'), irr: L('Convex (not regular)', '凸多邊形（非正多邊形）'), cave: L('Concave polygon', '凹多邊形') };
        return { kind: 'mc', fig: polyFig(polyPts(nn, k)), q: L('What kind of polygon is this?', '這是哪種多邊形？'), choices: [C[k], ...Object.keys(C).filter(x => x !== k).map(x => C[x])], steps: [k === 'cave' ? L('It has a dent: one angle > 180°.', '有凹位：有一個角 > 180°。') : k === 'reg' ? L('All sides and all angles are equal.', '所有邊和角都相等。') : L('No dent, but sides are not all equal.', '沒有凹位，但邊不全相等。'), `<b>${C[k]}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch2', no: 2, color: COLORS[2], title: ['Angles Related to Triangles and Polygons', '與三角形和多邊形有關的角'], short: ['Angles & Polygons', '三角形及多邊形的角'],
    lessons, gens,
    keys: [B('Exterior ∠ of △ = sum of 2 interior opposite ∠s.', '三角形外角 = 兩個內對角之和。'), B('Isosceles: base angles equal. Equal angles → equal opposite sides.', '等腰：底角相等；等角對邊相等。'), B('Equilateral: each angle 60°.', '等邊：每角 60°。'), B('Interior sum = (n − 2) × 180°. Exterior sum = 360°.', '內角和 = (n − 2) × 180°；外角和 = 360°。'), B('Regular: exterior = 360° ÷ n; interior = 180° − exterior.', '正多邊形：外角 = 360° ÷ n；內角 = 180° − 外角。')],
    traps: [B('✘ Exterior sum = (n − 2) × 180° &nbsp; ✔ 360° always', '✘ 外角和 = (n − 2) × 180° &nbsp; ✔ 一定是 360°'), B('✘ Exterior ∠ = the angle next to it &nbsp; ✔ the two OPPOSITE angles', '✘ 外角 = 相鄰的內角 &nbsp; ✔ 兩個內對角之和'), B('✘ Base angles are the ones next to the equal sides’ meeting point &nbsp; ✔ they are at the base', '✘ 把頂角當成底角 &nbsp; ✔ 底角在底邊兩端')],
    cheat: [`${L('ext. ∠ of △', '三角形外角')} = a + b`, `${L('Interior sum', '內角和')} = (n − 2) × 180°`, `${L('Exterior sum', '外角和')} = 360°`, `${L('Regular', '正多邊形')}: ${L('ext.', '外角')} = 360° ÷ n`]
  });
})();
