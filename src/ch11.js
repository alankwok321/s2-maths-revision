/* ================= Ch11 Geometric Proof ================= */
(function () {
  const R = {
    adj: ['adj. ∠s on st. line', '直線上的鄰角'], vert: ['vert. opp. ∠s', '對頂角'], pt: ['∠s at a pt.', '同頂角'],
    corr: ['corr. ∠s, AB // CD', '同位角，AB // CD'], alt: ['alt. ∠s, AB // CD', '內錯角，AB // CD'], int: ['int. ∠s, AB // CD', '同旁內角，AB // CD'],
    corrE: ['corr. ∠s equal', '同位角相等'], altE: ['alt. ∠s equal', '內錯角相等'], intS: ['int. ∠s supp.', '同旁內角互補'],
    sum: ['∠ sum of △', '三角形內角和'], ext: ['ext. ∠ of △', '三角形外角'], base: ['base ∠s, isos. △', '等腰三角形底角'], given: ['given', '已知']
  };
  const rs = k => `(${R[k][0]})`, rL = k => L(R[k][0], R[k][1]);
  /* parallel lines figure */
  function parFig(marks, o = {}) {
    const tx = o.tx || 150, bx = o.bx || 250; const T = [tx, 10], Bt = [bx, 230]; const y1 = 70, y2 = 170;
    const at = y => [T[0] + (Bt[0] - T[0]) * (y - T[1]) / (Bt[1] - T[1]), y]; const P = at(y1), Q = at(y2);
    let s = G.open(400, 240) + G.line([20, y1], [380, y1]) + G.line([20, y2], [380, y2]) + G.line(T, Bt) + G.arrows([150, y1], [230, y1], 1) + G.arrows([150, y2], [230, y2], 1);
    s += G.txt([12, y1], 'A', { italic: true }) + G.txt([390, y1], 'B', { italic: true }) + G.txt([12, y2], 'C', { italic: true }) + G.txt([390, y2], 'D', { italic: true });
    const dir = { ur: [[1, 0], [-0, -1]], ul: [[0, -1], [-1, 0]], ll: [[-1, 0], [0, 1]], lr: [[0, 1], [1, 0]] };
    const up = G.unit(G.sub(T, Bt)), dn = G.mul(up, -1);
    const ray = (V, d) => d[1] === -1 ? G.add(V, G.mul(up, 50)) : d[1] === 1 ? G.add(V, G.mul(dn, 50)) : G.add(V, [d[0] * 50, 0]);
    (marks || []).forEach(m => { const V = m.at === 'P' ? P : Q; const [d1, d2] = dir[m.pos]; s += G.arc(V, ray(V, d1), ray(V, d2), { label: m.lab, c: m.c || G.COL.a, r: 20, n: m.n || 1, italic: /^[a-z]$/.test(m.lab) }); });
    return s + '</svg>';
  }
  function parAngles(tx, bx) { const th = Math.round(Math.atan2(220, bx - tx) * 180 / Math.PI); /* angle between +x and down direction */ return { lr: th, ll: 180 - th, ul: th, ur: 180 - th }; }
  function lineFig(kind, labs) {
    let s = G.open(340, 200); const O = [170, 130];
    if (kind === 'adj') { s += G.line([20, 130], [320, 130]); const C = [230, 25]; s += G.line(O, C); s += G.arc(O, [20, 130], C, { label: labs[0], r: 26 }) + G.arc(O, C, [320, 130], { label: labs[1], c: G.COL.b, r: 22 }) + G.txt([12, 145], 'A', { italic: true }) + G.txt([328, 145], 'B', { italic: true }) + G.txt([170, 150], 'O', { italic: true }) + G.txt([238, 18], 'C', { italic: true }); }
    if (kind === 'vert') { const A = [30, 40], Bp = [310, 190], C = [30, 190], D = [310, 40]; const X0 = [170, 115]; s += G.line(A, Bp) + G.line(C, D); s += G.arc(X0, A, D, { label: labs[0], r: 24 }) + G.arc(X0, C, Bp, { label: labs[1], c: G.COL.b, r: 24 }); }
    if (kind === 'pt') { const O2 = [170, 105]; const angs = [0, 110, 215]; const pts = angs.map(a => [O2[0] + 90 * Math.cos(a * Math.PI / 180), O2[1] - 90 * Math.sin(a * Math.PI / 180)]); pts.forEach(p => s += G.line(O2, p)); for (let i = 0; i < 3; i++) s += G.arc(O2, pts[i], pts[(i + 1) % 3], { label: labs[i], c: [G.COL.a, G.COL.b, G.COL.c][i], r: 22 }); }
    return s + '</svg>';
  }
  function triExtFig(la, lb, lc, lx) { const A = [110, 20], Bp = [20, 170], C = [200, 170], D = [300, 170]; let s = G.open(320, 200) + G.poly([A, Bp, C], { fill: '#f8fafc' }) + G.line(C, D); if (la) s += G.arc(A, Bp, C, { label: la, r: 22 }); if (lb) s += G.arc(Bp, C, A, { label: lb, c: G.COL.b, r: 22 }); if (lc) s += G.arc(C, A, Bp, { label: lc, c: G.COL.d, r: 18 }); if (lx) s += G.arc(C, D, A, { label: lx, c: G.COL.c, r: 22 }); return s + G.txt([110, 8], 'A', { italic: true }) + G.txt([10, 185], 'B', { italic: true }) + G.txt([200, 188], 'C', { italic: true }) + G.txt([305, 188], 'D', { italic: true }) + '</svg>'; }

  const pairSlides = () => SL(L('Angles and parallel lines', '角與平行線'), [
    { h: parFig([{ at: 'P', pos: 'lr', lab: 'a' }, { at: 'Q', pos: 'lr', lab: 'b', c: G.COL.b }]) + `<div class="ex">a = b &nbsp; (corr. ∠s, AB // CD)</div>`, c: ['Corresponding angles: same position at each crossing (F-shape). They are equal.', '同位角：在兩個交點的相同位置（F 形），相等。'] },
    { h: parFig([{ at: 'P', pos: 'll', lab: 'a' }, { at: 'Q', pos: 'ur', lab: 'b', c: G.COL.b }]) + `<div class="ex">a = b &nbsp; (alt. ∠s, AB // CD)</div>`, c: ['Alternate angles: inside, on opposite sides (Z-shape). They are equal.', '內錯角：在兩線之間，位於截線兩側（Z 形），相等。'] },
    { h: parFig([{ at: 'P', pos: 'lr', lab: 'a' }, { at: 'Q', pos: 'ur', lab: 'b', c: G.COL.b }]) + `<div class="ex">a + b = 180° &nbsp; (int. ∠s, AB // CD)</div>`, c: ['Interior angles: inside, same side (C-shape). They add up to 180°.', '同旁內角：在兩線之間，位於截線同側（C 形），和為 180°。'] },
    { h: `<div class="ex" style="line-height:2">corr. ∠s equal → AB // CD<br>alt. ∠s equal → AB // CD<br>int. ∠s supp. → AB // CD</div>`, c: ['To PROVE lines are parallel, use the reverse reasons.', '要證明兩線平行，用相反的理由。'] }
  ], 300);

  const lessons = [
    {
      t: ['How to write a proof', '怎樣寫證明'],
      body: ul([B('Each line: a statement + (reason).', '每一行：一句陳述 +（理由）。'), B('∵ = because, ∴ = therefore.', '∵ = 因為，∴ = 所以。'), B('Use only facts that are given or already proved.', '只可用已知或已證明的事實。')]) +
        `<table class="t"><tr><th>${L('Reason', '理由')}</th><th>${L('Meaning', '意思')}</th></tr>${[['adj', 'a + b = 180° on a straight line', '直線上的鄰角和為 180°'], ['vert', 'opposite angles at a crossing are equal', '對頂角相等'], ['pt', 'angles round a point = 360°', '同頂角和為 360°'], ['corr', 'corresponding angles equal', '同位角相等'], ['alt', 'alternate angles equal', '內錯角相等'], ['int', 'interior angles add to 180°', '同旁內角和為 180°'], ['sum', 'angles of a △ add to 180°', '三角形內角和為 180°'], ['ext', 'ext. ∠ = sum of 2 interior opp. ∠s', '外角 = 兩個內對角之和'], ['base', 'base angles of isos. △ equal', '等腰三角形底角相等']].map(([k, e, z]) => `<tr><td><b>${R[k][0]}</b><br><span class="sub">${R[k][1]}</span></td><td>${L(e, z)}</td></tr>`).join('')}</table>`
    },
    {
      t: ['Proofs about lines', '有關直線的證明'],
      anim: W(L('AOB is a straight line. Find x.', 'AOB 是一條直線。求 x。'), [
        { h: '', c: ['Angles on a straight line add up to 180°.', '直線上的鄰角和為 180°。'] },
        { h: `${v('x')} + 2${v('x')} = 180° &nbsp;<span class="note">${R.adj[0]}</span>`, c: ['Write the equation with the reason.', '寫出方程及理由。'] },
        { h: `3${v('x')} = 180°`, c: ['Collect.', '合併。'] },
        { h: `<b class="green">${v('x')} = 60°</b>`, c: ['x = 60°', 'x = 60°'] }
      ], { top: `<div>${lineFig('adj', ['x', '2x'])}</div>` })
    },
    {
      t: ['Proofs with parallel lines', '有關平行線的證明'],
      anim: pairSlides
    },
    {
      t: ['Proofs with triangles', '有關三角形的證明'],
      anim: W(L('Prove ∠ACD = ∠A + ∠B', '證明 ∠ACD = ∠A + ∠B'), [
        { h: `∠A + ∠B + ∠ACB = 180° &nbsp;<span class="note">${R.sum[0]}</span>`, c: ['Angles in △ABC.', '△ABC 的內角。'] },
        { h: `∠ACB + ∠ACD = 180° &nbsp;<span class="note">${R.adj[0]}</span>`, c: ['B, C, D on a straight line.', 'B、C、D 在一直線上。'] },
        { h: '∴ ∠ACD = 180° − ∠ACB', c: ['From the 2nd line.', '由第 2 行。'] },
        { h: '<b class="green">∴ ∠ACD = ∠A + ∠B</b>', c: ['Both equal 180° − ∠ACB. Proved!', '兩者都等於 180° − ∠ACB。證畢！'] }
      ], { top: `<div>${triExtFig('A', 'B', null, '')}</div>` })
    }
  ];

  const gens = [
    {
      id: 'reason', name: ['Choose the reason', '選擇理由'], gen() {
        const tx = ri(110, 180), bx = ri(230, 300);
        const S = [
          ['adj', lineFig('adj', ['a', 'b']), 'a + b = 180°'],
          ['vert', lineFig('vert', ['a', 'b']), 'a = b'],
          ['pt', lineFig('pt', ['a', 'b', 'c']), 'a + b + c = 360°'],
          ['corr', parFig([{ at: 'P', pos: pick(['ur', 'lr']), lab: 'a' }].map(m => m).concat([]), { tx, bx }), null],
          ['alt', null, null], ['int', null, null], ['sum', triExtFig('a', 'b', 'c', null), 'a + b + c = 180°'], ['ext', triExtFig('a', 'b', null, 'x'), 'x = a + b']
        ];
        let [k, fig, st] = pick(S);
        if (k === 'corr') { const p = pick(['ur', 'ul', 'll', 'lr']); fig = parFig([{ at: 'P', pos: p, lab: 'a' }, { at: 'Q', pos: p, lab: 'b', c: G.COL.b }], { tx, bx }); st = 'a = b'; }
        if (k === 'alt') { const [p, q] = pick([['ll', 'ur'], ['lr', 'ul']]); fig = parFig([{ at: 'P', pos: p, lab: 'a' }, { at: 'Q', pos: q, lab: 'b', c: G.COL.b }], { tx, bx }); st = 'a = b'; }
        if (k === 'int') { const [p, q] = pick([['ll', 'ul'], ['lr', 'ur']]); fig = parFig([{ at: 'P', pos: p, lab: 'a' }, { at: 'Q', pos: q, lab: 'b', c: G.COL.b }], { tx, bx }); st = 'a + b = 180°'; }
        const pool = ['adj', 'vert', 'pt', 'corr', 'alt', 'int', 'sum', 'ext'].filter(x => x !== k);
        return { kind: 'mc', fig, q: L('Which reason explains the statement?', '哪個理由可以解釋下面的陳述？') + `<span class="big">${st}</span>`, choices: [rL(k), ...shuffle(pool).slice(0, 3).map(rL)], steps: [`<b>${st} &nbsp;(${R[k][0]})</b>`, L(R[k][1], R[k][1])] };
      }
    },
    {
      id: 'para', name: ['Parallel lines: find x', '平行線：求 x'], gen() {
        const tx = ri(110, 170), bx = ri(240, 300); const A = parAngles(tx, bx); const rel = pick(['corr', 'alt', 'int', 'vert']);
        let p, q, ans, why, at2 = 'Q';
        if (rel === 'corr') { p = q = pick(['ur', 'ul', 'll', 'lr']); ans = A[p]; why = 'corr'; }
        if (rel === 'alt') { [p, q] = pick([['ll', 'ur'], ['lr', 'ul']]); ans = A[p]; why = 'alt'; }
        if (rel === 'int') { [p, q] = pick([['ll', 'ul'], ['lr', 'ur']]); ans = 180 - A[p]; why = 'int'; }
        if (rel === 'vert') { [p, q] = pick([['ur', 'll'], ['ul', 'lr']]); ans = A[p]; why = 'vert'; at2 = 'P'; }
        const fig = parFig([{ at: 'P', pos: p, lab: A[p] + '°' }, { at: at2, pos: q, lab: 'x', c: G.COL.b }], { tx, bx });
        return { kind: 'num', fig, q: L('AB // CD. Find x.', 'AB // CD。求 x。'), pre: v('x') + ' =', post: '°', ans, steps: [rel === 'int' ? `${v('x')} + ${A[p]}° = 180° &nbsp;${rs(why)}` : `${v('x')} = ${A[p]}° &nbsp;${rs(why)}`, `${v('x')} = <b>${ans}°</b>`], hint: L('Corresponding / alternate → equal. Interior → add to 180°.', '同位角 / 內錯角 → 相等；同旁內角 → 和為 180°。') };
      }
    },
    {
      id: 'line', name: ['Lines: find x', '直線：求 x'], gen() {
        const t = ri(0, 2);
        if (t === 0) { const k = ri(2, 4), x = 180 / (k + 1); if (!Number.isInteger(x)) return null; return { kind: 'num', fig: lineFig('adj', ['x', `${k}x`]), q: L('AOB is a straight line. Find x.', 'AOB 是一條直線。求 x。'), pre: v('x') + ' =', post: '°', ans: x, steps: [`${v('x')} + ${k}${v('x')} = 180° &nbsp;${rs('adj')}`, `${k + 1}${v('x')} = 180°`, `${v('x')} = <b>${x}°</b>`] }; }
        if (t === 1) { const a = ri(25, 80), d = ri(5, 30); return { kind: 'num', fig: lineFig('vert', [`${a + d}°`, `x + ${d}°`]), q: L('Two straight lines cross. Find x.', '兩條直線相交。求 x。'), pre: v('x') + ' =', post: '°', ans: a, steps: [`${v('x')} + ${d}° = ${a + d}° &nbsp;${rs('vert')}`, `${v('x')} = <b>${a}°</b>`] }; }
        const a = ri(90, 150), b = ri(60, 130); const x = 360 - a - b; if (x < 60 || x > 170) return null;
        return { kind: 'num', fig: lineFig('pt', [a + '°', b + '°', 'x']), q: L('Find x.', '求 x。'), pre: v('x') + ' =', post: '°', ans: x, steps: [`${v('x')} + ${a}° + ${b}° = 360° &nbsp;${rs('pt')}`, `${v('x')} = <b>${x}°</b>`] };
      }
    },
    {
      id: 'tri', name: ['Triangles: find x', '三角形：求 x'], gen() {
        const a = ri(30, 80), b = ri(30, 80); if (a + b > 160) return null; const t = Math.random() < .5;
        if (t) return { kind: 'num', fig: triExtFig(a + '°', b + '°', 'x', null), q: L('Find x.', '求 x。'), pre: v('x') + ' =', post: '°', ans: 180 - a - b, steps: [`${v('x')} + ${a}° + ${b}° = 180° &nbsp;${rs('sum')}`, `${v('x')} = <b>${180 - a - b}°</b>`] };
        return { kind: 'num', fig: triExtFig(a + '°', 'x', null, (a + b) + '°'), q: L('BCD is a straight line. Find x.', 'BCD 是一條直線。求 x。'), pre: v('x') + ' =', post: '°', ans: b, steps: [`${v('x')} + ${a}° = ${a + b}° &nbsp;${rs('ext')}`, `${v('x')} = <b>${b}°</b>`] };
      }
    },
    {
      id: 'prove', name: ['Prove lines parallel', '證明兩線平行'], gen() {
        const tx = ri(110, 170), bx = ri(240, 300); const A = parAngles(tx, bx); const k = pick(['corrE', 'altE', 'intS']);
        let p, q, lq;
        if (k === 'corrE') { p = q = pick(['ur', 'lr']); lq = A[p]; }
        if (k === 'altE') { [p, q] = pick([['ll', 'ur'], ['lr', 'ul']]); lq = A[p]; }
        if (k === 'intS') { [p, q] = pick([['ll', 'ul'], ['lr', 'ur']]); lq = 180 - A[p]; }
        const fig = parFig([{ at: 'P', pos: p, lab: A[p] + '°' }, { at: 'Q', pos: q, lab: lq + '°', c: G.COL.b }], { tx, bx }).replace(/<polyline points="[^"]*" fill="none" stroke="#1d2a3a" stroke-width="1.8"\/>/g, '');
        return { kind: 'mc', fig, q: L('From the angles shown, AB // CD. Which reason?', '根據圖中的角，AB // CD。用哪個理由？'), choices: [rL(k), ...['corrE', 'altE', 'intS', 'corr'].filter(x => x !== k).map(rL)], steps: [k === 'intS' ? `${A[p]}° + ${lq}° = 180°` : `${A[p]}° = ${lq}°`, `∴ AB // CD &nbsp;<b>(${R[k][0]})</b>`], hint: L('To prove // use: corr. ∠s equal / alt. ∠s equal / int. ∠s supp.', '證明平行用：同位角相等 / 內錯角相等 / 同旁內角互補。') };
      }
    }
  ];

  CH.push({
    id: 'ch11', no: 11, color: COLORS[11], title: ['Geometric Proof', '幾何證明'], short: ['Geometric Proof', '幾何證明'],
    lessons, gens,
    keys: [B('Every statement needs a reason in brackets.', '每句陳述都要在括號寫理由。'), B('Straight line 180°; point 360°; vertically opposite ∠s equal.', '直線 180°；同頂角 360°；對頂角相等。'), B('AB // CD → corr. ∠s equal, alt. ∠s equal, int. ∠s add to 180°.', 'AB // CD → 同位角相等、內錯角相等、同旁內角和為 180°。'), B('To prove //: corr. ∠s equal / alt. ∠s equal / int. ∠s supp.', '證明平行：同位角相等 / 內錯角相等 / 同旁內角互補。'), B('△: ∠ sum 180°; ext. ∠ = sum of 2 interior opp. ∠s.', '三角形：內角和 180°；外角 = 兩內對角之和。')],
    traps: [B('✘ Using “alt. ∠s, AB // CD” to prove AB // CD &nbsp; ✔ use “alt. ∠s equal”', '✘ 用「內錯角，AB // CD」證明 AB // CD &nbsp; ✔ 用「內錯角相等」'), B('✘ Interior angles are equal &nbsp; ✔ they add to 180°', '✘ 同旁內角相等 &nbsp; ✔ 和為 180°'), B('✘ Missing reasons in brackets', '✘ 漏寫括號內的理由')],
    cheat: ['adj. ∠s on st. line · vert. opp. ∠s · ∠s at a pt.', 'corr. / alt. ∠s → =; int. ∠s → 180°', `${L('Prove //', '證明 //')}: corr. ∠s equal · alt. ∠s equal · int. ∠s supp.`, '∠ sum of △ · ext. ∠ of △']
  });
})();
