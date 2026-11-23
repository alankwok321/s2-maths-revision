/* ================= Ch4 Factorization of Polynomials ================= */
(function () {
  const X = v('x'), Y = v('y');
  const mono = (c, ex) => termH(c, ex, true);
  const lessons = [
    {
      t: ['What is factorization?', '甚麼是因式分解？'],
      body: B(`${T('Factorization', '因式分解')} is the reverse of expansion: write a polynomial as a product of factors.`, '因式分解是展開的逆運算：把多項式寫成因式的積。'),
      anim: W(L('Expansion ⇄ factorization', '展開 ⇄ 因式分解'), [
        { h: `3(${X} + 2) &nbsp;<span class="blue">— ${L('expand', '展開')} →</span>&nbsp; 3${X} + 6`, c: ['Expanding removes brackets.', '展開：去掉括號。'] },
        { h: `3${X} + 6 &nbsp;<span class="green">— ${L('factorize', '因式分解')} →</span>&nbsp; 3(${X} + 2)`, c: ['Factorizing puts brackets back.', '因式分解：放回括號。'] },
        { h: L('Check: expand your answer — you should get the question back.', '驗算：展開答案，應得回原式。'), c: ['Always check by expanding.', '一定要展開驗算。'] }
      ])
    },
    {
      t: ['Taking out common factors', '抽出公因式'],
      body: B('Find the H.C.F. of the numbers AND the letters (lowest power). Take it outside the bracket.', '找出數字和字母（最低次數）的 H.C.F.，把它抽到括號外。'),
      anim: W(L('Factorize 6x²y + 9xy²', '因式分解 6x²y + 9xy²'), [
        { h: `6${X}<sup>2</sup>${Y} + 9${X}${Y}<sup>2</sup>`, c: ['Look at the numbers: H.C.F. of 6 and 9 is 3.', '看數字：6 和 9 的 H.C.F. 是 3。'] },
        { h: `<span class="hl">3${X}${Y}</span>(2${X}) + <span class="hl">3${X}${Y}</span>(3${Y})`, eq: 1, c: ['Letters: lowest power of x is x, of y is y → 3xy.', '字母：x 最低次是 x，y 最低次是 y → 3xy。'] },
        { h: `<b class="green">3${X}${Y}(2${X} + 3${Y})</b>`, eq: 1, c: ['Take 3xy outside.', '把 3xy 抽出。'] }
      ])
    },
    {
      t: ['Grouping terms', '分組分解'],
      body: B('4 terms? Group them in pairs, take out a factor from each pair, then take out the common bracket.', '有 4 項？兩兩分組，每組抽出公因式，再抽出相同的括號。'),
      anim: W(L('Factorize ax + ay + bx + by', '因式分解 ax + ay + bx + by'), [
        { h: `<span class="hl">${v('a')}${X} + ${v('a')}${Y}</span> + <span class="hl2">${v('b')}${X} + ${v('b')}${Y}</span>`, c: ['Make two groups.', '分成兩組。'] },
        { h: `${v('a')}(${X} + ${Y}) + ${v('b')}(${X} + ${Y})`, eq: 1, c: ['Take a out of the 1st group, b out of the 2nd.', '第 1 組抽出 a，第 2 組抽出 b。'] },
        { h: `<b class="green">(${X} + ${Y})(${v('a')} + ${v('b')})</b>`, eq: 1, c: ['(x + y) is common. Take it out.', '(x + y) 是公因式，把它抽出。'] }
      ])
    },
    {
      t: ['Difference of two squares', '平方差'],
      body: box('rule', '', `<div class="ex">a² − b² ≡ (a + b)(a − b)</div>`) + B('Always take out a common factor first if there is one.', '如有公因式，一定要先抽出。'),
      anim: W(L('Factorize 2x² − 18', '因式分解 2x² − 18'), [
        { h: `2${X}<sup>2</sup> − 18`, c: ['Common factor 2 first.', '先抽出公因式 2。'] },
        { h: `2(${X}<sup>2</sup> − 9)`, eq: 1, c: ['x² − 9 = x² − 3²', 'x² − 9 = x² − 3²'] },
        { h: `<b class="green">2(${X} + 3)(${X} − 3)</b>`, eq: 1, c: ['a² − b² = (a + b)(a − b)', 'a² − b² = (a + b)(a − b)'] }
      ])
    },
    {
      t: ['Perfect squares', '完全平方'],
      body: box('rule', '', `<div class="ex">a² + 2ab + b² ≡ (a + b)²<br>a² − 2ab + b² ≡ (a − b)²</div>`),
      anim: W(L('Factorize 4x² − 12x + 9', '因式分解 4x² − 12x + 9'), [
        { h: `4${X}<sup>2</sup> − 12${X} + 9`, c: ['First and last terms are squares: (2x)² and 3².', '首項和末項都是平方數：(2x)² 和 3²。'] },
        { h: `(2${X})<sup>2</sup> − 2(2${X})(3) + 3<sup>2</sup>`, eq: 1, c: ['Check the middle: 2(2x)(3) = 12x ✔', '檢查中間項：2(2x)(3) = 12x ✔'] },
        { h: `<b class="green">(2${X} − 3)<sup>2</sup></b>`, eq: 1, c: ['The middle sign is −, so (a − b)².', '中間是 −，所以是 (a − b)²。'] }
      ])
    }
  ];

  const gens = [
    {
      id: 'cf', name: ['Common factors', '抽出公因式'], gen() {
        const g = { c: pick([2, 3, 4, 5, 6, 1]) * (Math.random() < .2 ? -1 : 1), x: ri(0, 2), y: ri(0, 1) }; if (Math.abs(g.c) === 1 && !g.x && !g.y) return null;
        const k = ri(2, 3); const inner = []; for (let i = 0; i < k; i++) inner.push({ c: nz(-7, 9), x: ri(0, 2), y: ri(0, 1) });
        const cg = inner.reduce((a, t) => gcd(a, t.c), 0); const mx = Math.min(...inner.map(t => t.x)), my = Math.min(...inner.map(t => t.y));
        inner.forEach(t => { t.c /= cg; t.x -= mx; t.y -= my; }); if (inner[0].c < 0) inner.forEach(t => t.c = -t.c);
        if (new Set(inner.map(t => t.x + ',' + t.y)).size < k) return null;
        const ex = t => ({ x: t.x, y: t.y });
        const expd = polyH(inner.map(t => [t.c * g.c, { x: t.x + g.x, y: t.y + g.y }]));
        const G0 = mono(g.c, ex(g)); const inn = polyH(inner.map(t => [t.c, ex(t)]));
        const right = `${G0}(${inn})`;
        const part = { ...g, c: g.c / (Math.abs(g.c) > 1 ? Math.abs(g.c) : 1) }; const w1 = `${mono(part.c, ex(part))}(${polyH(inner.map(t => [t.c * Math.abs(g.c), ex(t)]))})`;
        const w2 = `${G0}(${polyH(inner.map((t, i) => [i ? -t.c : t.c, ex(t)]))})`;
        const w3 = g.x ? `${mono(g.c, { x: g.x - 1, y: g.y })}(${polyH(inner.map(t => [t.c, { x: t.x + 1, y: t.y }]))})` : `${G0}(${polyH(inner.map(t => [t.c * 2, ex(t)]))})`;
        return { kind: 'mc', q: L('Factorize', '因式分解') + `<span class="big">${expd}</span>`, choices: [right, w1, w2, w3], steps: [L('H.C.F. of the numbers and lowest powers of the letters', '數字的 H.C.F. 及字母的最低次數') + `: ${G0}`, `= <b>${right}</b>`, L('Check by expanding.', '展開驗算。')], hint: L('Take out the H.C.F. completely (numbers AND letters).', '要完全抽出 H.C.F.（數字及字母）。') };
      }
    },
    {
      id: 'group', name: ['Grouping terms', '分組分解'], gen() {
        const a = ri(1, 3), p = nz(-6, 6), q = nz(-6, 6); if (p === q || gcd(a, p) !== 1) return null; const lv = 'y';
        /* (a x + p)(L + q) = a x L + a q x + p L + p q */
        const expd = polyH([[a, { x: 1, [lv]: 1 }], [a * q, { x: 1 }], [p, { [lv]: 1 }], [p * q, {}]]);
        const A1 = lin(a, p), B1 = polyH([[1, { [lv]: 1 }], [q, {}]]);
        const right = `(${A1})(${B1})`;
        return { kind: 'mc', q: L('Factorize', '因式分解') + `<span class="big">${expd}</span>`, choices: [right, `(${lin(a, q)})(${polyH([[1, { [lv]: 1 }], [p, {}]])})`, `(${lin(a, -p)})(${B1})`, `${termH(a, { x: 1 }, true)}(${B1}) ${p < 0 ? MI : '+'} ${Math.abs(p)}(${B1})`],
          steps: [L('Group in pairs', '兩兩分組') + `: (${polyH([[a, { x: 1, [lv]: 1 }], [a * q, { x: 1 }]])}) ${p < 0 ? MI : '+'} (${polyH([[Math.abs(p), { [lv]: 1 }], [Math.abs(p) * q * Math.sign(p) * Math.sign(p), {}]])})`, `= ${termH(a, { x: 1 }, true)}(${B1}) ${p < 0 ? MI : '+'} ${Math.abs(p)}(${B1})`, `= <b>${right}</b>`], hint: L('After grouping, the two brackets must be the same.', '分組後兩個括號必須相同。') };
      }
    },
    {
      id: 'dsq', name: ['Difference of two squares', '平方差'], gen() {
        const k = pick([1, 1, 2, 3, 5]), a = ri(1, 5), b = ri(1, 9); const useY = Math.random() < .3; const B2 = useY ? { y: 1 } : {};
        if ((k > 1 && a > 2) || gcd(a, b) !== 1) return null;
        const expd = polyH([[k * a * a, { x: 2 }], [-k * b * b, useY ? { y: 2 } : {}]]);
        const p = polyH([[a, { x: 1 }], [b, B2]]), m = polyH([[a, { x: 1 }], [-b, B2]]); const kk = k > 1 ? k : '';
        const right = `${kk}(${p})(${m})`;
        return { kind: 'mc', q: L('Factorize', '因式分解') + `<span class="big">${expd}</span>`, choices: [right, `${kk}(${m})<sup>2</sup>`, `${kk}(${p})<sup>2</sup>`, k > 1 ? `(${polyH([[k * a, { x: 1 }], [b, B2]])})(${polyH([[a, { x: 1 }], [-b, B2]])})` : `(${polyH([[a * a, { x: 1 }], [b, B2]])})(${polyH([[1, { x: 1 }], [-b, B2]])})`],
          steps: [k > 1 ? L(`Take out ${k}`, `抽出 ${k}`) + `: ${k}(${polyH([[a * a, { x: 2 }], [-b * b, useY ? { y: 2 } : {}]])})` : '', `= ${kk}[(${termH(a, { x: 1 }, true)})<sup>2</sup> − (${termH(b, B2, true)})<sup>2</sup>]`, `= <b>${right}</b>`].filter(Boolean), hint: 'a² − b² ≡ (a + b)(a − b)' };
      }
    },
    {
      id: 'psq', name: ['Perfect squares', '完全平方'], gen() {
        const a = ri(1, 4), b = nz(-7, 7); const useY = Math.random() < .25; const B2 = useY ? { y: 1 } : {};
        const expd = polyH([[a * a, { x: 2 }], [2 * a * b, useY ? { x: 1, y: 1 } : { x: 1 }], [b * b, useY ? { y: 2 } : {}]]);
        const r = polyH([[a, { x: 1 }], [b, B2]]); const right = `(${r})<sup>2</sup>`;
        return { kind: 'mc', q: L('Factorize', '因式分解') + `<span class="big">${expd}</span>`, choices: [right, `(${polyH([[a, { x: 1 }], [-b, B2]])})<sup>2</sup>`, `(${r})(${polyH([[a, { x: 1 }], [-b, B2]])})`, `(${polyH([[a * a, { x: 1 }], [b, B2]])})<sup>2</sup>`],
          steps: [L('First and last terms are squares', '首末兩項是平方') + `: (${termH(a, { x: 1 }, true)})<sup>2</sup>, (${termH(Math.abs(b), B2, true)})<sup>2</sup>`, L('Middle term = 2ab ✔', '中間項 = 2ab ✔') + ` (${b < 0 ? MI : '+'})`, `= <b>${right}</b>`], hint: L('Is the middle term 2 × a × b?', '中間項是否等於 2 × a × b？') };
      }
    },
    {
      id: 'full', name: ['Factorize completely', '完全因式分解'], gen() {
        const k = pick([2, 3, 4, 5]), b = ri(1, 6); const t = Math.random() < .5;
        if (t) { const expd = polyH([[k, { x: 3 }], [-k * b * b, { x: 1 }]]); const right = `${k}${X}(${X} + ${b})(${X} − ${b})`;
          return { kind: 'mc', q: L('Factorize completely', '完全因式分解') + `<span class="big">${expd}</span>`, choices: [right, `${k}${X}(${X}<sup>2</sup> − ${b * b})`, `${X}(${k}${X}<sup>2</sup> − ${k * b * b})`, `${k}${X}(${X} − ${b})<sup>2</sup>`], steps: [L(`Common factor ${k}x`, `公因式 ${k}x`) + `: ${k}${X}(${X}<sup>2</sup> − ${b * b})`, L('Then difference of squares', '再用平方差') + `: <b>${right}</b>`], hint: L('Common factor first, then look again!', '先抽公因式，再看看能否繼續分解！') }; }
        const expd = polyH([[k, { x: 2 }], [2 * k * b, { x: 1 }], [k * b * b, {}]]); const right = `${k}(${X} + ${b})<sup>2</sup>`;
        return { kind: 'mc', q: L('Factorize completely', '完全因式分解') + `<span class="big">${expd}</span>`, choices: [right, `${k}(${X}<sup>2</sup> + ${2 * b}${X} + ${b * b})`, `(${k}${X} + ${b})<sup>2</sup>`, `${k}(${X} + ${b})(${X} − ${b})`], steps: [L(`Common factor ${k}`, `公因式 ${k}`) + `: ${k}(${X}<sup>2</sup> + ${2 * b}${X} + ${b * b})`, L('Then perfect square', '再用完全平方') + `: <b>${right}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch4', no: 4, color: COLORS[4], title: ['Factorization of Polynomials', '多項式的因式分解'], short: ['Factorization', '因式分解'],
    lessons, gens,
    keys: [B('Step 1: always take out the H.C.F. first.', '第 1 步：一定先抽出 H.C.F.。'), B('4 terms → try grouping.', '4 項 → 試分組分解。'), B('a² − b² ≡ (a + b)(a − b)', 'a² − b² ≡ (a + b)(a − b)'), B('a² ± 2ab + b² ≡ (a ± b)²', 'a² ± 2ab + b² ≡ (a ± b)²'), B('Check by expanding.', '展開驗算。')],
    traps: [B('✘ 2x² − 18 = (2x + 3)(x − 3)... &nbsp; ✔ take out 2 first: 2(x + 3)(x − 3)', '✘ 2x² − 18 直接分解 &nbsp; ✔ 先抽 2：2(x + 3)(x − 3)'), B('✘ x² + 9 = (x + 3)(x − 3) &nbsp; ✔ x² + 9 cannot be factorized this way', '✘ x² + 9 = (x + 3)(x − 3) &nbsp; ✔ x² + 9 不能這樣分解'), B('✘ Stopping too early: 3x(x² − 4) &nbsp; ✔ 3x(x + 2)(x − 2)', '✘ 太早停止：3x(x² − 4) &nbsp; ✔ 3x(x + 2)(x − 2)')],
    cheat: [`H.C.F. → ${L('grouping', '分組')} → a² − b² → (a ± b)²`, 'a² − b² ≡ (a + b)(a − b)', 'a² ± 2ab + b² ≡ (a ± b)²']
  });
})();
