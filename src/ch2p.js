/* ================= Ch2 proofs: angle questions written with reasons ================= */
(function () {
  const C2 = CH.find(c => c.id === 'ch2');
  const IS = { A: [150, 20], B: [40, 210], C: [260, 210], D: [370, 210] };
  const isoF = (o = {}) => GF({ P: IS, segs: ['AB', 'AC', 'BD'], w: 390, h: 240, ...o });
  function pent(labs, hl) { /* pentagon ABCDE with angle labels */
    const N = ['A', 'B', 'C', 'D', 'E']; const P = {}; N.forEach((k, i) => { const t = -Math.PI / 2 + 2 * Math.PI * i / 5 + (i % 2 ? .1 : -.05); const r = i === 3 ? 95 : 110; P[k] = [170 + r * Math.cos(t), 140 + r * Math.sin(t)]; });
    const arcs = N.map((k, i) => ({ v: k, a: N[(i + 1) % 5], b: N[(i + 4) % 5], lab: labs[i], c: labs[i] === 'x' ? G.COL.a : G.COL.b, r: 20 }));
    return GF({ P, segs: ['AB', 'BC', 'CD', 'DE', 'EA'], arcs, hlA: hl ? N.map((k, i) => ({ v: k, a: N[(i + 1) % 5], b: N[(i + 4) % 5] })) : [], w: 340, h: 270 });
  }

  const lessonWrite = {
    t: ['Writing angle answers with reasons', '寫出求角的理由'],
    body: box('rule', L('Every equation needs a reason', '每條方程都要寫理由'), ul([B('Write the equation first, then the reason in brackets.', '先寫方程，再在括號內寫理由。'), B('Lines that only do arithmetic (solving) need no reason.', '只是計算（求解）的行不用寫理由。')])) +
      `<table class="t"><tr><td>${rsn('ext')}</td><td>${rsn('base')}</td></tr><tr><td>${rsn('sum')}</td><td>${rsn('adj')}</td></tr><tr><td>${rsn('polyI')}</td><td>${rsn('polyE')}</td></tr><tr><td>${rsn('sopp')}</td><td>${rsn('equil')}</td></tr></table>`,
    anim: () => PA(L('Find x in the pentagon', '求五邊形中的 x'), ['Four angles are given: 100°, 120°, 95°, 110°.', '已知四個角：100°、120°、95°、110°。'], pent(['x', '100°', '120°', '95°', '110°']), [
      { s: '(5 − 2) × 180° = 540°', r: 'polyI', fig: pent(['x', '100°', '120°', '95°', '110°'], true), c: ['First find the angle sum of a pentagon.', '先求五邊形的內角和。'] },
      { s: 'x + 100° + 120° + 95° + 110° = 540°', r: 'polyI', c: ['All 5 angles add to 540°. Write the reason again.', '5 個角加起來是 540°，再寫一次理由。'] },
      { s: 'x + 425° = 540°', c: ['Just arithmetic: no reason needed.', '只是計算：不用寫理由。'] },
      { s: 'x = 115°', c: ['Done.', '完成。'] }
    ], 460)
  };
  C2.lessons.push(lessonWrite);

  const POOL = ['ext', 'base', 'sum', 'adj', 'polyI', 'polyE', 'vert', 'sopp'];
  const others = k => shuffle(POOL.filter(x => x !== k)).slice(0, 3);
  const make = (fig, q, lines, steps, hint) => ({ kind: 'proof', fig, q, lines, steps, hint });
  const T = [
    () => { const a = pick([20, 30, 40, 50, 60, 70, 80, 100]); const b = (180 - a) / 2;
      return make(isoF({ ticks: { AB: 1, AC: 1 }, arcs: [{ v: 'A', a: 'B', b: 'C', lab: a + '°' }, { v: 'C', a: 'D', b: 'A', lab: 'x', c: G.COL.b }] }), L('AB = AC, BCD is a straight line. Complete the working with reasons.', 'AB = AC，BCD 是直線。完成步驟並寫理由。'),
        [['∠ABC = ∠ACB', RB('base', others('base'))], [`∠ABC + ∠ACB + ${a}° = 180°`, RB('sum', others('sum'))], [`∠ACB = ${b}°`], [`x = 180° − ${b}° = ${180 - b}°`, RB('adj', others('adj'))]],
        [PS('∠ABC = ∠ACB', 'base'), PS(`∠ABC + ∠ACB + ${a}° = 180°`, 'sum'), `∠ACB = ${b}°`, PS(`x = <b>${180 - b}°</b>`, 'adj')]); },
    () => { const b = ri(35, 75); const x = 180 - b; /* AB = AC, base angle b, ext at C... use ext angle: x = ∠A + ∠B */
      const A = 180 - 2 * b; return make(isoF({ ticks: { AB: 1, AC: 1 }, arcs: [{ v: 'B', a: 'C', b: 'A', lab: b + '°', c: G.COL.b }, { v: 'C', a: 'D', b: 'A', lab: 'x', c: G.COL.c }] }), L('AB = AC, BCD is a straight line. Find x with reasons.', 'AB = AC，BCD 是直線。寫出理由求 x。'),
        [['∠ACB = ' + b + '°', RB('base', others('base'))], [`∠BAC = 180° − ${b}° − ${b}° = ${A}°`, RB('sum', others('sum'))], [`x = ${A}° + ${b}° = ${x}°`, RB('ext', others('ext'))]],
        [PS(`∠ACB = ${b}°`, 'base'), PS(`∠BAC = ${A}°`, 'sum'), PS(`x = <b>${x}°</b>`, 'ext')]); },
    () => { const angs = [ri(95, 125), ri(100, 130), ri(90, 120), ri(100, 125)]; const x = 540 - angs.reduce((a, b) => a + b); if (x < 70 || x > 150) return null;
      return make(pent(['x', ...angs.map(a => a + '°')]), L('Find x. Complete the working with reasons.', '求 x。完成步驟並寫理由。'),
        [[`x + ${angs.join('° + ')}° = (5 − 2) × 180°`, RB('polyI', others('polyI'))], [`x = 540° − ${angs.reduce((a, b) => a + b)}° = ${x}°`]],
        [PS(`x + ${angs.join('° + ')}° = 540°`, 'polyI'), `x = <b>${x}°</b>`]); },
    () => { const e = [ri(50, 90), ri(60, 100), ri(50, 90), ri(40, 80)]; const x = 360 - e.reduce((a, b) => a + b); if (x < 30 || x > 120) return null;
      return make(null, L(`The exterior angles of a pentagon are ${e.join('°, ')}° and x. Complete the working.`, `五邊形的外角是 ${e.join('°、')}° 和 x。完成步驟。`),
        [[`x + ${e.join('° + ')}° = 360°`, RB('polyE', others('polyE'))], [`x = ${x}°`]], [PS(`x + ${e.join('° + ')}° = 360°`, 'polyE'), `x = <b>${x}°</b>`]); }
  ];
  C2.gens.unshift({ id: 'pfang', name: ['Write with reasons', '寫出理由'], gen() { return pick(T)(); } });
  C2.keys.push(B('Every equation gets a reason; arithmetic lines do not.', '每條方程都要寫理由；純計算的行不用。'));
})();
