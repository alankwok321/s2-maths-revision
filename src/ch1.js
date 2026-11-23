/* ================= Ch1 Similar Triangles ================= */
(function () {
  const r1 = x => Math.round(x * 10) / 10;
  const sideLens = base => [0, 1, 2].map(i => Math.round(Math.hypot(...G.sub(base[(i + 1) % 3], base[i])) / 20));

  const scaleAnim = {
    title: L('Similar = same shape, enlarged or reduced', '相似 = 形狀相同，放大或縮小'), minH: 300,
    setup(stage) {
      const P = [[40, 250], [130, 250], [40, 190]];
      /* big triangle = P enlarged 2× about A, then moved 220 right: real coordinates */
      const Q = P.map(p => [P[0][0] + 2 * (p[0] - P[0][0]) + 220, P[0][1] + 2 * (p[1] - P[0][1])]);
      let s = G.open(520, 290) + G.tri({ pts: P, names: ['A', 'B', 'C'], sides: { 0: { lab: '3' }, 2: { lab: '2' } }, fill: '#dbeafe' });
      const ox = P[0][0] + 220, oy = P[0][1];
      s += `<g id="big" class="tr" style="transform-box:view-box;transform-origin:${ox}px ${oy}px;transform:scale(.5)"><polygon points="${Q.map(p => p.join(',')).join(' ')}" fill="rgba(251,191,36,.5)" stroke="#b45309" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></g>`;
      const c2 = G.cen(Q);
      s += `<g id="lab" class="tr" opacity="0">${['P', 'Q', 'R'].map((nm, i) => G.vlabel(Q[i], c2, nm)).join('')}${G.slabel(Q[0], Q[1], c2, '6')}${G.slabel(Q[2], Q[0], c2, '4')}</g></svg>`;
      stage.innerHTML = s; return { big: $('#big', stage), lab: $('#lab', stage) };
    },
    frames: [
      { c: ['△ABC with sides 3 and 2.', '△ABC 的兩邊是 3 和 2。'], f() { } },
      { c: ['Enlarge it 2 times…', '把它放大 2 倍……'], d: 3000, f(st) { st.big.style.transform = 'scale(1)'; } },
      { c: ['Sides become 6 and 4. Angles stay the SAME.', '邊變成 6 和 4，角保持不變。'], f(st) { st.lab.setAttribute('opacity', 1); } },
      { c: ['△ABC ~ △PQR. Ratio of sides: 6/3 = 4/2 = 2', '△ABC ~ △PQR。邊的比：6/3 = 4/2 = 2'], f() { } }
    ]
  };
  function simFig(kind, n1, n2, o = {}) {
    const base = o.base || pick(SHAPES); const L0 = sideLens(base), A = triAngles(base); const k = o.k || pick([2, 3, 1.5, 0.5]);
    const rot = o.rot != null ? o.rot : pick([0, 180, 90, -60]), flip = o.flip != null ? o.flip : Math.random() < .5; let m1 = { names: n1 }, m2 = { names: n2 };
    if (kind === 'AAA') { m1.angles = { 0: { lab: A[0] + '°' }, 1: { lab: A[1] + '°', c: G.COL.b } }; m2.angles = { 0: { lab: A[0] + '°' }, 2: { lab: A[2] + '°', c: G.COL.c } }; }
    if (kind === 'SSS' || kind === 'NO') { m1.sides = { 0: { lab: L0[0] }, 1: { lab: L0[1] }, 2: { lab: L0[2] } }; const bad = kind === 'NO' ? ri(0, 2) : -1; m2.sides = { 0: { lab: r1(L0[0] * k + (bad === 0 ? 1 : 0)) }, 1: { lab: r1(L0[1] * k + (bad === 1 ? 1 : 0)) }, 2: { lab: r1(L0[2] * k + (bad === 2 ? 1 : 0)) } }; }
    if (kind === 'SAS') { m1.sides = { 0: { lab: L0[0] }, 1: { lab: L0[1] } }; m1.angles = { 1: { lab: A[1] + '°' } }; m2.sides = { 0: { lab: r1(L0[0] * k) }, 1: { lab: r1(L0[1] * k) } }; m2.angles = { 1: { lab: A[1] + '°' } }; }
    return triPair(base, m1, m2, { rot, flip, s: Math.min(1.4, Math.max(.75, k)) });
  }

  const condSlides = () => SL(L('3 ways to show triangles are similar', '證明三角形相似的 3 個方法'), [
    { h: simFig('AAA', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false, k: 1.5 }) + '<div class="ex"><b>AAA</b></div>', c: ['AAA: all angles equal. (2 equal angles are enough — the 3rd must match.)', 'A.A.A.：三角都相等。（兩角相等已足夠，第三角必定相等。）'] },
    { h: simFig('SSS', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false, k: 1.5 }) + '<div class="ex"><b>3 sides proportional</b></div>', c: ['All 3 pairs of sides have the same ratio.', '三對邊的比都相同。'] },
    { h: simFig('SAS', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false, k: 1.5 }) + '<div class="ex"><b>2 sides prop., inc. ∠ equal</b></div>', c: ['2 pairs of sides same ratio, and the angle between them equal.', '兩對邊的比相同，且夾角相等。'] }
  ], 300);

  const parFig = (lab) => { const A = [120, 10], Bp = [10, 200], C = [260, 200]; const D = [76, 86], E = [176, 86];
    return G.open(300, 230) + G.poly([A, Bp, C], { fill: '#f8fafc' }) + G.line(D, E) + G.arrows(D, E, 1) + G.arrows(Bp, C, 1) + G.vlabel(A, [130, 130], 'A') + G.txt([8, 212], 'B', { italic: true }) + G.txt([272, 210], 'C', { italic: true }) + G.txt([62, 82], 'D', { italic: true }) + G.txt([190, 82], 'E', { italic: true }) + (lab || '') + '</svg>'; };

  const lessons = [
    {
      t: ['Similar triangles', '相似三角形'],
      body: ul([B(`${T('Similar', '相似')} = same shape (size may differ). Symbol: ~`, '相似 = 形狀相同（大小可以不同）。符號：~'),
      B('Corresponding angles are equal.', '對應角相等。'),
      B('Corresponding sides are in the same ratio: AB/PQ = BC/QR = CA/RP', '對應邊成比例：AB/PQ = BC/QR = CA/RP')]),
      anim: scaleAnim
    },
    {
      t: ['Conditions for similar triangles', '相似三角形的條件'],
      body: `<table class="t"><tr><td><b>AAA</b></td><td>${L('3 angles equal', '三角相等')}</td></tr><tr><td><b>3 sides proportional</b></td><td>${L('三邊成比例', '三邊成比例')}</td></tr><tr><td><b>2 sides prop., inc. ∠ equal</b></td><td>${L('兩邊成比例且夾角相等', '兩邊成比例且夾角相等')}</td></tr></table>`,
      anim: condSlides
    },
    {
      t: ['Finding unknown sides', '求未知邊'],
      body: B('Write the ratio of corresponding sides, then solve.', '寫出對應邊的比，然後求解。'),
      anim: W(L('△ABC ~ △PQR, AB = 4, BC = 6, PQ = 10. Find QR.', '△ABC ~ △PQR，AB = 4，BC = 6，PQ = 10。求 QR。'), [
        { h: `${fr('PQ', 'AB')} = ${fr('QR', 'BC')}`, c: ['Big triangle over small triangle, same order.', '大三角形除以小三角形，次序相同。'] },
        { h: `${fr(10, 4)} = ${fr('QR', 6)}`, c: ['Put in the numbers.', '代入數字。'] },
        { h: `QR = ${fr(10, 4)} × 6`, c: ['Multiply both sides by 6.', '兩邊乘以 6。'] },
        { h: '<b class="green">QR = 15</b>', c: ['Ratio is 2.5, so 6 × 2.5 = 15.', '比是 2.5，所以 6 × 2.5 = 15。'] }
      ])
    },
    {
      t: ['Parallel line in a triangle', '三角形內的平行線'],
      body: B('If DE // BC, then △ADE ~ △ABC (AAA: corr. ∠s, DE // BC).', '若 DE // BC，則 △ADE ~ △ABC（A.A.A.：同位角，DE // BC）。') + `<div class="qfig">${parFig()}</div>`,
      anim: W(L('AD = 3, AB = 9, DE = 4. Find BC.', 'AD = 3，AB = 9，DE = 4。求 BC。'), [
        { h: '△ADE ~ △ABC', c: ['The small triangle is similar to the big one.', '小三角形與大三角形相似。'] },
        { h: `${fr('BC', 'DE')} = ${fr('AB', 'AD')}`, c: ['Use AB (whole side), not DB!', '用 AB（整條邊），不是 DB！'] },
        { h: `${fr('BC', 4)} = ${fr(9, 3)} = 3`, c: ['Ratio = 3.', '比 = 3。'] },
        { h: '<b class="green">BC = 12</b>', c: ['BC = 4 × 3 = 12', 'BC = 4 × 3 = 12'] }
      ])
    },
    {
      t: ['Similar figures', '相似圖形'],
      body: ul([B('Similar polygons: corresponding angles equal, corresponding sides in the same ratio.', '相似多邊形：對應角相等，對應邊成比例。'), B('ABCD ~ EFGH → ∠A = ∠E, AB/EF = BC/FG = …', 'ABCD ~ EFGH → ∠A = ∠E，AB/EF = BC/FG = …')])
    }
  ];

  const N = () => shuffle(LETTERS).slice(0, 2);
  const CN = { AAA: 'AAA', SSS: '3 sides proportional', SAS: '2 sides prop., inc. ∠ equal', NO: L('Not similar / not enough info', '不相似 / 資料不足') };
  const gens = [
    {
      id: 'cond', name: ['Which condition?', '哪個條件？'], gen() {
        const k = pick(['AAA', 'SSS', 'SAS', 'NO']); const [a, b] = N(); const fig = simFig(k, a, b);
        return { kind: 'mc', fig, q: L('Are the two triangles similar? Give the reason.', '兩個三角形是否相似？寫出理由。'), choices: [CN[k], ...['AAA', 'SSS', 'SAS', 'NO'].filter(x => x !== k).map(x => CN[x])],
          steps: [k === 'AAA' ? L('Two angles equal → the third angle is equal too.', '兩角相等 → 第三角也相等。') : k === 'SAS' ? L('Check the 2 side ratios, and that the angle is between them.', '檢查兩對邊的比，以及角是否夾角。') : L('Divide each pair of corresponding sides (big ÷ small).', '每對對應邊相除（大 ÷ 小）。'), k === 'NO' ? L('The ratios are NOT all the same.', '比不是全部相同。') : '', `<b>${CN[k]}</b>`].filter(Boolean) };
      }
    },
    {
      id: 'find', name: ['Find a side', '求邊長'], gen() {
        const base = pick(SHAPES); const L0 = sideLens(base); if (new Set(L0).size < 3) return null; const [a, b] = N(); const k = pick([2, 3, 1.5, 2.5, 0.5]);
        const i = ri(0, 2), j = (i + ri(1, 2)) % 3; const s1 = { [i]: { lab: L0[i] }, [j]: { lab: L0[j] } }, s2 = { [i]: { lab: r1(L0[i] * k) }, [j]: { lab: 'x', lc: G.COL.a } };
        const fig = triPair(base, { names: a, sides: s1 }, { names: b, sides: s2 }, { rot: pick([0, 180, 90]), flip: Math.random() < .5, s: Math.min(1.4, Math.max(.75, k)) });
        const sn = (n, x) => n[x] + n[(x + 1) % 3]; const ans = r1(L0[j] * k);
        return { kind: 'num', fig, q: `${TRI}${a.join('')} ~ ${TRI}${b.join('')}. ` + L('Find x.', '求 x。'), pre: v('x') + ' =', ans, steps: [`${fr(v('x'), sn(a, j))} = ${fr(sn(b, i), sn(a, i))} (corr. sides, ~△s)`, `${fr(v('x'), L0[j])} = ${fr(r1(L0[i] * k), L0[i])}`, `${v('x')} = <b>${ans}</b>`], hint: L('Ratio = known pair (other ÷ this).', '比 = 已知的一對邊相除。') };
      }
    },
    {
      id: 'par', name: ['Parallel line DE // BC', '平行線 DE // BC'], gen() {
        const ad = ri(2, 6), db = ri(2, 8), de = ri(3, 9); const ab = ad + db; const bc = r1(de * ab / ad); const t = Math.random() < .5;
        if (t) return { kind: 'num', fig: parFig(), q: L(`In the figure, DE // BC. AD = ${ad}, DB = ${db}, DE = ${de}. Find BC.`, `圖中 DE // BC。AD = ${ad}，DB = ${db}，DE = ${de}。求 BC。`), pre: 'BC =', ans: r1(de * ab / ad), tol: .05,
          steps: ['△ADE ~ △ABC (AAA)', `AB = ${ad} + ${db} = ${ab}`, `${fr('BC', de)} = ${fr(ab, ad)}`, `BC = <b>${r1(de * ab / ad)}</b>`], hint: L('Use AB = AD + DB.', '用 AB = AD + DB。') };
        const BC = ri(6, 16); return { kind: 'num', fig: parFig(), q: L(`In the figure, DE // BC. AD = ${ad}, AB = ${ab}, BC = ${BC}. Find DE.`, `圖中 DE // BC。AD = ${ad}，AB = ${ab}，BC = ${BC}。求 DE。`), pre: 'DE =', ans: r1(BC * ad / ab), tol: .05,
          steps: ['△ADE ~ △ABC (AAA)', `${fr('DE', BC)} = ${fr(ad, ab)}`, `DE = <b>${r1(BC * ad / ab)}</b>`], fmt: L('Round to 1 decimal place if needed.', '如有需要，取至 1 位小數。') };
      }
    },
    {
      id: 'ratio', name: ['Proportional or not?', '是否成比例？'], gen() {
        const a = ri(2, 8), b = ri(a, 10), c = ri(b, 12); const k = pick([2, 3, 1.5]); const yes = Math.random() < .5; const bad = ri(0, 2);
        const s2 = [a, b, c].map((x, i) => r1(x * k + (!yes && i === bad ? pick([1, -1]) : 0)));
        return { kind: 'mc', keep: 1, q: L(`Triangle 1 has sides ${a}, ${b}, ${c}. Triangle 2 has sides ${s2.join(', ')}. Are they similar?`, `三角形 1 的邊是 ${a}、${b}、${c}；三角形 2 的邊是 ${s2.join('、')}。它們是否相似？`), choices: yes ? [L('Yes (3 sides proportional)', '是（三邊成比例）'), L('No', '否')] : [L('No', '否'), L('Yes (3 sides proportional)', '是（三邊成比例）')],
          steps: [L('Match smallest with smallest, and so on. Divide:', '最短配最短……然後相除：'), `${s2[0]}/${a} = ${r1(s2[0] / a)}, ${s2[1]}/${b} = ${r1(s2[1] / b)}, ${s2[2]}/${c} = ${r1(s2[2] / c)}`, yes ? `<b>${L('All equal → similar', '全部相等 → 相似')}</b>` : `<b>${L('Not all equal → not similar', '不全相等 → 不相似')}</b>`] };
      }
    },
    {
      id: 'poly', name: ['Similar figures', '相似圖形'], gen() {
        const ab = ri(3, 8), bc = ri(3, 10), k = pick([2, 3, 1.5, 0.5]); const t = Math.random() < .6;
        if (t) return { kind: 'num', q: L(`ABCD ~ EFGH. AB = ${ab} cm, BC = ${bc} cm, EF = ${r1(ab * k)} cm. Find FG.`, `ABCD ~ EFGH。AB = ${ab} cm，BC = ${bc} cm，EF = ${r1(ab * k)} cm。求 FG。`), pre: 'FG =', post: 'cm', ans: r1(bc * k), steps: [`${fr('FG', 'BC')} = ${fr('EF', 'AB')}`, `${fr('FG', bc)} = ${fr(r1(ab * k), ab)} = ${k}`, `FG = <b>${r1(bc * k)}</b>`] };
        const ang = ri(60, 130); return { kind: 'num', q: L(`ABCD ~ EFGH and ∠B = ${ang}°. Find ∠F.`, `ABCD ~ EFGH，∠B = ${ang}°。求 ∠F。`), pre: '∠F =', post: '°', ans: ang, steps: [L('B ↔ F (2nd letters).', 'B ↔ F（第 2 個字母）。'), `∠F = ∠B = <b>${ang}°</b> (corr. ∠s, ~ figures)`] };
      }
    },
    {
      id: 'corr', name: ['Corresponding sides', '對應邊'], gen() {
        const [a, b] = N(); const p = shuffle([0, 1, 2]); const n2 = p.map(i => b[i]); const i = ri(0, 2), j = (i + 1) % 3;
        const right = `${fr(a[i] + a[j], n2[i] + n2[j])} = ${fr(a[j] + a[(j + 1) % 3], n2[j] + n2[(j + 1) % 3])}`;
        const wrong = [`${fr(a[i] + a[j], n2[j] + n2[(j + 1) % 3])} = ${fr(a[j] + a[(j + 1) % 3], n2[i] + n2[j])}`, `${fr(a[i] + a[j], n2[(j + 1) % 3] + n2[i])} = ${fr(a[j] + a[(j + 1) % 3], n2[i] + n2[j])}`, `${fr(a[i] + a[j], a[j] + a[(j + 1) % 3])} = ${fr(n2[j] + n2[(j + 1) % 3], n2[i] + n2[j])}`];
        return { kind: 'mc', q: `${TRI}${a.join('')} ~ ${TRI}${n2.join('')}. ` + L('Which is correct?', '下列哪項正確？'), choices: [right, ...wrong], steps: [L('Match letters by position.', '按位置配對字母。'), `<b>${right}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch1', no: 1, color: COLORS[1], title: ['Similar Triangles', '相似三角形'], short: ['Similar △', '相似三角形'],
    lessons, gens,
    keys: [B('~ means same shape; sizes can differ.', '~ 表示形狀相同，大小可以不同。'), B('Conditions: AAA; 3 sides proportional; 2 sides prop., inc. ∠ equal.', '條件：A.A.A.；三邊成比例；兩邊成比例且夾角相等。'), B('Corresponding sides: same ratio. Corresponding angles: equal.', '對應邊比相同；對應角相等。'), B('DE // BC → △ADE ~ △ABC.', 'DE // BC → △ADE ~ △ABC。')],
    traps: [B('✘ Using DB instead of AB for the big triangle', '✘ 大三角形用了 DB 而不是 AB'), B('✘ Mixing up the order of the ratio (big/small vs small/big)', '✘ 比的次序混亂（大/小 與 小/大）'), B('✘ Similar means equal sides &nbsp; ✔ only proportional', '✘ 相似即邊相等 &nbsp; ✔ 只是成比例')],
    cheat: [`AAA · 3 sides prop. · 2 sides prop., inc. ∠`, `${fr('AB', 'PQ')} = ${fr('BC', 'QR')} = ${fr('CA', 'RP')}`, 'DE // BC → △ADE ~ △ABC']
  });
})();
