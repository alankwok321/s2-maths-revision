/* ================= Ch1 proofs: similar triangles with reasons ================= */
(function () {
  const C1 = CH.find(c => c.id === 'ch1');
  const TP = { A: [150, 20], B: [30, 260], C: [300, 260], D: [95.5, 128], E: [217.5, 128] };
  const par = (o = {}) => GF({ P: TP, segs: ['AB', 'AC', 'BC', 'DE'], w: 340, h: 290, ...o });
  const BW = { A: [40, 40], B: [50, 190], E: [150, 120], C: [315, 240], D: [300, 15] };
  const bow = (o = {}) => GF({ P: BW, segs: ['AC', 'BD', 'AB', 'DC'], off: { E: [-2, -20] }, w: 345, h: 275, ...o });

  const lessonPar = {
    t: ['Proof: parallel line in a triangle', '證明：三角形內的平行線'],
    body: box('rule', L('Proof checklist', '證明清單'), `<ol style="margin:4px 0;padding-left:22px"><li>${L('“In △ADE and △ABC,”', '「在 △ADE 和 △ABC 中，」')}</li><li>${L('Give equal angles (or side ratios) <b>with reasons</b>.', '寫出相等的角（或邊的比）<b>及理由</b>。')}</li><li>${L('∴ △ADE ~ △ABC (AAA / 3 sides prop. / ratio of 2 sides, inc. ∠)', '∴ △ADE ~ △ABC（A.A.A. / 三邊成比例 / 兩邊成比例且夾角相等）')}</li><li>${L('Then use (corr. sides, ~△s) to find lengths.', '然後用（相似三角形的對應邊）求長度。')}</li></ol>`),
    anim: () => PA(L('DE // BC. Prove △ADE ~ △ABC', 'DE // BC。證明 △ADE ~ △ABC'), ['DE is parallel to BC.', 'DE 與 BC 平行。'], par({ arrows: { DE: 1, BC: 1 } }), [
      { s: L('In △ADE and △ABC,', '在 △ADE 和 △ABC 中，'), c: ['Name the small and the big triangle.', '寫出小三角形和大三角形。'] },
      { s: '∠DAE = ∠BAC', r: 'cang', fig: par({ arrows: { DE: 1, BC: 1 }, hlA: [{ v: 'A', a: 'D', b: 'E' }] }), c: ['The angle at A is in BOTH triangles → (common ∠).', 'A 的角同時屬於兩個三角形 →（公共角）。'] },
      { s: '∠ADE = ∠ABC', r: 'corr', p: 'DE', q: 'BC', fig: par({ arrows: { DE: 1, BC: 1 }, hlA: [{ v: 'D', a: 'A', b: 'E' }, { v: 'B', a: 'A', b: 'C' }] }), c: ['Same position at the two parallel lines (F shape) → (corr. ∠s, DE // BC).', '在兩條平行線的相同位置（F 形）→（同位角，DE // BC）。'] },
      { s: '∠AED = ∠ACB', r: 'corr', p: 'DE', q: 'BC', fig: par({ arrows: { DE: 1, BC: 1 }, hlA: [{ v: 'E', a: 'A', b: 'D' }, { v: 'C', a: 'A', b: 'B' }] }), c: ['Same idea on the other side.', '另一邊也一樣。'] },
      { s: '∴ △ADE ~ △ABC', r: 'AAA', c: ['3 pairs of equal angles → AAA. Order: A↔A, D↔B, E↔C.', '三對角相等 → A.A.A.。次序：A↔A、D↔B、E↔C。'] },
      { s: `∴ ${fr('DE', 'BC')} = ${fr('AD', 'AB')}`, r: 'csS', c: ['Now corresponding sides are in the same ratio.', '現在對應邊成比例。'] }
    ], 480)
  };
  const lessonBow = {
    t: ['Proof: parallel lines and an X shape', '證明：平行線及 X 形'],
    body: B('With AB // DC and lines crossing at E, use (alt. ∠s, AB // DC) and (vert. opp. ∠s).', '當 AB // DC 而兩線相交於 E，用（內錯角，AB // DC）和（對頂角）。'),
    anim: () => PA(L('AB // DC. Prove △ABE ~ △CDE', 'AB // DC。證明 △ABE ~ △CDE'), ['AB is parallel to DC; AC and BD cross at E.', 'AB 與 DC 平行；AC 和 BD 相交於 E。'], bow({ arrows: { AB: 1, DC: 1 } }), [
      { s: L('In △ABE and △CDE,', '在 △ABE 和 △CDE 中，'), c: ['Name the triangles.', '寫出兩個三角形。'] },
      { s: '∠BAE = ∠DCE', r: 'alt', p: 'AB', q: 'DC', fig: bow({ arrows: { AB: 1, DC: 1 }, hlA: [{ v: 'A', a: 'B', b: 'E' }, { v: 'C', a: 'D', b: 'E' }] }), c: ['Z shape between AB and DC → alternate angles.', 'AB 與 DC 之間的 Z 形 → 內錯角。'] },
      { s: '∠ABE = ∠CDE', r: 'alt', p: 'AB', q: 'DC', fig: bow({ arrows: { AB: 1, DC: 1 }, hlA: [{ v: 'B', a: 'A', b: 'E' }, { v: 'D', a: 'C', b: 'E' }] }), c: ['Another Z shape.', '另一個 Z 形。'] },
      { s: '∠AEB = ∠CED', r: 'vert', fig: bow({ arrows: { AB: 1, DC: 1 }, hlA: [{ v: 'E', a: 'A', b: 'B' }, { v: 'E', a: 'C', b: 'D' }] }), c: ['X shape at E → vertically opposite angles.', 'E 的 X 形 → 對頂角。'] },
      { s: '∴ △ABE ~ △CDE', r: 'AAA', c: ['A↔C, B↔D, E↔E.', 'A↔C、B↔D、E↔E。'] }
    ], 470)
  };
  const at = C1.lessons.findIndex(l => l.t[0] === 'Parallel line in a triangle');
  C1.lessons.splice(at + 1, 0, lessonPar, lessonBow);

  /* tidy condition names to the worksheet form */
  const POOLA = ['cang', 'corr', 'alt', 'vert', 'given', 'sum'];
  const CONDS = ['AAA', 's3', 's2', 'SAS'];
  const T = [
    () => ({ fig: par({ arrows: { DE: 1, BC: 1 } }), tri: ['△ADE', '△ABC'], rows: [['∠DAE = ∠BAC', 'cang'], ['∠ADE = ∠ABC', 'corr', 'DE', 'BC'], ['∠AED = ∠ACB', 'corr', 'DE', 'BC']], cond: 'AAA', after: [`${fr('DE', 'BC')} = ${fr('AD', 'AB')}`, 'csS'] }),
    () => ({ fig: bow({ arrows: { AB: 1, DC: 1 } }), tri: ['△ABE', '△CDE'], rows: [['∠BAE = ∠DCE', 'alt', 'AB', 'DC'], ['∠ABE = ∠CDE', 'alt', 'AB', 'DC'], ['∠AEB = ∠CED', 'vert']], cond: 'AAA', after: [`${fr('AB', 'CD')} = ${fr('AE', 'CE')}`, 'csS'] }),
    () => { const k = pick([2, 3]); const ad = ri(2, 5), ae = ri(2, 6); return { fig: par({ labs: { AD: ad, DB: ad * (k - 1), AE: ae, EC: ae * (k - 1) } }), tri: ['△ADE', '△ABC'], rows: [[`${fr('AD', 'AB')} = ${fr(ad, ad * k)} = ${fr(1, k)}`], [`${fr('AE', 'AC')} = ${fr(ae, ae * k)} = ${fr(1, k)}`], ['∠DAE = ∠BAC', 'cang']], cond: 's2', after: ['∠ADE = ∠ABC', 'caS'] }; },
    () => { const s = [ri(2, 5), ri(3, 6), ri(4, 7)], k = pick([2, 3]); return { fig: triPair(SHAPES[0], { names: ['A', 'B', 'C'], sides: { 0: { lab: s[0] }, 1: { lab: s[1] }, 2: { lab: s[2] } } }, { names: ['P', 'Q', 'R'], sides: { 0: { lab: s[0] * k }, 1: { lab: s[1] * k }, 2: { lab: s[2] * k } } }, { s: 1.3 }), tri: ['△ABC', '△PQR'], rows: [[`${fr('PQ', 'AB')} = ${fr(s[0] * k, s[0])} = ${k}`], [`${fr('QR', 'BC')} = ${fr(s[1] * k, s[1])} = ${k}`], [`${fr('RP', 'CA')} = ${fr(s[2] * k, s[2])} = ${k}`]], cond: 's3', after: ['∠B = ∠Q', 'caS'] }; }
  ];
  const WHY = { cang: ['the angle belongs to both triangles', '該角同時屬於兩個三角形'], corr: ['F shape at parallel lines', '平行線的 F 形'], alt: ['Z shape at parallel lines', '平行線的 Z 形'], vert: ['X shape: opposite angles', 'X 形的對頂角'], csS: ['corresponding sides of similar triangles are in the same ratio', '相似三角形的對應邊成比例'], caS: ['corresponding angles of similar triangles are equal', '相似三角形的對應角相等'] };
  const why = k => WHY[k] ? L(WHY[k][0], WHY[k][1]) : '';
  C1.gens.unshift({
    id: 'pfsim', name: ['Write the proof', '寫證明'], gen() {
      const t = pick(T)(); const withAfter = Math.random() < .6;
      const lines = [[L(`In ${t.tri[0]} and ${t.tri[1]},`, `在 ${t.tri[0]} 和 ${t.tri[1]} 中，`)]];
      t.rows.forEach(([st, k, p, q]) => lines.push(k ? [st, RB(k, shuffle(POOLA).slice(0, 3), p, q)] : [st]));
      lines.push([`∴ ${t.tri[0]} ~`, TB(t.tri[1], nameOpts(t.tri[1])), RB(t.cond, CONDS)]);
      if (withAfter) lines.push([`∴ ${t.after[0]}`, RB(t.after[1], ['csS', 'caS', 'given', 'csC', 'cang'])]);
      const steps = [L(`In ${t.tri[0]} and ${t.tri[1]},`, `在 ${t.tri[0]} 和 ${t.tri[1]} 中，`), ...t.rows.map(([st, k, p, q]) => k ? PS(st, k, p, q, why(k)) : st), PS(`∴ ${t.tri[0]} ~ ${t.tri[1]}`, t.cond, null, null, t.cond === 'AAA' ? L('3 pairs of equal angles.', '三對角相等。') : t.cond === 's3' ? L('All 3 side ratios are the same.', '三對邊的比都相同。') : L('2 side ratios equal, and the angle between them is equal.', '兩對邊的比相同，而且夾角相等。'))];
      if (withAfter) steps.push(PS(`∴ ${t.after[0]}`, t.after[1], null, null, why(t.after[1])));
      return { kind: 'proof', fig: t.fig, q: L('Complete the proof. Choose each reason, the name of the 2nd triangle and the condition.', '完成證明：選出每個理由、第二個三角形的名稱及相似條件。'), lines, steps, hint: L('Parallel lines → corr./alt. ∠s. Shared angle → common ∠.', '平行線 → 同位角 / 內錯角；共用的角 → 公共角。') };
    }
  });
  C1.keys.push(B('Proof: In △ADE and △ABC, ∠A common, corr./alt. ∠s from parallel lines → AAA.', '證明：在 △ADE 和 △ABC 中，∠A 是公共角，平行線給出同位角 / 內錯角 → A.A.A.。'));
  C1.traps.push(B('✘ Writing “corr. ∠s” without the parallel lines: write (corr. ∠s, DE // BC)', '✘ 只寫「同位角」：要寫（同位角，DE // BC）'));
})();
