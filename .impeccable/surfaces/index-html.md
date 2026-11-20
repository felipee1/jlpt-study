---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["js/app.js","js/vocab.js","css/style.css"]
---

# Surface: JLPT N5 app shell (index.html — exams, vocabulary drill, results, dashboard)

Mode: Operate. Audience: the owner, studying for JLPT N5 on a phone (installed PWA), long timed sessions, often at night. Job: take a 90-min mock exam without friction, review mistakes, drill vocabulary, watch progress. Constraints: static HTML/CSS/JS, PT-BR UI, Japanese exam content, furigana toggle, dark mode, BMC link stays.

## Direction contract

THESIS: The app is the official JLPT answer sheet (マークシート) made interactive — answering is filling a printed bubble with graphite; it refuses the category default of rounded quiz cards with coloured pills.

OWN-WORLD: White sheet on a cool desk-grey ground; every printed rule, frame and empty bubble in the sheet's rose-vermilion ink; answers filled in graphite grey; black timing marks on the sheet edge. Correction in teacher's pen: green ◯ for right, vermilion ✕ for wrong. Dark mode = the same sheet at night: graphite ground, rose ink lifted, fills in pale graphite. Japanese content set in Mincho like the booklet; UI in a plain gothic/sans; all numbers tabular.

STORY: The learner opens the app, sees attempts and the bank at a glance, starts a random exam, fills bubbles section by section against a visible timer, jumps through the answer-sheet grid, then reads the graded sheet and every explained option; vocabulary drill is one word per sheet with two write-in boxes.

FIRST VIEWPORT: Phone 390×844. Exam: sticky sheet header (section name, もんだい, tabular timer, "Folha" button opening the full answer grid), a timing-mark strip under it showing answered/unanswered, the question in Mincho at 19px with large rose-ink bubbles 1–4 as full-width rows below, bottom bar with progress + "Encerrar seção". Home: header band, one primary "Gerar prova aleatória" action at thumb height, last score + bank stats as a compact sheet table.

FORM: Answer-sheet world, grounded list position 1 (user picked the pick card over the rolled direction, position 3); seed:bc938258545e2ceb.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
