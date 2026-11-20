/* Treino de vocabulário / kanji — página #/vocab
   Mostra uma palavra; o usuário escreve o significado (português) e a leitura (hiragana).
   Ao verificar: resultado, explicação e frase de exemplo. Estatísticas em localStorage. */
(function () {
  "use strict";
  const LS_VOC = "n5sim.vocab.v1";
  const LS_VSET = "n5sim.vocabset.v1";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  const WORDS = String(window.VOCAB_RAW || "").split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const [w, r, m, e, ex, tr] = l.split("|").map((x) => (x || "").trim());
    return { w, r, m: m.split("/").map((x) => x.trim()).filter(Boolean), e, ex, tr, kanji: /[一-鿿]/.test(w), kata: /^[゠-ヿー]+$/.test(w) };
  }).filter((x) => x.w && x.r);

  /* ---------- normalização ---------- */
  const kataToHira = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const normKana = (s) => kataToHira(String(s).normalize("NFKC")).replace(/[\s・、。.,'"「」]/g, "");
  const stripAcc = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  function normPt(s) {
    let x = stripAcc(String(s).toLowerCase()).replace(/[.,;:!?¿¡"'()\[\]]/g, " ").replace(/\s+/g, " ").trim();
    x = x.replace(/^(o|a|os|as|um|uma|uns|umas|to)\s+/, "");
    return x;
  }
  function lev(a, b) {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  function meaningOk(ans, word) {
    const a = normPt(ans); if (!a) return false;
    const parts = a.split(/\s*(?:,|\/| e | ou )\s*/).filter(Boolean);
    return word.m.some((mm) => {
      const t = normPt(mm);
      if (a === t || parts.includes(t)) return true;
      const tol = t.length >= 9 ? 2 : t.length >= 5 ? 1 : 0;
      if (parts.some((p) => lev(p, t) <= tol)) return true;
      // aceita "verbo ir" / "o ato de comer"
      if (t.length >= 3 && new RegExp("(^|\\s)" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|\\s)").test(a) && a.split(" ").length <= t.split(" ").length + 2) return true;
      return false;
    });
  }
  function readingOk(ans, word) {
    const a = normKana(ans), r = normKana(word.r);
    if (!a) return false;
    if (a === r) return true;
    // aceita vogal longa escrita com vogal em vez de ー (こうひい ~ こーひー)
    const longToVowel = (s) => s.replace(/(.)ー/g, (m, c) => c + vowelOf(c));
    return longToVowel(r) === longToVowel(a);
  }
  const VOW = { a: "あかさたなはまやらわがざだばぱゃ", i: "いきしちにひみりぎじぢびぴ", u: "うくすつぬふむゆるぐずづぶぷゅ", e: "えけせてねへめれげぜでべぺ", o: "おこそとのほもよろごぞどぼぽょ" };
  const VMAP = { a: "あ", i: "い", u: "う", e: "え", o: "お" };
  function vowelOf(c) { for (const v in VOW) if (VOW[v].includes(c)) return VMAP[v]; return ""; }

  /* ---------- romaji → hiragana (para quem não tem teclado japonês) ---------- */
  const RT = { a: "あ", i: "い", u: "う", e: "え", o: "お", ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ", sa: "さ", shi: "し", si: "し", su: "す", se: "せ", so: "そ", ta: "た", chi: "ち", ti: "ち", tsu: "つ", tu: "つ", te: "て", to: "と", na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の", ha: "は", hi: "ひ", fu: "ふ", hu: "ふ", he: "へ", ho: "ほ", ma: "ま", mi: "み", mu: "む", me: "め", mo: "も", ya: "や", yu: "ゆ", yo: "よ", ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ", wa: "わ", wo: "を", nn: "ん", "n'": "ん", ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご", za: "ざ", ji: "じ", zi: "じ", zu: "ず", ze: "ぜ", zo: "ぞ", da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど", ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ", pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ", kya: "きゃ", kyu: "きゅ", kyo: "きょ", sha: "しゃ", shu: "しゅ", sho: "しょ", sya: "しゃ", syu: "しゅ", syo: "しょ", cha: "ちゃ", chu: "ちゅ", cho: "ちょ", tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ", nya: "にゃ", nyu: "にゅ", nyo: "にょ", hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ", mya: "みゃ", myu: "みゅ", myo: "みょ", rya: "りゃ", ryu: "りゅ", ryo: "りょ", gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ", ja: "じゃ", ju: "じゅ", jo: "じょ", jya: "じゃ", jyu: "じゅ", jyo: "じょ", bya: "びゃ", byu: "びゅ", byo: "びょ", pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ", "-": "ー", xtu: "っ", ltu: "っ", xya: "ゃ", xyu: "ゅ", xyo: "ょ", la: "ぁ", xa: "ぁ", li: "ぃ", xi: "ぃ", lu: "ぅ", xu: "ぅ", le: "ぇ", xe: "ぇ", lo: "ぉ", xo: "ぉ", fa: "ふぁ", fi: "ふぃ", fe: "ふぇ", fo: "ふぉ", ti_: "てぃ", di_: "でぃ", we: "うぇ", wi: "うぃ", va: "ゔぁ", vi: "ゔぃ", vu: "ゔ", ve: "ゔぇ", vo: "ゔぉ" };
  function romaToHira(s, final) {
    let out = "", i = 0; s = s.toLowerCase();
    while (i < s.length) {
      const c = s[i];
      if (!/[a-z\-']/.test(c)) { out += c; i++; continue; }
      // consoante dobrada → っ
      if (i + 1 < s.length && c === s[i + 1] && /[bcdfghjkmpqrstvwxyz]/.test(c)) { out += "っ"; i++; continue; }
      // "nn" + vogal → ん + n... (konnichiha → こんにちは); "nn" isolado → ん
      if (c === "n" && s[i + 1] === "n" && /[aiueo]/.test(s[i + 2] || "")) { out += "ん"; i++; continue; }
      let hit = false;
      for (let L = 3; L >= 1; L--) { const k = s.substr(i, L); if (RT[k]) { out += RT[k]; i += L; hit = true; break; } }
      if (hit) continue;
      if (c === "n") { const nx = s[i + 1]; if (nx === undefined) { if (final) { out += "ん"; i++; continue; } out += c; i++; continue; } if (!/[aiueoy]/.test(nx)) { out += "ん"; i++; continue; } }
      out += c; i++;
    }
    return out;
  }

  /* ---------- seleção de palavras ---------- */
  function pool(filter, stats) {
    let p = WORDS;
    if (filter === "kanji") p = p.filter((w) => w.kanji);
    if (filter === "kana") p = p.filter((w) => !w.kanji);
    if (filter === "erradas") { p = p.filter((w) => { const s = stats[w.w]; return s && s.t > s.c && (s.streak || 0) < 2; }); }
    if (filter === "novas") p = p.filter((w) => !stats[w.w]);
    return p;
  }
  function pick(filter, stats, recent) {
    const p = pool(filter, stats).filter((w) => !recent.includes(w.w));
    const list = p.length ? p : pool(filter, stats);
    if (!list.length) return null;
    const weights = list.map((w) => { const s = stats[w.w]; if (!s) return 3; const wrong = s.t - s.c; return Math.max(0.25, 1 + wrong * 1.5 - (s.streak || 0) * 0.6); });
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < list.length; i++) { r -= weights[i]; if (r <= 0) return list[i]; }
    return list[list.length - 1];
  }

  /* ---------- TTS simples para ouvir palavra/frase ---------- */
  function say(text) {
    if (!("speechSynthesis" in window)) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; u.rate = 0.85; const v = speechSynthesis.getVoices().find((x) => /^ja/i.test(x.lang)); if (v) u.voice = v; speechSynthesis.speak(u); } catch (e) {}
  }

  /* ---------- view ---------- */
  window.viewVocab = function (mount, el) {
    const st = Object.assign({ filter: "todas", roma: true }, get(LS_VSET, {}));
    const stats = get(LS_VOC, {});
    const session = { c: 0, t: 0 };
    const recent = [];
    const mastered = () => WORDS.filter((w) => (stats[w.w] || {}).streak >= 3).length;
    const seenN = () => WORDS.filter((w) => stats[w.w]).length;

    const ico = (n) => `<svg class="ico" aria-hidden="true"><use href="#i-${n}"/></svg>`;
    const node = el(`<section class="vocab">
      <div class="vhead"><h1 style="margin:0">Vocabulário e kanji</h1><span class="spacer"></span><span class="pill print" id="sess">sessão 0 de 0</span></div>
      <p class="muted" style="margin:4px 0 14px">Escreva o significado em português e a leitura em hiragana. A correção aparece ao verificar.</p>
      <div class="filters" id="vf">
        ${[["todas", "Todas"], ["kanji", "Com kanji"], ["kana", "Só kana"], ["novas", "Novas"], ["erradas", "Revisar erradas"]].map(([k, l]) => `<button data-f="${k}" class="${st.filter === k ? "on" : ""}">${l}</button>`).join("")}
      </div>
      <div class="sheet vcard" id="vcard"></div>
      <div class="vfoot">
        <span id="vstats"></span><span class="spacer"></span>
        <label><input type="checkbox" id="roma" ${st.roma ? "checked" : ""}> Converter romaji em hiragana</label>
      </div>
    </section>`);
    const card = node.querySelector("#vcard");
    const upStats = () => {
      node.querySelector("#sess").textContent = `sessão ${session.c} de ${session.t}`;
      node.querySelector("#vstats").textContent = `${seenN()} de ${WORDS.length} palavras vistas · ${mastered()} dominadas (3 acertos seguidos)`;
    };
    node.querySelectorAll("#vf button").forEach((b) => b.onclick = () => {
      st.filter = b.dataset.f; set(LS_VSET, st);
      node.querySelectorAll("#vf button").forEach((x) => x.classList.toggle("on", x === b));
      next();
    });
    node.querySelector("#roma").onchange = (e) => { st.roma = e.target.checked; set(LS_VSET, st); };

    let cur = null;
    function next() {
      cur = pick(st.filter, stats, recent);
      if (!cur) {
        card.innerHTML = `<div class="empty">${ico("check")}<p>${st.filter === "erradas" ? "Nenhuma palavra para revisar agora." : "Nenhuma palavra neste filtro."}</p></div>`;
        upStats(); return;
      }
      recent.push(cur.w); if (recent.length > 8) recent.shift();
      card.innerHTML = `
        <div class="vword-box"><div class="vword" lang="ja">${esc(cur.w)}</div></div>
        <form id="vform" class="vform" autocomplete="off">
          <label class="vfield"><span>Significado (português)</span><input id="vm" type="text" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="next"></label>
          <label class="vfield"><span>Leitura (hiragana)</span><input id="vr" type="text" lang="ja" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done"></label>
          <div class="vactions"><button type="button" class="btn ghost" id="vskip">Não sei</button><button class="btn primary" id="vcheck">Verificar</button></div>
        </form>
        <div id="vres" class="vres" aria-live="polite"></div>`;
      const vm = card.querySelector("#vm"), vr = card.querySelector("#vr");
      vr.addEventListener("input", () => { if (st.roma && /[a-zA-Z\-]/.test(vr.value)) { const pos = vr.value.length; vr.value = romaToHira(vr.value, false); } });
      vm.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); vr.focus(); } });
      card.querySelector("#vform").onsubmit = (e) => { e.preventDefault(); check(false); };
      card.querySelector("#vskip").onclick = () => check(true);
      setTimeout(() => vm.focus({ preventScroll: true }), 50);
      upStats();
    }
    function record(ok) {
      const s = (stats[cur.w] = stats[cur.w] || { c: 0, t: 0, streak: 0 });
      s.t++; if (ok) { s.c++; s.streak = (s.streak || 0) + 1; } else s.streak = 0;
      s.last = Date.now(); set(LS_VOC, stats);
      session.t++; if (ok) session.c++;
    }
    function check(skip) {
      const vm = card.querySelector("#vm"), vr = card.querySelector("#vr");
      if (st.roma) vr.value = romaToHira(vr.value, true);
      const am = vm.value.trim(), ar = vr.value.trim();
      const okM = !skip && meaningOk(am, cur), okR = !skip && readingOk(ar, cur);
      const ok = okM && okR;
      record(ok);
      vm.disabled = vr.disabled = true;
      card.querySelector("#vform .vactions").remove();
      const row = (label, okv, given, right) => `<div class="vrow ${okv ? "ok" : "bad"}"><span class="vic" aria-label="${okv ? "certo" : "errado"}">${okv ? "◯" : "✕"}</span><div><div class="small muted">${label}</div><div>${given ? `Sua resposta: <b>${esc(given)}</b>` : "<i>em branco</i>"}${okv ? "" : ` → correto: <b>${right}</b>`}</div></div></div>`;
      const res = card.querySelector("#vres");
      res.innerHTML = `
        <div class="verdict ${ok ? "ok" : skip ? "" : "bad"}" style="margin:0 0 12px">${ok ? ico("check") + "Correto" : skip ? "Resposta" : ico("x") + "Não foi dessa vez"}</div>
        ${row("Significado", okM, am, esc(cur.m.join(" / ")))}
        ${row("Leitura", okR, ar, `<span lang="ja">${esc(cur.r)}</span>`)}
        <div class="explain"><div class="row"><span lang="ja" style="font-family:var(--mincho);font-size:1.5rem">${esc(cur.w)}</span><span lang="ja" class="vreading" style="margin:0">【${esc(cur.r)}】</span><span class="spacer"></span><button class="btn sm ghost" id="sayw" aria-label="Ouvir a palavra">${ico("volume")}</button></div>
          <div style="margin-top:4px"><b>Significados aceitos:</b> ${esc(cur.m.join(", "))}</div>
          <div style="margin-top:6px">${esc(cur.e)}</div></div>
        <div class="explain vex"><div class="row"><span class="small muted">Exemplo</span><span class="spacer"></span><button class="btn sm ghost" id="says" aria-label="Ouvir a frase">${ico("volume")}</button></div><div lang="ja" class="vexjp">${esc(cur.ex)}</div><div class="tr">${esc(cur.tr)}</div></div>
        <div class="row" style="margin-top:12px">${!okM && !skip && am ? `<button class="btn sm ghost" id="vaccept" title="Use se sua resposta era um sinônimo válido">Minha resposta estava certa</button>` : ""}<span class="spacer"></span><button class="btn primary" id="vnext">Próxima ${ico("arrow")}</button></div>`;
      res.querySelector("#sayw").onclick = () => say(cur.r);
      res.querySelector("#says").onclick = () => say(cur.ex);
      const acc = res.querySelector("#vaccept");
      if (acc) acc.onclick = () => {
        // corrige o registro: conta o significado como certo
        const s = stats[cur.w]; if (okR) { s.c++; s.streak = (s.streak || 0) + 1; session.c++; } set(LS_VOC, stats);
        acc.remove(); res.querySelector(".verdict").textContent = okR ? "Correto (aceito)" : "Significado aceito; a leitura ainda está errada";
        res.querySelector(".vrow").classList.replace("bad", "ok"); upStats();
      };
      const nb = res.querySelector("#vnext"); nb.onclick = next; nb.focus({ preventScroll: true });
      upStats();
      res.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    mount(node);
    next();
  };
  window.VOCAB_WORDS = WORDS;
  window.VOCAB_TEST = { romaToHira, meaningOk, readingOk };
})();
