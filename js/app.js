/* JLPT N5 — Simulado com banco de questões
   App estático (sem dependências). Dados em data/*.js. Resultados em localStorage.
   - Prova aleatória: sorteia do banco na estrutura oficial (prioriza oficiais e questões menos vistas)
   - Provas fixas: Simulado A / B
   - Listening: MP3 oficial quando existe, senão voz do navegador (TTS) */
(function () {
  "use strict";

  const EXAMS = window.EXAMS || [];
  const LS_HIST = "n5sim.history.v1";
  const LS_CUR = "n5sim.current.v1";
  const LS_SET = "n5sim.settings.v1";
  const LS_SEEN = "n5sim.seen.v1";

  /* ---------- tipos de questão (estrutura oficial N5, revisão 2020) ---------- */
  const SECTIONS = [
    { id: "vocab", name: "言語知識（文字・語彙）", pt: "Vocabulário", minutes: 20 },
    { id: "grammar", name: "言語知識（文法）・読解", pt: "Gramática e Leitura", minutes: 40 },
    { id: "listening", name: "聴解", pt: "Listening", minutes: 30, listening: true }
  ];
  const TYPES = {
    kanji: { sec: "vocab", n: 7, label: "Leitura de kanji (漢字読み)", pt: "Leitura de kanji (漢字読み)", title: "もんだい　＿＿の ことばは ひらがなで どう かきますか。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。" },
    hyouki: { sec: "vocab", n: 5, label: "Escrita (表記)", pt: "Escrita / ortografia (表記)", title: "もんだい　＿＿の ことばは どう かきますか。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。" },
    bunmyaku: { sec: "vocab", n: 6, label: "Vocabulário no contexto (文脈規定)", pt: "Vocabulário pelo contexto (文脈規定)", title: "もんだい　（　　）に なにが はいりますか。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。" },
    iikae: { sec: "vocab", n: 3, label: "Paráfrase (言い換え)", pt: "Paráfrase (言い換え類義)", title: "もんだい　＿＿の ぶんと だいたい おなじ いみの ぶんが あります。１・２・３・４から いちばん いい ものを ひとつ えらんで ください。" },
    bunpou1: { sec: "grammar", n: 9, label: "Forma gramatical (文法形式)", pt: "Gramática — forma correta (文法形式の判断)", title: "もんだい　（　　）に 何{なに}を 入{い}れますか。１・２・３・４から いちばん いい ものを 一{ひと}つ えらんで ください。" },
    bunpou2: { sec: "grammar", n: 4, label: "Montagem de frase ★ (文の組み立て)", pt: "Montagem de frase (文の組み立て)", title: "もんだい　★に 入{はい}る ものは どれですか。１・２・３・４から いちばん いい ものを 一{ひと}つ えらんで ください。" },
    bunshou: { sec: "grammar", units: 1, label: "Gramática do texto (文章の文法)", pt: "Gramática do texto (文章の文法)", title: "もんだい　ぶんしょうの いみを かんがえて、[ ]に 入{い}る ものを １・２・３・４から いちばん いい ものを 一{ひと}つ えらんで ください。" },
    dokkai1: { sec: "grammar", units: 2, label: "Leitura curta (短文)", pt: "Leitura — textos curtos (内容理解・短文)", title: "もんだい　つぎの ぶんしょうを 読{よ}んで、しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一{ひと}つ えらんで ください。" },
    dokkai2: { sec: "grammar", units: 1, label: "Leitura média (中文)", pt: "Leitura — texto médio (内容理解・中文)", title: "もんだい　つぎの ぶんしょうを 読{よ}んで、しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一{ひと}つ えらんで ください。" },
    jouhou: { sec: "grammar", units: 1, label: "Busca de informação (情報検索)", pt: "Busca de informação (情報検索)", title: "もんだい　右{みぎ}の ページを 見{み}て、下{した}の しつもんに こたえて ください。こたえは、１・２・３・４から いちばん いい ものを 一{ひと}つ えらんで ください。" },
    kadai: { sec: "listening", n: 7, label: "Listening · tarefa (課題理解)", pt: "Compreensão de tarefa (課題理解)", title: "もんだい１　はじめに しつもんを きいて ください。それから はなしを きいて、もんだいようしの １から４の なかから、いちばん いい ものを ひとつ えらんで ください。", intro: "もんだい１。もんだい１では、はじめに しつもんを きいて ください。それから はなしを きいて、もんだいようしの いちから よんの なかから、いちばん いい ものを ひとつ えらんで ください。" },
    point: { sec: "listening", n: 6, label: "Listening · ponto-chave (ポイント理解)", pt: "Compreensão de ponto-chave (ポイント理解)", title: "もんだい２　はじめに しつもんを きいて ください。それから はなしを きいて、もんだいようしの １から４の なかから、いちばん いい ものを ひとつ えらんで ください。", intro: "もんだい２。もんだい２では、はじめに しつもんを きいて ください。それから はなしを きいて、もんだいようしの いちから よんの なかから、いちばん いい ものを ひとつ えらんで ください。" },
    hatsuwa: { sec: "listening", n: 5, spoken: true, label: "Listening · expressão verbal (発話表現)", pt: "Expressão verbal (発話表現) — as opções só são faladas", title: "もんだい３　えを みながら しつもんを きいて ください。→（やじるし）の ひとは なんと いいますか。１から３の なかから、いちばん いい ものを ひとつ えらんで ください。", intro: "もんだい３。もんだい３では、えを みながら しつもんを きいて ください。やじるしの ひとは なんと いいますか。いちから さんの なかから、いちばん いい ものを ひとつ えらんで ください。" },
    sokuji: { sec: "listening", n: 6, spoken: true, label: "Listening · resposta imediata (即時応答)", pt: "Resposta imediata (即時応答) — as opções só são faladas", title: "もんだい４　えなどが ありません。ぶんを きいて、１から３の なかから、いちばん いい ものを ひとつ えらんで ください。", intro: "もんだい４。もんだい４は、えなどが ありません。ぶんを きいて、いちから さんの なかから、いちばん いい ものを ひとつ えらんで ください。" }
  };
  const TYPE_LABELS = Object.fromEntries(Object.entries(TYPES).map(([k, v]) => [k, v.label]));
  const SPEAKER = { N: "ナレーター", M: "男", F: "女" };
  const SPEAKER_PT = { N: "Narrador", M: "Homem", F: "Mulher" };
  const MONDAI_NUM = { vocab: ["kanji", "hyouki", "bunmyaku", "iikae"], grammar: ["bunpou1", "bunpou2", "bunshou", "dokkai1", "dokkai2", "jouhou"], listening: ["kadai", "point", "hatsuwa", "sokuji"] };

  const $app = document.getElementById("app");
  const icon = (n, cls = "") => `<svg class="ico ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  /* tema + furigana (persistidos em settings) */
  function applyPrefs() {
    const st = settings();
    const root = document.documentElement;
    if (st.theme === "light" || st.theme === "dark") root.dataset.theme = st.theme; else delete root.dataset.theme;
    root.classList.toggle("no-furi", st.furi === false);
    const fb = document.getElementById("furiBtn"); if (fb) fb.setAttribute("aria-pressed", st.furi === false ? "false" : "true");
    const tb = document.getElementById("themeBtn");
    if (tb) { const t = st.theme || "auto"; tb.innerHTML = icon(t === "light" ? "sun" : t === "dark" ? "moon" : "auto"); tb.title = "Tema: " + ({ auto: "automático", light: "claro", dark: "escuro" })[t]; tb.setAttribute("aria-label", tb.title); }
    const fbt = document.getElementById("furiBtn"); if (fbt) { fbt.title = st.furi === false ? "Furigana: oculto" : "Furigana: visível"; fbt.setAttribute("aria-label", fbt.title); }
  }
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { toast("Não foi possível salvar no localStorage."); } },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  const history = () => store.get(LS_HIST, []);
  const settings = () => Object.assign({ mode: "exam", shuffle: false, rate: 0.9, source: "mix", theme: "auto", furi: true, autoNext: true }, store.get(LS_SET, {}));

  /* ---------- banco de questões ---------- */
  const BANK = {}; // id -> unit
  (function buildBank() {
    const units = [];
    EXAMS.forEach((ex) => ex.sections.forEach((s) => s.groups.forEach((g) => {
      const origin = (qq) => (/^Oficial/.test(qq.src || "") ? "oficial" : "original");
      if (g.passage && ["bunshou", "dokkai2", "jouhou"].includes(g.type)) units.push({ type: g.type, origin: origin(g.questions[0]), passage: g.passage, questions: g.questions });
      else g.questions.forEach((q) => units.push({ type: g.type, origin: origin(q), questions: [q] }));
    })));
    (window.BANK_UNITS || []).forEach((u) => units.push(u));
    units.forEach((u) => {
      let id = (u.questions[0].src || u.type).replace(/\s+/g, " ").trim();
      while (BANK[id]) id += "+";
      u.id = id; BANK[id] = u;
    });
  })();
  const Q2U = new Map(); Object.values(BANK).forEach((u) => u.questions.forEach((q) => Q2U.set(q, u.id)));
  const bankUnits = () => Object.values(BANK);
  const qCount = (units) => units.reduce((n, u) => n + u.questions.length, 0);

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
    if (opt.star) { s = s.replace(/_{3,}/g, '<span class="blank">&nbsp;</span>').replace(/★/g, '<span class="star"></span>'); }
    s = s.replace(/__([^_]+?)__/g, "<u>$1</u>");
    s = s.replace(/\[(\d{1,2})\]/g, '<span class="numbox">$1</span>');
    s = s.replace(/\[ \]/g, '<span class="numbox">&nbsp;&nbsp;</span>');
    return s;
  }
  function ttsText(text) {
    return String(text).replace(/<[^>]+>/g, "")
      .replace(FURI_RE, (m, d, k, r) => (absorbDigits(d, k, r) ? r : d + r))
      .replace(/_{2,}/g, "").replace(/^([1-3１-３])[．.　]\s*/, "$1、");
  }
  /* renumera lacunas [22] do texto para os números reais da prova */
  function blankMap(items) { const m = {}; items.forEach((it) => { const r = /^\[(\d+)\]$/.exec(it.q.q); if (r) m[r[1]] = it.num; }); return m; }
  const renum = (txt, map) => String(txt).replace(/\[(\d{1,2})\]/g, (m, n) => (map[n] ? `[${map[n]}]` : m));

  /* ---------- modelo de prova ---------- */
  function flatten(exam) {
    const list = [];
    exam.sections.forEach((s, si) => {
      let n = 0;
      s.groups.forEach((g, gi) => g.questions.forEach((q, qi) => { n++; list.push({ id: `${s.id}-${gi}-${qi}`, s, si, g, gi, q, qi, num: n }); }));
    });
    return list;
  }
  const examById = (id) => EXAMS.find((e) => e.id === id);
  /* prova sorteada é guardada como "spec" (ids das unidades) e remontada do banco */
  function examFromSpec(spec) {
    return {
      id: spec.id, random: true, title: spec.title, subtitle: "Prova aleatória",
      sections: SECTIONS.map((S) => ({
        ...S,
        groups: spec.groups.filter((g) => TYPES[g.type].sec === S.id).map((g) => {
          const units = g.units.map((id) => BANK[id]).filter(Boolean);
          const T = TYPES[g.type]; const mi = MONDAI_NUM[S.id].indexOf(g.type) + 1;
          const grp = { type: g.type, title: T.title.replace(/^もんだい[0-9０-９]?/, "もんだい" + mi), pt: T.pt, intro: T.intro && T.intro.replace(/もんだい[0-9０-９]/g, "もんだい" + mi), spoken: !!T.spoken, questions: [] };
          if (units.length === 1 && units[0].passage) grp.passage = units[0].passage;
          units.forEach((u) => u.questions.forEach((q, i) => grp.questions.push(i === 0 && u.passage && units.length > 1 ? { ...q, passage: u.passage, _orig: q } : q)));
          return grp;
        }).filter((g) => g.questions.length)
      }))
    };
  }
  function getExam(obj) { return obj.spec ? examFromSpec(obj.spec) : examById(obj.examId); }

  function generateSpec(source) {
    const seen = store.get(LS_SEEN, {});
    const n = history().filter((h) => h.spec).length + 1;
    const groups = [];
    Object.entries(TYPES).forEach(([type, T]) => {
      let pool = bankUnits().filter((u) => u.type === type);
      if (source === "oficial") { const off = pool.filter((u) => u.origin === "oficial"); if (off.length) pool = off; }
      const scored = pool.map((u) => ({ u, k: (seen[u.id] || 0) + (u.origin === "original" ? 0.6 : 0) + Math.random() * 0.9 })).sort((a, b) => a.k - b.k);
      const picked = [];
      if (T.units) { scored.slice(0, T.units).forEach((x) => picked.push(x.u)); }
      else { let c = 0; for (const x of scored) { if (c >= T.n) break; picked.push(x.u); c += x.u.questions.length; } }
      // ordem: mantém as unidades em ordem aleatória (já estão)
      groups.push({ type, units: picked.map((u) => u.id) });
    });
    return { id: "R" + Date.now().toString(36), title: `Prova aleatória nº ${n}`, groups };
  }
  function markSeen(exam) {
    const seen = store.get(LS_SEEN, {});
    const ids = new Set();
    flatten(exam).forEach((it) => { const id = Q2U.get(it.q) || Q2U.get(it.q._orig); if (id) ids.add(id); });
    ids.forEach((id) => (seen[id] = (seen[id] || 0) + 1));
    store.set(LS_SEEN, seen);
  }

  function canShuffle(item) {
    if (item.s.listening || item.q.noShuffle || item.q.pic || item.q.img) return false;
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

  /* ---------- áudio: MP3 oficial ou TTS ---------- */
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
    stop() { this.token++; try { speechSynthesis.cancel(); } catch (e) {} AUDIO.stop(); },
    speak(text, sp, rate) {
      return new Promise((resolve) => {
        if (!("speechSynthesis" in window)) return resolve();
        const u = new SpeechSynthesisUtterance(ttsText(text));
        u.lang = "ja-JP"; u.rate = rate || settings().rate;
        const v = this[sp] || this.F; if (v) u.voice = v;
        u.pitch = 1;
        if (v && sp === "M" && this.M === this.F) u.pitch = 0.6;
        if (v && sp === "F" && this.M === this.F) u.pitch = 1.25;
        let done = false; const fin = () => { if (!done) { done = true; resolve(); } };
        u.onend = fin; u.onerror = fin;
        setTimeout(fin, 2500 + u.text.length * 420 / u.rate);
        speechSynthesis.speak(u);
      });
    },
    async play(lines, onLine) {
      const my = ++this.token;
      try { speechSynthesis.cancel(); } catch (e) {}
      AUDIO.stop();
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
  const AUDIO = {
    el: null, tok: 0,
    stop() { this.tok++; if (this.el) { try { this.el.pause(); } catch (e) {} this.el = null; } },
    play(src, onProgress) {
      this.stop(); const my = this.tok;
      return new Promise((resolve) => {
        const a = new Audio(src); this.el = a; a.preload = "auto";
        a.onended = () => resolve(my === this.tok);
        a.onerror = () => { toast("Não foi possível tocar o áudio " + src); resolve(my === this.tok); };
        a.ontimeupdate = () => onProgress && a.duration && onProgress(a.currentTime / a.duration);
        a.play().catch(() => { toast("Toque em Repetir para liberar o áudio."); resolve(false); });
      });
    }
  };
  /* toca a questão: MP3 oficial ou roteiro em TTS */
  async function playQuestion(it, onInfo) {
    if (it.q.audio) {
      TTS.token++; try { speechSynthesis.cancel(); } catch (e) {}
      return AUDIO.play(it.q.audio, (p) => onInfo && onInfo(`Áudio oficial… ${Math.round(p * 100)}%`));
    }
    const lines = [["N", `${it.num}ばん。`]].concat(it.q.script.map((l) => [l[0], l[1]]));
    return TTS.play(lines, (i) => onInfo && i >= 0 && onInfo(i === 0 ? "Questão " + it.num : `Áudio tocando… (${i}/${lines.length - 1})`));
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  if ("speechSynthesis" in window) { TTS.load(); speechSynthesis.onvoiceschanged = () => TTS.load(); }

  function toast(msg) { const t = el(`<div class="toast">${esc(msg)}</div>`); document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }

  /* ---------- router ---------- */
  let timerId = null;
  function clearTimers() { if (timerId) clearInterval(timerId); timerId = null; TTS.stop(); listenCtl.cancel(); }
  applyPrefs();
  const fbtn = document.getElementById("furiBtn");
  if (fbtn) fbtn.onclick = () => { saveSet({ furi: settings().furi === false }); applyPrefs(); syncPrefRadios(); };
  const tbtn = document.getElementById("themeBtn");
  if (tbtn) tbtn.onclick = () => { const order = ["auto", "light", "dark"]; const t = settings().theme || "auto"; saveSet({ theme: order[(order.indexOf(t) + 1) % 3] }); applyPrefs(); syncPrefRadios(); toast("Tema: " + ({ auto: "automático", light: "claro", dark: "escuro" })[settings().theme]); };
  function syncPrefRadios() { const st = settings(); document.querySelectorAll("input[name=theme]").forEach((i) => (i.checked = i.value === (st.theme || "auto"))); document.querySelectorAll("input[name=furi]").forEach((i) => (i.checked = (i.value === "1") === (st.furi !== false))); }
  function route() {
    clearTimers();
    const h = location.hash.replace(/^#\/?/, "");
    const [view, arg] = h.split("/");
    const navKey = ["dashboard", "vocab"].includes(view) ? view : "home";
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === navKey));
    if (view === "exam") return viewExam();
    if (view === "result" && arg) return viewResult(arg);
    if (view === "dashboard") return viewDashboard();
    if (view === "vocab") return window.viewVocab(mount, el);
    return viewHome();
  }
  window.addEventListener("hashchange", route);
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let headRO = null;
  function mount(node) {
    $app.innerHTML = ""; $app.appendChild(node); window.scrollTo(0, 0);
    const head = node.querySelector(".exam-head");
    document.body.classList.toggle("exam-mode", !!head);
    if (headRO) { headRO.disconnect(); headRO = null; }
    if (head && window.ResizeObserver) { headRO = new ResizeObserver(() => document.documentElement.style.setProperty("--head-h", head.offsetHeight + "px")); headRO.observe(head); }
  }
  /* rola até um elemento descontando a barra fixa da prova (sem scrollIntoView, que no iOS arrasta containers) */
  function scrollToEl(target) {
    if (!target) return;
    const head = document.querySelector(".exam-head");
    const off = (head ? head.offsetHeight : 0) + 10;
    const y = target.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion() ? "auto" : "smooth" });
  }
  /* teclado aberto: some a navegação inferior para não cobrir campos */
  document.addEventListener("focusin", (e) => { if (e.target.matches("input[type=text], input:not([type]), textarea")) document.body.classList.add("kb-open"); });
  document.addEventListener("focusout", () => setTimeout(() => { if (!document.activeElement || !document.activeElement.matches("input[type=text], input:not([type]), textarea")) document.body.classList.remove("kb-open"); }, 60));

  /* ================= HOME ================= */
  function viewHome() {
    const st = settings();
    const cur = store.get(LS_CUR, null);
    const hist = history();
    const seen = store.get(LS_SEEN, {});
    const units = bankUnits();
    const off = units.filter((u) => u.origin === "oficial"), ori = units.filter((u) => u.origin === "original");
    const audioQ = units.filter((u) => u.questions[0].audio).length;
    const seenQ = qCount(units.filter((u) => seen[u.id]));
    const randDone = hist.filter((h) => h.spec);
    const bestR = randDone.length ? Math.max(...randDone.map((d) => d.score.total)) : null;
    const lastAtt = hist.length ? hist[hist.length - 1] : null;
    const fixedCards = EXAMS.map((ex) => {
      const its = flatten(ex);
      const done = hist.filter((h) => h.examId === ex.id);
      const best = done.length ? Math.max(...done.map((d) => d.score.total)) : null;
      return `<div class="sheet exam-card">
        <h3>${esc(ex.title)}</h3><div class="muted small">${esc(ex.subtitle)}</div>
        <div class="sections">${ex.sections.map((s) => `<span class="pill">${esc(s.pt)} · ${s.minutes} min · ${its.filter((i) => i.s === s).length}</span>`).join("")}</div>
        <div class="row"><button class="btn" data-start="${ex.id}">Começar ${esc(ex.title)}</button><span class="spacer"></span>
        <span class="small muted">${done.length ? `${done.length}× · melhor <b>${best}</b>/180` : "Ainda não feita"}</span></div></div>`;
    }).join("");
    const node = el(`<section>
      <div class="page-head"><h1>Simulado JLPT N5</h1>
      <p>Vocabulário (20 min), gramática e leitura (40 min) e listening (30 min), cronometrados como na prova. No fim: nota estimada de 0 a 180 e todas as alternativas comentadas.</p></div>
      ${cur ? `<div class="resume"><div><b>Prova em andamento</b><div class="small muted">${esc(getExamTitle(cur))} · seção ${cur.secIndex + 1} de 3</div></div><span class="spacer"></span><button class="btn ghost sm" id="discard">Descartar</button><button class="btn primary" id="resume">Continuar ${icon("arrow")}</button></div>` : ""}
      <div class="sheet start-sheet">
        <h2>Prova aleatória</h2>
        <p>Uma prova nova a cada vez, na estrutura oficial do N5. O sorteio prioriza questões oficiais e as que você ainda não viu.</p>
        <div class="facts">
          <div><b>${qCount(units)}</b><span>questões no banco</span></div>
          <div><b>${qCount(off)}</b><span>oficiais (jlpt.jp)</span></div>
          <div><b>${audioQ}</b><span>com áudio oficial</span></div>
          <div><b>${seenQ}</b><span>já vistas por você</span></div>
          <div><b>${lastAtt ? lastAtt.score.total : "—"}</b><span>última nota /180</span></div>
        </div>
        <div class="row">
          <button class="btn primary" id="startRandom">${icon("shuffle")}Gerar prova aleatória</button>
          <div class="seg" role="radiogroup" aria-label="Fonte das questões">
            <label><input type="radio" name="src" value="mix" ${st.source !== "oficial" ? "checked" : ""}>Oficiais + originais</label>
            <label><input type="radio" name="src" value="oficial" ${st.source === "oficial" ? "checked" : ""}>Só oficiais</label>
          </div>
          <span class="spacer"></span><span class="small muted">${randDone.length ? `${randDone.length} feita(s) · melhor <b>${bestR}</b>/180` : ""}</span>
        </div>
      </div>
      <h2>Provas fixas</h2>
      <div class="grid g2">${fixedCards}</div>
      <h2>Configurações</h2>
      <div class="sheet settings">
        <div class="set"><div><b>Modo da prova</b><span class="d">Exame: o áudio toca uma vez e avança sozinho. Treino: pode repetir e avançar quando quiser.</span></div>
          <div class="seg"><label><input type="radio" name="mode" value="exam" ${st.mode === "exam" ? "checked" : ""}>Exame</label><label><input type="radio" name="mode" value="train" ${st.mode === "train" ? "checked" : ""}>Treino</label></div></div>
        <div class="set"><div><b>Tema</b><span class="d">Automático segue o celular.</span></div>
          <div class="seg"><label><input type="radio" name="theme" value="auto" ${(st.theme || "auto") === "auto" ? "checked" : ""}>Auto</label><label><input type="radio" name="theme" value="light" ${st.theme === "light" ? "checked" : ""}>Claro</label><label><input type="radio" name="theme" value="dark" ${st.theme === "dark" ? "checked" : ""}>Escuro</label></div></div>
        <div class="set"><div><b>Furigana</b><span class="d">Leitura em hiragana sobre os kanji em gramática, leitura e listening (o vocabulário nunca mostra, como na prova).</span></div>
          <div class="seg"><label><input type="radio" name="furi" value="1" ${st.furi !== false ? "checked" : ""}>Mostrar</label><label><input type="radio" name="furi" value="0" ${st.furi === false ? "checked" : ""}>Ocultar</label></div></div>
        <div class="set"><div><b>Avançar sozinho</b><span class="d">Ao marcar uma alternativa, a tela desce para a próxima questão.</span></div>
          <div class="seg"><label><input type="radio" name="autoNext" value="1" ${st.autoNext !== false ? "checked" : ""}>Sim</label><label><input type="radio" name="autoNext" value="0" ${st.autoNext === false ? "checked" : ""}>Não</label></div></div>
        <div class="set"><div><b>Embaralhar alternativas</b><span class="d">Útil ao refazer uma prova (vocabulário, gramática e leitura).</span></div>
          <div class="seg"><label><input type="radio" name="shuffle" value="0" ${!st.shuffle ? "checked" : ""}>Não</label><label><input type="radio" name="shuffle" value="1" ${st.shuffle ? "checked" : ""}>Sim</label></div></div>
        <div class="set"><div><b>Velocidade da voz</b><span class="d">Só no listening das questões originais (as oficiais usam o áudio real).</span><div id="voiceInfo" class="small muted" style="margin-top:6px"></div></div>
          <div class="row"><input type="range" id="rate" min="0.6" max="1.2" step="0.05" value="${st.rate}" aria-label="Velocidade da voz"><span id="rateVal" class="small" style="font-variant-numeric:tabular-nums">${st.rate}×</span><button class="btn sm" id="testVoice">${icon("volume")}Testar</button></div></div>
        <div class="set"><div><b>Questões vistas</b><span class="d">Zerar faz o sorteio considerar todas como novas.</span></div><button class="btn sm" id="resetSeen">Zerar contagem</button></div>
      </div>
    </section>`);
    node.querySelectorAll("[data-start]").forEach((b) => b.onclick = () => startExam({ examId: b.dataset.start }));
    node.querySelector("#startRandom").onclick = () => startExam({ spec: generateSpec(settings().source) });
    node.querySelectorAll("input[name=src]").forEach((i) => i.onchange = () => saveSet({ source: i.value }));
    const r = node.querySelector("#resume"); if (r) r.onclick = () => go("#/exam");
    const d = node.querySelector("#discard"); if (d) d.onclick = () => { if (confirm("Descartar a prova em andamento?")) { store.del(LS_CUR); route(); } };
    node.querySelectorAll("input[name=mode]").forEach((i) => i.onchange = () => saveSet({ mode: i.value }));
    node.querySelectorAll("input[name=autoNext]").forEach((i) => i.onchange = () => saveSet({ autoNext: i.value === "1" }));
    node.querySelectorAll("input[name=shuffle]").forEach((i) => i.onchange = () => saveSet({ shuffle: i.value === "1" }));
    node.querySelectorAll("input[name=theme]").forEach((i) => i.onchange = () => { saveSet({ theme: i.value }); applyPrefs(); });
    node.querySelectorAll("input[name=furi]").forEach((i) => i.onchange = () => { saveSet({ furi: i.value === "1" }); applyPrefs(); });
    const rate = node.querySelector("#rate");
    rate.oninput = () => { node.querySelector("#rateVal").textContent = rate.value + "×"; saveSet({ rate: +rate.value }); };
    node.querySelector("#testVoice").onclick = () => TTS.play([["F", "こんにちは。日本語{にほんご}の テストを はじめます。"], ["M", "はい、よろしく おねがいします。"]]);
    node.querySelector("#resetSeen").onclick = () => { if (confirm("Zerar a contagem? O sorteio volta a considerar todas as questões como novas.")) { store.del(LS_SEEN); route(); } };
    mount(node);
    showVoiceInfo(node.querySelector("#voiceInfo"));
  }
  function getExamTitle(obj) { const e = getExam(obj); return e ? e.title : ""; }
  function showVoiceInfo(box) {
    const upd = () => {
      if (!("speechSynthesis" in window)) { box.innerHTML = `<div class="notice-box">Sem síntese de voz neste navegador: questões de listening originais ficam sem áudio (as oficiais usam MP3 e funcionam).</div>`; return; }
      TTS.load();
      if (!TTS.ready) { box.innerHTML = `<div class="notice-box">Nenhuma voz japonesa encontrada (usada só nas questões de listening originais). No <b>Microsoft Edge</b> as vozes Nanami/Keita já vêm prontas; no Windows: Configurações → Hora e idioma → Fala → Adicionar vozes → Japonês.</div>`; return; }
      const names = [...new Set([TTS.F, TTS.M, TTS.N].filter(Boolean).map((v) => v.name))];
      box.innerHTML = `Vozes japonesas: ${TTS.voices.length}. Usando: <b>${esc(names.join(" · "))}</b>.`;
    };
    upd(); setTimeout(upd, 800);
  }
  function saveSet(p) { store.set(LS_SET, Object.assign(settings(), p)); }

  function startExam(base) {
    const cur = store.get(LS_CUR, null);
    if (cur && !confirm("Há uma prova em andamento. Começar outra vai descartá-la. Continuar?")) return;
    const ex = getExam(base); const st = settings();
    const orders = {};
    if (st.shuffle) flatten(ex).forEach((it) => { if (canShuffle(it)) orders[it.id] = perm(it.q.o.length); });
    const remaining = {}; ex.sections.forEach((s) => (remaining[s.id] = s.minutes * 60));
    store.set(LS_CUR, { examId: base.examId || null, spec: base.spec || null, startedAt: new Date().toISOString(), settings: st, secIndex: 0, phase: "intro", remaining, answers: {}, orders, timeUsed: {}, lpos: 0, introDone: {} });
    go("#/exam");
  }

  /* ================= EXAM ================= */
  function viewExam() {
    const cur = store.get(LS_CUR, null);
    if (!cur) return go("#/");
    const ex = getExam(cur);
    if (!ex) { store.del(LS_CUR); return go("#/"); }
    const sec = ex.sections[cur.secIndex];
    if (cur.phase === "intro") return renderSectionIntro(cur, ex, sec);
    if (sec.listening) return renderListening(cur, ex, sec);
    return renderBooklet(cur, ex, sec);
  }
  const saveCur = (cur) => store.set(LS_CUR, cur);
  const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  function renderSectionIntro(cur, ex, sec) {
    const items = flatten(ex).filter((i) => i.s === sec);
    const audioN = items.filter((i) => i.q.audio).length;
    const first = cur.secIndex === 0;
    const secIcon = ["pencil", "text", "headphones"][cur.secIndex] || "pencil";
    const node = el(`<section class="sheet break">
      <div class="sec-ico">${icon(secIcon)}</div>
      <div class="muted small">${esc(ex.title)} · seção ${cur.secIndex + 1} de ${ex.sections.length}</div>
      <h1 lang="ja">${esc(sec.name)}</h1>
      <div class="meta"><span><b>${esc(sec.pt)}</b></span><span>${items.length} questões</span><span>${icon("clock")} ${sec.minutes} min</span></div>
      ${first ? "" : `<p>Intervalo: o tempo desta seção só começa quando você tocar em começar.</p>`}
      ${sec.listening ? `<p>${audioN} de ${items.length} questões com áudio oficial; as demais usam a voz japonesa do aparelho. Cada áudio toca ${cur.settings.mode === "exam" ? "uma única vez e avança sozinho" : "e pode ser repetido (modo treino)"}. A transcrição só aparece na correção. Use fones.</p>
        <p><button class="btn" id="tv">${icon("volume")}Testar o som</button></p><div id="vi" class="small muted"></div>` : `<p>As questões aparecem como no caderno de prova. Responda em qualquer ordem; a folha de respostas no topo mostra o que falta.</p>`}
      <div class="row" style="justify-content:center;margin-top:18px"><button class="btn ghost" id="quit">Abandonar prova</button><button class="btn primary" id="go">Começar ${esc(sec.pt.toLowerCase())} ${icon("arrow")}</button></div>
    </section>`);
    node.querySelector("#go").onclick = () => { cur.phase = "running"; saveCur(cur); viewExam(); };
    node.querySelector("#quit").onclick = quitExam;
    const tv = node.querySelector("#tv");
    if (tv) { tv.onclick = () => TTS.play([["F", "これは テストです。よく きこえますか。"], ["M", "はい、よく きこえます。"]]); showVoiceInfo(node.querySelector("#vi")); }
    mount(node);
  }
  function quitExam() { if (confirm("Abandonar a prova? As respostas não serão salvas.")) { store.del(LS_CUR); go("#/"); } }

  function startTimer(cur, sec, onTick, onEnd) {
    if (timerId) clearInterval(timerId);              /* nunca dois relógios ao mesmo tempo */
    /* conta pelo relógio real: prazo final fixo, restante = prazo − agora (não acumula erro nem acelera) */
    const endAt = Date.now() + cur.remaining[sec.id] * 1000;
    let shown = cur.remaining[sec.id];
    const step = () => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      if (left === shown && left > 0) return;
      shown = left;
      cur.remaining[sec.id] = left;
      cur.timeUsed[sec.id] = sec.minutes * 60 - left;
      saveCur(cur); onTick(left);
      if (left <= 0) { clearInterval(timerId); timerId = null; onEnd(); }
    };
    timerId = setInterval(step, 250);
  }
  function examHeader(cur, ex, sec, total, opts = {}) {
    return `<div class="exam-head"><div class="row">
      <span class="timer" id="timer" role="timer" aria-label="Tempo restante">${icon("clock")}<span id="timerTxt">${mmss(cur.remaining[sec.id])}</span></span>
      <div class="sec-name"><b>${esc(sec.pt)}</b><span id="cnt">0/${total}</span></div>
      <span class="spacer"></span>
      ${opts.sheet === false ? "" : `<button class="btn sm" id="sheetBtn" aria-expanded="false" aria-controls="answerSheet" aria-label="Folha de respostas">${icon("grid")}<span class="hide-sm">Folha</span></button>`}
      <button class="btn sm primary" id="finish">Encerrar</button>
    </div>
    <div class="row" style="margin-top:8px;flex-wrap:nowrap"><div class="progress"><i id="prog" style="width:0"></i></div></div>
    ${opts.sheet === false ? "" : `<div class="qnav" id="qnav" aria-label="Questões"></div><div class="answer-sheet" id="answerSheet" hidden></div>`}</div>`;
  }
  function tick(r) { const t = document.getElementById("timer"), tt = document.getElementById("timerTxt"); if (t && tt) { tt.textContent = mmss(r); t.classList.toggle("low", r <= 60); } }

  function finishSection(cur, ex) {
    const sec = ex.sections[cur.secIndex];
    cur.timeUsed[sec.id] = sec.minutes * 60 - cur.remaining[sec.id];
    clearTimers();
    if (cur.secIndex < ex.sections.length - 1) { cur.secIndex++; cur.phase = "intro"; cur.lpos = 0; saveCur(cur); viewExam(); }
    else finishExam(cur, ex);
  }
  function finishExam(cur, ex) {
    const sc = score(ex, cur.answers);
    const att = { id: Date.now().toString(36), examId: cur.examId, spec: cur.spec, examTitle: ex.title, date: new Date().toISOString(), startedAt: cur.startedAt, mode: cur.settings.mode, answers: cur.answers, orders: cur.orders, timeUsed: cur.timeUsed, score: sc };
    const h = history(); h.push(att); store.set(LS_HIST, h); store.del(LS_CUR);
    markSeen(ex);
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
        book.appendChild(el(`<div class="mondai" data-first="${it.id}">${fmt(it.g.title)}<span class="pt">${esc(it.g.pt)}</span></div>`));
        if (it.g.passage) book.appendChild(el(`<div class="passage">${fmt(renum(it.g.passage, blankMap(items.filter((x) => x.gi === it.gi))), { furi })}</div>`));
      }
      const order = optOrder(cur, it);
      const long = it.q.o.some((o) => o.replace(/\{[^}]*\}/g, "").length > 14);
      const qtext = /^\[\d+\]$/.test(it.q.q) ? "" : fmt(it.q.q, { furi, star: it.g.type === "bunpou2" });
      const qn = el(`<div class="q" id="q-${it.id}">
        ${it.q.passage ? `<div class="passage">${fmt(it.q.passage, { furi })}</div>` : ""}
        <div class="qhead"><span class="qnum">${it.num}</span><div class="qtext">${qtext}</div></div>
        ${it.q.img ? `<img class="qimg" src="${it.q.img}" alt="figura da questão" style="max-width:420px">` : ""}
        <div class="opts ${long ? "long" : ""}" role="group" aria-label="Alternativas da questão ${it.num}">${order.map((oi, p) => `<button class="opt ${cur.answers[it.id] === oi ? "sel" : ""}" data-o="${oi}" aria-pressed="${cur.answers[it.id] === oi}"><span class="n">${p + 1}</span><span lang="ja">${fmt(it.q.o[oi], { furi })}</span></button>`).join("")}</div>
      </div>`);
      qn.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
        cur.answers[it.id] = +b.dataset.o; saveCur(cur);
        qn.querySelectorAll(".opt").forEach((x) => { x.classList.toggle("sel", x === b); x.setAttribute("aria-pressed", x === b); });
        updProgress();
        if (cur.settings.autoNext !== false) autoNext(it);
      });
      book.appendChild(qn);
    });
    const nav = node.querySelector("#qnav");
    const jump = (id) => scrollToEl(document.getElementById("q-" + id));
    let advT = null;
    function autoNext(it) {
      clearTimeout(advT);
      const i = items.indexOf(it), nx = items[i + 1];
      advT = setTimeout(() => {
        if (!nx) {
          const left = items.filter((x) => cur.answers[x.id] === undefined);
          if (left.length) { toast(`Fim da seção. ${left.length} em branco: indo para a ${left[0].num}.`); jump(left[0].id); }
          else toast("Seção completa. Revise ou toque em Encerrar.");
          return;
        }
        /* início de um novo bloco (もんだい/texto): mostra o enunciado e o texto junto */
        const head = nx.gi !== it.gi ? book.querySelector(`.mondai[data-first="${nx.id}"]`) : null;
        scrollToEl(head || document.getElementById("q-" + nx.id));
      }, 320);
    }
    items.forEach((it) => { const a = el(`<a href="#q-${it.id}" data-id="${it.id}" aria-label="Questão ${it.num}">${it.num}</a>`); a.onclick = (e) => { e.preventDefault(); jump(it.id); }; nav.appendChild(a); });
    /* folha de respostas completa (assinatura): cada linha = número + 4 bolhas */
    const sheet = node.querySelector("#answerSheet"), sheetBtn = node.querySelector("#sheetBtn");
    function drawSheet() {
      const left = items.filter((i) => cur.answers[i.id] === undefined).length;
      sheet.innerHTML = `<div class="as-head"><span>Folha de respostas</span><span>${left ? left + " em branco" : "tudo respondido"}</span></div><div class="as-grid">${items.map((it) => {
        const order = optOrder(cur, it); const pos = cur.answers[it.id] === undefined ? -1 : order.indexOf(cur.answers[it.id]);
        return `<a class="as-row" href="#q-${it.id}" data-id="${it.id}"><span class="as-n">${it.num}</span>${it.q.o.map((_, p) => `<i class="${p === pos ? "f" : ""}">${p + 1}</i>`).join("")}</a>`;
      }).join("")}</div>`;
      sheet.querySelectorAll(".as-row").forEach((a) => a.onclick = (e) => { e.preventDefault(); toggleSheet(false); jump(a.dataset.id); });
    }
    function toggleSheet(open) { sheet.hidden = !open; sheetBtn.setAttribute("aria-expanded", open); if (open) drawSheet(); }
    sheetBtn.onclick = () => toggleSheet(sheet.hidden);
    /* marca a questão visível na faixa de sincronismo */
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { const id = en.target.id.slice(2); nav.querySelectorAll("a").forEach((a) => a.classList.toggle("cur", a.dataset.id === id)); const a = nav.querySelector(`a[data-id="${id}"]`); if (a) nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.offsetWidth / 2, behavior: "auto" }); } }), { rootMargin: "-45% 0px -50% 0px" });
    function updProgress() {
      const done = items.filter((i) => cur.answers[i.id] !== undefined).length;
      node.querySelector("#prog").style.width = (done / items.length) * 100 + "%";
      node.querySelector("#cnt").textContent = `${done}/${items.length} respondidas`;
      nav.querySelectorAll("a").forEach((a) => a.classList.toggle("done", cur.answers[a.dataset.id] !== undefined));
      if (!sheet.hidden) drawSheet();
    }
    node.querySelector("#finish").onclick = () => {
      const left = items.filter((i) => cur.answers[i.id] === undefined).length;
      if (!confirm(left ? `Ainda há ${left} questão(ões) sem resposta. Encerrar a seção mesmo assim?` : "Encerrar esta seção? Não será possível voltar.")) return;
      finishSection(cur, ex);
    };
    mount(node); updProgress();
    node.querySelectorAll(".q").forEach((q) => io.observe(q));
    startTimer(cur, sec, tick, () => { toast("Tempo esgotado!"); finishSection(cur, ex); });
  }

  /* ----- Listening ----- */
  const listenCtl = { timer: null, cancel() { if (this.timer) clearInterval(this.timer); this.timer = null; } };

  function renderListening(cur, ex, sec) {
    const items = flatten(ex).filter((i) => i.s === sec);
    const node = el(`<section>${examHeader(cur, ex, sec, items.length, { sheet: false })}<div id="lq"></div></section>`);
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
      const nOpts = q.o.length;
      const optsHTML = g.spoken || q.pic
        ? `<div class="spoken-opts" role="group" aria-label="Alternativas">${q.o.map((_, i) => `<button class="opt ${cur.answers[it.id] === i ? "sel" : ""}" data-o="${i}" aria-pressed="${cur.answers[it.id] === i}" aria-label="Alternativa ${i + 1}"><span class="n">${i + 1}</span></button>`).join("")}</div>`
        : `<div class="opts long" role="group" aria-label="Alternativas">${q.o.map((o, i) => `<button class="opt ${cur.answers[it.id] === i ? "sel" : ""}" data-o="${i}" aria-pressed="${cur.answers[it.id] === i}"><span class="n">${i + 1}</span><span lang="ja">${fmt(o)}</span></button>`).join("")}</div>`;
      const view = el(`<div>
        <div class="mondai">${fmt(g.title)}<span class="pt">${esc(g.pt)}</span></div>
        <div class="q">
          <div class="qhead"><span class="qnum">${it.num}</span><div style="padding-top:6px"><div>${g.type === "sokuji" ? "Ouça a frase e as três respostas." : g.type === "hatsuwa" ? "Olhe a figura e ouça. O que a pessoa da seta (→) diz?" : "Ouça a pergunta e a conversa. Escolha a resposta."}</div>${q.audio ? '<span class="pill print" style="margin-top:6px">áudio oficial</span>' : ""}</div></div>
          ${q.img ? `<img class="qimg" src="${q.img}" alt="figura da questão" style="max-width:560px">` : q.scene ? `<div class="scene">${esc(q.scene)}</div>` : ""}
          <div class="player" id="pl"><div class="wave"><i></i><i></i><i></i><i></i><i></i></div><div id="pst" class="small">Preparando áudio…</div><span class="spacer"></span>
            <button class="btn sm" id="rep" ${train ? "" : "hidden"}>${icon("replay")}Repetir</button><span class="countdown" id="cd"></span></div>
          ${optsHTML}
          <div class="l-actions"><button class="btn" id="next" ${train ? "" : "disabled"}>Próxima ${icon("arrow")}</button></div>
        </div></div>`);
      box.appendChild(view);
      view.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
        cur.answers[it.id] = +b.dataset.o; saveCur(cur);
        view.querySelectorAll(".opt").forEach((x) => { x.classList.toggle("sel", x === b); x.setAttribute("aria-pressed", x === b); }); upd();
      });
      const pl = view.querySelector("#pl"), pst = view.querySelector("#pst"), nextB = view.querySelector("#next"), cd = view.querySelector("#cd"), rep = view.querySelector("#rep");
      const next = () => { cur.lpos++; saveCur(cur); show(); };
      nextB.onclick = next;
      async function playAll(withIntro) {
        pl.classList.add("playing"); rep.hidden = !train;
        if (withIntro && g.intro) {
          pst.textContent = "Instruções da もんだい…";
          const ok = await TTS.play([["N", g.intro]]); if (!ok) return;
          cur.introDone[it.gi] = true; saveCur(cur);
          await sleep(600);
        }
        const ok = await playQuestion(it, (t) => (pst.textContent = t));
        if (!ok) { pl.classList.remove("playing"); rep.hidden = false; pst.textContent = "Áudio parado. Toque em Repetir para ouvir."; nextB.disabled = false; return; }
        pl.classList.remove("playing");
        pst.textContent = train ? "Áudio terminado. Responda e avance quando quiser." : "Áudio terminado. Responda.";
        nextB.disabled = false;
        if (!train) {
          let left = g.spoken ? 8 : 12;
          cd.textContent = `próxima em ${left}s`;
          listenCtl.timer = setInterval(() => { left--; cd.textContent = `próxima em ${left}s`; if (left <= 0) { listenCtl.cancel(); next(); } }, 1000);
        }
      }
      rep.onclick = () => { listenCtl.cancel(); cd.textContent = ""; playAll(false); };
      if (!q.audio) { if (!TTS.ready) TTS.load(); if (!TTS.ready) pst.innerHTML = "Sem voz japonesa neste navegador (veja Configurações na página inicial). Você ainda pode responder."; }
      setTimeout(() => playAll(firstOfGroup), 400);
    }
    show();
  }

  /* ================= RESULT ================= */
  function viewResult(id) {
    const att = history().find((h) => h.id === id);
    if (!att) return mount(el(`<div class="empty">Resultado não encontrado. <a href="#/dashboard">Ver histórico</a></div>`));
    const ex = getExam(att);
    if (!ex) return mount(el(`<div class="empty">A prova desta tentativa não existe mais nos dados.</div>`));
    const sc = score(ex, att.answers);
    const items = flatten(ex);
    const wrong = items.filter((i) => att.answers[i.id] !== i.q.a).length;
    const color = (p) => (p >= 60 ? "var(--ok)" : p >= 45 ? "var(--warn)" : "var(--bad)");
    const secRows = ex.sections.map((s) => {
      const r = sc.sections[s.id]; if (!r) return ""; const p = Math.round((r.c / r.t) * 100);
      const used = att.timeUsed && att.timeUsed[s.id] != null ? mmss(att.timeUsed[s.id]) : "—";
      return `<div class="item"><div class="top"><span><b>${esc(s.pt)}</b> <span class="muted small">${esc(s.name)}</span></span><span>${r.c}/${r.t} · ${p}% <span class="muted small">· tempo ${used} de ${s.minutes}:00</span></span></div><div class="bar"><i style="width:${p}%;background:${color(p)}"></i></div></div>`;
    }).join("");
    const types = Object.entries(sc.byType).map(([k, v]) => ({ k, ...v, p: v.c / v.t })).sort((a, b) => a.p - b.p);
    const node = el(`<section>
      <div class="result-head"><h1>Resultado</h1><div class="meta">${esc(att.examTitle)} · ${new Date(att.date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · modo ${att.mode === "train" ? "treino" : "exame"}</div></div>
      <div class="sheet score-sheet">
        <div class="score-box"><span class="lbl">Nota estimada</span><div class="score-big">${sc.total}<small> /180</small></div>
          <div class="verdict ${sc.pass ? "ok" : "bad"}">${icon(sc.pass ? "check" : "x")}${sc.pass ? "Aprovado" : "Reprovado"}</div></div>
        <div class="score-parts">
          <div class="kpi"><div class="label">Vocabulário, gramática e leitura</div><div class="val">${sc.lk}<span class="muted small"> /120</span></div><div class="sub">${sc.lk >= 38 ? "Acima" : "Abaixo"} do mínimo de 38 · ${sc.lkRaw[0]} de ${sc.lkRaw[1]} acertos</div></div>
          <div class="kpi"><div class="label">Listening</div><div class="val">${sc.l}<span class="muted small"> /60</span></div><div class="sub">${sc.l >= 19 ? "Acima" : "Abaixo"} do mínimo de 19 · ${sc.lRaw[0]} de ${sc.lRaw[1]} acertos</div></div>
        </div>
      </div>
      <p class="note">Aprovação no N5: total de 80 ou mais e o mínimo em cada parte. A nota oficial usa escala equalizada; esta é uma estimativa proporcional aos acertos.</p>
      <h2>Por seção</h2><div class="sheet secbars">${secRows}</div>
      <h2>Por tipo de questão</h2><p class="small muted" style="margin-top:-6px">Pontos fracos primeiro.</p>
      <div class="sheet secbars">${types.map((t) => { const p = Math.round(t.p * 100); return `<div class="item"><div class="top"><span>${esc(TYPE_LABELS[t.k] || t.k)}</span><span>${t.c}/${t.t} · ${p}%</span></div><div class="bar"><i style="width:${p}%;background:${color(p)}"></i></div></div>`; }).join("")}</div>
      <h2>Correção comentada</h2>
      <p class="small muted" style="margin-top:-6px">A correta aparece circulada em verde; sua bolha preenchida mostra o que você marcou. Erradas já vêm explicadas; nas certas, toque em “Ver explicação”.</p>
      <div class="filters" id="flt"><button data-f="all" class="on">Todas (${items.length})</button><button data-f="wrong">Erradas/em branco (${wrong})</button><button data-f="right">Certas (${items.length - wrong})</button>${ex.sections.map((s) => `<button data-f="sec:${s.id}">${esc(s.pt)}</button>`).join("")}</div>
      <div id="review"></div>
      <div class="row" style="margin-top:24px"><a class="btn" href="#/dashboard">${icon("chart")}Ver progresso</a>${att.spec ? `<button class="btn primary" id="again">Nova prova aleatória</button><button class="btn" id="redo">Refazer esta mesma prova</button>` : `<button class="btn primary" id="again">Refazer ${esc(ex.title)}</button>`}</div>
    </section>`);
    node.querySelector("#again").onclick = () => startExam(att.spec ? { spec: generateSpec(settings().source) } : { examId: att.examId });
    const redo = node.querySelector("#redo"); if (redo) redo.onclick = () => startExam({ spec: { ...att.spec, title: att.spec.title + " (refeita)" } });
    const rev = node.querySelector("#review");
    let lastKey = "";
    items.forEach((it) => {
      const key = it.s.id + it.gi;
      if (key !== lastKey) {
        lastKey = key;
        rev.appendChild(el(`<div class="mondai" data-sec="${it.s.id}" data-group="${key}">${fmt(it.g.title)}<span class="pt">${esc(it.s.pt)} · ${esc(it.g.pt)}</span></div>`));
        if (it.g.passage) rev.appendChild(el(`<details class="passage-wrap" data-sec="${it.s.id}" data-group="${key}"><summary>Ver texto da questão</summary><div class="passage">${fmt(renum(it.g.passage, blankMap(items.filter((x) => x.s === it.s && x.gi === it.gi))))}</div></details>`));
      }
      rev.appendChild(reviewCard(it, att));
    });
    node.querySelectorAll("#flt button").forEach((b) => b.onclick = () => {
      node.querySelectorAll("#flt button").forEach((x) => x.classList.toggle("on", x === b));
      const f = b.dataset.f;
      rev.querySelectorAll(".rq").forEach((c) => {
        const ok = c.dataset.ok === "1";
        const show = f === "all" || (f === "wrong" && !ok) || (f === "right" && ok) || (f.startsWith("sec:") && c.dataset.sec === f.slice(4));
        c.style.display = show ? "" : "none";
      });
      rev.querySelectorAll("[data-group]").forEach((h) => {
        if (h.classList.contains("rq")) return;
        const any = [...rev.querySelectorAll(`.rq[data-group="${h.dataset.group}"]`)].some((c) => c.style.display !== "none");
        h.style.display = any ? "" : "none";
      });
    });
    mount(node);
  }

  function reviewCard(it, att) {
    const q = it.q; const ans = att.answers[it.id]; const ok = ans === q.a; const blank = ans === undefined;
    const L = it.s.listening;
    const official = /^Oficial/.test(q.src || "");
    const status = ok ? `<span class="pill ok">Acertou</span>` : blank ? `<span class="pill warn">Em branco</span>` : `<span class="pill bad">Errou</span>`;
    const order = att.orders && att.orders[it.id];
    const opts = q.o.map((o, i) => {
      const cls = (i === q.a ? "correct " : i === ans ? "chosen-wrong " : "") + (i === ans ? "mine" : "");
      const tag = i === q.a ? `<span class="tag" style="color:var(--ok)">CORRETA</span>` : i === ans ? `<span class="tag" style="color:var(--bad)">SUA RESPOSTA</span>` : "";
      const mine = i === q.a && i === ans ? `<span class="tag" style="color:var(--ok)">· SUA</span>` : "";
      const pos = order ? `<span class="muted small" style="font-family:var(--sans)"> (na sua prova: ${order.indexOf(i) + 1})</span>` : "";
      return `<div class="ropt ${cls}"><span class="n">${i + 1}</span><div><span lang="ja">${q.pic ? "Figura " + (i + 1) + " — " : ""}${fmt(o)}</span>${tag}${mine}${pos}<span class="why" data-why>${q.why && q.why[i] ? esc(q.why[i]) : ""}</span></div></div>`;
    }).join("");
    const lines = q.audio ? q.script : [["N", `${it.num}ばん。`]].concat(q.script || []);
    const transcript = L ? `<div class="transcript"><div class="t-head">Transcrição${official ? " oficial" : ""} · as falas destacadas contêm a resposta</div>${lines.map((l) => `<div class="line ${l[2] ? "ev" : ""}"><span class="sp" title="${SPEAKER_PT[l[0]]}" lang="ja">${SPEAKER[l[0]]}</span><span lang="ja">${fmt(l[1])}${l[2] ? '<span class="ev-tag">resposta</span>' : ""}</span></div>`).join("")}</div>` : "";
    const card = el(`<div class="q rq ${ok ? "right" : blank ? "blank-ans" : "wrong"}" data-ok="${ok ? 1 : 0}" data-sec="${it.s.id}" data-group="${it.s.id}${it.gi}">
      <span class="rq-mark" aria-hidden="true">${ok ? "◯" : "✕"}</span>
      <div class="rq-top"><span class="qnum" style="margin-top:0">${it.num}</span>${status}<span class="pill ${official ? "print" : ""}">${official ? "oficial" : "original"}</span><span class="src">${esc(q.src || "")}</span></div>
      ${q.passage ? `<details><summary>Ver texto</summary><div class="passage">${fmt(q.passage)}</div></details>` : ""}
      ${q.img ? `<img class="qimg" src="${q.img}" alt="figura" style="max-width:${L ? 520 : 380}px">` : q.scene ? `<div class="scene">${esc(q.scene)}</div>` : ""}
      ${!L && !/^\[\d+\]$/.test(q.q) ? `<div class="qtext" style="margin:10px 0 0">${fmt(q.q, { star: it.g.type === "bunpou2" })}</div>` : ""}
      <div class="ropts">${opts}</div>
      <div class="exp-area"></div>
      <div class="r-actions">${ok ? `<button class="btn sm" data-toggle aria-expanded="false">Ver explicação</button>` : ""}${L ? `<button class="btn sm" data-play>${icon("play")}Ouvir de novo</button><button class="btn sm ghost" data-stop aria-label="Parar áudio">${icon("stop")}</button>` : ""}</div>
    </div>`);
    const expHTML = `<div class="explain">${q.tr ? `<div class="tr">“${esc(q.tr)}”</div>` : ""}<div><b>Por que a ${q.a + 1} é a correta:</b> ${esc(q.exp || "")}</div></div>${transcript}`;
    const area = card.querySelector(".exp-area");
    const whys = card.querySelectorAll("[data-why]");
    const setOpen = (open) => { area.innerHTML = open ? expHTML : ""; whys.forEach((w) => (w.style.display = open ? "" : "none")); };
    setOpen(!ok);
    const tg = card.querySelector("[data-toggle]");
    if (tg) { let open = false; tg.onclick = () => { open = !open; setOpen(open); tg.textContent = open ? "Ocultar explicação" : "Ver explicação"; tg.setAttribute("aria-expanded", open); }; }
    const pb = card.querySelector("[data-play]"); if (pb) pb.onclick = () => playQuestion(it);
    const sb = card.querySelector("[data-stop]"); if (sb) sb.onclick = () => TTS.stop();
    return card;
  }

  /* ================= DASHBOARD ================= */
  function viewDashboard() {
    const h = history().slice().sort((a, b) => a.date.localeCompare(b.date));
    const node = el(`<section><div class="page-head"><h1>Progresso</h1><p>Sua evolução prova a prova, salva só neste aparelho.</p></div><div id="dash"></div></section>`);
    const d = node.querySelector("#dash");
    if (!h.length) {
      d.appendChild(el(`<div class="sheet empty">${icon("chart")}<p>Nenhuma prova feita ainda. Termine um simulado e a evolução aparece aqui.</p><a class="btn primary" href="#/">Escolher prova</a></div>`));
      d.appendChild(el(`<div class="row" style="margin-top:16px"><button class="btn sm" id="imp">Importar histórico (JSON)</button></div>`));
      mount(node); bindImport(node); return;
    }
    const totals = h.map((a) => a.score.total);
    const last = h[h.length - 1]; const prev = h[h.length - 2];
    const best = Math.max(...totals);
    const avg3 = Math.round(totals.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, totals.length));
    const passes = h.filter((a) => a.score.pass).length;
    const delta = prev ? last.score.total - prev.score.total : null;
    const seen = store.get(LS_SEEN, {}); const units = bankUnits();
    const seenQ = qCount(units.filter((u) => seen[u.id])), totQ = qCount(units);
    d.appendChild(el(`<div class="grid g4">
      <div class="sheet kpi"><div class="label">Provas feitas</div><div class="val">${h.length}</div><div class="sub">${passes} aprovada(s)</div></div>
      <div class="sheet kpi"><div class="label">Última nota</div><div class="val">${last.score.total}<span class="muted small">/180</span></div><div class="sub">${delta === null ? "primeira tentativa" : (delta >= 0 ? "+" : "−") + Math.abs(delta) + " em relação à anterior"}</div></div>
      <div class="sheet kpi"><div class="label">Melhor nota</div><div class="val">${best}<span class="muted small">/180</span></div><div class="sub">média últimas 3: ${avg3}</div></div>
      <div class="sheet kpi"><div class="label">Banco explorado</div><div class="val">${Math.round((seenQ / totQ) * 100)}%</div><div class="sub">${seenQ} de ${totQ} questões já vistas</div></div>
    </div>`));
    d.appendChild(el(`<h2>Aproveitamento por tentativa</h2>`));
    const lc = el(`<div class="sheet"></div>`); d.appendChild(lc); lineChart(lc, h);
    d.appendChild(el(`<h2>Acertos por tipo de questão</h2>`));
    const bc = el(`<div class="sheet"></div>`); d.appendChild(bc); typeBars(bc, h);
    d.appendChild(el(`<h2>Histórico</h2>`));
    const rows = h.slice().reverse().map((a) => `<tr><td>${new Date(a.date).toLocaleDateString("pt-BR")} <span class="muted small">${new Date(a.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span></td><td>${esc(a.examTitle)}</td><td class="hide-sm">${a.score.lk}/120</td><td class="hide-sm">${a.score.l}/60</td><td><b>${a.score.total}</b>/180</td><td>${a.score.pass ? '<span class="pill ok">Aprovado</span>' : '<span class="pill bad">Reprovado</span>'}</td><td style="white-space:nowrap"><a class="btn sm" href="#/result/${a.id}">Correção</a> <button class="btn sm ghost" data-del="${a.id}" aria-label="Excluir tentativa">${icon("x")}</button></td></tr>`).join("");
    d.appendChild(el(`<div class="sheet" style="overflow-x:auto;padding:6px 10px"><table class="hist"><thead><tr><th>Data</th><th>Prova</th><th class="hide-sm">Ling. + leitura</th><th class="hide-sm">Listening</th><th>Total</th><th>Resultado</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`));
    d.appendChild(el(`<div class="row" style="margin-top:16px"><button class="btn sm" id="exp">Exportar histórico (JSON)</button><button class="btn sm" id="imp">Importar</button><span class="spacer"></span><button class="btn sm ghost" id="clr">Apagar todo o histórico</button></div>`));
    d.querySelectorAll("[data-del]").forEach((b) => b.onclick = () => { if (confirm("Excluir esta tentativa?")) { store.set(LS_HIST, history().filter((x) => x.id !== b.dataset.del)); route(); } });
    node.querySelector("#exp").onclick = () => {
      const blob = new Blob([JSON.stringify({ history: history(), seen: store.get(LS_SEEN, {}) }, null, 1)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `jlpt-n5-historico-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    };
    node.querySelector("#clr").onclick = () => { if (confirm("Apagar TODO o histórico? Isso não pode ser desfeito.")) { store.del(LS_HIST); store.del(LS_SEEN); route(); } };
    mount(node); bindImport(node);
  }
  function bindImport(node) {
    const b = node.querySelector("#imp"); if (!b) return;
    b.onclick = () => {
      const inp = document.createElement("input"); inp.type = "file"; inp.accept = ".json,application/json";
      inp.onchange = async () => {
        try {
          let data = JSON.parse(await inp.files[0].text());
          let seenIn = null;
          if (!Array.isArray(data)) { seenIn = data.seen || null; data = data.history; }
          if (!Array.isArray(data)) throw new Error();
          const cur = history(); const ids = new Set(cur.map((x) => x.id));
          const add = data.filter((x) => x && x.id && x.score && !ids.has(x.id));
          store.set(LS_HIST, cur.concat(add));
          if (seenIn) { const s = store.get(LS_SEEN, {}); Object.entries(seenIn).forEach(([k, v]) => (s[k] = Math.max(s[k] || 0, v))); store.set(LS_SEEN, s); }
          toast(`${add.length} tentativa(s) importada(s).`); route();
        } catch (e) { toast("Arquivo inválido."); }
      };
      inp.click();
    };
  }

  /* gráfico de linhas: % por tentativa (eixo único 0–100%) */
  function lineChart(box, h) {
    const series = [
      { name: "Nota total", color: "var(--c1)", val: (a) => Math.round((a.score.total / 180) * 100), raw: (a) => `${a.score.total}/180` },
      { name: "Linguagem + leitura", color: "var(--c2)", val: (a) => Math.round((a.score.lk / 120) * 100), raw: (a) => `${a.score.lk}/120` },
      { name: "Listening", color: "var(--c3)", val: (a) => Math.round((a.score.l / 60) * 100), raw: (a) => `${a.score.l}/60` }
    ];
    const W = 860, H = 300, m = { l: 44, r: 150, t: 14, b: 34 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b; const n = h.length;
    const x = (i) => m.l + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
    const y = (v) => m.t + ih - (v / 100) * ih;
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolução do aproveitamento por tentativa">`;
    [0, 25, 50, 75, 100].forEach((v) => { svg += `<line x1="${m.l}" x2="${m.l + iw}" y1="${y(v)}" y2="${y(v)}" stroke="var(--grid)" stroke-width="1"/><text x="${m.l - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}%</text>`; });
    const cut = (80 / 180) * 100;
    svg += `<line x1="${m.l}" x2="${m.l + iw}" y1="${y(cut)}" y2="${y(cut)}" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    const step = Math.max(1, Math.ceil(n / 10));
    h.forEach((a, i) => { if (i % step === 0 || i === n - 1) svg += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="var(--muted)">#${i + 1}</text>`; });
    series.forEach((s) => {
      if (n > 1) svg += `<polyline points="${h.map((a, i) => `${x(i)},${y(s.val(a))}`).join(" ")}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
      h.forEach((a, i) => { svg += `<circle cx="${x(i)}" cy="${y(s.val(a))}" r="4.5" fill="${s.color}" stroke="var(--sheet)" stroke-width="2"/>`; });
    });
    const ends = series.map((s) => ({ s, v: s.val(h[n - 1]), yy: y(s.val(h[n - 1])) })).sort((a, b) => a.yy - b.yy);
    for (let i = 1; i < ends.length; i++) if (ends[i].yy - ends[i - 1].yy < 15) ends[i].yy = ends[i - 1].yy + 15;
    ends.forEach((e) => { svg += `<text x="${x(n - 1) + 10}" y="${e.yy + 4}" font-size="12" fill="var(--ink-2)">${esc(e.s.name)} ${e.v}%</text>`; });
    svg += `<text x="${m.l + iw + 10}" y="${y(cut) + 4}" font-size="11" fill="var(--muted)">${ends.some((e) => Math.abs(e.yy - y(cut)) < 12) ? "" : "corte 80/180"}</text>`;
    svg += `<line id="xh" x1="0" x2="0" y1="${m.t}" y2="${m.t + ih}" stroke="var(--ink-2)" stroke-width="1" opacity="0"/>`;
    svg += `<rect id="hit" x="${m.l - 10}" y="${m.t}" width="${iw + 20}" height="${ih}" fill="transparent"/></svg>`;
    box.innerHTML = `<div class="legend">${series.map((s) => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join("")}<span><i class="dash"></i>Nota de corte (80/180 ≈ 44%)</span></div><div class="chart">${svg}<div class="tip"></div></div><p class="small muted" style="margin:6px 0 0">Linhas em % do máximo de cada parte (total /180, linguagem+leitura /120, listening /60). Além do total ≥ 80, cada parte precisa do mínimo (38 e 19).</p>`;
    const chart = box.querySelector(".chart"), tip = box.querySelector(".tip"), hit = box.querySelector("#hit"), xh = box.querySelector("#xh"), svgEl = box.querySelector("svg");
    const move = (ev) => {
      const r = svgEl.getBoundingClientRect(); const sx = ((ev.clientX - r.left) / r.width) * W;
      let i = n === 1 ? 0 : Math.round(((sx - m.l) / iw) * (n - 1)); i = Math.max(0, Math.min(n - 1, i));
      const a = h[i];
      xh.setAttribute("x1", x(i)); xh.setAttribute("x2", x(i)); xh.setAttribute("opacity", ".4");
      tip.innerHTML = `<b>#${i + 1} · ${esc(a.examTitle)}</b><br><span class="muted">${new Date(a.date).toLocaleString("pt-BR")}</span>${series.map((s) => `<div class="row" style="gap:6px"><i style="display:inline-block;width:10px;height:3px;background:${s.color}"></i>${s.name}<span class="spacer"></span><b>${s.raw(a)}</b></div>`).join("")}<div>${a.score.pass ? "Aprovado" : "Reprovado"}</div>`;
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
        <rect x="${m.l}" y="${yy + 7}" width="${w}" height="16" rx="4" fill="var(--c1)"/>
        <text x="${m.l + w + 8}" y="${yy + 19}" font-size="12" fill="var(--ink-2)">${r.p}%</text></g>`;
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

  window.addEventListener("beforeunload", () => TTS.stop());
  route();
})();
