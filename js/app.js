/* JLPT N5 — Simulado completo
   App estático (sem dependências). Dados em data/*.js. Resultados em localStorage. */
(function () {
  "use strict";

  const EXAMS = window.EXAMS || [];
  const LS_HIST = "n5sim.history.v1";
  const LS_CUR = "n5sim.current.v1";
  const LS_SET = "n5sim.settings.v1";

  const TYPE_LABELS = {
    kanji: "Leitura de kanji (漢字読み)", hyouki: "Escrita (表記)", bunmyaku: "Vocabulário no contexto (文脈規定)",
    iikae: "Paráfrase (言い換え)", bunpou1: "Forma gramatical (文法形式)", bunpou2: "Montagem de frase ★ (文の組み立て)",
    bunshou: "Gramática do texto (文章の文法)", dokkai1: "Leitura curta (短文)", dokkai2: "Leitura média (中文)",
    jouhou: "Busca de informação (情報検索)", kadai: "Listening · tarefa (課題理解)", point: "Listening · ponto-chave (ポイント理解)",
    hatsuwa: "Listening · expressão verbal (発話表現)", sokuji: "Listening · resposta imediata (即時応答)"
  };
  const SPEAKER = { N: "ナレーター", M: "男", F: "女" };
  const SPEAKER_PT = { N: "Narrador", M: "Homem", F: "Mulher" };

  const $app = document.getElementById("app");
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { toast("Não foi possível salvar no localStorage."); } },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  const history = () => store.get(LS_HIST, []);
  const settings = () => Object.assign({ mode: "exam", shuffle: false, rate: 0.9 }, store.get(LS_SET, {}));

  /* ---------- text formatting ---------- */
  const KANJI = "[\\u3005\\u3006\\u4E00-\\u9FFF\\u30F6]+";
  const FURI_RE = new RegExp("([0-9０-９]*)(" + KANJI + ")\\{([^}]+)\\}", "g");
  function absorbDigits(digits, kanji, reading) { return digits && reading.length > kanji.length * 2; }
  function fmt(text, opt = {}) {
    let s = String(text);
    s = s.replace(FURI_RE, (m, d, k, r) => {
      if (opt.furi === false) return d + k;
      if (absorbDigits(d, k, r)) return `<ruby>${d}${k}<rt>${r}</rt></ruby>`;
      return `${d}<ruby>${k}<rt>${r}</rt></ruby>`;
    });
    s = s.replace(/__(.+?)__/g, "<u>$1</u>");
    s = s.replace(/\[(\d{1,2})\]/g, '<span class="numbox">$1</span>');
    if (opt.star) { s = s.replace(/___/g, '<span class="blank">&nbsp;</span>').replace(/★/g, '<span class="star"></span>'); }
    return s;
  }
  function ttsText(text) {
    return String(text)
      .replace(/<[^>]+>/g, "")
      .replace(FURI_RE, (m, d, k, r) => (absorbDigits(d, k, r) ? r : d + r))
      .replace(/__/g, "")
      .replace(/^([1-3])　/, "$1、");
  }

  /* ---------- exam model ---------- */
  function flatten(exam) {
    const list = [];
    exam.sections.forEach((s, si) => {
      let n = 0;
      s.groups.forEach((g, gi) => {
        g.questions.forEach((q, qi) => {
          n++;
          list.push({ id: `${s.id}-${gi}-${qi}`, s, si, g, gi, q, qi, num: n });
        });
      });
    });
    return list;
  }
  const examById = (id) => EXAMS.find((e) => e.id === id);
  function canShuffle(item) {
    if (item.s.listening || item.q.noShuffle) return false;
    if (item.q.o.every((o) => /^[0-9①-④]+$/.test(o))) return false;
    return true;
  }
  function perm(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function score(exam, answers) {
    const items = flatten(exam);
    const sections = {}; const byType = {};
    let lkC = 0, lkT = 0, lC = 0, lT = 0;
    items.forEach((it) => {
      const sec = (sections[it.s.id] = sections[it.s.id] || { c: 0, t: 0, name: it.s.pt });
      const ty = (byType[it.g.type] = byType[it.g.type] || { c: 0, t: 0 });
      const ok = answers[it.id] === it.q.a;
      sec.t++; ty.t++; if (ok) { sec.c++; ty.c++; }
      if (it.s.listening) { lT++; if (ok) lC++; } else { lkT++; if (ok) lkC++; }
    });
    const lk = Math.round((lkC / lkT) * 120), l = Math.round((lC / lT) * 60);
    const total = lk + l;
    return { sections, byType, lk, l, total, lkRaw: [lkC, lkT], lRaw: [lC, lT], pass: total >= 80 && lk >= 38 && l >= 19, pct: Math.round(((lkC + lC) / (lkT + lT)) * 100) };
  }

  /* ---------- TTS ---------- */
  const TTS = {
    voices: [], ready: false, token: 0,
    load() {
      if (!("speechSynthesis" in window)) return;
      const all = speechSynthesis.getVoices();
      this.voices = all.filter((v) => /^ja/i.test(v.lang) || /japan/i.test(v.name));
      this.ready = this.voices.length > 0;
      const natural = (v) => /natural|online|premium|enhanced|neural/i.test(v.name) ? 1 : 0;
      const sorted = [...this.voices].sort((a, b) => natural(b) - natural(a));
      const fem = sorted.filter((v) => /(haruka|ayumi|nanami|kyoko|mizuki|sayaka|aoi|mayu|shiori|o-ren|female|女性)/i.test(v.name));
      const mal = sorted.filter((v) => /(ichiro|keita|otoya|hattori|daichi|naoki|male|男性)/i.test(v.name) && !/female/i.test(v.name));
      this.F = fem[0] || sorted[0] || null;
      this.M = mal[0] || sorted.find((v) => v !== this.F) || this.F;
      this.N = fem[1] || sorted.find((v) => v !== this.F && v !== this.M) || this.F;
    },
    stop() { this.token++; try { speechSynthesis.cancel(); } catch (e) {} },
    speak(text, sp, rate) {
      return new Promise((resolve) => {
        if (!("speechSynthesis" in window)) return resolve();
        const u = new SpeechSynthesisUtterance(ttsText(text));
        u.lang = "ja-JP"; u.rate = rate || settings().rate;
        const v = this[sp] || this.F; if (v) u.voice = v;
        u.pitch = 1;
        if (v && sp === "M" && this.M === this.F) u.pitch = 0.6;
        if (v && sp === "F" && this.M === this.F) u.pitch = 1.25;
        if (sp === "N" && this.N === this.F && this.M !== this.F) u.pitch = 0.95;
        let done = false; const fin = () => { if (!done) { done = true; resolve(); } };
        u.onend = fin; u.onerror = fin;
        setTimeout(fin, 2500 + u.text.length * 420 / u.rate);
        speechSynthesis.speak(u);
      });
    },
    async play(lines, onLine) {
      const my = ++this.token;
      try { speechSynthesis.cancel(); } catch (e) {}
      for (let i = 0; i < lines.length; i++) {
        if (my !== this.token) return false;
        onLine && onLine(i);
        await this.speak(lines[i][1], lines[i][0]);
        if (my !== this.token) return false;
        await sleep(lines[i][0] === "N" ? 700 : 450);
      }
      onLine && onLine(-1);
      return my === this.token;
    }
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  if ("speechSynthesis" in window) { TTS.load(); speechSynthesis.onvoiceschanged = () => TTS.load(); }

  /* ---------- toast ---------- */
  function toast(msg) { const t = el(`<div class="toast">${esc(msg)}</div>`); document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }

  /* ---------- router ---------- */
  let timerId = null;
  function clearTimers() { if (timerId) clearInterval(timerId); timerId = null; TTS.stop(); listenCtl.cancel(); }
  function route() {
    clearTimers();
    const h = location.hash.replace(/^#\/?/, "");
    const [view, arg] = h.split("/");
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", (a.dataset.nav === "dashboard") === (view === "dashboard")));
    if (view === "exam") return viewExam();
    if (view === "result" && arg) return viewResult(arg);
    if (view === "dashboard") return viewDashboard();
    return viewHome();
  }
  window.addEventListener("hashchange", route);
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function mount(node) { $app.innerHTML = ""; $app.appendChild(node); window.scrollTo(0, 0); }

  /* ================= HOME ================= */
  function viewHome() {
    const st = settings();
    const cur = store.get(LS_CUR, null);
    const hist = history();
    const examCards = EXAMS.map((ex) => {
      const its = flatten(ex);
      const done = hist.filter((h) => h.examId === ex.id);
      const best = done.length ? Math.max(...done.map((d) => d.score.total)) : null;
      return `<div class="card exam-card">
        <h3>${esc(ex.title)}</h3>
        <div class="muted small">${esc(ex.subtitle)}</div>
        <div class="sections">${ex.sections.map((s) => `<span class="pill">${esc(s.pt)} · ${s.minutes} min · ${its.filter((i) => i.s === s).length} q.</span>`).join("")}</div>
        <div class="row">
          <button class="btn primary" data-start="${ex.id}">Começar prova</button>
          <span class="spacer"></span>
          <span class="small muted">${done.length ? `${done.length} tentativa(s) · melhor: <b>${best}</b>/180` : "Ainda não feita"}</span>
        </div></div>`;
    }).join("");
    const node = el(`<section>
      <h1>Simulado JLPT N5</h1>
      <p class="muted">Três partes cronometradas como na prova real: <b>Vocabulário (20 min)</b>, <b>Gramática + Leitura (40 min)</b> e <b>Listening (30 min)</b>. No final você vê a nota estimada na escala oficial (0–180), cada questão com todas as alternativas comentadas e a transcrição do áudio.</p>
      ${cur ? `<div class="card" style="border-color:var(--accent);margin:16px 0"><div class="row"><div><b>Prova em andamento:</b> ${esc((examById(cur.examId) || {}).title || "")} — seção ${cur.secIndex + 1} de 3</div><span class="spacer"></span><button class="btn primary" id="resume">Continuar</button><button class="btn ghost" id="discard">Descartar</button></div></div>` : ""}
      <h2>Escolha a prova</h2>
      <div class="grid g2">${examCards}</div>
      <h2>Configurações</h2>
      <div class="card settings">
        <label><input type="radio" name="mode" value="exam" ${st.mode === "exam" ? "checked" : ""}><span><b>Modo exame</b> — áudio toca uma única vez e avança sozinho, como no dia da prova.</span></label>
        <label><input type="radio" name="mode" value="train" ${st.mode === "train" ? "checked" : ""}><span><b>Modo treino</b> — pode repetir o áudio e avançar quando quiser (o tempo continua contando).</span></label>
        <label><input type="checkbox" id="shuffle" ${st.shuffle ? "checked" : ""}><span><b>Embaralhar alternativas</b> (vocabulário/gramática/leitura) — útil ao refazer a mesma prova.</span></label>
        <label><span style="min-width:150px"><b>Velocidade da voz</b></span><input type="range" id="rate" min="0.6" max="1.2" step="0.05" value="${st.rate}"><span id="rateVal">${st.rate}×</span><button class="btn sm" id="testVoice">▶ Testar voz</button></label>
        <div id="voiceInfo" class="small muted" style="margin-top:6px"></div>
      </div>
    </section>`);
    node.querySelectorAll("[data-start]").forEach((b) => b.onclick = () => startExam(b.dataset.start));
    const r = node.querySelector("#resume"); if (r) r.onclick = () => go("#/exam");
    const d = node.querySelector("#discard"); if (d) d.onclick = () => { if (confirm("Descartar a prova em andamento?")) { store.del(LS_CUR); route(); } };
    node.querySelectorAll("input[name=mode]").forEach((i) => i.onchange = () => saveSet({ mode: i.value }));
    node.querySelector("#shuffle").onchange = (e) => saveSet({ shuffle: e.target.checked });
    const rate = node.querySelector("#rate");
    rate.oninput = () => { node.querySelector("#rateVal").textContent = rate.value + "×"; saveSet({ rate: +rate.value }); };
    node.querySelector("#testVoice").onclick = () => TTS.play([["F", "こんにちは。日本語{にほんご}の テストを はじめます。"], ["M", "はい、よろしく おねがいします。"]]);
    mount(node);
    showVoiceInfo(node.querySelector("#voiceInfo"));
  }
  function showVoiceInfo(box) {
    const upd = () => {
      if (!("speechSynthesis" in window)) { box.innerHTML = `<div class="notice-box">Este navegador não tem síntese de voz. Use Chrome ou Edge para o listening.</div>`; return; }
      TTS.load();
      if (!TTS.ready) { box.innerHTML = `<div class="notice-box">Nenhuma voz japonesa encontrada. No <b>Microsoft Edge</b> as vozes naturais (Nanami/Keita) já vêm prontas. No Windows você também pode instalar: Configurações → Hora e idioma → Fala → Adicionar vozes → Japonês.</div>`; return; }
      const names = [...new Set([TTS.F, TTS.M, TTS.N].filter(Boolean).map((v) => v.name))];
      box.innerHTML = `Vozes japonesas: ${TTS.voices.length}. Usando: <b>${esc(names.join(" · "))}</b>${TTS.M === TTS.F ? " (só há uma voz; homem/mulher serão diferenciados pelo tom)" : ""}.`;
    };
    upd(); setTimeout(upd, 800);
  }
  function saveSet(p) { store.set(LS_SET, Object.assign(settings(), p)); }

  function startExam(id) {
    const cur = store.get(LS_CUR, null);
    if (cur && !confirm("Há uma prova em andamento. Começar outra vai descartá-la. Continuar?")) return;
    const ex = examById(id); const st = settings();
    const orders = {};
    if (st.shuffle) flatten(ex).forEach((it) => { if (canShuffle(it)) orders[it.id] = perm(it.q.o.length); });
    const remaining = {}; ex.sections.forEach((s) => (remaining[s.id] = s.minutes * 60));
    store.set(LS_CUR, { examId: id, startedAt: new Date().toISOString(), settings: st, secIndex: 0, phase: "intro", remaining, answers: {}, orders, timeUsed: {}, lpos: 0, introDone: {} });
    go("#/exam");
  }

  /* ================= EXAM ================= */
  function viewExam() {
    const cur = store.get(LS_CUR, null);
    if (!cur) return go("#/");
    const ex = examById(cur.examId);
    const sec = ex.sections[cur.secIndex];
    if (cur.phase === "intro") return renderSectionIntro(cur, ex, sec);
    if (sec.listening) return renderListening(cur, ex, sec);
    return renderBooklet(cur, ex, sec);
  }
  const saveCur = (cur) => store.set(LS_CUR, cur);
  const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  function renderSectionIntro(cur, ex, sec) {
    const n = flatten(ex).filter((i) => i.s === sec).length;
    const first = cur.secIndex === 0;
    const node = el(`<section class="break card">
      <div class="big">${["📝", "📖", "🎧"][cur.secIndex] || "📝"}</div>
      <div class="muted">${esc(ex.title)} · Seção ${cur.secIndex + 1} de ${ex.sections.length}</div>
      <h1>${esc(sec.name)}</h1>
      <p><b>${esc(sec.pt)}</b> · ${n} questões · <b>${sec.minutes} minutos</b></p>
      ${first ? "" : `<p class="muted">Intervalo. O tempo da próxima seção só começa quando você clicar.</p>`}
      ${sec.listening ? `<p class="small">O áudio de cada questão toca ${cur.settings.mode === "exam" ? "<b>uma única vez</b> e avança automaticamente" : "e pode ser repetido (modo treino)"}. A transcrição só aparece na correção. Use fones de ouvido.</p>
        <p><button class="btn" id="tv">▶ Testar áudio</button></p><div id="vi" class="small muted"></div>` : `<p class="small muted">As questões aparecem como no caderno de prova. Você pode responder em qualquer ordem e mudar as respostas até o tempo acabar.</p>`}
      <p style="margin-top:20px"><button class="btn primary" id="go">Começar ${esc(sec.pt)}</button> <button class="btn ghost" id="quit">Abandonar prova</button></p>
    </section>`);
    node.querySelector("#go").onclick = () => { cur.phase = "running"; saveCur(cur); viewExam(); };
    node.querySelector("#quit").onclick = quitExam;
    const tv = node.querySelector("#tv");
    if (tv) { tv.onclick = () => TTS.play([["F", "これは テストです。よく きこえますか。"], ["M", "はい、よく きこえます。"]]); showVoiceInfo(node.querySelector("#vi")); }
    mount(node);
  }
  function quitExam() { if (confirm("Abandonar a prova? As respostas não serão salvas.")) { store.del(LS_CUR); go("#/"); } }

  function startTimer(cur, sec, onTick, onEnd) {
    let last = Date.now();
    timerId = setInterval(() => {
      const now = Date.now(); const dt = Math.round((now - last) / 1000); if (dt < 1) return; last = now;
      cur.remaining[sec.id] = Math.max(0, cur.remaining[sec.id] - dt);
      cur.timeUsed[sec.id] = sec.minutes * 60 - cur.remaining[sec.id];
      saveCur(cur); onTick(cur.remaining[sec.id]);
      if (cur.remaining[sec.id] <= 0) { clearInterval(timerId); timerId = null; onEnd(); }
    }, 250);
  }
  function examHeader(cur, ex, sec, total) {
    return `<div class="exam-head"><div class="row">
      <span class="timer" id="timer">${mmss(cur.remaining[sec.id])}</span>
      <div><b>${esc(sec.pt)}</b> <span class="muted small">${esc(ex.title)}</span></div>
      <div class="progress"><i id="prog" style="width:0"></i></div>
      <span class="small muted" id="cnt">0/${total}</span>
      <button class="btn sm primary" id="finish">Encerrar seção</button>
    </div><div class="qnav" id="qnav"></div></div>`;
  }
  function tick(r) { const t = document.getElementById("timer"); if (t) { t.textContent = mmss(r); t.classList.toggle("low", r <= 60); } }

  function finishSection(cur, ex) {
    const sec = ex.sections[cur.secIndex];
    cur.timeUsed[sec.id] = sec.minutes * 60 - cur.remaining[sec.id];
    clearTimers();
    if (cur.secIndex < ex.sections.length - 1) { cur.secIndex++; cur.phase = "intro"; cur.lpos = 0; saveCur(cur); viewExam(); }
    else finishExam(cur, ex);
  }
  function finishExam(cur, ex) {
    const sc = score(ex, cur.answers);
    const att = { id: Date.now().toString(36), examId: ex.id, examTitle: ex.title, date: new Date().toISOString(), startedAt: cur.startedAt, mode: cur.settings.mode, answers: cur.answers, orders: cur.orders, timeUsed: cur.timeUsed, score: sc };
    const h = history(); h.push(att); store.set(LS_HIST, h); store.del(LS_CUR);
    go("#/result/" + att.id);
  }

  function optOrder(cur, it) { return cur.orders[it.id] || it.q.o.map((_, i) => i); }

  function renderBooklet(cur, ex, sec) {
    const items = flatten(ex).filter((i) => i.s === sec);
    const furi = sec.id !== "vocab";
    const node = el(`<section>${examHeader(cur, ex, sec, items.length)}<div id="book"></div></section>`);
    const book = node.querySelector("#book");
    let lastG = -1;
    items.forEach((it) => {
      if (it.gi !== lastG) {
        lastG = it.gi;
        book.appendChild(el(`<div class="mondai">${fmt(it.g.title)}<span class="pt">${esc(it.g.pt)}</span></div>`));
        if (it.g.passage) book.appendChild(el(`<div class="passage">${fmt(it.g.passage, { furi })}</div>`));
      }
      const order = optOrder(cur, it);
      const long = it.q.o.some((o) => o.replace(/\{[^}]*\}/g, "").length > 14);
      const qn = el(`<div class="q" id="q-${it.id}">
        ${it.q.passage ? `<div class="passage">${fmt(it.q.passage, { furi })}</div>` : ""}
        <div class="qhead"><span class="qnum">${it.num}</span><div class="qtext">${/^\[\d+\]$/.test(it.q.q) ? "" : fmt(it.q.q, { furi, star: it.g.type === "bunpou2" })}</div></div>
        <div class="opts ${long ? "long" : ""}">${order.map((oi, p) => `<button class="opt ${cur.answers[it.id] === oi ? "sel" : ""}" data-o="${oi}"><span class="n">${p + 1}</span><span>${fmt(it.q.o[oi], { furi })}</span></button>`).join("")}</div>
      </div>`);
      qn.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
        cur.answers[it.id] = +b.dataset.o; saveCur(cur);
        qn.querySelectorAll(".opt").forEach((x) => x.classList.toggle("sel", x === b));
        updProgress();
      });
      book.appendChild(qn);
    });
    const nav = node.querySelector("#qnav");
    items.forEach((it) => { const a = el(`<a href="#" data-id="${it.id}">${it.num}</a>`); a.onclick = (e) => { e.preventDefault(); document.getElementById("q-" + it.id).scrollIntoView({ behavior: "smooth", block: "start" }); }; nav.appendChild(a); });
    function updProgress() {
      const done = items.filter((i) => cur.answers[i.id] !== undefined).length;
      node.querySelector("#prog").style.width = (done / items.length) * 100 + "%";
      node.querySelector("#cnt").textContent = `${done}/${items.length}`;
      nav.querySelectorAll("a").forEach((a) => a.classList.toggle("done", cur.answers[a.dataset.id] !== undefined));
    }
    node.querySelector("#finish").onclick = () => {
      const left = items.filter((i) => cur.answers[i.id] === undefined).length;
      if (!confirm(left ? `Ainda há ${left} questão(ões) sem resposta. Encerrar a seção mesmo assim?` : "Encerrar esta seção? Não será possível voltar.")) return;
      finishSection(cur, ex);
    };
    mount(node); updProgress();
    startTimer(cur, sec, tick, () => { toast("Tempo esgotado!"); finishSection(cur, ex); });
  }

  /* ----- Listening ----- */
  const listenCtl = { timer: null, cancel() { if (this.timer) clearInterval(this.timer); this.timer = null; } };

  function renderListening(cur, ex, sec) {
    const items = flatten(ex).filter((i) => i.s === sec);
    const node = el(`<section>${examHeader(cur, ex, sec, items.length)}<div id="lq"></div></section>`);
    node.querySelector("#qnav").remove();
    node.querySelector("#finish").onclick = () => { if (confirm("Encerrar o listening? As questões não respondidas ficam em branco.")) finishSection(cur, ex); };
    mount(node);
    const train = cur.settings.mode === "train";
    startTimer(cur, sec, tick, () => { toast("Tempo esgotado!"); finishSection(cur, ex); });

    function upd() {
      const done = items.filter((i) => cur.answers[i.id] !== undefined).length;
      node.querySelector("#prog").style.width = (cur.lpos / items.length) * 100 + "%";
      node.querySelector("#cnt").textContent = `${Math.min(cur.lpos + 1, items.length)}/${items.length} · ${done} resp.`;
    }
    function show() {
      listenCtl.cancel(); TTS.stop();
      if (cur.lpos >= items.length) return finishSection(cur, ex);
      upd();
      const it = items[cur.lpos]; const g = it.g; const q = it.q;
      const firstOfGroup = !cur.introDone[it.gi];
      const box = node.querySelector("#lq");
      box.innerHTML = "";
      const view = el(`<div>
        <div class="mondai">${fmt(g.title)}<span class="pt">${esc(g.pt)}</span></div>
        <div class="q">
          <div class="qhead"><span class="qnum">${it.num}</span><div class="qtext">${g.type === "hatsuwa" ? "" : g.spoken ? '<span class="muted">Ouça a frase e as três respostas.</span>' : '<span class="muted">Ouça a pergunta e a conversa. Escolha a resposta abaixo.</span>'}</div></div>
          ${q.scene ? `<div class="scene">${esc(q.scene)}</div>` : ""}
          <div class="player" id="pl"><div class="wave"><i></i><i></i><i></i><i></i><i></i></div><div id="pst" class="small">Preparando áudio…</div><span class="spacer"></span>
            ${train ? `<button class="btn sm" id="rep">↻ Repetir</button>` : ""}<span class="countdown" id="cd"></span></div>
          ${g.spoken
            ? `<div class="spoken-opts">${q.o.map((_, i) => `<button class="opt ${cur.answers[it.id] === i ? "sel" : ""}" data-o="${i}"><span class="n">${i + 1}</span></button>`).join("")}</div>`
            : `<div class="opts long">${q.o.map((o, i) => `<button class="opt ${cur.answers[it.id] === i ? "sel" : ""}" data-o="${i}"><span class="n">${i + 1}</span><span>${fmt(o)}</span></button>`).join("")}</div>`}
          <div class="row" style="margin-top:14px"><span class="spacer"></span><button class="btn" id="next" ${train ? "" : "disabled"}>Próxima →</button></div>
        </div></div>`);
      box.appendChild(view);
      view.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
        cur.answers[it.id] = +b.dataset.o; saveCur(cur);
        view.querySelectorAll(".opt").forEach((x) => x.classList.toggle("sel", x === b)); upd();
      });
      const pl = view.querySelector("#pl"), pst = view.querySelector("#pst"), nextB = view.querySelector("#next"), cd = view.querySelector("#cd");
      const next = () => { cur.lpos++; saveCur(cur); show(); };
      nextB.onclick = next;
      async function playAll(withIntro) {
        pl.classList.add("playing");
        if (withIntro && g.intro) {
          pst.textContent = "Instruções da もんだい…";
          const ok = await TTS.play([["N", g.intro]]); if (!ok) return;
          cur.introDone[it.gi] = true; saveCur(cur);
          await sleep(600);
        }
        const lines = [["N", `${it.num}ばん。`]].concat(q.script.map((l) => [l[0], l[1]]));
        const ok = await TTS.play(lines, (i) => { if (i >= 0) pst.textContent = i === 0 ? "Questão " + it.num : `Áudio tocando… (${i}/${lines.length - 1})`; });
        if (!ok) return;
        pl.classList.remove("playing");
        pst.textContent = train ? "Áudio terminado. Responda e avance quando quiser." : "Áudio terminado. Responda.";
        nextB.disabled = false;
        if (!train) {
          let left = g.spoken ? 8 : 12;
          cd.textContent = `próxima em ${left}s`;
          listenCtl.timer = setInterval(() => { left--; cd.textContent = `próxima em ${left}s`; if (left <= 0) { listenCtl.cancel(); next(); } }, 1000);
        }
      }
      const rep = view.querySelector("#rep");
      if (rep) rep.onclick = () => { listenCtl.cancel(); cd.textContent = ""; playAll(false); };
      if (!TTS.ready) { TTS.load(); }
      if (!TTS.ready) pst.innerHTML = "⚠️ Sem voz japonesa neste navegador — veja a dica na página inicial. Você ainda pode responder.";
      setTimeout(() => playAll(firstOfGroup), 400);
    }
    show();
  }

  /* ================= RESULT ================= */
  function viewResult(id) {
    const att = history().find((h) => h.id === id);
    if (!att) return mount(el(`<div class="empty">Resultado não encontrado. <a href="#/dashboard">Ver histórico</a></div>`));
    const ex = examById(att.examId);
    if (!ex) return mount(el(`<div class="empty">A prova desta tentativa não existe mais nos dados.</div>`));
    const sc = score(ex, att.answers);
    const items = flatten(ex);
    const wrong = items.filter((i) => att.answers[i.id] !== i.q.a).length;
    const secRows = ex.sections.map((s) => {
      const r = sc.sections[s.id]; const p = Math.round((r.c / r.t) * 100);
      const used = att.timeUsed && att.timeUsed[s.id] != null ? mmss(att.timeUsed[s.id]) : "—";
      return `<div class="item"><div class="top"><span><b>${esc(s.pt)}</b> <span class="muted small">${esc(s.name)}</span></span><span>${r.c}/${r.t} · ${p}% <span class="muted small">· tempo ${used} de ${s.minutes}:00</span></span></div><div class="bar"><i style="width:${p}%;background:${p >= 60 ? "var(--ok)" : p >= 45 ? "var(--warn)" : "var(--bad)"}"></i></div></div>`;
    }).join("");
    const types = Object.entries(sc.byType).map(([k, v]) => ({ k, ...v, p: v.c / v.t })).sort((a, b) => a.p - b.p);
    const node = el(`<section>
      <div class="muted small">${esc(att.examTitle)} · ${new Date(att.date).toLocaleString("pt-BR")} · modo ${att.mode === "train" ? "treino" : "exame"}</div>
      <h1>Resultado</h1>
      <div class="card"><div class="score-hero">
        <div class="score-big">${sc.total}<small> / 180</small></div>
        <div class="verdict ${sc.pass ? "ok" : "bad"}">${sc.pass ? "✓ Aprovado (estimativa)" : "✗ Reprovado (estimativa)"}</div>
        <div class="grid g4" style="flex:1;min-width:280px">
          <div class="kpi"><div class="label">Conhec. linguístico + leitura</div><div class="val">${sc.lk}<span class="muted small"> /120</span></div><div class="sub">${sc.lk >= 38 ? "✓" : "✗"} mínimo 38 · ${sc.lkRaw[0]}/${sc.lkRaw[1]} acertos</div></div>
          <div class="kpi"><div class="label">Listening</div><div class="val">${sc.l}<span class="muted small"> /60</span></div><div class="sub">${sc.l >= 19 ? "✓" : "✗"} mínimo 19 · ${sc.lRaw[0]}/${sc.lRaw[1]} acertos</div></div>
        </div>
      </div>
      <p class="small muted" style="margin:10px 0 0">Aprovação no N5: total ≥ 80 e mínimo em cada parte (38/120 e 19/60). A nota oficial usa escala equalizada; aqui ela é estimada proporcionalmente aos acertos.</p></div>
      <h2>Por seção</h2><div class="card secbars">${secRows}</div>
      <h2>Por tipo de questão <span class="muted small">(pontos fracos primeiro)</span></h2>
      <div class="card secbars">${types.map((t) => { const p = Math.round(t.p * 100); return `<div class="item"><div class="top"><span>${esc(TYPE_LABELS[t.k] || t.k)}</span><span>${t.c}/${t.t} · ${p}%</span></div><div class="bar"><i style="width:${p}%;background:${p >= 60 ? "var(--ok)" : p >= 45 ? "var(--warn)" : "var(--bad)"}"></i></div></div>`; }).join("")}</div>
      <h2>Correção comentada</h2>
      <p class="small muted">Em cada questão aparecem todas as alternativas, a correta em verde e a sua (se errada) em vermelho. Questões erradas já vêm com a explicação aberta; nas certas, use “Ver explicação”. No listening, a transcrição destaca a fala onde estava a resposta.</p>
      <div class="filters" id="flt"><button data-f="all" class="on">Todas (${items.length})</button><button data-f="wrong">Erradas/em branco (${wrong})</button><button data-f="right">Certas (${items.length - wrong})</button>${ex.sections.map((s) => `<button data-f="sec:${s.id}">${esc(s.pt)}</button>`).join("")}</div>
      <div id="review"></div>
      <div class="row" style="margin-top:24px"><a class="btn" href="#/dashboard">Ver dashboard</a><button class="btn primary" id="again">Refazer ${esc(ex.title)}</button></div>
    </section>`);
    node.querySelector("#again").onclick = () => startExam(ex.id);
    const rev = node.querySelector("#review");
    let lastKey = "";
    items.forEach((it) => {
      const key = it.s.id + it.gi;
      if (key !== lastKey) {
        lastKey = key;
        const head = el(`<div class="mondai" data-sec="${it.s.id}" data-group="${key}">${fmt(it.g.title)}<span class="pt">${esc(it.s.pt)} · ${esc(it.g.pt)}</span></div>`);
        rev.appendChild(head);
        if (it.g.passage) rev.appendChild(el(`<details class="passage-wrap" data-sec="${it.s.id}" data-group="${key}"><summary>Ver texto da questão</summary><div class="passage">${fmt(it.g.passage)}</div></details>`));
      }
      rev.appendChild(reviewCard(it, att));
    });
    node.querySelectorAll("#flt button").forEach((b) => b.onclick = () => {
      node.querySelectorAll("#flt button").forEach((x) => x.classList.toggle("on", x === b));
      const f = b.dataset.f;
      rev.querySelectorAll(".rq").forEach((c) => {
        const ok = c.dataset.ok === "1";
        let show = f === "all" || (f === "wrong" && !ok) || (f === "right" && ok) || (f.startsWith("sec:") && c.dataset.sec === f.slice(4));
        c.style.display = show ? "" : "none";
      });
      rev.querySelectorAll("[data-group]").forEach((h) => {
        const any = [...rev.querySelectorAll(`.rq[data-group="${h.dataset.group}"]`)].some((c) => c.style.display !== "none");
        h.style.display = any ? "" : "none";
      });
    });
    mount(node);
  }

  function reviewCard(it, att) {
    const q = it.q; const ans = att.answers[it.id]; const ok = ans === q.a; const blank = ans === undefined;
    const L = it.s.listening;
    const status = ok ? `<span class="pill ok">✓ Acertou</span>` : blank ? `<span class="pill warn">Em branco</span>` : `<span class="pill bad">✗ Errou</span>`;
    const order = att.orders && att.orders[it.id];
    const opts = q.o.map((o, i) => {
      const cls = i === q.a ? "correct" : i === ans ? "chosen-wrong" : "";
      const tag = i === q.a ? `<span class="tag" style="color:var(--ok)">CORRETA</span>` : i === ans ? `<span class="tag" style="color:var(--bad)">SUA RESPOSTA</span>` : "";
      const mine = i === q.a && i === ans ? `<span class="tag" style="color:var(--ok)">· SUA RESPOSTA</span>` : "";
      const pos = order ? `<span class="muted small" title="posição na sua prova"> (na sua prova: ${order.indexOf(i) + 1})</span>` : "";
      return `<div class="ropt ${cls}"><span class="n">${i + 1}</span><div><span>${fmt(o)}</span>${tag}${mine}${pos}<span class="why" data-why>${q.why && q.why[i] ? esc(q.why[i]) : ""}</span></div></div>`;
    }).join("");
    const transcript = L ? `<div class="transcript"><div class="small muted" style="margin-bottom:4px">Transcrição <span class="small">(amarelo = onde está a informação da resposta)</span></div>${[["N", `${it.num}ばん。`]].concat(q.script).map((l) => `<div class="line ${l[2] ? "ev" : ""}"><span class="sp" title="${SPEAKER_PT[l[0]]}">${SPEAKER[l[0]]}</span><span>${fmt(l[1])}</span></div>`).join("")}</div>` : "";
    const card = el(`<div class="q rq ${ok ? "right" : blank ? "blank-ans" : "wrong"}" data-ok="${ok ? 1 : 0}" data-sec="${it.s.id}" data-group="${it.s.id}${it.gi}">
      <div class="row"><span class="qnum">${it.num}</span>${status}<span class="small muted">${esc(TYPE_LABELS[it.g.type] || "")}</span><span class="spacer"></span><span class="src">${esc(q.src || "")}</span></div>
      ${q.passage ? `<details><summary>Ver texto</summary><div class="passage">${fmt(q.passage)}</div></details>` : ""}
      ${q.scene ? `<div class="scene">${esc(q.scene)}</div>` : ""}
      ${!L && !/^\[\d+\]$/.test(q.q) ? `<div class="qtext" style="margin:8px 0">${fmt(q.q, { star: it.g.type === "bunpou2" })}</div>` : ""}
      <div class="ropts">${opts}</div>
      <div class="exp-area"></div>
      <div class="row" style="margin-top:8px">${ok ? `<button class="btn sm" data-toggle>Ver explicação</button>` : ""}${L ? `<button class="btn sm" data-play>▶ Ouvir o áudio de novo</button>` : ""}</div>
    </div>`);
    const expHTML = `<div class="explain">${q.tr ? `<div class="tr">“${esc(q.tr)}”</div>` : ""}<div><b>Por que a ${q.a + 1} está correta:</b> ${esc(q.exp || "")}</div></div>${transcript}`;
    const area = card.querySelector(".exp-area");
    const whys = card.querySelectorAll("[data-why]");
    const setOpen = (open) => { area.innerHTML = open ? expHTML : ""; whys.forEach((w) => (w.style.display = open ? "" : "none")); };
    setOpen(!ok);
    const tg = card.querySelector("[data-toggle]");
    if (tg) { let open = false; tg.onclick = () => { open = !open; setOpen(open); tg.textContent = open ? "Ocultar explicação" : "Ver explicação"; }; }
    const pb = card.querySelector("[data-play]");
    if (pb) pb.onclick = () => { TTS.play([["N", `${it.num}ばん。`]].concat(q.script.map((l) => [l[0], l[1]]))); };
    return card;
  }

  /* ================= DASHBOARD ================= */
  function viewDashboard() {
    const h = history().slice().sort((a, b) => a.date.localeCompare(b.date));
    const node = el(`<section><h1>Dashboard de evolução</h1><div id="dash"></div></section>`);
    const d = node.querySelector("#dash");
    if (!h.length) {
      d.appendChild(el(`<div class="card empty"><div style="font-size:2.5rem">📈</div><p>Nenhuma prova feita ainda. Faça um simulado para começar a acompanhar sua evolução.</p><a class="btn primary" href="#/">Escolher prova</a></div>`));
      d.appendChild(el(`<div class="row" style="margin-top:16px"><button class="btn sm" id="imp">Importar histórico (JSON)</button></div>`));
      mount(node); bindImport(node); return;
    }
    const totals = h.map((a) => a.score.total);
    const last = h[h.length - 1]; const prev = h[h.length - 2];
    const best = Math.max(...totals);
    const avg3 = Math.round(totals.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, totals.length));
    const passes = h.filter((a) => a.score.pass).length;
    const delta = prev ? last.score.total - prev.score.total : null;
    d.appendChild(el(`<div class="grid g4">
      <div class="card kpi"><div class="label">Provas feitas</div><div class="val">${h.length}</div><div class="sub">${passes} aprovada(s)</div></div>
      <div class="card kpi"><div class="label">Última nota</div><div class="val">${last.score.total}<span class="muted small">/180</span></div><div class="sub">${delta === null ? "primeira tentativa" : (delta >= 0 ? "▲ +" : "▼ ") + delta + " vs. anterior"}</div></div>
      <div class="card kpi"><div class="label">Melhor nota</div><div class="val">${best}<span class="muted small">/180</span></div><div class="sub">corte de aprovação: 80</div></div>
      <div class="card kpi"><div class="label">Média (últimas 3)</div><div class="val">${avg3}<span class="muted small">/180</span></div><div class="sub">${avg3 >= 80 ? "acima do corte" : "abaixo do corte"}</div></div>
    </div>`));
    d.appendChild(el(`<h2>Aproveitamento por tentativa</h2>`));
    const lc = el(`<div class="card"></div>`); d.appendChild(lc); lineChart(lc, h);
    d.appendChild(el(`<h2>Acertos por tipo de questão <span class="muted small">(todas as tentativas)</span></h2>`));
    const bc = el(`<div class="card"></div>`); d.appendChild(bc); typeBars(bc, h);
    d.appendChild(el(`<h2>Histórico</h2>`));
    const rows = h.slice().reverse().map((a) => `<tr><td>${new Date(a.date).toLocaleDateString("pt-BR")} <span class="muted small">${new Date(a.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span></td><td>${esc(a.examTitle)}</td><td>${a.score.lk}/120</td><td>${a.score.l}/60</td><td><b>${a.score.total}</b>/180</td><td>${a.score.pass ? '<span class="pill ok">Aprovado</span>' : '<span class="pill bad">Reprovado</span>'}</td><td><a class="btn sm" href="#/result/${a.id}">Correção</a> <button class="btn sm ghost" data-del="${a.id}" title="Excluir">✕</button></td></tr>`).join("");
    d.appendChild(el(`<div class="card" style="overflow-x:auto"><table class="hist"><thead><tr><th>Data</th><th>Prova</th><th>Linguagem+leitura</th><th>Listening</th><th>Total</th><th>Resultado</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`));
    d.appendChild(el(`<div class="row" style="margin-top:16px"><button class="btn sm" id="exp">Exportar histórico (JSON)</button><button class="btn sm" id="imp">Importar</button><span class="spacer"></span><button class="btn sm ghost" id="clr">Apagar todo o histórico</button></div>`));
    d.querySelectorAll("[data-del]").forEach((b) => b.onclick = () => { if (confirm("Excluir esta tentativa?")) { store.set(LS_HIST, history().filter((x) => x.id !== b.dataset.del)); route(); } });
    node.querySelector("#exp").onclick = () => {
      const blob = new Blob([JSON.stringify(history(), null, 1)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `jlpt-n5-historico-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    };
    node.querySelector("#clr").onclick = () => { if (confirm("Apagar TODO o histórico? Isso não pode ser desfeito.")) { store.del(LS_HIST); route(); } };
    mount(node); bindImport(node);
  }
  function bindImport(node) {
    const b = node.querySelector("#imp"); if (!b) return;
    b.onclick = () => {
      const inp = document.createElement("input"); inp.type = "file"; inp.accept = ".json,application/json";
      inp.onchange = async () => {
        try {
          const data = JSON.parse(await inp.files[0].text());
          if (!Array.isArray(data)) throw new Error();
          const cur = history(); const ids = new Set(cur.map((x) => x.id));
          const add = data.filter((x) => x && x.id && x.score && !ids.has(x.id));
          store.set(LS_HIST, cur.concat(add)); toast(`${add.length} tentativa(s) importada(s).`); route();
        } catch (e) { toast("Arquivo inválido."); }
      };
      inp.click();
    };
  }

  /* line chart: % de acertos por tentativa (eixo único 0–100%) */
  function lineChart(box, h) {
    const series = [
      { key: "total", name: "Nota total", color: "var(--blue)", val: (a) => Math.round((a.score.total / 180) * 100), raw: (a) => `${a.score.total}/180` },
      { key: "lk", name: "Linguagem + leitura", color: "var(--orange)", val: (a) => Math.round((a.score.lk / 120) * 100), raw: (a) => `${a.score.lk}/120` },
      { key: "l", name: "Listening", color: "var(--aqua)", val: (a) => Math.round((a.score.l / 60) * 100), raw: (a) => `${a.score.l}/60` }
    ];
    const W = 860, H = 300, m = { l: 44, r: 150, t: 14, b: 34 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const n = h.length;
    const x = (i) => m.l + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
    const y = (v) => m.t + ih - (v / 100) * ih;
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolução do aproveitamento por tentativa">`;
    [0, 25, 50, 75, 100].forEach((v) => { svg += `<line x1="${m.l}" x2="${m.l + iw}" y1="${y(v)}" y2="${y(v)}" stroke="var(--grid)" stroke-width="1"/><text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}%</text>`; });
    const cut = (80 / 180) * 100;
    svg += `<line x1="${m.l}" x2="${m.l + iw}" y1="${y(cut)}" y2="${y(cut)}" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    const step = Math.max(1, Math.ceil(n / 10));
    h.forEach((a, i) => { if (i % step === 0 || i === n - 1) svg += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="var(--muted)">#${i + 1}</text>`; });
    series.forEach((s) => {
      const pts = h.map((a, i) => `${x(i)},${y(s.val(a))}`).join(" ");
      if (n > 1) svg += `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
      h.forEach((a, i) => { svg += `<circle cx="${x(i)}" cy="${y(s.val(a))}" r="4.5" fill="${s.color}" stroke="var(--card)" stroke-width="2"/>`; });
    });
    // direct labels at line ends, nudged apart
    const ends = series.map((s) => ({ s, v: s.val(h[n - 1]), yy: y(s.val(h[n - 1])) })).sort((a, b) => a.yy - b.yy);
    for (let i = 1; i < ends.length; i++) if (ends[i].yy - ends[i - 1].yy < 15) ends[i].yy = ends[i - 1].yy + 15;
    ends.forEach((e) => { svg += `<text x="${x(n - 1) + 10}" y="${e.yy + 4}" font-size="12" fill="var(--ink2)">${esc(e.s.name)} ${e.v}%</text>`; });
    svg += `<text x="${m.l + iw + 10}" y="${y(cut) + 4}" font-size="11" fill="var(--muted)">${ends.some((e) => Math.abs(e.yy - y(cut)) < 12) ? "" : "corte 80/180"}</text>`;
    svg += `<line id="xh" x1="0" x2="0" y1="${m.t}" y2="${m.t + ih}" stroke="var(--ink2)" stroke-width="1" opacity="0"/>`;
    svg += `<rect id="hit" x="${m.l - 10}" y="${m.t}" width="${iw + 20}" height="${ih}" fill="transparent"/></svg>`;
    box.innerHTML = `<div class="legend">${series.map((s) => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join("")}<span><i class="dash"></i>Nota de corte (80/180 ≈ 44%)</span></div><div class="chart">${svg}<div class="tip"></div></div><p class="small muted" style="margin:6px 0 0">Todas as linhas em % do máximo de cada parte (total /180, linguagem+leitura /120, listening /60). Lembre: além do total ≥ 80, cada parte precisa do mínimo (38 e 19).</p>`;
    const chart = box.querySelector(".chart"), tip = box.querySelector(".tip"), hit = box.querySelector("#hit"), xh = box.querySelector("#xh"), svgEl = box.querySelector("svg");
    const move = (ev) => {
      const r = svgEl.getBoundingClientRect(); const sx = ((ev.clientX - r.left) / r.width) * W;
      let i = n === 1 ? 0 : Math.round(((sx - m.l) / iw) * (n - 1)); i = Math.max(0, Math.min(n - 1, i));
      const a = h[i];
      xh.setAttribute("x1", x(i)); xh.setAttribute("x2", x(i)); xh.setAttribute("opacity", ".4");
      tip.innerHTML = `<b>#${i + 1} · ${esc(a.examTitle)}</b><br><span class="muted">${new Date(a.date).toLocaleString("pt-BR")}</span>${series.map((s) => `<div class="row" style="gap:6px"><i style="display:inline-block;width:10px;height:3px;background:${s.color}"></i>${s.name}<span class="spacer"></span><b>${s.raw(a)}</b></div>`).join("")}<div>${a.score.pass ? "✓ aprovado" : "✗ reprovado"}</div>`;
      const px = (x(i) / W) * r.width; tip.style.opacity = 1;
      tip.style.left = Math.min(r.width - 180, Math.max(0, px + 12)) + "px"; tip.style.top = "10px";
    };
    hit.addEventListener("mousemove", move);
    hit.addEventListener("mouseleave", () => { tip.style.opacity = 0; xh.setAttribute("opacity", 0); });
    chart.addEventListener("touchstart", (e) => move(e.touches[0]), { passive: true });
  }

  function typeBars(box, h) {
    const agg = {};
    h.forEach((a) => Object.entries(a.score.byType || {}).forEach(([k, v]) => { agg[k] = agg[k] || { c: 0, t: 0 }; agg[k].c += v.c; agg[k].t += v.t; }));
    const lastBT = h[h.length - 1].score.byType || {};
    const rows = Object.keys(TYPE_LABELS).filter((k) => agg[k]).map((k) => ({ k, ...agg[k], p: Math.round((agg[k].c / agg[k].t) * 100), lp: lastBT[k] ? Math.round((lastBT[k].c / lastBT[k].t) * 100) : null }));
    const W = 860, rowH = 30, m = { l: 300, r: 70, t: 6 };
    const iw = W - m.l - m.r; const H = m.t + rows.length * rowH + 20;
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Acertos por tipo de questão">`;
    [0, 50, 100].forEach((v) => { const xx = m.l + (v / 100) * iw; svg += `<line x1="${xx}" x2="${xx}" y1="${m.t}" y2="${H - 18}" stroke="var(--grid)"/><text x="${xx}" y="${H - 4}" font-size="11" text-anchor="middle" fill="var(--muted)">${v}%</text>`; });
    rows.forEach((r, i) => {
      const yy = m.t + i * rowH; const w = Math.max(2, (r.p / 100) * iw);
      svg += `<g class="bt" data-i="${i}"><rect x="0" y="${yy}" width="${W}" height="${rowH}" fill="transparent"/>
        <text x="${m.l - 10}" y="${yy + 19}" font-size="12.5" text-anchor="end" fill="var(--ink)">${esc(TYPE_LABELS[r.k])}</text>
        <rect x="${m.l}" y="${yy + 7}" width="${w}" height="16" rx="4" fill="var(--blue)"/>
        <text x="${m.l + w + 8}" y="${yy + 19}" font-size="12" fill="var(--ink2)">${r.p}%</text></g>`;
    });
    svg += `</svg>`;
    box.innerHTML = `<div class="chart">${svg}<div class="tip"></div></div><p class="small muted" style="margin:6px 0 0">Foque nos tipos com menor aproveitamento. Passe o mouse para ver acertos absolutos e a última tentativa.</p>`;
    const tip = box.querySelector(".tip"), svgEl = box.querySelector("svg");
    box.querySelectorAll(".bt").forEach((g) => {
      g.addEventListener("mousemove", (ev) => {
        const r = rows[+g.dataset.i]; const rc = svgEl.getBoundingClientRect();
        tip.innerHTML = `<b>${esc(TYPE_LABELS[r.k])}</b><br>Total: ${r.c}/${r.t} (${r.p}%)<br>Última tentativa: ${r.lp === null ? "—" : r.lp + "%"}`;
        tip.style.opacity = 1; tip.style.left = Math.min(rc.width - 200, ev.clientX - rc.left + 12) + "px"; tip.style.top = ev.clientY - rc.top + 12 + "px";
      });
      g.addEventListener("mouseleave", () => (tip.style.opacity = 0));
    });
  }

  /* boot */
  window.addEventListener("beforeunload", () => TTS.stop());
  route();
})();
