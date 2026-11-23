/* ================= Last 10 Minutes page ================= */
function renderFinal() {
  const m = $('main');
  const tips = [
    ['Underline key words (more than, at least, ascending…).', '圈出關鍵字（多於、最少、遞增……）。'],
    ['Show steps.', '寫步驟。'],
    ['Check every + / − sign.', '檢查每個 + / − 號。'],
    ['Fractions in simplest form.', '分數化至最簡。'],
    ['Check equations by substitution.', '把答案代回方程驗算。'],
    ['Word problems: “Let x …” and an answer sentence.', '應用題：寫「設 x……」和答句。'],
    ['Write units.', '寫單位。'],
    ['Stuck? Skip, come back later.', '不會做？先跳過。'],
    ['Keep 5 minutes to check.', '留 5 分鐘檢查。']
  ];
  m.innerHTML = `<div class="hero" style="background:linear-gradient(135deg,#f59e0b,#ef4444)"><h1>⏰ ${L('Last 10 Minutes', '考前十分鐘')}</h1></div>
  <h2>📌 ${L('Summary', '總結')}</h2>
  <div class="cheat">${CH.map(c => `<div class="card"><h3><span class="chnum" style="background:${c.color}">${c.no}</span><span>${L(c.title[0], c.title[1])}</span></h3><ul>${c.cheat.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
  <h2>⚠️ ${L('Common mistakes', '常犯錯誤')}</h2>
  <div class="card">${CH.map(c => c.traps.slice(0, 2).map(t => `<div style="display:flex;gap:10px;align-items:flex-start;margin:6px 0"><span class="chnum" style="background:${c.color};width:26px;height:26px;font-size:.8em;border-radius:7px;flex:none">${c.no}</span><div>${t}</div></div>`).join('')).join('')}</div>
  <h2>✅ ${L('Checklist', '清單')}</h2>
  <div class="card"><ul class="checklist">${tips.map((t, i) => `<li><label><input type="checkbox"><span>${B(t[0], t[1])}</span></label></li>`).join('')}</ul></div>
  <div class="card" style="text-align:center;background:var(--pur-soft)"><a class="btn" style="display:inline-block;margin-top:10px;text-decoration:none" href="#mock">🎯 ${L('Mock test', '模擬測驗')} ➜</a></div>`;
}

/* ================= Mock test page ================= */
function renderMock() {
  const m = $('main');
  m.innerHTML = `<div class="hero" style="background:linear-gradient(135deg,#7c3aed,#2563eb)"><h1>🎯 ${L('Mock Test', '模擬測驗')}</h1><div>${L('15 questions · all chapters', '15 題 · 所有章節')}</div></div>
  <div class="card" id="mock"></div>
  <div class="pagenext"><a class="btn sec" href="#final">⬅ ${L('Last 10 Minutes', '考前十分鐘')}</a></div>`;
  const all = CH.flatMap(c => c.gens.map(g => ({ ...g, id: c.id + '-' + g.id, name: [`Ch${c.no} ${g.name[0]}`, `第${c.no}章 ${g.name[1]}`] })));
  const p = new Practice($('#mock', m), all, { id: 'mock', testN: 15, noChips: true, autofocus: false, testOnly: true });
  $$('.mode', p.root)[1].click();
}
