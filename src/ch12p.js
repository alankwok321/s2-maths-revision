/* ================= Ch12 proofs: writing congruence proofs with reasons ================= */
(function () {
  const C12 = CH.find(c => c.id === 'ch12');
  const KITE = { A: [170, 20], B: [50, 140], C: [170, 260], D: [290, 140] };
  const BOW = { A: [40, 40], B: [60, 210], E: [180, 120], C: [320, 200], D: [300, 30] };
  const ISO = { A: [170, 20], B: [40, 230], M: [170, 230], C: [300, 230] };
  const kite = (o = {}) => GF({ P: KITE, segs: ['AB', 'BC', 'CD', 'DA', 'AC'], w: 330, h: 290, ...o });
  const bow = (o = {}) => GF({ P: BOW, segs: ['AC', 'BD', 'AB', 'DC'], off: { E: [28, 4] }, w: 350, h: 240, ...o });
  const iso = (o = {}) => GF({ P: ISO, segs: ['AB', 'AC', 'BC', 'AM'], off: { M: [0, 22] }, w: 340, h: 260, rights: [{ v: 'M', a: 'A', b: 'C' }], ...o });

  /* ---------- lessons ---------- */
  const checklist = box('rule', L('Proof checklist', '證明清單'), `<ol style="margin:4px 0;padding-left:22px">
    <li>${L('Start: “In △ABC and △DEF,”', '開始：「在 △ABC 和 △DEF 中，」')}</li>
    <li>${L('Write 3 pairs of equal parts — <b>each with a reason</b>.', '寫出 3 對相等的部分——<b>每對都要寫理由</b>。')}</li>
    <li>${L('Conclude: ∴ △ABC ≅ △DEF (condition). Letters must be in <b>matching order</b>.', '結論：∴ △ABC ≅ △DEF（條件）。字母要按<b>對應次序</b>。')}</li>
    <li>${L('Then you may use (corr. sides, ≅△s) or (corr. ∠s, ≅△s).', '之後才可用（全等三角形的對應邊 / 對應角）。')}</li></ol>`) +
    `<table class="t"><tr><th>${L('What you see in the figure', '圖中看到')}</th><th>${L('Reason', '理由')}</th></tr>
    <tr><td>${L('marks / told in the question', '記號 / 題目給出')}</td><td>${rsn('given')}</td></tr>
    <tr><td>${L('a side shared by both triangles', '兩個三角形共用的邊')}</td><td>${rsn('cside')}</td></tr>
    <tr><td>${L('an X shape (two lines crossing)', 'X 形（兩線相交）')}</td><td>${rsn('vert')}</td></tr>
    <tr><td>${L('parallel lines (Z shape)', '平行線（Z 形）')}</td><td>${rsn('alt', 'AB', 'DC')}</td></tr></table>`;

  const lessonCommon = {
    t: ['Proof with a common side', '有公共邊的證明'],
    body: checklist,
    anim: () => PA(L('Prove △ABC ≅ △ADC, then BC = DC', '證明 △ABC ≅ △ADC，然後證明 BC = DC'), ['Marks: AB = AD and ∠BAC = ∠DAC.', '記號：AB = AD，∠BAC = ∠DAC。'],
      kite({ ticks: { AB: 1, DA: 1 }, arcs: [{ v: 'A', a: 'B', b: 'C', sec: 1 }, { v: 'A', a: 'C', b: 'D', sec: 1 }] }), [
      { s: L('In △ABC and △ADC,', '在 △ABC 和 △ADC 中，'), c: ['Step 1: name the two triangles.', '第 1 步：寫出兩個三角形。'] },
      { s: 'AB = AD', r: 'given', fig: kite({ ticks: { AB: 1, DA: 1 }, hl: ['AB', 'DA'], arcs: [{ v: 'A', a: 'B', b: 'C', sec: 1 }, { v: 'A', a: 'C', b: 'D', sec: 1 }] }), c: ['The tick marks show AB = AD → (given).', '短線記號表示 AB = AD →（已知）。'] },
      { s: '∠BAC = ∠DAC', r: 'given', fig: kite({ ticks: { AB: 1, DA: 1 }, hlA: [{ v: 'A', a: 'B', b: 'C' }, { v: 'A', a: 'C', b: 'D' }] }), c: ['The arcs show the two angles at A are equal → (given).', '弧形記號表示 A 的兩個角相等 →（已知）。'] },
      { s: 'AC = AC', r: 'cside', fig: kite({ ticks: { AB: 1, DA: 1 }, hl: ['AC'] }), c: ['AC is in BOTH triangles → (common side). Students often forget this line!', 'AC 同時在兩個三角形中 →（公共邊）。同學常常漏寫這一行！'] },
      { s: '∴ △ABC ≅ △ADC', r: 'SAS', c: ['Side – angle between – side → SAS. Order: A↔A, B↔D, C↔C.', '邊－夾角－邊 → S.A.S.。次序：A↔A、B↔D、C↔C。'] },
      { s: '∴ BC = DC', r: 'csC', fig: kite({ ticks: { AB: 1, DA: 1 }, hl: ['BC', 'CD'] }), c: ['Only AFTER proving ≅ can we say corresponding sides are equal.', '證明了全等之後，才可說對應邊相等。'] }
    ], 470)
  };
  const lessonVert = {
    t: ['Proof with vertically opposite angles', '用對頂角的證明'],
    body: B('When two lines cross (an X shape), the opposite angles are equal: (vert. opp. ∠s). This often gives the angle you need.', '兩線相交（X 形）時，對頂角相等：（對頂角）。這通常就是你需要的角。'),
    anim: () => PA(L('Prove △ABE ≅ △CDE', '證明 △ABE ≅ △CDE'), ['AE = CE and BE = DE (marked). AC and BD cross at E.', 'AE = CE，BE = DE（有記號）。AC 和 BD 相交於 E。'],
      bow({ ticks: { AE: 1, EC: 1, BE: 2, ED: 2 } }), [
      { s: L('In △ABE and △CDE,', '在 △ABE 和 △CDE 中，'), c: ['Name the triangles.', '寫出兩個三角形。'] },
      { s: 'AE = CE', r: 'given', fig: bow({ ticks: { AE: 1, EC: 1, BE: 2, ED: 2 }, hl: ['AE', 'EC'] }), c: ['Single ticks.', '單短線記號。'] },
      { s: '∠AEB = ∠CED', r: 'vert', fig: bow({ ticks: { AE: 1, EC: 1, BE: 2, ED: 2 }, hlA: [{ v: 'E', a: 'A', b: 'B' }, { v: 'E', a: 'C', b: 'D' }] }), c: ['Not marked — but they are opposite angles of the X → (vert. opp. ∠s).', '沒有記號——但它們是 X 形的對頂角 →（對頂角）。'] },
      { s: 'BE = DE', r: 'given', fig: bow({ ticks: { AE: 1, EC: 1, BE: 2, ED: 2 }, hl: ['BE', 'ED'] }), c: ['Double ticks.', '雙短線記號。'] },
      { s: '∴ △ABE ≅ △CDE', r: 'SAS', c: ['The angle at E is between the two sides → SAS. A↔C, B↔D, E↔E.', 'E 的角在兩邊之間 → S.A.S.。A↔C、B↔D、E↔E。'] }
    ], 440)
  };
  const idx = C12.lessons.findIndex(l => l.t[0] === 'Writing a congruence proof');
  C12.lessons.splice(idx + 1, 0, lessonCommon, lessonVert);

  /* ---------- practice: complete the proof ---------- */
  const POOL = ['given', 'cside', 'vert', 'alt', 'base', 'csC', 'adj'];
  const CONDS = ['SSS', 'SAS', 'ASA', 'AAS', 'RHS'];
  const T = [
    () => ({ fig: kite({ ticks: { AB: 1, DA: 1, BC: 2, CD: 2 } }), tri: ['△ABC', '△ADC'], rows: [['AB = AD', 'given'], ['BC = DC', 'given'], ['AC = AC', 'cside']], cond: 'SSS', after: ['∠ABC = ∠ADC', 'caC'] }),
    () => ({ fig: kite({ ticks: { AB: 1, DA: 1 }, arcs: [{ v: 'A', a: 'B', b: 'C', sec: 1 }, { v: 'A', a: 'C', b: 'D', sec: 1 }] }), tri: ['△ABC', '△ADC'], rows: [['AB = AD', 'given'], ['∠BAC = ∠DAC', 'given'], ['AC = AC', 'cside']], cond: 'SAS', after: ['BC = DC', 'csC'] }),
    () => ({ fig: kite({ arcs: [{ v: 'A', a: 'B', b: 'C', sec: 1 }, { v: 'A', a: 'C', b: 'D', sec: 1 }, { v: 'C', a: 'A', b: 'B', n: 2, sec: 1 }, { v: 'C', a: 'D', b: 'A', n: 2, sec: 1 }] }), tri: ['△ABC', '△ADC'], rows: [['∠BAC = ∠DAC', 'given'], ['AC = AC', 'cside'], ['∠BCA = ∠DCA', 'given']], cond: 'ASA', after: ['AB = AD', 'csC'] }),
    () => ({ fig: bow({ ticks: { AE: 1, EC: 1, BE: 2, ED: 2 } }), tri: ['△ABE', '△CDE'], rows: [['AE = CE', 'given'], ['∠AEB = ∠CED', 'vert'], ['BE = DE', 'given']], cond: 'SAS', after: ['AB = CD', 'csC'] }),
    () => ({ fig: bow({ ticks: { AE: 1, EC: 1 }, arrows: { AB: 1, DC: 1 } }), tri: ['△ABE', '△CDE'], rows: [['∠BAE = ∠DCE', 'alt', 'AB', 'DC'], ['AE = CE', 'given'], ['∠AEB = ∠CED', 'vert']], cond: 'ASA', after: ['BE = DE', 'csC'] }),
    () => ({ fig: bow({ ticks: { BE: 2, ED: 2 }, arrows: { AB: 1, DC: 1 } }), tri: ['△ABE', '△CDE'], rows: [['∠BAE = ∠DCE', 'alt', 'AB', 'DC'], ['∠AEB = ∠CED', 'vert'], ['BE = DE', 'given']], cond: 'AAS', after: ['AE = CE', 'csC'] }),
    () => ({ fig: iso({ ticks: { AB: 1, AC: 1 } }), tri: ['△ABM', '△ACM'], rows: [['∠AMB = ∠AMC = 90°', 'given'], ['AB = AC', 'given'], ['AM = AM', 'cside']], cond: 'RHS', after: ['BM = CM', 'csC'] }),
    () => ({ fig: iso({ ticks: { AB: 1, AC: 1, BM: 2, MC: 2 }, rights: [] }), tri: ['△ABM', '△ACM'], rows: [['AB = AC', 'given'], ['BM = CM', 'given'], ['AM = AM', 'cside']], cond: 'SSS', after: ['∠ABM = ∠ACM', 'caC'] })
  ];
  const WHY = { given: ['marked in the figure / told in the question', '圖中有記號 / 題目給出'], cside: ['the side is in BOTH triangles', '該邊同時屬於兩個三角形'], vert: ['opposite angles where two lines cross', '兩線相交的對頂角'], alt: ['Z-shape between parallel lines', '平行線之間的 Z 形'], csC: ['corresponding sides of congruent triangles', '全等三角形的對應邊'], caC: ['corresponding angles of congruent triangles', '全等三角形的對應角'] };
  const why = k => WHY[k] ? L(WHY[k][0], WHY[k][1]) : '';

  C12.gens.unshift({
    id: 'pfcong', name: ['Write the proof', '寫證明'], gen() {
      const t = pick(T)(); const withAfter = Math.random() < .6;
      const lines = [[L(`In ${t.tri[0]} and ${t.tri[1]},`, `在 ${t.tri[0]} 和 ${t.tri[1]} 中，`)]];
      t.rows.forEach(([st, k, p, q]) => lines.push([st, RB(k, shuffle(POOL).slice(0, 3), p, q)]));
      lines.push([`∴ ${t.tri[0]} ≅`, TB(t.tri[1], nameOpts(t.tri[1])), RB(t.cond, shuffle(CONDS).slice(0, 3))]);
      if (withAfter) lines.push([`∴ ${t.after[0]}`, RB(t.after[1], ['given', 'cside', 'csC', 'caC', 'vert'])]);
      const steps = [L(`In ${t.tri[0]} and ${t.tri[1]},`, `在 ${t.tri[0]} 和 ${t.tri[1]} 中，`), ...t.rows.map(([st, k, p, q]) => PS(st, k, p, q, why(k))), PS(`∴ ${t.tri[0]} ≅ ${t.tri[1]}`, t.cond, null, null, L('Check the order: S = side, A = angle. Letters of the 2nd triangle follow the matching vertices.', '檢查次序：S = 邊，A = 角；第二個三角形的字母按對應頂點排列。'))];
      if (withAfter) steps.push(PS(`∴ ${t.after[0]}`, t.after[1], null, null, why(t.after[1])));
      return { kind: 'proof', fig: t.fig, q: L('Complete the proof. Choose the reason for each line, the name of the 2nd triangle and the condition.', '完成證明：選出每行的理由、第二個三角形的名稱及全等條件。'), lines, steps, hint: L('Shared side → common side. X shape → vert. opp. ∠s.', '共用的邊 → 公共邊；X 形 → 對頂角。') };
    }
  });
  C12.keys.push(B('Proof: “In △… and △…,” → 3 equal pairs, each with a reason → ∴ △… ≅ △… (condition).', '證明：「在 △… 和 △… 中，」→ 三對相等部分，每對寫理由 → ∴ △… ≅ △…（條件）。'), B('Shared side → (common side). X shape → (vert. opp. ∠s).', '共用的邊 →（公共邊）；X 形 →（對頂角）。'));
  C12.traps.push(B('✘ Forgetting the common side line (AC = AC)', '✘ 漏寫公共邊（AC = AC）'), B('✘ Using (corr. sides, ≅△s) BEFORE proving ≅', '✘ 未證明全等就用（全等三角形的對應邊）'));
  C12.cheat.push(L('Common side / vert. opp. ∠s give the 3rd fact', '公共邊 / 對頂角提供第三項'));
})();
