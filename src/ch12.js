/* ================= Book 1B Ch12 Congruent Triangles ================= */
(function () {
  const COND = {
    SSS: ['SSS', 'S.S.S.'], SAS: ['SAS', 'S.A.S.'], ASA: ['ASA', 'A.S.A.'], AAS: ['AAS', 'A.A.S.'], RHS: ['RHS', 'R.H.S.']
  };
  /* marks for a condition on a triangle; returns {sides, angles} using vertex/side indices */
  function marks(cond, j) {
    const S = {}, A = {};
    if (cond === 'SSS') { S[0] = { t: 1 }; S[1] = { t: 2 }; S[2] = { t: 3 }; }
    if (cond === 'SAS') { S[j] = { t: 1 }; S[(j + 2) % 3] = { t: 2 }; A[j] = { n: 1 }; }
    if (cond === 'ASA') { A[j] = { n: 1 }; A[(j + 1) % 3] = { n: 2 }; S[j] = { t: 1 }; }
    if (cond === 'AAS') { A[j] = { n: 1 }; A[(j + 1) % 3] = { n: 2 }; S[(j + 1) % 3] = { t: 1 }; }
    if (cond === 'SSA') { A[j] = { n: 1 }; S[j] = { t: 1 }; S[(j + 1) % 3] = { t: 2 }; }
    if (cond === 'AAA') { A[0] = { n: 1 }; A[1] = { n: 2 }; A[2] = { n: 3 }; }
    return { sides: S, angles: A };
  }
  function condFig(cond, names1, names2, o = {}) {
    let base, j = o.j != null ? o.j : ri(0, 2), mk;
    if (cond === 'RHS') { base = RSHAPES[0]; mk = { sides: { 1: { t: 1 }, 0: { t: 2 } }, angles: { 0: { right: true } } }; }
    else { base = o.base || pick(SHAPES); mk = marks(cond, j); }
    const rot = o.rot != null ? o.rot : pick([0, 90, 180, 200, 150, -60]), flip = o.flip != null ? o.flip : Math.random() < .5;
    return triPair(base, { ...mk, names: names1 }, { ...mk, names: names2 }, { rot, flip, s: o.s || 1 });
  }

  const overlay = {
    title: L('Congruent triangles fit exactly on top of each other', '全等三角形可以完全重疊'), minH: 260,
    setup(stage) {
      const P = [[60, 190], [230, 190], [115, 60]];
      let s = G.open(520, 240) + G.tri({ pts: P, names: ['A', 'B', 'C'], fill: '#dbeafe' });
      const Q = P.map(p => [p[0], p[1]]); const xs = P.map(p => p[0]), ys = P.map(p => p[1]); const c = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2]; /* CSS rotates about the box centre */
      /* yellow copy: turned 180° about its box centre and moved 260 to the right */
      const Rv = P.map(p => [2 * c[0] - p[0] + 260, 2 * c[1] - p[1]]); const c2 = G.cen(Rv);
      s += `<g id="mv" class="tr" style="transform-box:fill-box;transform-origin:center;transform:translate(260px,0px) rotate(180deg)">${G.poly(Q, { fill: 'rgba(251,191,36,.55)', c: '#b45309' })}</g>`;
      s += `<g id="lb" class="tr">${['P', 'Q', 'R'].map((nm, i) => G.vlabel(Rv[i], c2, nm, { c: '#b45309' })).join('')}</g></svg>`;
      stage.innerHTML = s; return { mv: $('#mv', stage), lb: $('#lb', stage) };
    },
    frames: [
      { c: ['Two triangles: △ABC and a yellow triangle △PQR (turned round).', '兩個三角形：△ABC 和黃色的 △PQR（轉了方向）。'], f() { } },
      { c: ['Slide and turn the yellow triangle…', '移動並轉動黃色三角形……'], d: 3200, f(st) { st.mv.style.transform = 'translate(0px,0px) rotate(0deg)'; st.lb.style.opacity = 0; } },
      { c: ['It fits exactly! Same shape AND same size → congruent: △ABC ≅ △PQR', '完全重疊！形狀相同且大小相同 → 全等：△ABC ≅ △PQR'], f() { } }
    ]
  };

  const condSlides = () => SL(L('The 5 conditions for congruent triangles', '全等三角形的 5 個條件'), [
    { h: condFig('SSS', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false }) + `<div class="ex"><b>SSS</b></div>`, c: ['SSS: 3 pairs of sides equal.', 'S.S.S.：三對邊相等。'] },
    { h: condFig('SAS', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false, j: 1 }) + `<div class="ex"><b>SAS</b></div>`, c: ['SAS: 2 sides and the angle BETWEEN them.', 'S.A.S.：兩邊及其夾角相等。'] },
    { h: condFig('ASA', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false, j: 0 }) + `<div class="ex"><b>ASA</b></div>`, c: ['ASA: 2 angles and the side BETWEEN them.', 'A.S.A.：兩角及其夾邊相等。'] },
    { h: condFig('AAS', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false, j: 0 }) + `<div class="ex"><b>AAS</b></div>`, c: ['AAS: 2 angles and a side NOT between them.', 'A.A.S.：兩角及一條非夾邊相等。'] },
    { h: condFig('RHS', ['A', 'B', 'C'], ['P', 'Q', 'R'], { rot: 0, flip: false }) + `<div class="ex"><b>RHS</b></div>`, c: ['RHS: Right angle, Hypotenuse, one other Side.', 'R.H.S.：直角、斜邊及另一邊相等。'] },
    { h: condFig('AAA', ['A', 'B', 'C'], ['P', 'Q', 'R'], { base: SHAPES[0], rot: 0, flip: false, s: 1.4 }) + `<div class="ex red">AAA ✘ &nbsp; SSA ✘</div>`, c: ['NOT conditions: AAA (sizes can differ) and SSA.', '不是條件：AAA（大小可以不同）和 SSA。'] }
  ], 330);

  const lessons = [
    {
      t: ['Congruent figures', '全等圖形'],
      body: ul([B(`${T('Congruent', '全等')} = same shape and same size. Symbol: ≅`, '全等 = 形狀相同、大小相同。符號：≅'),
      B(`${T('Corresponding sides', '對應邊')} and ${T('corresponding angles', '對應角')} are equal.`, '對應邊相等，對應角相等。'),
      B('Name in matching order: △ABC ≅ △PQR means A↔P, B↔Q, C↔R.', '按對應次序命名：△ABC ≅ △PQR 表示 A↔P、B↔Q、C↔R。')]),
      anim: [overlay, W(L('Reading △ABC ≅ △PQR', '讀 △ABC ≅ △PQR'), [
        { h: '△<span class="hl">A</span><span class="hl2">B</span><span class="hl3">C</span> ≅ △<span class="hl">P</span><span class="hl2">Q</span><span class="hl3">R</span>', c: ['Letters in the same position match.', '相同位置的字母互相對應。'] },
        { h: 'A ↔ P, &nbsp; B ↔ Q, &nbsp; C ↔ R', c: ['Corresponding vertices.', '對應頂點。'] },
        { h: '<span class="hl">AB</span> = <span class="hl">PQ</span>, &nbsp; BC = QR, &nbsp; CA = RP', c: ['1st+2nd letters ↔ 1st+2nd letters.', '第 1、2 個字母 ↔ 第 1、2 個字母。'] },
        { h: '∠<span class="hl2">B</span> = ∠<span class="hl2">Q</span>, &nbsp; ∠A = ∠P, &nbsp; ∠C = ∠R', c: ['Corresponding angles are equal.', '對應角相等。'] }
      ])]
    },
    {
      t: ['Conditions for congruent triangles', '全等三角形的條件'],
      body: `<table class="t"><tr><th>${L('Condition', '條件')}</th><th>${L('Equal parts', '相等的部分')}</th></tr>
      <tr><td><b>SSS</b></td><td>${L('3 sides', '三邊')}</td></tr><tr><td><b>SAS</b></td><td>${L('2 sides + included angle', '兩邊 + 夾角')}</td></tr>
      <tr><td><b>ASA</b></td><td>${L('2 angles + included side', '兩角 + 夾邊')}</td></tr><tr><td><b>AAS</b></td><td>${L('2 angles + non-included side', '兩角 + 非夾邊')}</td></tr>
      <tr><td><b>RHS</b></td><td>${L('right angle + hypotenuse + side', '直角 + 斜邊 + 一邊')}</td></tr></table>` +
        box('trap', '', B('AAA and SSA do NOT prove congruence.', 'AAA 和 SSA 不能證明全等。')),
      anim: condSlides
    },
    {
      t: ['Finding unknowns', '求未知量'],
      body: B('Find the matching side or angle, then use “corr. sides, ≅△s” or “corr. ∠s, ≅△s”.', '找出對應的邊或角，再用「全等三角形的對應邊 / 對應角」。'),
      anim: W(L('△ABC ≅ △PQR, AB = 7 cm, ∠C = 40°. Find PQ and ∠R.', '△ABC ≅ △PQR，AB = 7 cm，∠C = 40°。求 PQ 和 ∠R。'), [
        { h: '△<span class="hl">AB</span>C ≅ △<span class="hl">PQ</span>R', c: ['AB matches PQ.', 'AB 對應 PQ。'] },
        { h: 'PQ = AB = <b class="green">7 cm</b> &nbsp; <span class="note">corr. sides, ≅△s</span>', c: ['Write the reason in brackets.', '在括號寫上理由。'] },
        { h: '△AB<span class="hl2">C</span> ≅ △PQ<span class="hl2">R</span>', c: ['C matches R.', 'C 對應 R。'] },
        { h: '∠R = ∠C = <b class="green">40°</b> &nbsp; <span class="note">corr. ∠s, ≅△s</span>', c: ['Done.', '完成。'] }
      ])
    },
    {
      t: ['Writing a congruence proof', '寫全等證明'],
      body: B('List 3 facts with reasons, then the conclusion with the condition.', '列出 3 項事實及理由，然後寫結論和條件。'),
      anim: W(L('Prove △ABC ≅ △DEF', '證明 △ABC ≅ △DEF'), [
        { h: L('In △ABC and △DEF,', '在 △ABC 和 △DEF 中，'), c: ['Start by naming both triangles.', '先寫出兩個三角形。'] },
        { h: 'AB = DE &nbsp; <span class="note">given</span>', c: ['Side.', '邊。'] },
        { h: '∠B = ∠E &nbsp; <span class="note">given</span>', c: ['Angle between the two sides.', '兩邊的夾角。'] },
        { h: 'BC = EF &nbsp; <span class="note">given</span>', c: ['Side.', '邊。'] },
        { h: '∴ △ABC ≅ △DEF &nbsp; <span class="note">SAS</span>', c: ['S-A-S in this order → SAS.', '次序是 S-A-S → S.A.S.。'] }
      ])
    }
  ];

  /* ---------- generators ---------- */
  const condName = k => k === 'NO' ? L('Not enough information', '資料不足') : `<b>${k}</b>`;
  const gens = [
    {
      id: 'cond', name: ['Which condition?', '哪個條件？'], gen() {
        const k = pick(['SSS', 'SAS', 'ASA', 'AAS', 'RHS', 'NO']); const real = k === 'NO' ? pick(['SSA', 'AAA']) : k;
        const [n1, n2] = shuffle(LETTERS).slice(0, 2);
        const fig = condFig(real, n1, n2);
        const others = shuffle(['SSS', 'SAS', 'ASA', 'AAS', 'RHS', 'NO'].filter(x => x !== k)).slice(0, 3);
        const why = { SSS: ['3 pairs of equal sides.', '三對邊相等。'], SAS: ['2 sides and the angle between them.', '兩邊及夾角。'], ASA: ['2 angles and the side between them.', '兩角及夾邊。'], AAS: ['2 angles and a side not between them.', '兩角及非夾邊。'], RHS: ['Right angle, hypotenuse and a side.', '直角、斜邊及一邊。'], NO: [real === 'AAA' ? 'Only angles (AAA): sizes may differ.' : 'Two sides and an angle NOT between them (SSA): not a condition.', real === 'AAA' ? '只有角（AAA）：大小可以不同。' : '兩邊及非夾角（SSA）：不是全等條件。'] }[k];
        return { kind: 'mc', fig, q: L('Equal parts are marked the same way. Are the triangles congruent? Which condition?', '相同記號表示相等。兩個三角形是否全等？用哪個條件？'), choices: [condName(k), ...others.map(condName)], steps: [L('Count the marks: ticks = equal sides, arcs = equal angles.', '數記號：短線 = 相等的邊，弧 = 相等的角。'), L(why[0], why[1]), `<b>${k === 'NO' ? L('Not enough information', '資料不足') : k}</b>`], hint: L('Is the angle BETWEEN the two sides?', '那個角是不是兩邊的夾角？') };
      }
    },
    {
      id: 'name', name: ['Corresponding parts', '對應部分'], gen() {
        const [a, b] = shuffle(LETTERS).slice(0, 2); const perm = shuffle([0, 1, 2]);
        const n2 = perm.map(i => b[i]); /* a[i] ↔ n2[i] */
        const isSide = Math.random() < .6;
        if (isSide) { const i = ri(0, 2), j = (i + ri(1, 2)) % 3; const qn = a[i] + a[j], ans = n2[i] + n2[j];
          const all = [[0, 1], [1, 2], [0, 2]].map(([x, y]) => n2[x] + n2[y]); const wrong = all.filter(s => s !== ans && s !== ans.split('').reverse().join(''));
          return { kind: 'mc', q: `${TRI}${a.join('')} ≅ ${TRI}${n2.join('')}. ` + L(`Which side is equal to ${qn}?`, `哪條邊等於 ${qn}？`), choices: [ans, ...wrong, b[0] + b[2] === ans ? b[1] + b[0] : b[0] + b[2]], steps: [L('Match letters by position.', '按位置配對字母。'), `${a[i]} ↔ ${n2[i]}, ${a[j]} ↔ ${n2[j]}`, `${qn} = <b>${ans}</b>`] }; }
        const i = ri(0, 2); return { kind: 'mc', q: `${TRI}${a.join('')} ≅ ${TRI}${n2.join('')}. ` + L(`Which angle is equal to ∠${a[i]}?`, `哪個角等於 ∠${a[i]}？`), choices: [`∠${n2[i]}`, ...n2.filter((_, k) => k !== i).map(x => `∠${x}`)], steps: [L(`${a[i]} is letter ${i + 1}; letter ${i + 1} of the other triangle is ${n2[i]}.`, `${a[i]} 是第 ${i + 1} 個字母；另一個三角形第 ${i + 1} 個字母是 ${n2[i]}。`), `∠${a[i]} = <b>∠${n2[i]}</b>`] };
      }
    },
    {
      id: 'side', name: ['Find a side', '求邊長'], gen() {
        const base = pick(SHAPES); const [a, b] = shuffle(LETTERS).slice(0, 2); const lens = [0, 1, 2].map(i => Math.round(Math.hypot(...G.sub(base[(i + 1) % 3], base[i])) / 15));
        if (new Set(lens).size < 3) return null; const k = ri(0, 2); const sides1 = {}, sides2 = {};
        [0, 1, 2].forEach(i => { sides1[i] = { lab: lens[i] + ' cm' }; });
        sides2[k] = { lab: 'x cm', lc: G.COL.a };
        const fig = triPair(base, { names: a, sides: sides1 }, { names: b, sides: sides2 }, { rot: pick([90, 180, 160, -70]), flip: Math.random() < .5 });
        return { kind: 'num', fig, q: `${TRI}${a.join('')} ≅ ${TRI}${b.join('')}. ` + L('Find x.', '求 x。'), pre: v('x') + ' =', ans: lens[k], steps: [L(`x is on side ${b[k]}${b[(k + 1) % 3]}, which matches ${a[k]}${a[(k + 1) % 3]}.`, `x 在 ${b[k]}${b[(k + 1) % 3]} 上，對應 ${a[k]}${a[(k + 1) % 3]}。`), `${b[k]}${b[(k + 1) % 3]} = ${a[k]}${a[(k + 1) % 3]} (corr. sides, ≅△s)`, `${v('x')} = <b>${lens[k]}</b>`], hint: L('Match letters, not positions on the page.', '按字母配對，不要看圖中的位置。') };
      }
    },
    {
      id: 'angle', name: ['Find an angle', '求角'], gen() {
        const base = pick(SHAPES); const [a, b] = shuffle(LETTERS).slice(0, 2); const A = triAngles(base); const k = ri(0, 2); const third = Math.random() < .5;
        const an1 = {}, an2 = {};
        if (third) { [0, 1, 2].filter(i => i !== k).forEach(i => an1[i] = { lab: A[i] + '°' }); an2[k] = { lab: 'x', c: G.COL.b }; }
        else { an1[k] = { lab: A[k] + '°' }; an2[k] = { lab: 'x', c: G.COL.b }; }
        const fig = triPair(base, { names: a, angles: an1 }, { names: b, angles: an2 }, { rot: pick([90, 180, 160, -70]), flip: Math.random() < .5 });
        const st = third ? [`∠${a[k]} = 180° − ${A.filter((_, i) => i !== k).join('° − ')}° = ${A[k]}° (∠ sum of △)`, `x = ∠${a[k]} (corr. ∠s, ≅△s)`, `x = <b>${A[k]}°</b>`] : [`∠${b[k]} ↔ ∠${a[k]}`, `x = ∠${a[k]} (corr. ∠s, ≅△s) = <b>${A[k]}°</b>`];
        return { kind: 'num', fig, q: `${TRI}${a.join('')} ≅ ${TRI}${b.join('')}. ` + L('Find x.', '求 x。'), pre: v('x') + ' =', post: '°', ans: A[k], steps: st, hint: L('Angles in a triangle add up to 180°.', '三角形內角和是 180°。') };
      }
    },
    {
      id: 'proof', name: ['Complete the proof', '完成證明'], gen() {
        const k = pick(['SSS', 'SAS', 'ASA', 'AAS', 'RHS']); const [a, b] = shuffle(LETTERS).slice(0, 2);
        const s = (i, j) => `${a[i]}${a[j]} = ${b[i]}${b[j]}`, an = i => `∠${a[i]} = ∠${b[i]}`;
        const lines = { SSS: [s(0, 1), s(1, 2), s(2, 0)], SAS: [s(0, 1), an(1), s(1, 2)], ASA: [an(0), s(0, 1), an(1)], AAS: [an(0), an(1), s(1, 2)], RHS: [`∠${a[0]} = ∠${b[0]} = 90°`, s(1, 2), s(0, 1)] }[k];
        const fig = condFig(k === 'SAS' ? 'SAS' : k, a, b, { j: k === 'SAS' ? 1 : 0, rot: 0, flip: false, base: SHAPES[0] });
        return { kind: 'mc', q: L('Choose the reason for the last line.', '選出最後一行的理由。') + `<div style="margin:8px 0;line-height:1.9">${L(`In ${TRI}${a.join('')} and ${TRI}${b.join('')},`, `在 ${TRI}${a.join('')} 和 ${TRI}${b.join('')} 中，`)}<br>${lines.map(x => x + ' &nbsp;(given)').join('<br>')}<br>∴ ${TRI}${a.join('')} ≅ ${TRI}${b.join('')} &nbsp;( ? )</div>`,
          choices: [k, ...shuffle(['SSS', 'SAS', 'ASA', 'AAS', 'RHS'].filter(x => x !== k)).slice(0, 3)], steps: [L('Write S for each side and A for each angle, in order.', '按次序：邊寫 S，角寫 A。'), k === 'RHS' ? L('Right angle + hypotenuse + side → RHS', '直角 + 斜邊 + 邊 → RHS') : L(`Check whether the angle/side is BETWEEN the others.`, '檢查角 / 邊是否在中間（夾角 / 夾邊）。'), `<b>${k}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch12', no: 12, color: COLORS[12], title: ['Congruent Triangles (Book 1B)', '全等三角形（1B 冊）'], short: ['Congruent △', '全等三角形'],
    lessons, gens,
    keys: [B('≅ means same shape and same size.', '≅ 表示形狀和大小都相同。'),
    B('Name in order: △ABC ≅ △PQR → AB = PQ, ∠B = ∠Q.', '按次序命名：△ABC ≅ △PQR → AB = PQ，∠B = ∠Q。'),
    B('Conditions: SSS, SAS, ASA, AAS, RHS.', '條件：S.S.S.、S.A.S.、A.S.A.、A.A.S.、R.H.S.。'),
    B('Reasons: corr. sides, ≅△s / corr. ∠s, ≅△s.', '理由：全等三角形的對應邊 / 對應角。')],
    traps: [B('✘ AAA or SSA prove congruence &nbsp; ✔ they do not', '✘ AAA 或 SSA 可證全等 &nbsp; ✔ 不可以'),
    B('✘ SAS with the angle not between the sides &nbsp; ✔ the angle must be included', '✘ S.A.S. 的角不是夾角 &nbsp; ✔ 必須是夾角'),
    B('✘ Matching by position on the page &nbsp; ✔ match by letter order', '✘ 按圖中位置配對 &nbsp; ✔ 按字母次序配對')],
    cheat: ['SSS · SAS · ASA · AAS · RHS', `${L('Not', '不可')}: AAA, SSA`, '△ABC ≅ △PQR → AB = PQ, ∠C = ∠R']
  });
})();
