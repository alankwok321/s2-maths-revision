/* ================= Ch3 Identities ================= */
(function () {
  const X = v('x'), Y = v('y');
  const sqAnim = {
    title: L('(a + b)² with an area model', '用面積模型看 (a + b)²'), minH: 300,
    setup(stage) {
      const ox = 60, oy = 30, A = 150, Bb = 70; const s = svgRoot(stage, 460, 290); const st = { r: [] };
      S('rect', { x: ox, y: oy, width: A + Bb, height: A + Bb, fill: '#fff', stroke: '#334155', 'stroke-width': 2 }, s);
      [['a', ox + A / 2, oy - 10], ['b', ox + A + Bb / 2, oy - 10], ['a', ox - 14, oy + A / 2], ['b', ox - 14, oy + A + Bb / 2]].forEach(([t, x, y]) => S('text', { x, y, 'text-anchor': 'middle', 'font-size': 18, 'font-style': 'italic', 'font-family': 'Times New Roman', 'font-weight': 700, text: t }, s));
      [[ox, oy, A, A, '#ede9fe', 'a²'], [ox + A, oy, Bb, A, '#ffedd5', 'ab'], [ox, oy + A, A, Bb, '#ffedd5', 'ab'], [ox + A, oy + A, Bb, Bb, '#dcfce7', 'b²']].forEach(([x, y, w, h, c, lab]) => { const g = S('g', { opacity: 0, class: 'tr' }, s); S('rect', { x, y, width: w, height: h, fill: c, stroke: '#334155', 'stroke-width': 2 }, g); S('text', { x: x + w / 2, y: y + h / 2 + 7, 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 800, text: lab }, g); st.r.push(g); });
      st.t = S('text', { x: 230, y: 285, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 800, fill: '#16a34a', text: '' }, s);
      return st;
    },
    frames: [
      { c: ['A square with side (a + b). Area = (a + b)².', '邊長為 (a + b) 的正方形，面積 = (a + b)²。'], f() { } },
      { c: ['Big square: a²', '大正方形：a²'], f(st) { st.r[0].setAttribute('opacity', 1); } },
      { c: ['Two rectangles: ab and ab → 2ab', '兩個長方形：ab 和 ab → 2ab'], f(st) { st.r[1].setAttribute('opacity', 1); st.r[2].setAttribute('opacity', 1); } },
      { c: ['Small square: b²', '小正方形：b²'], f(st) { st.r[3].setAttribute('opacity', 1); } },
      { c: ['(a + b)² ≡ a² + 2ab + b²', '(a + b)² ≡ a² + 2ab + b²'], f(st) { st.t.textContent = '(a + b)² ≡ a² + 2ab + b²'; } }
    ]
  };

  const lessons = [
    {
      t: ['What is an identity?', '甚麼是恆等式？'],
      body: ul([B(`An ${T('identity', '恆等式')} is true for ALL values of x. Symbol ≡`, '恆等式對 x 的所有數值都成立。符號 ≡'), B('An equation is only true for some values. e.g. 2x = 6 only when x = 3.', '方程只對某些數值成立，例如 2x = 6 只在 x = 3 時成立。'), B('To check: expand/simplify the L.H.S. Is it exactly the R.H.S.?', '檢查：展開或化簡左方，是否與右方完全相同？')]),
      anim: W(L('Is 2(x + 3) − x ≡ x + 6 an identity?', '2(x + 3) − x ≡ x + 6 是恆等式嗎？'), [
        { h: `L.H.S. = 2(${X} + 3) − ${X}`, c: ['Simplify the left side.', '化簡左方。'] },
        { h: `= 2${X} + 6 − ${X}`, c: ['Expand.', '展開。'] },
        { h: `= ${X} + 6`, c: ['Collect like terms.', '合併同類項。'] },
        { h: `<b class="green">= R.H.S. ✔ ${L('identity', '恆等式')}</b>`, c: ['Same as the right side → identity.', '與右方相同 → 恆等式。'] }
      ])
    },
    {
      t: ['Finding unknown constants', '求未知常數'],
      body: B('Expand one side, then compare the coefficients of x² , x and the constant.', '展開一邊，然後比較 x²、x 的係數和常數項。'),
      anim: W(L('A(x + 2) + B ≡ 3x + 10. Find A and B.', 'A(x + 2) + B ≡ 3x + 10。求 A 和 B。'), [
        { h: `A${X} + 2A + B ≡ 3${X} + 10`, c: ['Expand the left side.', '展開左方。'] },
        { h: `<span class="hl">A</span>${X} ≡ <span class="hl">3</span>${X} → A = 3`, c: ['Compare x terms: A = 3', '比較 x 項：A = 3'] },
        { h: `<span class="hl2">2A + B</span> = <span class="hl2">10</span>`, c: ['Compare constants.', '比較常數項。'] },
        { h: '6 + B = 10 → <b class="green">B = 4</b>', c: ['A = 3, B = 4', 'A = 3，B = 4'] }
      ])
    },
    {
      t: ['Perfect square identities', '完全平方恆等式'],
      body: box('rule', '', `<div class="ex">(a + b)² ≡ a² + 2ab + b²<br>(a − b)² ≡ a² − 2ab + b²</div>`) + box('trap', '', B('(a + b)² ≠ a² + b². Do not forget 2ab!', '(a + b)² ≠ a² + b²。不要漏了 2ab！')),
      anim: [sqAnim, W(L('Expand (2x − 3)²', '展開 (2x − 3)²'), [
        { h: `(2${X} − 3)<sup>2</sup>`, c: ['a = 2x, b = 3, use (a − b)².', 'a = 2x，b = 3，用 (a − b)²。'] },
        { h: `(2${X})<sup>2</sup> − 2(2${X})(3) + 3<sup>2</sup>`, eq: 1, c: ['a² − 2ab + b²', 'a² − 2ab + b²'] },
        { h: `<b class="green">4${X}<sup>2</sup> − 12${X} + 9</b>`, eq: 1, c: ['(2x)² = 4x², 2(2x)(3) = 12x, 3² = 9', '(2x)² = 4x²，2(2x)(3) = 12x，3² = 9'] }
      ])]
    },
    {
      t: ['Difference of two squares', '平方差恆等式'],
      body: box('rule', '', `<div class="ex">(a + b)(a − b) ≡ a² − b²</div>`) + B('Same two terms, one + and one −. The middle terms cancel.', '兩個括號的項相同，一個 +、一個 −，中間項互相抵消。'),
      anim: W(L('Expand (3x + 4)(3x − 4)', '展開 (3x + 4)(3x − 4)'), [
        { h: `(3${X} + 4)(3${X} − 4)`, c: ['a = 3x, b = 4.', 'a = 3x，b = 4。'] },
        { h: `(3${X})<sup>2</sup> − 4<sup>2</sup>`, eq: 1, c: ['a² − b²', 'a² − b²'] },
        { h: `<b class="green">9${X}<sup>2</sup> − 16</b>`, eq: 1, c: ['Done!', '完成！'] }
      ])
    },
    {
      t: ['Using identities to calculate', '用恆等式計算'],
      anim: W(L('Quick calculations', '快速計算'), [
        { h: '102<sup>2</sup> = (100 + 2)<sup>2</sup>', c: ['Split into an easy number.', '拆成容易計算的數。'] },
        { h: '= 10000 + 400 + 4 = <b class="green">10404</b>', c: ['a² + 2ab + b²', 'a² + 2ab + b²'] },
        { h: '53 × 47 = (50 + 3)(50 − 3)', c: ['Both are 3 away from 50.', '兩個數都距離 50 有 3。'] },
        { h: '= 2500 − 9 = <b class="green">2491</b>', c: ['a² − b²', 'a² − b²'] }
      ])
    }
  ];

  const sq = (a, b, vx = 'x', vy = null) => { /* (a vx + b [vy])^2 */ const T1 = [a * a, { [vx]: 2 }], T2 = vy ? [2 * a * b, { [vx]: 1, [vy]: 1 }] : [2 * a * b, { [vx]: 1 }], T3 = vy ? [b * b, { [vy]: 2 }] : [b * b, {}]; return { T1, T2, T3 }; };
  const gens = [
    {
      id: 'isid', name: ['Identity or not?', '是否恆等式？'], gen() {
        const a = ri(2, 5), b = ri(1, 7); const items = [
          [`${a}(${X} + ${b}) ≡ ${a}${X} + ${a * b}`, true, `${a}${X} + ${a * b}`],
          [`${a}(${X} + ${b}) ≡ ${a}${X} + ${b}`, false, `${a}${X} + ${a * b}`],
          [`(${X} + ${b})<sup>2</sup> ≡ ${X}<sup>2</sup> + ${b * b}`, false, `${X}<sup>2</sup> + ${2 * b}${X} + ${b * b}`],
          [`(${X} + ${b})<sup>2</sup> ≡ ${X}<sup>2</sup> + ${2 * b}${X} + ${b * b}`, true, `${X}<sup>2</sup> + ${2 * b}${X} + ${b * b}`],
          [`(${X} − ${b})(${X} + ${b}) ≡ ${X}<sup>2</sup> − ${b * b}`, true, `${X}<sup>2</sup> − ${b * b}`],
          [`${a}${X} + ${b} ≡ ${a + b}${X}`, false, `${a}${X} + ${b}`],
          [`${X}(${X} − ${a}) + ${a}${X} ≡ ${X}<sup>2</sup>`, true, `${X}<sup>2</sup> − ${a}${X} + ${a}${X} = ${X}<sup>2</sup>`],
          [`(${X} − ${b})<sup>2</sup> ≡ ${X}<sup>2</sup> − ${b * b}`, false, `${X}<sup>2</sup> − ${2 * b}${X} + ${b * b}`]];
        const [e, yes, lhs] = pick(items);
        return { kind: 'mc', keep: 1, q: L('Is this an identity?', '這是不是恆等式？') + `<span class="big">${e}</span>`, choices: yes ? [L('Yes', '是'), L('No', '否')] : [L('No', '否'), L('Yes', '是')], steps: [L('Expand the L.H.S.:', '展開左方：') + ` ${lhs}`, yes ? `<b>${L('Same as R.H.S. → identity', '與右方相同 → 恆等式')}</b>` : `<b>${L('Not the same as R.H.S. → not an identity', '與右方不同 → 不是恆等式')}</b>`], hint: L('Expand the left side.', '展開左方。') };
      }
    },
    {
      id: 'coef', name: ['Find unknown constants', '求未知常數'], gen() {
        const t = ri(0, 2);
        if (t === 0) { const A = nz(-5, 6), p = nz(-6, 6), Bc = nz(-9, 9); const c = A, d = A * p + Bc; const askA = Math.random() < .4;
          return { kind: 'num', pre: (askA ? 'A' : 'B') + ' =', q: L(`If A(${lin(1, p)}) + B ≡ ${lin(c, d)}, find ${askA ? 'A' : 'B'}.`, `若 A(${lin(1, p)}) + B ≡ ${lin(c, d)}，求 ${askA ? 'A' : 'B'}。`), ans: askA ? A : Bc,
            steps: [L('Expand', '展開') + `: A${X} ${p < 0 ? MI : '+'} ${Math.abs(p)}A + B`, L('Compare x', '比較 x 項') + `: A = ${n(A)}`, L('Compare constants', '比較常數項') + `: ${n(p)}A + B = ${n(d)} → ${n(p * A)} + B = ${n(d)} → B = ${n(Bc)}`, `<b>${askA ? 'A = ' + n(A) : 'B = ' + n(Bc)}</b>`] }; }
        if (t === 1) { const a = nz(-6, 6), b = nz(-6, 6); const P = a + b, Q = a * b; const askP = Math.random() < .5;
          return { kind: 'num', pre: (askP ? 'p' : 'q') + ' =', q: L(`If (${lin(1, a)})(${lin(1, b)}) ≡ ${X}<sup>2</sup> + p${X} + q, find ${askP ? 'p' : 'q'}.`, `若 (${lin(1, a)})(${lin(1, b)}) ≡ ${X}<sup>2</sup> + p${X} + q，求 ${askP ? 'p' : 'q'}。`), ans: askP ? P : Q,
            steps: [L('Expand', '展開') + `: ${px({ 2: 1, 1: P, 0: Q })}`, askP ? `p = ${n(a)} + ${nb(b)} = <b>${n(P)}</b>` : `q = ${nb(a)} × ${nb(b)} = <b>${n(Q)}</b>`] }; }
        const a = nz(-7, 7); return { kind: 'num', pre: 'k =', q: L(`If (${X} + a)<sup>2</sup> ≡ ${X}<sup>2</sup> ${2 * a < 0 ? MI : '+'} ${Math.abs(2 * a)}${X} + k, find k.`, `若 (${X} + a)<sup>2</sup> ≡ ${X}<sup>2</sup> ${2 * a < 0 ? MI : '+'} ${Math.abs(2 * a)}${X} + k，求 k。`), ans: a * a,
          steps: [`(${X} + a)<sup>2</sup> ≡ ${X}<sup>2</sup> + 2a${X} + a<sup>2</sup>`, `2a = ${n(2 * a)} → a = ${n(a)}`, `k = a<sup>2</sup> = <b>${a * a}</b>`] };
      }
    },
    {
      id: 'sq', name: ['Expand (a ± b)²', '展開 (a ± b)²'], gen() {
        const a = ri(1, 5), b = nz(-6, 6); const useY = Math.random() < .35; const T = sq(a, b, 'x', useY ? 'y' : null);
        const q = `(${polyH([[a, { x: 1 }], [b, useY ? { y: 1 } : {}]])})<sup>2</sup>`;
        const right = polyH([T.T1, T.T2, T.T3]); const w1 = polyH([T.T1, T.T3]), w2 = polyH([T.T1, [-T.T2[0], T.T2[1]], T.T3]), w3 = polyH([T.T1, [T.T2[0] / 2, T.T2[1]], T.T3]), w4 = polyH([T.T1, T.T2, [-T.T3[0], T.T3[1]]]);
        return { kind: 'mc', q: L('Expand', '展開') + `<span class="big">${q}</span>`, choices: [right, w1, w2, w3, w4].slice(0, 4), steps: [b > 0 ? '(a + b)<sup>2</sup> ≡ a<sup>2</sup> + 2ab + b<sup>2</sup>' : '(a − b)<sup>2</sup> ≡ a<sup>2</sup> − 2ab + b<sup>2</sup>', `a<sup>2</sup> = ${termH(T.T1[0], T.T1[1], true)}, 2ab = ${termH(T.T2[0], T.T2[1], true)}, b<sup>2</sup> = ${termH(T.T3[0], T.T3[1], true)}`, `<b>${right}</b>`], hint: L('Don’t forget the middle term 2ab.', '不要漏了中間項 2ab。') };
      }
    },
    {
      id: 'dsq', name: ['Expand (a + b)(a − b)', '展開 (a + b)(a − b)'], gen() {
        const a = ri(1, 6), b = ri(1, 9); const useY = Math.random() < .3; const B2 = useY ? { y: 1 } : {};
        const p1 = polyH([[a, { x: 1 }], [b, B2]]), p2 = polyH([[a, { x: 1 }], [-b, B2]]); const q = Math.random() < .5 ? `(${p1})(${p2})` : `(${p2})(${p1})`;
        const right = polyH([[a * a, { x: 2 }], [-b * b, useY ? { y: 2 } : {}]]);
        return { kind: 'mc', q: L('Expand', '展開') + `<span class="big">${q}</span>`, choices: [right, polyH([[a * a, { x: 2 }], [b * b, useY ? { y: 2 } : {}]]), polyH([[a * a, { x: 2 }], [-2 * a * b, useY ? { x: 1, y: 1 } : { x: 1 }], [-b * b, useY ? { y: 2 } : {}]]), polyH([[a, { x: 2 }], [-b, useY ? { y: 2 } : {}]])], steps: ['(a + b)(a − b) ≡ a<sup>2</sup> − b<sup>2</sup>', `a = ${termH(a, { x: 1 }, true)}, b = ${termH(b, B2, true)}`, `<b>${right}</b>`] };
      }
    },
    {
      id: 'calc', name: ['Calculate with identities', '用恆等式計算'], gen() {
        const t = ri(0, 2); const base = pick([20, 30, 40, 50, 60, 70, 80, 100]);
        if (t === 0) { const d = ri(1, 4); const nmb = base + d; return { kind: 'num', q: L('Use an identity to evaluate', '用恆等式計算') + `<span class="big">${nmb}<sup>2</sup></span>`, ans: nmb * nmb, steps: [`(${base} + ${d})<sup>2</sup> = ${base}<sup>2</sup> + 2(${base})(${d}) + ${d}<sup>2</sup>`, `= ${base * base} + ${2 * base * d} + ${d * d} = <b>${nmb * nmb}</b>`] }; }
        if (t === 1) { const d = ri(1, 4); const nmb = base - d; return { kind: 'num', q: L('Use an identity to evaluate', '用恆等式計算') + `<span class="big">${nmb}<sup>2</sup></span>`, ans: nmb * nmb, steps: [`(${base} − ${d})<sup>2</sup> = ${base}<sup>2</sup> − 2(${base})(${d}) + ${d}<sup>2</sup>`, `= ${base * base} − ${2 * base * d} + ${d * d} = <b>${nmb * nmb}</b>`] }; }
        const d = ri(1, 6); return { kind: 'num', q: L('Use an identity to evaluate', '用恆等式計算') + `<span class="big">${base + d} × ${base - d}</span>`, ans: base * base - d * d, steps: [`(${base} + ${d})(${base} − ${d}) = ${base}<sup>2</sup> − ${d}<sup>2</sup>`, `= ${base * base} − ${d * d} = <b>${base * base - d * d}</b>`] };
      }
    },
    {
      id: 'simp', name: ['Expand and simplify', '展開並化簡'], gen() {
        const a = nz(-6, 6), b = ri(1, 6); const P = { 2: 1, 1: 2 * a, 0: a * a }, Q = { 2: 1, 0: -b * b }; const R = padd(P, Q, -1);
        const q = `(${lin(1, a)})<sup>2</sup> − (${X} + ${b})(${X} − ${b})`;
        return { kind: 'mc', q: L('Expand and simplify', '展開並化簡') + `<span class="big">${q}</span>`, choices: [px(R), px(padd(P, Q, 1)), px({ 1: 2 * a, 0: a * a - b * b }), px({ 1: 2 * a, 0: -a * a - b * b })],
          steps: [`(${lin(1, a)})<sup>2</sup> = ${px(P)}`, `(${X} + ${b})(${X} − ${b}) = ${px(Q)}`, `${px(P)} − (${px(Q)}) = <b>${px(R)}</b>`], hint: L('Use brackets when subtracting!', '相減時要加括號！') };
      }
    }
  ];

  CH.push({
    id: 'ch3', no: 3, color: COLORS[3], title: ['Identities', '恆等式'], short: ['Identities', '恆等式'],
    lessons, gens,
    keys: [B('Identity: true for all values (≡).', '恆等式：對所有數值都成立（≡）。'), B('Unknown constants: expand, then compare coefficients.', '求未知常數：展開後比較係數。'), B('(a + b)² ≡ a² + 2ab + b²; (a − b)² ≡ a² − 2ab + b²', '(a + b)² ≡ a² + 2ab + b²；(a − b)² ≡ a² − 2ab + b²'), B('(a + b)(a − b) ≡ a² − b²', '(a + b)(a − b) ≡ a² − b²')],
    traps: [B('✘ (x + 3)² = x² + 9 &nbsp; ✔ x² + 6x + 9', '✘ (x + 3)² = x² + 9 &nbsp; ✔ x² + 6x + 9'), B('✘ (2x)² = 2x² &nbsp; ✔ 4x²', '✘ (2x)² = 2x² &nbsp; ✔ 4x²'), B('✘ −(x² − 9) = −x² − 9 &nbsp; ✔ −x² + 9', '✘ −(x² − 9) = −x² − 9 &nbsp; ✔ −x² + 9')],
    cheat: ['(a ± b)² ≡ a² ± 2ab + b²', '(a + b)(a − b) ≡ a² − b²', `${L('Compare coefficients', '比較係數')}`]
  });
})();
