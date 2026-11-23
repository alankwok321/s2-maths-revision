/* ================= Ch5 Algebraic Fractions and Formulas ================= */
(function () {
  const X = v('x'), Y = v('y');
  /* monomial fraction  (c1 * vars1) / (c2 * vars2)  simplified */
  function mfrac(c1, e1, c2, e2) {
    const f0 = new F(c1, c2); const neg = f0.n < 0; const N = Math.abs(f0.n), D = f0.d;
    const keys = [...new Set([...Object.keys(e1), ...Object.keys(e2)])].sort();
    const top = {}, bot = {}; keys.forEach(k => { const d = (e1[k] || 0) - (e2[k] || 0); if (d > 0) top[k] = d; if (d < 0) bot[k] = -d; });
    const tH = termH(N, top, true), bH = (D === 1 && !Object.keys(bot).length) ? '' : termH(D, bot, true);
    const body = bH ? fr(tH, bH) : tH; return (neg ? MI : '') + body;
  }
  const monoH = (c, e) => termH(c, e, true);
  const lessons = [
    {
      t: ['Simplifying algebraic fractions', '化簡代數分式'],
      body: ul([B(`An ${T('algebraic fraction', '代數分式')} has letters in the denominator, e.g. ${fr(3, X)}, ${fr(X + ' + 1', X + ' − 2')}.`, `代數分式的分母有字母，例如 ${fr(3, X)}、${fr(X + ' + 1', X + ' − 2')}。`), B('Simplify: factorize top and bottom, then cancel COMMON FACTORS.', '化簡：把分子和分母因式分解，然後約去公因式。'), box('trap', '', B(`Only cancel factors, never terms: ${fr(X + ' + 3', '3')} ≠ ${X} + 1`, `只可約去因式，不可約去項：${fr(X + ' + 3', '3')} ≠ ${X} + 1`))]),
      anim: [W(L('Example 1', '例題 1'), [
        { h: fr(`6${X}<sup>2</sup>${Y}`, `9${X}${Y}<sup>3</sup>`), c: ['Numbers: 6/9 = 2/3.', '數字：6/9 = 2/3。'] },
        { h: fr(`2 · <span class="hl">3${X}${Y}</span> · ${X}`, `3 · <span class="hl">3${X}${Y}</span> · ${Y}<sup>2</sup>`), eq: 1, c: ['Common factor: 3xy.', '公因式：3xy。'] },
        { h: `<b class="green">${fr(`2${X}`, `3${Y}<sup>2</sup>`)}</b>`, eq: 1, c: ['Cancel it.', '約去。'] }
      ]), W(L('Example 2', '例題 2'), [
        { h: fr(`${X}<sup>2</sup> − 9`, `2${X} + 6`), c: ['Factorize first.', '先因式分解。'] },
        { h: fr(`(${X} + 3)(${X} − 3)`, `2(${X} + 3)`), eq: 1, c: ['Top: a² − b². Bottom: common factor 2.', '分子：平方差；分母：公因式 2。'] },
        { h: `<b class="green">${fr(`${X} − 3`, 2)}</b>`, eq: 1, c: ['Cancel (x + 3).', '約去 (x + 3)。'] }
      ])]
    },
    {
      t: ['Multiplying and dividing', '乘法及除法'],
      body: B('× : top × top, bottom × bottom, cancel. ÷ : flip the second fraction, then ×.', '×：分子乘分子，分母乘分母，再約簡。÷：第二個分數倒轉，然後 ×。'),
      anim: W(L('Example', '例題'), [
        { h: `${fr(`4${X}`, `3${Y}`)} ÷ ${fr(`2${X}<sup>2</sup>`, `9${Y}`)}`, c: ['÷ → × and flip.', '÷ → × 並倒轉。'] },
        { h: `${fr(`4${X}`, `3${Y}`)} × ${fr(`9${Y}`, `2${X}<sup>2</sup>`)}`, eq: 1, c: ['Now multiply.', '現在相乘。'] },
        { h: fr(`36${X}${Y}`, `6${X}<sup>2</sup>${Y}`), eq: 1, c: ['Cancel 6xy.', '約去 6xy。'] },
        { h: `<b class="green">${fr(6, X)}</b>`, eq: 1, c: ['= 6/x', '= 6/x'] }
      ])
    },
    {
      t: ['Adding and subtracting', '加法及減法'],
      body: ul([B('Same denominator: add/subtract the numerators.', '分母相同：分子相加減。'), B('Different denominators: use the L.C.M. as the common denominator.', '分母不同：用 L.C.M. 作公分母。'), B('Put brackets round numerators when subtracting!', '相減時，分子要加括號！')]),
      anim: W(L('Example', '例題'), [
        { h: `${fr(`${X} + 1`, 3)} − ${fr(`${X} − 2`, 4)}`, c: ['L.C.M. of 3 and 4 is 12.', '3 和 4 的 L.C.M. 是 12。'] },
        { h: fr(`4(${X} + 1) − 3(${X} − 2)`, 12), eq: 1, c: ['Multiply each numerator. Keep the brackets.', '各分子乘相應的數，保留括號。'] },
        { h: fr(`4${X} + 4 − 3${X} <span class="hl">+ 6</span>`, 12), eq: 1, c: ['−3 × (−2) = +6', '−3 × (−2) = +6'] },
        { h: `<b class="green">${fr(`${X} + 10`, 12)}</b>`, eq: 1, c: ['Collect like terms.', '合併同類項。'] }
      ])
    },
    {
      t: ['Changing the subject of a formula', '公式的主項變換'],
      body: B(`The ${T('subject', '主項')} is the letter on its own on one side, e.g. v in v = u + at. To change it, “solve” for the new letter.`, '主項是單獨在一邊的字母，例如 v = u + at 中的 v。變換主項就是「解」出新的字母。'),
      anim: W(L('Make t the subject of v = u + at', '把 v = u + at 的主項變為 t'), [
        { h: `${v('v')} = ${v('u')} + ${v('a')}${v('t')}`, c: ['We want t alone.', '我們要令 t 單獨在一邊。'] },
        { h: `${v('v')} − ${v('u')} = ${v('a')}${v('t')}`, c: ['Move u to the left.', '把 u 移到左邊。'] },
        { h: `<b class="green">${v('t')} = ${fr(v('v') + ' − ' + v('u'), v('a'))}</b>`, c: ['Divide both sides by a.', '兩邊 ÷ a。'] }
      ])
    },
    {
      t: ['Substitution in formulas', '公式代入'],
      body: B('Put in the known values, then solve for the unknown. (Or change the subject first.)', '代入已知數值，然後解出未知數（或先變換主項）。')
    }
  ];

  const vs = () => pick([['x', 'y'], ['a', 'b'], ['m', 'n']]);
  const gens = [
    {
      id: 'simp', name: ['Simplify (monomials)', '化簡（單項式）'], gen() {
        const [p, q] = vs(); const c1 = ri(2, 12) * (Math.random() < .2 ? -1 : 1), c2 = ri(2, 12); if (gcd(c1, c2) === 1) return null;
        const e1 = { [p]: ri(1, 4), [q]: ri(0, 3) }, e2 = { [p]: ri(0, 3), [q]: ri(1, 3) };
        const right = mfrac(c1, e1, c2, e2); const w1 = mfrac(c1, e1, c2 * 2, e2), w2 = mfrac(c1, { [p]: e1[p] + 1, [q]: e1[q] }, c2, e2), w3 = mfrac(c2, e2, c1, e1);
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${fr(monoH(c1, e1), monoH(c2, e2))}</span>`, choices: [right, w1, w2, w3], steps: [L(`Numbers: ${c1}/${c2} = ${new F(c1, c2).text()}`, `數字：${c1}/${c2} = ${new F(c1, c2).text()}`), L('Letters: subtract the indices (top − bottom).', '字母：指數相減（分子 − 分母）。'), `= <b>${right}</b>`] };
      }
    },
    {
      id: 'simp2', name: ['Simplify (factorize first)', '化簡（先因式分解）'], gen() {
        const m = ri(1, 7), k = ri(2, 5); const t = ri(0, 2); let q, right, st, w;
        if (t === 0) { q = fr(`${X}<sup>2</sup> − ${m * m}`, `${X} + ${m}`); right = `${X} − ${m}`; st = [fr(`(${X} + ${m})(${X} − ${m})`, `${X} + ${m}`)]; w = [`${X} − ${m * m}`, `${X} + ${m}`, fr(`${X}<sup>2</sup> − ${m}`, 1)]; }
        if (t === 1) { q = fr(`${k}${X} + ${k * m}`, `${X}<sup>2</sup> − ${m * m}`); right = fr(k, `${X} − ${m}`); st = [fr(`${k}(${X} + ${m})`, `(${X} + ${m})(${X} − ${m})`)]; w = [fr(k, `${X} + ${m}`), fr(`${k}${X}`, `${X}<sup>2</sup>`), fr(k, `${X} − ${m * m}`)]; }
        if (t === 2) { q = fr(`${X}<sup>2</sup> + ${2 * m}${X} + ${m * m}`, `${k}${X} + ${k * m}`); right = fr(`${X} + ${m}`, k); st = [fr(`(${X} + ${m})<sup>2</sup>`, `${k}(${X} + ${m})`)]; w = [fr(`${X} + ${m}`, `${k}${X}`), `${X} + ${m}`, fr(`${X} + ${2 * m}`, k)]; }
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${q}</span>`, choices: [right, ...w], steps: [L('Factorize top and bottom', '分子分母因式分解') + ': ' + st[0], L('Cancel the common factor', '約去公因式') + `: <b>${right}</b>`], hint: L('Factorize first; cancel brackets, not terms.', '先因式分解；約去括號，不是約去項。') };
      }
    },
    {
      id: 'muldiv', name: ['× and ÷', '乘及除'], gen() {
        const [p, q] = vs(); const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9), d = ri(2, 9); const e1 = { [p]: ri(1, 3) }, e2 = { [q]: ri(1, 2) }, e3 = { [q]: ri(1, 3) }, e4 = { [p]: ri(1, 3) };
        const div = Math.random() < .5; const comb = (x, y) => { const r = { ...x }; for (const k in y) r[k] = (r[k] || 0) + y[k]; return r; };
        const qH = `${fr(monoH(a, e1), monoH(b, e2))} ${div ? '÷' : '×'} ${fr(monoH(c, e3), monoH(d, e4))}`;
        const right = div ? mfrac(a * d, comb(e1, e4), b * c, comb(e2, e3)) : mfrac(a * c, comb(e1, e3), b * d, comb(e2, e4));
        const wrong = div ? mfrac(a * c, comb(e1, e3), b * d, comb(e2, e4)) : mfrac(a * d, comb(e1, e4), b * c, comb(e2, e3));
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${qH}</span>`, choices: [right, wrong, mfrac(b * d, comb(e2, e4), a * c, comb(e1, e3)), mfrac(a + c, comb(e1, e3), b + d, comb(e2, e4))],
          steps: [div ? L('÷ → × and flip the second fraction', '÷ → ×，第二個分數倒轉') + `: ${fr(monoH(a, e1), monoH(b, e2))} × ${fr(monoH(d, e4), monoH(c, e3))}` : L('Top × top, bottom × bottom', '分子乘分子，分母乘分母'), L('Cancel', '約簡') + `: <b>${right}</b>`] };
      }
    },
    {
      id: 'addsame', name: ['+ − (same denominator)', '加減（分母相同）'], gen() {
        const k = pick([2, 3, 4, 5, 6, 7]); const p = nz(-6, 6), q = nz(-6, 6); const sub = Math.random() < .6;
        const R = sub ? { 1: 0, 0: p - q } : { 1: 2, 0: p + q };
        const top = sub ? n(p - q) : px(R); if (sub && p === q) return null;
        const right = sub ? new F(p - q, k).html() : fr(top, k);
        const wrongTop = sub ? n(p + q) : px({ 1: 2, 0: p - q });
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${fr(lin(1, p), k)} ${sub ? MI : '+'} ${fr(lin(1, q), k)}</span>`, choices: [right, sub ? fr(wrongTop, k) : fr(wrongTop, k), sub ? fr(`2${X} ${p - q < 0 ? MI : '+'} ${Math.abs(p - q)}`, k) : fr(top, 2 * k), sub ? fr(top, 2 * k) : fr(px({ 1: 2, 0: p + q }), k * k)],
          steps: [L('Same denominator → combine the numerators', '分母相同 → 分子合併') + `: ${fr(`(${lin(1, p)}) ${sub ? MI : '+'} (${lin(1, q)})`, k)}`, sub ? `= ${fr(`${X} ${p < 0 ? MI : '+'} ${Math.abs(p)} − ${X} ${q < 0 ? '+' : MI} ${Math.abs(q)}`, k)}` : '', `= <b>${right}</b>`].filter(Boolean), hint: L('Use brackets for the second numerator.', '第二個分子要加括號。') };
      }
    },
    {
      id: 'adddiff', name: ['+ − (different denominators)', '加減（分母不同）'], gen() {
        const t = Math.random() < .5;
        if (t) { const a = ri(1, 7), b = ri(1, 7), p = ri(2, 6), q = ri(2, 6); if (p === q || gcd(a, p) !== 1 || gcd(b, q) !== 1) return null; const Lm = lcm(p, q); const sub = Math.random() < .4; const top = sub ? a * Lm / p - b * Lm / q : a * Lm / p + b * Lm / q; if (!top) return null;
          const res = new F(top, Lm); const right = res.n < 0 ? MI + fr(Math.abs(res.n), res.d === 1 ? X : res.d + X) : fr(res.n, res.d === 1 ? X : res.d + X);
          return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${fr(a, p + X)} ${sub ? MI : '+'} ${fr(b, q + X)}</span>`, choices: [right, fr(sub ? a - b : a + b, (p + q) + X), fr(sub ? a - b : a + b, (p * q) + X), fr(top, Lm + X + '<sup>2</sup>')],
            steps: [L(`L.C.M. of ${p}x and ${q}x = ${Lm}x`, `${p}x 和 ${q}x 的 L.C.M. = ${Lm}x`), `${fr(a * Lm / p, Lm + X)} ${sub ? MI : '+'} ${fr(b * Lm / q, Lm + X)} = ${fr(n(top), Lm + X)}`, `= <b>${right}</b>`] }; }
        const m = pick([2, 3, 4]), nn = pick([3, 4, 5, 6]); if (m === nn || nn % m === 0) return null; const p = nz(-5, 5), q = nz(-5, 5); const sub = Math.random() < .6; const Lm = m * nn / gcd(m, nn); const A = Lm / m, Bq = Lm / nn;
        const R = { 1: A + (sub ? -Bq : Bq), 0: A * p + (sub ? -Bq * q : Bq * q) }; const right = fr(px(R), Lm); if (!R[1] && !R[0]) return null;
        const wr = { 1: A + (sub ? -Bq : Bq), 0: A * p + (sub ? -Bq * -q : Bq * q) * (sub ? 1 : -1) };
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${fr(lin(1, p), m)} ${sub ? MI : '+'} ${fr(lin(1, q), nn)}</span>`, choices: [right, fr(px(wr), Lm), fr(px({ 1: sub ? 0 : 2, 0: sub ? p - q : p + q }), m + nn), fr(px({ 1: A + (sub ? -Bq : Bq), 0: p + (sub ? -q : q) }), Lm)],
          steps: [L(`L.C.M. of ${m} and ${nn} = ${Lm}`, `${m} 和 ${nn} 的 L.C.M. = ${Lm}`), fr(`${A}(${lin(1, p)}) ${sub ? MI : '+'} ${Bq}(${lin(1, q)})`, Lm), `= ${fr(`${lin(A, A * p)}${sub ? termH(-Bq, { x: 1 }) + termH(-Bq * q, {}) : termH(Bq, { x: 1 }) + termH(Bq * q, {})}`, Lm)}`, `= <b>${right}</b>`], hint: L('Keep brackets when you multiply the numerators.', '分子乘數時保留括號。') };
      }
    },
    {
      id: 'subject', name: ['Change the subject', '變換主項'], gen() {
        const V = s => v(s); const items = [
          [`${V('y')} = ${V('m')}${V('x')} + ${V('c')}`, 'x', fr(`${V('y')} − ${V('c')}`, V('m')), [fr(V('y'), V('m')) + ` − ${V('c')}`, fr(`${V('y')} + ${V('c')}`, V('m')), `${V('m')}(${V('y')} − ${V('c')})`]],
          [`${V('A')} = ${fr(1, 2)}${V('b')}${V('h')}`, 'h', fr(`2${V('A')}`, V('b')), [fr(V('A'), `2${V('b')}`), fr(V('b'), `2${V('A')}`), `2${V('A')}${V('b')}`]],
          [`${V('P')} = 2(${V('l')} + ${V('w')})`, 'w', fr(`${V('P')} − 2${V('l')}`, 2), [fr(V('P'), 2) + ` + ${V('l')}`, `${V('P')} − 2${V('l')}`, fr(`${V('P')} − ${V('l')}`, 2)]],
          [`${V('v')} = ${V('u')} + ${V('a')}${V('t')}`, 'a', fr(`${V('v')} − ${V('u')}`, V('t')), [fr(V('v'), V('t')) + ` − ${V('u')}`, `${V('t')}(${V('v')} − ${V('u')})`, fr(`${V('v')} + ${V('u')}`, V('t'))]],
          [`${V('F')} = ${fr(9, 5)}${V('C')} + 32`, 'C', fr(`5(${V('F')} − 32)`, 9), [fr(`9(${V('F')} − 32)`, 5), fr(`5${V('F')}`, 9) + ' − 32', fr(`5(${V('F')} + 32)`, 9)]],
          [`${V('S')} = ${fr(`(${V('a')} + ${V('b')})${V('h')}`, 2)}`, 'a', fr(`2${V('S')}`, V('h')) + ` − ${V('b')}`, [fr(`2${V('S')} − ${V('b')}`, V('h')), fr(V('S'), `2${V('h')}`) + ` − ${V('b')}`, fr(`${V('S')}${V('h')}`, 2) + ` − ${V('b')}`]],
          [`${V('y')} = ${fr(`${V('x')} + ${V('k')}`, 3)}`, 'x', `3${V('y')} − ${V('k')}`, [fr(V('y'), 3) + ` − ${V('k')}`, `3(${V('y')} − ${V('k')})`, `3${V('y')} + ${V('k')}`]]
        ];
        const HOW = [['Move c to the other side, then divide by m.', '把 c 移到另一邊，再 ÷ m。'], ['Multiply by 2, then divide by b.', '× 2，再 ÷ b。'], ['Divide by 2, then move l.', '÷ 2，再移項 l。'], ['Move u, then divide by t.', '移項 u，再 ÷ t。'], ['Move 32, then multiply by 5/9.', '移項 32，再 × 5/9。'], ['Multiply by 2, divide by h, then move b.', '× 2，÷ h，再移項 b。'], ['Multiply by 3, then move k.', '× 3，再移項 k。']];
        const idx = ri(0, items.length - 1); const [f, s, right, wr] = items[idx]; const how = HOW[idx];
        return { kind: 'mc', q: L(`Make ${s} the subject of the formula`, `把公式的主項變為 ${s}`) + `<span class="big">${f}</span>`, choices: [right, ...wr], steps: [L(how[0], how[1]), `${v(s)} = <b>${right}</b>`], hint: L('Treat it like solving an equation.', '當作解方程。') };
      }
    },
    {
      id: 'value', name: ['Find a value in a formula', '求公式中的值'], gen() {
        const t = ri(0, 2);
        if (t === 0) { const a = ri(2, 10), b = ri(2, 12), h = ri(2, 8) * 2; const S = (a + b) * h / 2;
          return { kind: 'num', pre: v('b') + ' =', q: L(`S = ${fr(`(a + b)h`, 2)}. If S = ${S}, a = ${a} and h = ${h}, find b.`, `S = ${fr(`(a + b)h`, 2)}。若 S = ${S}，a = ${a}，h = ${h}，求 b。`), ans: b, steps: [`${S} = ${fr(`(${a} + b)(${h})`, 2)}`, `${S} = ${h / 2}(${a} + b)`, `${a} + b = ${S / (h / 2)}`, `b = <b>${b}</b>`] }; }
        if (t === 1) { const u = ri(0, 15), a = ri(2, 6), tt = ri(2, 10); const vv = u + a * tt;
          return { kind: 'num', pre: v('a') + ' =', q: L(`v = u + at. If v = ${vv}, u = ${u} and t = ${tt}, find a.`, `v = u + at。若 v = ${vv}，u = ${u}，t = ${tt}，求 a。`), ans: a, steps: [`a = ${fr('v − u', 't')}`, `= ${fr(`${vv} − ${u}`, tt)}`, `= <b>${a}</b>`] }; }
        const C = pick([-10, 0, 5, 10, 15, 20, 25, 30, 35, 40, 100]); const Fv = 9 * C / 5 + 32;
        return { kind: 'num', pre: 'C =', q: L(`F = ${fr(9, 5)}C + 32. If F = ${Fv}, find C.`, `F = ${fr(9, 5)}C + 32。若 F = ${Fv}，求 C。`), ans: C, steps: [`${Fv} − 32 = ${fr(9, 5)}C`, `${Fv - 32} × ${fr(5, 9)} = C`, `C = <b>${n(C)}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch5', no: 5, color: COLORS[5], title: ['Algebraic Fractions and Formulas', '代數分式及公式'], short: ['Algebraic Fractions', '代數分式'],
    lessons, gens,
    keys: [B('Simplify: factorize, then cancel common factors.', '化簡：先因式分解，再約去公因式。'), B('÷ : flip the second fraction and ×.', '÷：第二個分數倒轉，然後 ×。'), B('+ − : common denominator (L.C.M.); brackets on numerators.', '+ −：通分母（L.C.M.）；分子加括號。'), B('Change the subject = solve for that letter.', '變換主項 = 解出該字母。')],
    traps: [B(`✘ ${fr(X + ' + 3', 3)} = ${X} + 1 &nbsp; ✔ cannot cancel terms`, `✘ ${fr(X + ' + 3', 3)} = ${X} + 1 &nbsp; ✔ 不可約去項`), B(`✘ ${fr(1, X)} + ${fr(1, Y)} = ${fr(2, X + ' + ' + Y)} &nbsp; ✔ ${fr(Y + ' + ' + X, X + Y)}`, `✘ ${fr(1, X)} + ${fr(1, Y)} = ${fr(2, X + ' + ' + Y)} &nbsp; ✔ ${fr(Y + ' + ' + X, X + Y)}`), B('✘ −(x − 2) = −x − 2 in subtraction &nbsp; ✔ −x + 2', '✘ 相減時 −(x − 2) = −x − 2 &nbsp; ✔ −x + 2')],
    cheat: [`${L('Factorize → cancel factors', '因式分解 → 約去因式')}`, `${fr('a', 'b')} ÷ ${fr('c', 'd')} = ${fr('a', 'b')} × ${fr('d', 'c')}`, `${L('Different denominators → L.C.M.', '分母不同 → L.C.M.')}`, `v = u + at → t = ${fr('v − u', 'a')}`]
  });
})();
