/* ================= Ch11 proofs: chains of reasons ================= */
(function () {
  const C11 = CH.find(c => c.id === 'ch11');
  /* parallel-line figure with points P (upper crossing) and Q (lower crossing) */
  function PL(tx = 130, bx = 280) {
    const T = [tx, 10], U = [bx, 250]; const at = y => [T[0] + (U[0] - T[0]) * (y - T[1]) / (U[1] - T[1]), y];
    const P = { A: [20, 70], B: [380, 70], C: [20, 185], D: [380, 185], T, U, P: at(70), Q: at(185) };
    const th = Math.round(Math.atan2(U[1] - T[1], U[0] - T[0]) * 180 / Math.PI); /* lr angle */
    const ang = { lr: th, ul: th, ll: 180 - th, ur: 180 - th };
    const ray = { ur: ['B', 'T'], ul: ['T', 'A'], ll: ['A', 'U'], lr: ['U', 'B'] };
    const rayQ = { ur: ['D', 'T'], ul: ['T', 'C'], ll: ['C', 'U'], lr: ['U', 'D'] };
    const arc = (at2, pos, lab, c, n) => { const [a, b] = at2 === 'P' ? ray[pos] : rayQ[pos]; return { v: at2, a, b, lab, c, n }; };
    const hl = (at2, pos) => { const [a, b] = at2 === 'P' ? ray[pos] : rayQ[pos]; return { v: at2, a, b }; };
    const fig = (o = {}) => GF({ P, segs: ['AB', 'CD', 'TU'], noNames: ['T', 'U'], off: { P: [-16, -14], Q: [18, 16] }, w: 400, h: 260, ...o });
    return { ang, arc, hl, fig };
  }
  /* isosceles triangle with BC extended to D */
  const IS = { A: [150, 20], B: [40, 210], C: [260, 210], D: [370, 210] };
  const isoF = (o = {}) => GF({ P: IS, segs: ['AB', 'AC', 'BD'], w: 390, h: 240, ...o });

  /* ---------- lessons ---------- */
  const g = PL(140, 270); const vv = g.ang.ur;
  const lessonPar = {
    t: ['Proving lines are parallel', '證明兩線平行'],
    body: box('rule', L('Which kind of reason?', '用哪一類理由？'), `<table class="t"><tr><th>${L('You KNOW AB // CD (use it)', '已知 AB // CD（使用它）')}</th><th>${L('You want to PROVE AB // CD', '要證明 AB // CD')}</th></tr>
      <tr><td>${rsn('corr')}</td><td>${rsn('corrE')}</td></tr><tr><td>${rsn('alt')}</td><td>${rsn('altE')}</td></tr><tr><td>${rsn('int')}</td><td>${rsn('intS')}</td></tr></table>`) +
      box('tip', L('How to plan a proof', '怎樣計劃證明'), ul([B('Mark every angle you know on the figure.', '把已知的角標在圖上。'), B('Find a path from what you know to what you want.', '找出由已知到所求的路線。'), B('One step per line, one reason per step.', '每行一步，每步一個理由。'), B('Finish with ∴ and the final reason.', '最後以 ∴ 和理由作結。')])),
    anim: () => PA(L(`Prove AB // CD`, '證明 AB // CD'), [`Given the ${vv}° angles. AB // CD is NOT given — we must prove it.`, `已知兩個 ${vv}° 的角。AB // CD 不是已知，要證明。`],
      g.fig({ arcs: [g.arc('P', 'ur', vv + '°'), g.arc('Q', 'll', vv + '°', G.COL.b), g.arc('P', 'll', 'a', G.COL.c)] }), [
      { s: `a = ${vv}°`, r: 'vert', fig: g.fig({ arcs: [g.arc('P', 'ur', vv + '°'), g.arc('Q', 'll', vv + '°', G.COL.b), g.arc('P', 'll', 'a', G.COL.c)], hlA: [g.hl('P', 'ur'), g.hl('P', 'll')] }), c: ['a and the top ' + vv + '° angle are opposite at P (X shape).', 'a 與上面的 ' + vv + '° 是 P 的對頂角（X 形）。'] },
      { s: `∵ a = ${vv}° = ∠CQU`, fig: g.fig({ arcs: [g.arc('P', 'ur', vv + '°'), g.arc('Q', 'll', vv + '°', G.COL.b), g.arc('P', 'll', 'a', G.COL.c)], hlA: [g.hl('P', 'll'), g.hl('Q', 'll')] }), c: ['a and the lower angle are in the SAME position (F shape) and equal.', 'a 與下面的角位置相同（F 形）而且相等。'] },
      { s: '∴ AB // CD', r: 'corrE', c: ['We are PROVING parallel, so use “corr. ∠s equal”.', '我們在證明平行，所以用「同位角相等」。'] }
    ], 460)
  };
  const lessonChain = {
    t: ['Multi-step proofs in triangles', '三角形中的多步證明'],
    body: B('Write one fact per line. Each new line may use the lines above it.', '每行寫一個事實；每一行都可以用上面已證明的結果。'),
    anim: () => PA(L('AB = AC, ∠A = 40°. Find ∠ACD.', 'AB = AC，∠A = 40°。求 ∠ACD。'), ['BCD is a straight line; AB = AC.', 'BCD 是直線；AB = AC。'],
      isoF({ ticks: { AB: 1, AC: 1 }, arcs: [{ v: 'A', a: 'B', b: 'C', lab: '40°' }] }), [
      { s: '∠ABC = ∠ACB', r: 'base', fig: isoF({ ticks: { AB: 1, AC: 1 }, arcs: [{ v: 'A', a: 'B', b: 'C', lab: '40°' }], hlA: [{ v: 'B', a: 'C', b: 'A' }, { v: 'C', a: 'A', b: 'B' }] }), c: ['AB = AC, so the base angles are equal.', 'AB = AC，所以兩底角相等。'] },
      { s: '∠ABC + ∠ACB + 40° = 180°', r: 'sum', c: ['Angles of △ABC add to 180°.', '△ABC 的內角和是 180°。'] },
      { s: '2∠ACB = 140° → ∠ACB = 70°', c: ['Replace ∠ABC by ∠ACB and solve.', '把 ∠ABC 換成 ∠ACB，然後求解。'] },
      { s: '∠ACD = 180° − 70° = 110°', r: 'adj', fig: isoF({ ticks: { AB: 1, AC: 1 }, arcs: [{ v: 'A', a: 'B', b: 'C', lab: '40°' }], hlA: [{ v: 'C', a: 'D', b: 'A' }] }), c: ['B, C, D lie on a straight line.', 'B、C、D 在一條直線上。'] }
    ], 460)
  };
  C11.lessons.push(lessonPar, lessonChain);

  /* ---------- practice ---------- */
  const POOL = ['adj', 'vert', 'pt', 'corr', 'alt', 'int', 'corrE', 'altE', 'intS', 'sum', 'ext', 'base'];
  const others = k => shuffle(POOL.filter(x => x !== k)).slice(0, 3);
  const WHY = { adj: ['angles on a straight line add to 180°', '直線上的鄰角和為 180°'], adjS: ['the angles add up to 180°, so it is a straight line', '各角之和為 180°，所以是直線'], vert: ['X shape: opposite angles', 'X 形的對頂角'], corr: ['F shape, using AB // CD', 'F 形，用 AB // CD'], alt: ['Z shape, using AB // CD', 'Z 形，用 AB // CD'], int: ['C shape: add to 180°, using AB // CD', 'C 形：和為 180°，用 AB // CD'], corrE: ['proving // from equal corresponding angles', '由同位角相等證明平行'], altE: ['proving // from equal alternate angles', '由內錯角相等證明平行'], intS: ['proving // from interior angles adding to 180°', '由同旁內角互補證明平行'], sum: ['angles of a triangle add to 180°', '三角形內角和為 180°'], base: ['AB = AC → base angles equal', 'AB = AC → 底角相等'], ext: ['exterior angle = sum of 2 interior opposite angles', '外角 = 兩內對角之和'] };
  const why = k => WHY[k] ? L(WHY[k][0], WHY[k][1]) : '';
  const make = (fig, lines, steps, q, hint) => ({ kind: 'proof', fig, q: q || L('Complete the proof: choose the reason for each line.', '完成證明：選出每行的理由。'), lines, steps, hint });
  const T = [
    () => { /* prove parallel */ const g = PL(ri(110, 170), ri(240, 300)); const v = g.ang.ur; const kind = pick(['corrE', 'altE', 'intS']);
      const pos = { corrE: 'll', altE: 'ur', intS: 'ul' }[kind]; const bv = kind === 'intS' ? 180 - v : v;
      const fig = g.fig({ arcs: [g.arc('P', 'ur', v + '°'), g.arc('Q', pos, bv + '°', G.COL.b), g.arc('P', 'll', 'a', G.COL.c)] });
      const mid = kind === 'intS' ? `∵ a + ${bv}° = ${v}° + ${bv}° = 180°` : `∵ a = ${v}° = ${L('the lower angle', '下方的角')}`;
      return make(fig, [[`a = ${v}°`, RB('vert', others('vert'))], [mid], ['∴ AB // CD', RB(kind, ['corr', 'alt', 'int', 'corrE', 'altE', 'intS'].filter(x => x !== kind).slice(0, 3))]],
        [PS(`a = ${v}°`, 'vert', null, null, why('vert')), mid, PS('∴ AB // CD', kind, null, null, why(kind))], null, L('We are PROVING //, so the last reason ends in “equal” or “supp.”.', '我們在證明平行，所以最後的理由是「相等」或「互補」。')); },
    () => { /* use parallel lines: two steps */ const g = PL(ri(110, 170), ri(240, 300)); const v = g.ang.ur; const y = 180 - v; const kind = pick(['corr', 'alt', 'int']);
      const pos = { corr: 'lr', alt: 'ul', int: 'ur' }[kind]; const x = kind === 'int' ? 180 - y : y;
      const fig = g.fig({ arrows: { AB: 1, CD: 1 }, arcs: [g.arc('P', 'ur', v + '°'), g.arc('P', 'lr', 'y', G.COL.c), g.arc('Q', pos, 'x', G.COL.b)] });
      const l2 = kind === 'int' ? `x + y = 180°` : 'x = y';
      return make(fig, [[`y = 180° − ${v}° = ${y}°`, RB('adj', others('adj'))], [l2, RB(kind, others(kind))], [`∴ x = ${x}°`]],
        [PS(`y = 180° − ${v}° = ${y}°`, 'adj', null, null, why('adj')), PS(l2, kind, null, null, why(kind)), `∴ x = <b>${x}°</b>`]); },
    () => { /* isosceles + straight line */ const a = pick([20, 30, 40, 50, 60, 70, 80, 100]); const b = (180 - a) / 2;
      const fig = isoF({ ticks: { AB: 1, AC: 1 }, arcs: [{ v: 'A', a: 'B', b: 'C', lab: a + '°' }, { v: 'C', a: 'D', b: 'A', lab: 'x', c: G.COL.b }] });
      return make(fig, [['∠ABC = ∠ACB', RB('base', others('base'))], [`∠ABC + ∠ACB + ${a}° = 180°`, RB('sum', others('sum'))], [`∠ACB = ${b}°`], [`x = 180° − ${b}° = ${180 - b}°`, RB('adj', others('adj'))]],
        [PS('∠ABC = ∠ACB', 'base', null, null, why('base')), PS(`∠ABC + ∠ACB + ${a}° = 180°`, 'sum', null, null, why('sum')), `2∠ACB = ${180 - a}° → ∠ACB = ${b}°`, PS(`x = <b>${180 - b}°</b>`, 'adj', null, null, why('adj'))], L('AB = AC, BCD is a straight line. Complete the proof to find x.', 'AB = AC，BCD 是直線。完成證明以求 x。')); },
    () => { /* exterior angle then straight line */ const a = ri(35, 70), b = ri(35, 70);
      const fig = isoF({ arcs: [{ v: 'A', a: 'B', b: 'C', lab: a + '°' }, { v: 'B', a: 'C', b: 'A', lab: b + '°', c: G.COL.b }, { v: 'C', a: 'D', b: 'A', lab: 'x', c: G.COL.c }, { v: 'C', a: 'A', b: 'B', lab: 'y', c: G.COL.d, r: 16 }] });
      return make(fig, [[`x = ${a}° + ${b}° = ${a + b}°`, RB('ext', others('ext'))], [`y = 180° − ${a + b}° = ${180 - a - b}°`, RB('adj', others('adj'))]],
        [PS(`x = ${a}° + ${b}° = ${a + b}°`, 'ext', null, null, why('ext')), PS(`y = ${180 - a - b}°`, 'adj', null, null, why('adj'))], L('BCD is a straight line. Complete the proof.', 'BCD 是直線。完成證明。')); },
    () => { /* straight line proof */ const a = ri(30, 70), b = ri(30, 60); const c = 180 - a - b;
      const O = [190, 175]; const dir = d => [O[0] + 150 * Math.cos(d * Math.PI / 180), O[1] - 150 * Math.sin(d * Math.PI / 180)];
      const P = { A: dir(180), O, B: dir(0), C: dir(180 - a), D: dir(c) };
      const fig = GF({ P, segs: ['AO', 'OB', 'OC', 'OD'], off: { O: [0, 20] }, w: 380, h: 215, arcs: [{ v: 'O', a: 'A', b: 'C', lab: a + '°', r: 30 }, { v: 'O', a: 'C', b: 'D', lab: b + '°', c: G.COL.b, r: 30 }, { v: 'O', a: 'D', b: 'B', lab: c + '°', c: G.COL.c, r: 30 }] });
      return make(fig, [[`∵ ∠AOC + ∠COD + ∠DOB = ${a}° + ${b}° + ${c}° = 180°`], ['∴ AOB is a straight line', RB('adjS', ['adj', 'pt', 'vert', 'sum'])]],
        [`∠AOC + ∠COD + ∠DOB = 180°`, PS(L('∴ AOB is a straight line', '∴ AOB 是一條直線'), 'adjS', null, null, why('adjS'))], L('Prove that AOB is a straight line.', '證明 AOB 是一條直線。'), L('To PROVE a straight line, use “adj. ∠s supp.”.', '要證明是直線，用「鄰角互補」。')); }
  ];
  C11.gens.unshift({ id: 'pfgeo', name: ['Write the proof', '寫證明'], gen() { return pick(T)(); } });
  C11.keys.push(B('USING // → corr./alt./int. ∠s, AB // CD. PROVING // → corr. ∠s equal / alt. ∠s equal / int. ∠s supp.', '使用平行 → 同位角 / 內錯角 / 同旁內角，AB // CD；證明平行 → 同位角相等 / 內錯角相等 / 同旁內角互補。'), B('Proving a straight line → (adj. ∠s supp.)', '證明直線 →（鄰角互補）'));
})();
