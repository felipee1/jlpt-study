/* Banco — listening oficial (jlpt.jp, provas de exemplo 2012 e 2018).
   audio: trecho do MP3 oficial só desta questão | img: figura do caderno oficial
   pic: true → as alternativas são as figuras numeradas (o[] descreve cada uma para a correção)
   script: transcrição oficial ([falante, texto, evidência?]) — N = narrador */
window.BANK_UNITS = window.BANK_UNITS || [];
(function (U) {
  const L = (type, q) => U.push({ type, origin: "oficial", questions: [q] });

  /* =============== 2018 · もんだい1 (課題理解) =============== */
  L("kadai", { src: "Oficial 2018 · 聴解 1-1", audio: "media/audio/L18-1-1.mp3", img: "media/img/L18-1-1.png", pic: true,
    o: ["Esquina de cima à esquerda", "Esquina de cima à direita", "Ao lado do banco da esquerda", "Ao lado do banco da direita"], a: 2,
    script: [["N", "男{おとこ}の 人{ひと}と 女{おんな}の 人{ひと}が 話{はな}しています。男{おとこ}の 人{ひと}は どこへ 行{い}きますか。"],
      ["M", "すみません、喫茶店{きっさてん}「みどり」は どこですか。"],
      ["F", "喫茶店{きっさてん}「みどり」ですね。あそこに 交差点{こうさてん}が ありますね。"], ["M", "はい。"],
      ["F", "あの 交差点{こうさてん}を 左{ひだり}に 曲{ま}がって ください。道{みち}の 左側{ひだりがわ}に 銀行{ぎんこう}が あります。喫茶店{きっさてん}「みどり」は 銀行{ぎんこう}の となりですよ。", true],
      ["M", "分{わ}かりました。ありがとうございます。"], ["N", "男{おとこ}の 人{ひと}は どこへ 行{い}きますか。"]],
    exp: "Vira à ESQUERDA no cruzamento; o banco fica do lado ESQUERDO da rua e o café é ao lado do banco → posição 3.",
    why: ["Antes do banco, mas não é 'ao lado do banco'.", "Lado direito: ele vira à esquerda.", "Correta.", "É o banco do lado direito."] });
  L("kadai", { src: "Oficial 2018 · 聴解 1-2", audio: "media/audio/L18-1-2.mp3", img: "media/img/L18-1-2.png", pic: true,
    o: ["Revista de relógios de julho (7月)", "Revista de relógios de agosto (8月)", "Revista de carros de julho", "Revista de carros de agosto"], a: 0,
    script: [["N", "会社{かいしゃ}で 女{おんな}の 人{ひと}と 男{おとこ}の 人{ひと}が 話{はな}しています。男{おとこ}の 人{ひと}は どの 雑誌{ざっし}を 女{おんな}の 人{ひと}に 渡{わた}しますか。"],
      ["F", "木村{きむら}さん、すみません、木村{きむら}さんの 後{うし}ろに ある 雑誌{ざっし}を 取{と}って ください。"],
      ["M", "時計{とけい}の 雑誌{ざっし}ですか。車{くるま}の 雑誌{ざっし}ですか。"], ["F", "時計{とけい}の 雑誌{ざっし}です。", true],
      ["M", "いちばん 新{あたら}しい、8月{はちがつ}のですか。"], ["F", "いいえ、7月{しちがつ}のを お願{ねが}いします。", true], ["M", "はい。"],
      ["N", "男{おとこ}の 人{ひと}は どの 雑誌{ざっし}を 女{おんな}の 人{ひと}に 渡{わた}しますか。"]],
    exp: "Revista de RELÓGIOS e de JULHO (ela recusa a de agosto, a mais nova).",
    why: ["Correta.", "Ela recusa a de agosto: いいえ、7月のを.", "É de relógios, não de carros.", "Tipo e mês errados."] });
  L("kadai", { src: "Oficial 2018 · 聴解 1-3", audio: "media/audio/L18-1-3.mp3", img: "media/img/L18-1-3.png", pic: true,
    o: ["Dia 4 (quarta)", "Dia 9 (segunda)", "Dia 6 (sexta)", "Dia 10 (terça)"], a: 3,
    script: [["N", "学校{がっこう}で 先生{せんせい}が 話{はな}しています。学生{がくせい}は、次{つぎ}、何日{なんにち}に 学校{がっこう}に 来{き}ますか。"],
      ["F", "皆{みな}さん、明日{あした}から 休{やす}みですね。休{やす}みは 四日{よっか}から 九日{ここのか}まで 六日間{むいかかん}です。十日{とおか}は テストを します。休{やす}まないで ください。", true],
      ["F", "では、六日間{むいかかん} ゆっくり 休{やす}んで、また 学校{がっこう}に 来{き}て ください。"], ["N", "学生{がくせい}は、次{つぎ}、何日{なんにち}に 学校{がっこう}に 来{き}ますか。"]],
    exp: "Folga do dia 4 (よっか) ao 9 (ここのか); no dia 10 (とおか) tem prova → voltam no dia 10.",
    why: ["É o início das férias.", "É o último dia de folga.", "Está no meio das férias.", "Correta."] });
  L("kadai", { src: "Oficial 2018 · 聴解 1-4", audio: "media/audio/L18-1-4.mp3", img: "media/img/L18-1-4.png", pic: true,
    o: ["Leite e 2 ovos", "Leite, 3 ovos e peixe", "Só 3 ovos", "3 ovos e peixe"], a: 1,
    script: [["N", "うちで 女{おんな}の 学生{がくせい}と 男{おとこ}の 学生{がくせい}が 話{はな}しています。男{おとこ}の 学生{がくせい}は 冷蔵庫{れいぞうこ}から 何{なに}を 出{だ}しますか。"],
      ["F", "あ、１２時{じゅうにじ}ですね。お昼{ひる}ご飯{はん}を 食{た}べましょう。私{わたし}が 作{つく}りますよ。"], ["M", "何{なに}か しましょうか。"],
      ["F", "ありがとう。じゃ、冷蔵庫{れいぞうこ}から 卵{たまご}を ２個{こ}と 牛乳{ぎゅうにゅう}を 出{だ}して ください。", true], ["M", "はい。"],
      ["F", "それから 魚{さかな}も 出{だ}して ください。あ、すみません、卵{たまご}は ３個{こ} お願{ねが}いします。", true], ["M", "はい。"],
      ["N", "男{おとこ}の 学生{がくせい}は 冷蔵庫{れいぞうこ}から 何{なに}を 出{だ}しますか。"]],
    exp: "Leite + peixe + ovos — e ela corrige de 2 para 3 ovos.",
    why: ["Faltou o peixe.", "Correta.", "Faltam leite e peixe.", "Falta o leite."] });
  L("kadai", { src: "Oficial 2018 · 聴解 1-5", audio: "media/audio/L18-1-5.mp3",
    o: ["げつようび", "かようび", "もくようび", "きんようび"], a: 0,
    script: [["N", "日本語学校{にほんごがっこう}で 女{おんな}の 人{ひと}と 男{おとこ}の 人{ひと}が 話{はな}しています。女{おんな}の 人{ひと}は 何曜日{なんようび}の クラスで 勉強{べんきょう}しますか。"],
      ["F", "すみません。1週間{いっしゅうかん}に 1回{いっかい}、日本語{にほんご}で 話{はな}す 練習{れんしゅう}を したいです。夜{よる}の クラスは ありますか。"],
      ["M", "はい、夜{よる}の クラスは 毎週{まいしゅう} 月曜日{げつようび}、火曜日{かようび}、木曜日{もくようび}、金曜日{きんようび}です。夜{よる} ６時{ろくじ}からです。"],
      ["F", "うーん、火曜日{かようび}と 金曜日{きんようび}は 仕事{しごと}が ６時{ろくじ}に 終{お}わりません。", true],
      ["M", "そうですか。では、月曜日{げつようび}が いいですよ。木曜日{もくようび}の クラスは 話{はな}す 時間{じかん}が 短{みじか}いです。", true],
      ["F", "分{わ}かりました。じゃ、来週{らいしゅう}から 勉強{べんきょう}したいです。どうぞ よろしく お願{ねが}いします。"],
      ["N", "女{おんな}の 人{ひと}は 何曜日{なんようび}の クラスで 勉強{べんきょう}しますか。"]],
    exp: "Terça e sexta ela não pode (trabalho). Quinta tem pouco tempo de conversa. Sobra segunda, que ele recomenda e ela aceita.",
    why: ["Correta.", "Ela não sai do trabalho a tempo na terça.", "A turma de quinta tem pouco tempo de conversação.", "Sexta ela também trabalha."] });
  L("kadai", { src: "Oficial 2018 · 聴解 1-6", audio: "media/audio/L18-1-6.mp3",
    o: ["1かいの 3ばん", "1かいの 4ばん", "2かいの 3ばん", "2かいの 4ばん"], a: 3,
    script: [["N", "日本語学校{にほんごがっこう}で 先生{せんせい}が 学生{がくせい}に 話{はな}しています。学生{がくせい}は 明日{あした}の 午前{ごぜん} どの 教室{きょうしつ}に 行{い}きますか。午前{ごぜん}です。"],
      ["M", "明日{あした}の 午前{ごぜん}は、クラスに 日本人{にほんじん}の 学生{がくせい}が 来{き}ますから、広{ひろ}い 教室{きょうしつ}で 授業{じゅぎょう}を します。2階{にかい}の 4番{よんばん}の 教室{きょうしつ}に 来{き}て ください。", true],
      ["M", "午後{ごご}は 1階{いっかい}の 3番{さんばん}の 教室{きょうしつ}で 授業{じゅぎょう}を します。"], ["N", "学生{がくせい}は 明日{あした}の 午前{ごぜん} どの 教室{きょうしつ}に 行{い}きますか。"]],
    exp: "A pergunta é sobre a MANHÃ: 2º andar, sala 4. A sala 3 do 1º andar é à tarde.",
    why: ["É a sala da tarde.", "Andar errado.", "Mistura andar da manhã com sala da tarde.", "Correta."] });
  L("kadai", { src: "Oficial 2018 · 聴解 1-7", audio: "media/audio/L18-1-7.mp3", img: "media/img/L18-1-7.png", pic: true,
    o: ["Bebida e onigiri", "Bebida e espaguete", "Câmera e onigiri", "Câmera e espaguete"], a: 2,
    script: [["N", "女{おんな}の 人{ひと}と 男{おとこ}の 人{ひと}が 話{はな}しています。女{おんな}の 人{ひと}は 何{なに}を 持{も}って いきますか。"],
      ["F", "佐藤{さとう}さん、日曜日{にちようび}、佐藤{さとう}さんの うちで パーティーを しますね。何{なに}か 持{も}って いきましょうか。飲{の}み物{もの}は どうですか。"],
      ["M", "ありがとうございます。飲{の}み物{もの}は たくさん ありますから、食{た}べ物{もの}が いいです。じゃ、おにぎりを 持{も}って きて ください。私{わたし}は スパゲティを 作{つく}ります。", true],
      ["F", "分{わ}かりました。"], ["M", "それから、カメラは ありますか。"], ["F", "はい。"],
      ["M", "パーティーの とき、使{つか}いたいですから、貸{か}して ください。", true], ["F", "はい、いいですよ。"],
      ["N", "女{おんな}の 人{ひと}は 何{なに}を 持{も}って いきますか。"]],
    exp: "Bebida já tem bastante. Ela leva onigiri e empresta a câmera. O espaguete é ele que faz.",
    why: ["Bebida ele recusa (たくさんあります).", "Ele mesmo faz o espaguete.", "Correta.", "O espaguete é dele."] });

  /* =============== 2018 · もんだい2 (ポイント理解) =============== */
  L("point", { src: "Oficial 2018 · 聴解 2-1", audio: "media/audio/L18-2-1.mp3", img: "media/img/L18-2-1.png", pic: true,
    o: ["Só maçã", "Mexerica e banana", "Maçã e banana", "Maçã, mexerica e banana"], a: 3,
    script: [["N", "うちで 女{おんな}の 人{ひと}と 男{おとこ}の 人{ひと}が 話{はな}しています。女{おんな}の 人{ひと}は 何{なん}の ジュースを 作{つく}りましたか。"],
      ["F", "くだものの ジュースを 作{つく}りました。どうぞ 飲{の}んで ください。"], ["M", "いただきます。これは 何{なん}の ジュースですか。"],
      ["F", "りんごと、それから、みかんと バナナを 少{すこ}し 入{い}れました。", true], ["N", "女{おんな}の 人{ひと}は 何{なん}の ジュースを 作{つく}りましたか。"]],
    exp: "Maçã + um pouco de mexerica (みかん) e banana → as três.",
    why: ["Faltam mexerica e banana.", "Falta a maçã.", "Falta a mexerica.", "Correta."] });
  L("point", { src: "Oficial 2018 · 聴解 2-2", audio: "media/audio/L18-2-2.mp3",
    o: ["ひとり", "ふたり", "さんにん", "よにん"], a: 0,
    script: [["N", "女{おんな}の 学生{がくせい}と 男{おとこ}の 学生{がくせい}が 話{はな}しています。男{おとこ}の 学生{がくせい}は お兄{にい}さんが 何人{なんにん} いますか。"],
      ["F", "中山{なかやま}さん、中山{なかやま}さんの 家族{かぞく}は 何人{なんにん}ですか。"],
      ["M", "4人{よにん}です。両親{りょうしん}と、兄{あに}が 一人{ひとり}と 僕{ぼく}です。", true], ["F", "お兄{にい}さんは 学生{がくせい}ですか。"],
      ["M", "いえ、会社員{かいしゃいん}です。結婚{けっこん}して、子供{こども}が 二人{ふたり} いますよ。"], ["N", "男{おとこ}の 学生{がくせい}は お兄{にい}さんが 何人{なんにん} いますか。"]],
    exp: "兄が一人 = um irmão mais velho. 4 é a família toda; 2 são os filhos do irmão.",
    why: ["Correta.", "Dois são os FILHOS do irmão.", "Não bate com nada.", "4 é o total da família."] });
  L("point", { src: "Oficial 2018 · 聴解 2-3", audio: "media/audio/L18-2-3.mp3", img: "media/img/L18-2-3.png", pic: true,
    o: ["Trem", "Ônibus", "Bicicleta", "Carro"], a: 2,
    script: [["N", "会社{かいしゃ}で 女{おんな}の 人{ひと}と 男{おとこ}の 人{ひと}が 話{はな}しています。男{おとこ}の 人{ひと}は 何{なに}で 会社{かいしゃ}に 来{き}ていますか。"],
      ["F", "加藤{かとう}さん、加藤{かとう}さんの うちは どちらですか。"], ["M", "みなみ町{まち}です。"],
      ["F", "私{わたし}も みなみ町{まち}ですよ。でも、駅{えき}や 電車{でんしゃ}で 全然{ぜんぜん} 加藤{かとう}さんに 会{あ}いませんね。電車{でんしゃ}じゃなくて バスで 会社{かいしゃ}に 来{き}ていますか。"],
      ["M", "いえ、僕{ぼく}は 自転車{じてんしゃ}です。前{まえ}は 車{くるま}で 来{き}ていましたが、車{くるま}は いろいろ お金{かね}が かかりますから、今{いま}は 乗{の}っていません。", true],
      ["F", "そうですか。"], ["M", "時間{じかん}は 50分{ごじゅっぷん}ぐらい かかりますが、楽{たの}しいですよ。"], ["N", "男{おとこ}の 人{ひと}は、何{なに}で 会社{かいしゃ}に 来{き}ていますか。"]],
    exp: "僕は自転車です. O carro era antes (前は), não usa mais.",
    why: ["Ela pergunta se é de trem, ele nega.", "Ela pergunta se é de ônibus, ele nega.", "Correta.", "Usava antes; agora não (今は乗っていません)."] });
  L("point", { src: "Oficial 2018 · 聴解 2-4", audio: "media/audio/L18-2-4.mp3", img: "media/img/L18-2-4.png", pic: true,
    o: ["Ver filme em casa", "Jogar basquete", "Comer lámen", "Comprar doces"], a: 0,
    script: [["N", "電話{でんわ}で 女{おんな}の 学生{がくせい}と 男{おとこ}の 学生{がくせい}が 話{はな}しています。二人{ふたり}は 今日{きょう} 一緒{いっしょ}に 何{なに}を しますか。"],
      ["F", "もしもし、吉田{よしだ}さん。"], ["M", "あ、おはようございます。"],
      ["F", "今日{きょう} うちで 映画{えいが}を 見{み}ませんか。面白{おもしろ}い DVDを 借{か}りましたよ。", true],
      ["M", "ああ。今日{きょう}は 今{いま}から 友達{ともだち}と バスケットボールを して、それから、みんなと 一緒{いっしょ}に ラーメンを 食{た}べに 行{い}きます。でも 午後{ごご}は 大丈夫{だいじょうぶ}です。"],
      ["F", "じゃ、午後{ごご} 来{き}て ください。", true],
      ["M", "はい。じゃ、行{い}く 前{まえ}に 電話{でんわ}します。何{なに}か おいしい お菓子{かし}を 買{か}って、持{も}って いきます。"],
      ["F", "ありがとうございます。お菓子{かし}も 待{ま}っています。"], ["N", "二人{ふたり}は 今日{きょう} 一緒{いっしょ}に 何{なに}を しますか。"]],
    exp: "Juntos (二人で): à tarde ele vai à casa dela ver o filme. Basquete e lámen ele faz com OUTROS amigos; os doces ele compra sozinho.",
    why: ["Correta.", "Com outros amigos, não com ela.", "Com outros amigos.", "Ele compra sozinho, antes de ir."] });
  L("point", { src: "Oficial 2018 · 聴解 2-5", audio: "media/audio/L18-2-5.mp3",
    o: ["1じかんはん", "3じかんはん", "5じかん", "6じかん"], a: 1,
    script: [["N", "大学{だいがく}で 日本人{にほんじん}の 学生{がくせい}と 男{おとこ}の 留学生{りゅうがくせい}が 話{はな}しています。日本{にほん}から 男{おとこ}の 留学生{りゅうがくせい}の 国{くに}まで、飛行機{ひこうき}で 何時間{なんじかん} かかりますか。"],
      ["F", "ジョージさん、冬休{ふゆやす}みに 国{くに}へ 帰{かえ}りますか。"], ["M", "はい。"],
      ["F", "日本{にほん}から ジョージさんの 国{くに}まで、飛行機{ひこうき}で どのぐらいですか。5時間{ごじかん}か 6時間{ろくじかん}ぐらいですか。"],
      ["M", "もっと 早{はや}いですよ。3時間半{さんじかんはん}です。", true],
      ["F", "ああ、近{ちか}いですね。私{わたし}も 冬休{ふゆやす}みに 両親{りょうしん}に 会{あ}いに 帰{かえ}りますが、ここから うちまで 電車{でんしゃ}で 5時間{ごじかん}ぐらい かかりますよ。"],
      ["M", "5時間{ごじかん}ですか。じゃ、私{わたし}の 国{くに}の ほうが 近{ちか}いですね。1時間半{いちじかんはん} 早{はや}いです。"],
      ["N", "日本{にほん}から 男{おとこ}の 留学生{りゅうがくせい}の 国{くに}まで、飛行機{ひこうき}で 何時間{なんじかん} かかりますか。"]],
    exp: "3 horas e meia de avião. 5 h é a viagem de trem dela; 1h30 é a diferença entre as duas.",
    why: ["É a diferença entre as viagens.", "Correta.", "É o trem da japonesa.", "Palpite dela, que ele corrige."] });
  L("point", { src: "Oficial 2018 · 聴解 2-6", audio: "media/audio/L18-2-6.mp3",
    o: ["カレー", "ピザ", "すし", "そば"], a: 1,
    script: [["N", "電話{でんわ}で 女{おんな}の 学生{がくせい}が 話{はな}しています。今晩{こんばん}、何{なん}の 店{みせ}に ご飯{はん}を 食{た}べに 行{い}きますか。"],
      ["F", "もしもし、森{もり}さん？　大田{おおた}です。今晩{こんばん} クラスの みんなと ご飯{はん}を 食{た}べに 行{い}きますね。今朝{けさ} 学校{がっこう}では、駅{えき}の 前{まえ}の カレー屋{や}に 来{き}て くださいと 言{い}いましたが、今日{きょう}は 店{みせ}が 休{やす}みです。"],
      ["F", "だから、ピザ屋{や}に 行{い}きます。", true],
      ["F", "先週{せんしゅう} 一緒{いっしょ}に 行{い}った すし屋{や}の 前{まえ}の ビルです。1階{いっかい}に そば屋{や}が ある ビルで、ビルの ３階{さんがい}です。"],
      ["N", "今晩{こんばん}、何{なん}の 店{みせ}に ご飯{はん}を 食{た}べに 行{い}きますか。"]],
    exp: "O curry está fechado hoje → vão à pizzaria. Sushi e soba só servem de referência para achar o prédio.",
    why: ["Está fechado hoje.", "Correta.", "É só ponto de referência (em frente).", "Fica no 1º andar do prédio; a pizzaria é no 3º."] });

  /* =============== 2018 · もんだい3 (発話表現) =============== */
  L("hatsuwa", { src: "Oficial 2018 · 聴解 3-1", audio: "media/audio/L18-3-1.mp3", img: "media/img/L18-3-1.png",
    o: ["あまり 休{やす}みません。", "今{いま}、休{やす}んでいますか。", "少{すこ}し 休{やす}みましょう。"], a: 2,
    script: [["N", "山{やま}を 歩{ある}いています。友達{ともだち}と 一緒{いっしょ}に 休{やす}みたいです。何{なん}と 言{い}いますか。"],
      ["M", "１．あまり 休{やす}みません。"], ["M", "２．今{いま}、休{やす}んでいますか。"], ["M", "３．少{すこ}し 休{やす}みましょう。", true]],
    exp: "Propor algo para os dois: 〜ましょう (vamos ~).",
    why: ["'Não descanso muito' — não propõe nada.", "Pergunta se o outro está descansando.", "Correta."] });
  L("hatsuwa", { src: "Oficial 2018 · 聴解 3-2", audio: "media/audio/L18-3-2.mp3", img: "media/img/L18-3-2.png",
    o: ["どんな チョコレートですか。", "チョコレート、あげませんか。", "チョコレート、いかがですか。"], a: 2,
    script: [["N", "友達{ともだち}に チョコレートを あげます。何{なん}と 言{い}いますか。"],
      ["F", "１．どんな チョコレートですか。"], ["F", "２．チョコレート、あげませんか。"], ["F", "３．チョコレート、いかがですか。", true]],
    exp: "Oferecer algo: 〜(は) いかがですか (aceita ~?).",
    why: ["Pergunta como é o chocolate.", "Sugere que o OUTRO dê chocolate a alguém.", "Correta."] });
  L("hatsuwa", { src: "Oficial 2018 · 聴解 3-3", audio: "media/audio/L18-3-3.mp3", img: "media/img/L18-3-3.png",
    o: ["あ、乗{の}ります。", "さあ、乗{の}りましょう。", "すぐ 乗{の}って ください。"], a: 0,
    script: [["N", "エレベーターに 乗{の}りたいです。何{なん}と 言{い}いますか。"],
      ["F", "１．あ、乗{の}ります。", true], ["F", "２．さあ、乗{の}りましょう。"], ["F", "３．すぐ 乗{の}って ください。"]],
    exp: "Avisar a quem segura a porta que você vai entrar: あ、乗ります！",
    why: ["Correta.", "Convida alguém que está com ela — mas ela está sozinha correndo.", "Manda o outro entrar."] });
  L("hatsuwa", { src: "Oficial 2018 · 聴解 3-4", audio: "media/audio/L18-3-4.mp3", img: "media/img/L18-3-4.png",
    o: ["見{み}ませんよ。", "危{あぶ}ないですよ。", "痛{いた}いですよ。"], a: 1,
    script: [["N", "前{まえ}に 自転車{じてんしゃ}が あります。友達{ともだち}は 見{み}ていません。何{なん}と 言{い}いますか。"],
      ["M", "１．見{み}ませんよ。"], ["M", "２．危{あぶ}ないですよ。", true], ["M", "３．痛{いた}いですよ。"]],
    exp: "Alertar sobre perigo: 危ないですよ (cuidado!).",
    why: ["'Não vou olhar' — sem sentido.", "Correta.", "'Dói' — ninguém se machucou ainda."] });
  L("hatsuwa", { src: "Oficial 2018 · 聴解 3-5", audio: "media/audio/L18-3-5.mp3", img: "media/img/L18-3-5.png",
    o: ["コーヒーを 持{も}って きますよ。", "コーヒーは まだですか。", "コーヒーを 飲{の}みませんか。"], a: 1,
    script: [["N", "レストランで コーヒーが 来{き}ません。長{なが}い 時間{じかん} 待{ま}っています。店{みせ}の 人{ひと}に 何{なん}と 言{い}いますか。"],
      ["F", "１．コーヒーを 持{も}って きますよ。"], ["F", "２．コーヒーは まだですか。", true], ["F", "３．コーヒーを 飲{の}みませんか。"]],
    exp: "Cobrar o pedido: 〜は まだですか (o ~ ainda não vem?).",
    why: ["É o garçom que diria isso.", "Correta.", "Convite para tomar café."] });

  /* =============== 2018 · もんだい4 (即時応答) =============== */
  L("sokuji", { src: "Oficial 2018 · 聴解 4-1", audio: "media/audio/L18-4-1.mp3",
    o: ["去年{きょねん}です。", "5時間{ごじかん}です。", "3か月{げつ}です。"], a: 0,
    script: [["F", "リーさん、リーさんは いつ 日本{にほん}に 来{き}ましたか。"], ["M", "１．去年{きょねん}です。", true], ["M", "２．5時間{ごじかん}です。"], ["M", "３．3か月{さんかげつ}です。"]],
    exp: "いつ = quando → um momento (ano passado).",
    why: ["Correta.", "Duração, não 'quando'.", "Duração (3 meses), não 'quando'."] });
  L("sokuji", { src: "Oficial 2018 · 聴解 4-2", audio: "media/audio/L18-4-2.mp3",
    o: ["そうしましょう。", "食堂{しょくどう}ですよ。", "いえ、今{いま}からです。"], a: 2,
    script: [["M", "昼{ひる}ご飯{はん}は もう 食{た}べましたか。"], ["F", "１．そうしましょう。"], ["F", "２．食堂{しょくどう}ですよ。"], ["F", "３．いえ、今{いま}からです。", true]],
    exp: "もう〜ましたか (já ~?) → いえ、今からです (não, vou agora).",
    why: ["Resposta a um convite.", "Responde 'onde'.", "Correta."] });
  L("sokuji", { src: "Oficial 2018 · 聴解 4-3", audio: "media/audio/L18-4-3.mp3",
    o: ["デパートで 買{か}いましょう。", "はい、そうです。", "わたしが 作{つく}りました。"], a: 2,
    script: [["M", "おいしい クッキーですね。どこで 買{か}いましたか。"], ["F", "１．デパートで 買{か}いましょう。"], ["F", "２．はい、そうです。"], ["F", "３．わたしが 作{つく}りました。", true]],
    exp: "Ela não comprou: fez ela mesma. É a resposta natural a 'onde comprou?'.",
    why: ["Convite para comprar no futuro.", "Não é pergunta de sim/não.", "Correta."] });
  L("sokuji", { src: "Oficial 2018 · 聴解 4-4", audio: "media/audio/L18-4-4.mp3",
    o: ["はい、飛行機{ひこうき}で 行{い}きますよ。", "4時半{よじはん}の 飛行機{ひこうき}です。", "1時間{いちじかん}ぐらい 乗{の}ります。"], a: 1,
    script: [["F", "あした 京都{きょうと}に 行{い}きますね。何時{なんじ}の 飛行機{ひこうき}に 乗{の}りますか。"], ["M", "１．はい、飛行機{ひこうき}で 行{い}きますよ。"], ["M", "２．4時半{よじはん}の 飛行機{ひこうき}です。", true], ["M", "３．1時間{いちじかん}ぐらい 乗{の}ります。"]],
    exp: "何時の = de que horas → 4時半の.",
    why: ["Não diz a hora.", "Correta.", "Duração (何時間), não horário."] });
  L("sokuji", { src: "Oficial 2018 · 聴解 4-5", audio: "media/audio/L18-4-5.mp3",
    o: ["はい、分{わ}かりますよ。", "え、知{し}りませんでした。", "電話{でんわ}を していません。"], a: 0,
    script: [["F", "すみません。田中{たなか}さんの 電話番号{でんわばんごう}を 知{し}っていますか。"], ["M", "１．はい、分{わ}かりますよ。", true], ["M", "２．え、知{し}りませんでした。"], ["M", "３．電話{でんわ}を していません。"]],
    exp: "Sabe o número? → はい、分かりますよ (sim, sei).",
    why: ["Correta.", "'Não sabia (disso)' — reação a uma novidade.", "'Não estou ligando' — fora de contexto."] });
  L("sokuji", { src: "Oficial 2018 · 聴解 4-6", audio: "media/audio/L18-4-6.mp3",
    o: ["旅行{りょこう}しましょう。", "どこへも 行{い}きませんでした。", "外国{がいこく}から 来{き}ました。"], a: 1,
    script: [["M", "夏休{なつやす}みは どこかへ 出{で}かけましたか。"], ["F", "１．旅行{りょこう}しましょう。"], ["F", "２．どこへも 行{い}きませんでした。", true], ["F", "３．外国{がいこく}から 来{き}ました。"]],
    exp: "どこか (algum lugar) → どこへも + negativa = a lugar nenhum.",
    why: ["Convite, não resposta.", "Correta.", "Fala de onde veio."] });

  /* =============== 2012 · もんだい1 =============== */
  L("kadai", { src: "Oficial 2012 · 聴解 1-1", audio: "media/audio/L12-1-1.mp3", img: "media/img/L12-1-1.png", pic: true,
    o: ["Meia longa com frutas", "Meia longa com animal", "Meia curta com frutas", "Meia curta com animal"], a: 1,
    script: [["N", "靴下{くつした}の 店{みせ}で、女{おんな}の 人{ひと}と 店{みせ}の 人{ひと}が 話{はな}しています。女{おんな}の 人{ひと}は、どの 靴下{くつした}を 買{か}いますか。"],
      ["F", "子供{こども}の 靴下{くつした}、ありますか。"], ["M", "はい。長{なが}いのですか、短{みじか}いのですか。"], ["F", "長{なが}いのです。", true],
      ["M", "はい。果物{くだもの}の 絵{え}と 動物{どうぶつ}の 絵{え}が あります。どちらが いいですか。"], ["F", "そうですね、動物{どうぶつ}のを 下{くだ}さい。", true],
      ["N", "女{おんな}の 人{ひと}は、どの 靴下{くつした}を 買{か}いますか。"]],
    exp: "Longa (長いの) + desenho de animal (動物の).",
    why: ["Desenho errado (frutas).", "Correta.", "Curta e com frutas.", "Curta."] });
  L("kadai", { src: "Oficial 2012 · 聴解 1-2", audio: "media/audio/L12-1-2.mp3",
    o: ["1かい", "2かい", "3かい", "4かい"], a: 1,
    script: [["N", "病院{びょういん}で、医者{いしゃ}と 女{おんな}の 人{ひと}が 話{はな}しています。女{おんな}の 人{ひと}は、一日{いちにち}に 何回{なんかい} 薬{くすり}を 飲{の}みますか。"],
      ["M", "この 薬{くすり}は、朝{あさ}と 夜{よる}、ご飯{はん}を 食{た}べた あとで 飲{の}んで ください。", true], ["F", "昼{ひる}ご飯{はん}の あとは？"],
      ["M", "昼{ひる}は 飲{の}まないで ください。", true], ["F", "はい。"], ["M", "４日間{よっかかん} 飲{の}んで くださいね。"], ["F", "分{わ}かりました。"],
      ["N", "女{おんな}の 人{ひと}は、一日{いちにち}に 何回{なんかい} 薬{くすり}を 飲{の}みますか。"]],
    exp: "Manhã e noite = 2 vezes por dia. Ao meio-dia não. 4 é o número de DIAS.",
    why: ["São duas refeições.", "Correta.", "O almoço está excluído.", "4 dias, não 4 vezes."] });
  L("kadai", { src: "Oficial 2012 · 聴解 1-3", audio: "media/audio/L12-1-3.mp3", img: "media/img/L12-1-3.png", pic: true,
    o: ["Bolsa branca pequena", "Bolsa branca grande", "Bolsa preta grande", "Bolsa preta pequena"], a: 2,
    script: [["N", "デパートで、女{おんな}の 人{ひと}と 店{みせ}の 人{ひと}が 話{はな}しています。店{みせ}の 人{ひと}は、どの かばんを 取{と}りますか。"],
      ["F", "すみません、その 上{うえ}の 黒{くろ}い かばんを 取{と}って ください。", true], ["M", "どちらですか。この 小{ちい}さいのですか。"],
      ["F", "いいえ。大{おお}きいのです。", true], ["M", "はい。"], ["N", "店{みせ}の 人{ひと}は、どの かばんを 取{と}りますか。"]],
    exp: "A de cima, PRETA e GRANDE (ela nega a pequena).",
    why: ["Cor e tamanho errados.", "Cor errada.", "Correta.", "Ela nega: いいえ、大きいのです."] });
  L("kadai", { src: "Oficial 2012 · 聴解 1-4", audio: "media/audio/L12-1-4.mp3", img: "media/img/L12-1-4.png", pic: true,
    o: ["Lápis e borracha", "Caderno, lápis e borracha", "Dicionário, lápis e borracha", "Relógio, lápis e borracha"], a: 2,
    script: [["N", "教室{きょうしつ}で、先生{せんせい}が 話{はな}しています。学生{がくせい}は、机{つくえ}の 上{うえ}に 何{なに}を 置{お}きますか。"],
      ["M", "今{いま}から テストを します。この テストでは、辞書{じしょ}を 使{つか}う 問題{もんだい}が ありますから、机{つくえ}の 上{うえ}に 辞書{じしょ}を 出{だ}して ください。鉛筆{えんぴつ}と 消{け}しゴムも 出{だ}して ください。", true],
      ["M", "時計{とけい}は、かばんの 中{なか}に 入{い}れて ください。"], ["F", "先生{せんせい}、ノートは どうしますか。"], ["M", "ノートも かばんの 中{なか}に 入{い}れて ください。", true],
      ["N", "学生{がくせい}は、机{つくえ}の 上{うえ}に 何{なに}を 置{お}きますか。"]],
    exp: "Na mesa: dicionário + lápis + borracha. Relógio e caderno vão na bolsa.",
    why: ["Falta o dicionário.", "Caderno vai na bolsa.", "Correta.", "Relógio vai na bolsa."] });
  L("kadai", { src: "Oficial 2012 · 聴解 1-5", audio: "media/audio/L12-1-5.mp3", img: "media/img/L12-1-5.png", pic: true,
    o: ["Jantar no restaurante", "Levar a bagagem ao quarto", "Ver TV", "Fazer compras"], a: 0,
    script: [["N", "バスの 中{なか}で、旅行会社{りょこうがいしゃ}の 人{ひと}が 学生{がくせい}に 話{はな}しています。学生{がくせい}は、始{はじ}めに 何{なに}を しますか。"],
      ["F", "皆{みな}さん、ホテルに 着{つ}きました。今{いま}から １階{いっかい}の レストランで 晩{ばん}ご飯{はん}を 食{た}べます。晩{ばん}ご飯{はん}は ７時{しちじ}からです。今{いま} ６時{ろくじ}50分{ごじゅっぷん}ですから、すぐに 行{い}って ください。", true],
      ["F", "皆{みな}さんの 荷物{にもつ}は、ホテルの 人{ひと}が 部屋{へや}に 持{も}って いきます。晩{ばん}ご飯{はん}の あとは、テレビを 見{み}たり、買{か}い物{もの}を したり して ください。"],
      ["N", "学生{がくせい}は、始{はじ}めに 何{なに}を しますか。"]],
    exp: "Primeiro: jantar (já são 6h50, jantar às 7h, すぐに行って). A bagagem quem leva é o hotel; TV e compras são depois.",
    why: ["Correta.", "Quem leva é o funcionário do hotel.", "Depois do jantar.", "Depois do jantar."] });
  L("kadai", { src: "Oficial 2012 · 聴解 1-6", audio: "media/audio/L12-1-6.mp3", img: "media/img/L12-1-6.png", pic: true,
    o: ["Onigiri", "Bebidas", "Bebidas e doces", "Só doces"], a: 3,
    script: [["N", "男{おとこ}の 人{ひと}と 女{おんな}の 人{ひと}が 話{はな}しています。男{おとこ}の 人{ひと}は、何{なに}を 持{も}って いきますか。"],
      ["M", "来週{らいしゅう}の 日曜日{にちようび}、海{うみ}へ 行{い}きますね。何{なに}を 持{も}って いきましょうか。"], ["F", "私{わたし}は おにぎりを 持{も}って いきます。"],
      ["M", "じゃあ 僕{ぼく}は。"], ["F", "飲{の}み物{もの}と お菓子{かし}を お願{ねが}いします。"], ["M", "はい。飲{の}み物{もの}と お菓子{かし}ですね。"],
      ["F", "あ、飲{の}み物{もの}は 重{おも}いですね。海{うみ}に 着{つ}いてから 買{か}いましょう。", true], ["M", "そうですね。"],
      ["N", "男{おとこ}の 人{ひと}は、何{なに}を 持{も}って いきますか。"]],
    exp: "Ela pede bebidas e doces, mas muda: bebidas são pesadas, compram na praia → ele leva só os doces.",
    why: ["Onigiri é ela que leva.", "Bebidas vão comprar lá.", "Armadilha: as bebidas foram canceladas.", "Correta."] });
  L("kadai", { src: "Oficial 2012 · 聴解 1-7", audio: "media/audio/L12-1-7.mp3",
    o: ["1ばん", "3ばん", "5ばん", "7ばん"], a: 3,
    script: [["N", "バス停{てい}で、女{おんな}の 人{ひと}と バス会社{がいしゃ}の 人{ひと}が 話{はな}しています。女{おんな}の 人{ひと}は、何番{なんばん}の バスに 乗{の}りますか。"],
      ["F", "すみません、１番{いちばん}の バスは みどり駅{えき}に 行{い}きますか。"], ["M", "いいえ、みどり駅{えき}に 行{い}く バスは ３番{さんばん}と ５番{ごばん}と ７番{ななばん}ですよ。"],
      ["F", "そうですか。"], ["M", "あ、でも、今日{きょう}は 日曜日{にちようび}ですから、５番{ごばん}の バスは ありません。", true], ["F", "そうですか。"],
      ["M", "それから、３番{さんばん}は 朝{あさ}と 夕方{ゆうがた}の バスですから、今{いま}の 時間{じかん}は ７番{ななばん}ですね。", true],
      ["F", "分{わ}かりました。ありがとうございます。"], ["N", "女{おんな}の 人{ひと}は、何番{なんばん}の バスに 乗{の}りますか。"]],
    exp: "3, 5 e 7 vão à estação. 5 não roda no domingo; 3 só de manhã e no fim da tarde → 7.",
    why: ["Não vai à estação Midori.", "Só de manhã e no fim da tarde.", "Não tem no domingo.", "Correta."] });

  /* =============== 2012 · もんだい2 =============== */
  L("point", { src: "Oficial 2012 · 聴解 2-1", audio: "media/audio/L12-2-1.mp3",
    o: ["1じかん", "2じかん", "3じかん", "4じかん"], a: 3,
    script: [["N", "大学{だいがく}で、男{おとこ}の 学生{がくせい}と 女{おんな}の 学生{がくせい}が 話{はな}しています。女{おんな}の 学生{がくせい}は、今日{きょう}、何時間{なんじかん} 勉強{べんきょう}しますか。"],
      ["M", "山田{やまだ}さんは いつも 何時間{なんじかん}ぐらい 勉強{べんきょう}しますか。"], ["F", "うーん、毎日{まいにち} ３時間{さんじかん}ぐらいです。"],
      ["M", "えっ、私{わたし}は 毎日{まいにち} １時間{いちじかん}です。"], ["F", "あ、でも、明日{あした}は テストが ありますから、今日{きょう}は ４時間{よじかん} 勉強{べんきょう}します。", true],
      ["M", "そうですか。"], ["N", "女{おんな}の 学生{がくせい}は、今日{きょう}、何時間{なんじかん} 勉強{べんきょう}しますか。"]],
    exp: "Normalmente 3h, mas HOJE (prova amanhã) 4h. 1h é o rapaz.",
    why: ["É o tempo do rapaz.", "Não mencionado.", "É o normal dela, não hoje.", "Correta."] });
  L("point", { src: "Oficial 2012 · 聴解 2-2", audio: "media/audio/L12-2-2.mp3",
    o: ["512-7733", "512-7734", "512-7743", "512-7744"], a: 2,
    script: [["N", "男{おとこ}の 人{ひと}と 女{おんな}の 人{ひと}が 話{はな}しています。女{おんな}の 人{ひと}の 電話番号{でんわばんごう}は 何番{なんばん}ですか。"],
      ["M", "あのう、山田{やまだ}さんの 電話番号{でんわばんごう}は、512-7734 ですね？"], ["F", "いいえ、7734 じゃなくて 7743 です。", true],
      ["M", "え、ちょっと 待{ま}って ください。メモします。512 の。"], ["F", "7743 です。", true], ["M", "はい。ありがとうございました。"],
      ["N", "女{おんな}の 人{ひと}の 電話番号{でんわばんごう}は 何番{なんばん}ですか。"]],
    exp: "Ele diz 7734 e ela corrige: じゃなくて 7743.",
    why: ["Não mencionado.", "Número errado que ela corrige.", "Correta.", "Não mencionado."] });
  L("point", { src: "Oficial 2012 · 聴解 2-3", audio: "media/audio/L12-2-3.mp3",
    o: ["りょうしん", "あね", "いもうと", "おとうと"], a: 1,
    script: [["N", "女{おんな}の 学生{がくせい}と 男{おとこ}の 学生{がくせい}が 話{はな}しています。男{おとこ}の 学生{がくせい}は、だれと 住{す}んでいますか。"],
      ["F", "山田{やまだ}さんは、お父{とう}さんと お母{かあ}さんと、一緒{いっしょ}に 住{す}んでいますか。"], ["M", "いえ、両親{りょうしん}は 遠{とお}くに 住{す}んでいます。"],
      ["F", "そうですか。"], ["M", "いま、姉{あね}と 一緒{いっしょ}に 住{す}んでいます。", true], ["F", "兄弟{きょうだい}は 一人{ひとり}ですか。"],
      ["M", "あ、弟{おとうと}も いますよ。弟{おとうと}は 両親{りょうしん}と 一緒{いっしょ}です。"], ["N", "男{おとこ}の 学生{がくせい}は、だれと 住{す}んでいますか。"]],
    exp: "Mora com a irmã mais velha (姉). O irmão mais novo mora com os pais.",
    why: ["Os pais moram longe.", "Correta.", "Não foi mencionada.", "Mora com os pais."] });
  L("point", { src: "Oficial 2012 · 聴解 2-4", audio: "media/audio/L12-2-4.mp3",
    o: ["しょくどう", "きっさてん", "パンや", "きょうしつ"], a: 3,
    script: [["N", "学校{がっこう}で 男{おとこ}の 学生{がくせい}と 女{おんな}の 学生{がくせい}が 話{はな}しています。二人{ふたり}は どこで 昼{ひる}ご飯{はん}を 食{た}べますか。"],
      ["M", "もう １時{いちじ}ですね。何{なに}か 食{た}べませんか。"], ["F", "そうですね。でも 今日{きょう}は 土曜日{どようび}だから、学校{がっこう}の、食堂{しょくどう}や 喫茶店{きっさてん}は 休{やす}みですよ。"],
      ["M", "じゃ、パン屋{や}で パンを 買{か}って、教室{きょうしつ}で 食{た}べましょうか。", true], ["F", "そうですね。"],
      ["N", "二人{ふたり}は どこで 昼{ひる}ご飯{はん}を 食{た}べますか。"]],
    exp: "Refeitório e café fechados (sábado). Compram pão na padaria e comem na sala de aula.",
    why: ["Fechado no sábado.", "Fechado no sábado.", "Só compram lá.", "Correta."] });
  L("point", { src: "Oficial 2012 · 聴解 2-5", audio: "media/audio/L12-2-5.mp3",
    o: ["くろい ボールペン", "あかい ボールペン", "くろい えんぴつ", "あかい えんぴつ"], a: 0,
    script: [["N", "教室{きょうしつ}で、先生{せんせい}が 学生{がくせい}に 話{はな}しています。学生{がくせい}は 何{なに}で 名前{なまえ}を 書{か}きますか。"],
      ["F", "はい、じゃあ ちょっと 聞{き}いて ください。えー、来月{らいげつ}の バス旅行{りょこう}に 行{い}きたい 人{ひと}は、この 紙{かみ}に、ボールペンで 名前{なまえ}を 書{か}いて ください。鉛筆{えんぴつ}じゃなくて、ボールペンですよ。", true],
      ["F", "黒{くろ}で 書{か}いて ください。赤{あか}で 書{か}かないで くださいね。", true], ["N", "学生{がくせい}は 何{なに}で 名前{なまえ}を 書{か}きますか。"]],
    exp: "Caneta (não lápis), na cor preta (não vermelha).",
    why: ["Correta.", "Vermelho não (赤で書かないで).", "Lápis não.", "Lápis e vermelho, os dois proibidos."] });
  L("point", { src: "Oficial 2012 · 聴解 2-6", audio: "media/audio/L12-2-6.mp3",
    o: ["こうえん", "えき", "きっさてん", "レストラン"], a: 2,
    script: [["N", "女{おんな}の 学生{がくせい}と 男{おとこ}の 学生{がくせい}が 話{はな}しています。二人{ふたり}は 明日{あした} どこで 会{あ}いますか。"],
      ["F", "明日{あした}の 夜{よる}、一緒{いっしょ}に サッカーを 見{み}に 行{い}きませんか。"], ["M", "いいですね。どこで 会{あ}いましょうか。"],
      ["F", "５時{ごじ}に 駅{えき}で 会{あ}いませんか。"], ["M", "駅{えき}は 人{ひと}が 多{おお}いですよ。"],
      ["F", "そうですね。じゃあ、駅{えき}の 前{まえ}の 喫茶店{きっさてん}は どうですか。", true], ["M", "はい、そうしましょう。あ、サッカーを 見{み}てから 近{ちか}くの レストランで 晩{ばん}ご飯{はん}を 食{た}べませんか。"],
      ["F", "ええ。じゃ、明日{あした} ５時{ごじ}に 会{あ}いましょう。"], ["N", "二人{ふたり}は 明日{あした} どこで 会{あ}いますか。"]],
    exp: "A estação foi descartada (muita gente) → café em frente à estação. O restaurante é para depois do jogo.",
    why: ["Não mencionado.", "Descartada: 人が多い.", "Correta.", "É para depois, não o ponto de encontro."] });

  /* =============== 2012 · もんだい3 =============== */
  L("hatsuwa", { src: "Oficial 2012 · 聴解 3-1", audio: "media/audio/L12-3-1.mp3", img: "media/img/L12-3-1.png",
    o: ["ごちそうさまでした。", "いただきます。", "どういたしまして。"], a: 0,
    script: [["N", "ご飯{はん}を 食{た}べました。何{なん}と 言{い}いますか。"], ["F", "１．ごちそうさまでした。", true], ["F", "２．いただきます。"], ["F", "３．どういたしまして。"]],
    exp: "Depois de comer: ごちそうさまでした.",
    why: ["Correta.", "Dito ANTES de comer.", "Resposta a um obrigado."] });
  L("hatsuwa", { src: "Oficial 2012 · 聴解 3-2", audio: "media/audio/L12-3-2.mp3", img: "media/img/L12-3-2.png",
    o: ["どうも ありがとう。", "初{はじ}めまして。", "ここ、どうぞ。"], a: 2,
    script: [["N", "電車{でんしゃ}の 中{なか}です。女{おんな}の 人{ひと}が 来{き}ました。何{なん}と 言{い}いますか。"], ["M", "１．どうも ありがとう。"], ["M", "２．初{はじ}めまして。"], ["M", "３．ここ、どうぞ。", true]],
    exp: "Oferecer o lugar à senhora: ここ、どうぞ.",
    why: ["Agradecer — ninguém fez nada por ele.", "Apresentação a alguém novo.", "Correta."] });
  L("hatsuwa", { src: "Oficial 2012 · 聴解 3-3", audio: "media/audio/L12-3-3.mp3", img: "media/img/L12-3-3.png",
    o: ["いってきます。", "じゃ、また。", "ただいま。"], a: 1,
    script: [["N", "家{いえ}へ 帰{かえ}ります。友達{ともだち}に 何{なん}と 言{い}いますか。"], ["M", "１．いってきます。"], ["M", "２．じゃ、また。", true], ["M", "３．ただいま。"]],
    exp: "Despedir-se de amigos: じゃ、また (até mais).",
    why: ["Dito ao sair de CASA.", "Correta.", "Dito ao CHEGAR em casa."] });
  L("hatsuwa", { src: "Oficial 2012 · 聴解 3-4", audio: "media/audio/L12-3-4.mp3", img: "media/img/L12-3-4.png",
    o: ["切手{きって}を 買{か}いませんか。", "切手{きって}を どうぞ。", "切手{きって}を 下{くだ}さい。"], a: 2,
    script: [["N", "郵便局{ゆうびんきょく}で 切手{きって}を 買{か}います。何{なん}と 言{い}いますか。"], ["M", "１．切手{きって}を 買{か}いませんか。"], ["M", "２．切手{きって}を どうぞ。"], ["M", "３．切手{きって}を 下{くだ}さい。", true]],
    exp: "Pedir para comprar: 〜を ください.",
    why: ["Convite à atendente para comprar selos.", "Oferecer selos — é a atendente que diria.", "Correta."] });
  L("hatsuwa", { src: "Oficial 2012 · 聴解 3-5", audio: "media/audio/L12-3-5.mp3", img: "media/img/L12-3-5.png",
    o: ["鉛筆{えんぴつ}、借{か}りましょうか。", "鉛筆{えんぴつ}、使{つか}いますか。", "鉛筆{えんぴつ}、貸{か}して ください。"], a: 1,
    script: [["N", "友達{ともだち}は 鉛筆{えんぴつ}が ありません。友達{ともだち}に 何{なん}と 言{い}いますか。"], ["F", "１．鉛筆{えんぴつ}、借{か}りましょうか。"], ["F", "２．鉛筆{えんぴつ}、使{つか}いますか。", true], ["F", "３．鉛筆{えんぴつ}、貸{か}して ください。"]],
    exp: "Oferecer o próprio lápis: 鉛筆、使いますか (quer usar?).",
    why: ["'Quer que eu pegue emprestado?' — ela já tem lápis.", "Correta.", "Pede emprestado — mas quem não tem é o amigo."] });

  /* =============== 2012 · もんだい4 =============== */
  L("sokuji", { src: "Oficial 2012 · 聴解 4-1", audio: "media/audio/L12-4-1.mp3",
    o: ["三日{みっか}です。", "3週間{さんしゅうかん}です。", "3時{さんじ}です。"], a: 0,
    script: [["F", "今日{きょう}は 何日{なんにち}ですか。"], ["M", "１．三日{みっか}です。", true], ["M", "２．3週間{さんしゅうかん}です。"], ["M", "３．3時{さんじ}です。"]],
    exp: "何日 = que dia (do mês) → 三日 (dia 3).",
    why: ["Correta.", "Duração.", "Horário."] });
  L("sokuji", { src: "Oficial 2012 · 聴解 4-2", audio: "media/audio/L12-4-2.mp3",
    o: ["あそこです。", "6時{ろくじ}までです。", "本{ほん}を 借{か}ります。"], a: 0,
    script: [["M", "すみません、図書館{としょかん}は どこですか。"], ["F", "１．あそこです。", true], ["F", "２．6時{ろくじ}までです。"], ["F", "３．本{ほん}を 借{か}ります。"]],
    exp: "どこ → lugar: あそこです.",
    why: ["Correta.", "Horário de funcionamento.", "O que se faz lá."] });
  L("sokuji", { src: "Oficial 2012 · 聴解 4-3", audio: "media/audio/L12-4-3.mp3",
    o: ["バスで 来{き}ます。", "9時半{くじはん}です。", "6人{ろくにん}です。"], a: 1,
    script: [["F", "明日{あした}、何時{なんじ}に 学校{がっこう}に 来{き}ますか。"], ["M", "１．バスで 来{き}ます。"], ["M", "２．9時半{くじはん}です。", true], ["M", "３．6人{ろくにん}です。"]],
    exp: "何時 → horário.",
    why: ["Responde 'como'.", "Correta.", "Responde 'quantas pessoas'."] });
  L("sokuji", { src: "Oficial 2012 · 聴解 4-4", audio: "media/audio/L12-4-4.mp3",
    o: ["どういたしまして。", "持{も}ちませんでした。", "ありがとうございます。"], a: 2,
    script: [["M", "田中{たなか}さん、その 荷物{にもつ}を 持{も}ちましょうか。"], ["F", "１．どういたしまして。"], ["F", "２．持{も}ちませんでした。"], ["F", "３．ありがとうございます。", true]],
    exp: "Alguém oferece ajuda (〜ましょうか) → agradecer.",
    why: ["Resposta a um agradecimento.", "Passado negativo, sem sentido.", "Correta."] });
  L("sokuji", { src: "Oficial 2012 · 聴解 4-5", audio: "media/audio/L12-4-5.mp3",
    o: ["日曜日{にちようび}です。", "お元気{げんき}ですか。", "そうしましょう。"], a: 2,
    script: [["M", "ちょっと 休{やす}みませんか。"], ["F", "１．日曜日{にちようび}です。"], ["F", "２．お元気{げんき}ですか。"], ["F", "３．そうしましょう。", true]],
    exp: "Convite 〜ませんか → aceitar: そうしましょう.",
    why: ["Fora de contexto.", "Cumprimento.", "Correta."] });
  L("sokuji", { src: "Oficial 2012 · 聴解 4-6", audio: "media/audio/L12-4-6.mp3",
    o: ["料理{りょうり}の 本{ほん}です。", "私{わたし}の 本{ほん}です。", "はい、そうです。"], a: 0,
    script: [["M", "それは、何{なん}の 本{ほん}ですか。"], ["F", "１．料理{りょうり}の 本{ほん}です。", true], ["F", "２．私{わたし}の 本{ほん}です。"], ["F", "３．はい、そうです。"]],
    exp: "何の本 = livro de quê (assunto) → 料理の本.",
    why: ["Correta.", "Responde 'de quem' (だれの).", "Não é pergunta de sim/não."] });
})(window.BANK_UNITS);
