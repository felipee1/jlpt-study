/* Banco — questões ORIGINAIS no formato e no nível do JLPT N5 (marcadas como "Original").
   Servem para variar as provas sorteadas; as oficiais têm prioridade no sorteio. */
window.BANK_UNITS = window.BANK_UNITS || [];
(function (U) {
  const one = (type, q) => U.push({ type, origin: "original", questions: [q] });

  /* ---- 漢字読み ---- */
  one("kanji", { src: "Original · 漢字読み 1", q: "__毎朝__ コーヒーを のみます。", o: ["まいあさ", "まいにち", "めいあさ", "まいばん"], a: 0, tr: "Tomo café todas as manhãs.", exp: "毎朝 = まいあさ (todas as manhãs). 毎 = まい.", why: ["Correta.", "まいにち = 毎日 (todos os dias).", "毎 não se lê めい.", "まいばん = 毎晩 (todas as noites)."] });
  one("kanji", { src: "Original · 漢字読み 2", q: "えきの __北__に こうえんが あります。", o: ["みなみ", "きた", "ひがし", "にし"], a: 1, tr: "Ao norte da estação há um parque.", exp: "北 = きた (norte).", why: ["みなみ = 南 (sul).", "Correta.", "ひがし = 東 (leste).", "にし = 西 (oeste)."] });
  one("kanji", { src: "Original · 漢字読み 3", q: "__八百円__です。", o: ["はちひゃくえん", "はっぴゃくえん", "はちびゃくえん", "はっひゃくえん"], a: 1, tr: "São 800 ienes.", exp: "800 = はっぴゃく (som modificado). Outros: さんびゃく (300), ろっぴゃく (600).", why: ["Sem a mudança de som obrigatória.", "Correta.", "びゃく só em さんびゃく.", "Falta o ぴ (p)."] });
  one("kanji", { src: "Original · 漢字読み 4", q: "__父__は ぎんこうで はたらいて います。", o: ["はは", "あに", "ちち", "おっと"], a: 2, tr: "Meu pai trabalha num banco.", exp: "父 = ちち (meu pai). お父さん = pai de outra pessoa.", why: ["はは = 母 (mãe).", "あに = 兄 (irmão mais velho).", "Correta.", "おっと = 夫 (marido)."] });
  one("kanji", { src: "Original · 漢字読み 5", q: "__午後__ ともだちに あいます。", o: ["ごご", "ごぜん", "ここ", "ごこ"], a: 0, tr: "À tarde vou encontrar um amigo.", exp: "午後 = ごご (tarde, p.m.). 午前 = ごぜん (manhã, a.m.).", why: ["Correta.", "ごぜん = 午前 (manhã).", "Sem os dakuten.", "Falta o dakuten do segundo ご."] });
  one("kanji", { src: "Original · 漢字読み 6", q: "この 本は __白い__ かばんに いれて ください。", o: ["くろい", "あかい", "あおい", "しろい"], a: 3, tr: "Coloque este livro na bolsa branca.", exp: "白い = しろい (branco).", why: ["くろい = 黒い (preto).", "あかい = 赤い (vermelho).", "あおい = 青い (azul).", "Correta."] });
  one("kanji", { src: "Original · 漢字読み 7", q: "__来年__ にほんへ いきます。", o: ["らいねん", "こんねん", "らいとし", "きょねん"], a: 0, tr: "Ano que vem vou ao Japão.", exp: "来年 = らいねん. Também: 今年 ことし, 去年 きょねん.", why: ["Correta.", "'Este ano' é 今年 ことし.", "年 aqui não é とし.", "きょねん = 去年 (ano passado)."] });
  one("kanji", { src: "Original · 漢字読み 8", q: "えきの __前__で まって います。", o: ["うしろ", "まえ", "となり", "よこ"], a: 1, tr: "Estou esperando em frente à estação.", exp: "前 = まえ (frente/antes).", why: ["うしろ = 後ろ (atrás).", "Correta.", "となり = 隣 (vizinho).", "よこ = 横 (ao lado)."] });

  /* ---- 表記 ---- */
  one("hyouki", { src: "Original · 表記 1", q: "__みみ__が いたいです。", o: ["目", "耳", "口", "手"], a: 1, tr: "Estou com dor de ouvido.", exp: "耳 = みみ (orelha/ouvido).", why: ["目 = め (olho).", "Correta.", "口 = くち (boca).", "手 = て (mão)."] });
  one("hyouki", { src: "Original · 表記 2", q: "__てれび__を みます。", o: ["テレビ", "テルビ", "チレビ", "テレピ"], a: 0, tr: "Vejo televisão.", exp: "テレビ. Cuidado: ビ (bi) × ピ (pi); レ (re) × ル (ru).", why: ["Correta.", "ル no lugar de レ.", "チ no lugar de テ.", "ピ (pi) no lugar de ビ (bi)."] });
  one("hyouki", { src: "Original · 表記 3", q: "まいにち __やすみ__ます。", o: ["休み", "体み", "林み", "伴み"], a: 0, tr: "Descanso todos os dias.", exp: "休む = やすむ: pessoa (亻) encostada na árvore (木).", why: ["Correta.", "体 = からだ (corpo) — tem 本, não 木.", "林 = はやし (bosque).", "伴 = acompanhar."] });
  one("hyouki", { src: "Original · 表記 4", q: "あしたは __どようび__です。", o: ["上よう日", "土よう日", "士よう日", "工よう日"], a: 1, tr: "Amanhã é sábado.", exp: "土 = ど (terra): o traço de baixo é o mais longo. 士 tem o de cima mais longo.", why: ["上 = うえ (em cima).", "Correta.", "士 = し (guerreiro) — traço superior mais longo.", "工 = こう (obra)."] });
  one("hyouki", { src: "Original · 表記 5", q: "ここで __くつ__を ぬいで ください。", o: ["靴", "鞄", "傘", "服"], a: 0, tr: "Tire os sapatos aqui, por favor.", exp: "靴 = くつ (sapato). (Na prova real costuma vir em hiragana; aqui é treino de reconhecimento.)", why: ["Correta.", "鞄 = かばん (bolsa).", "傘 = かさ (guarda-chuva).", "服 = ふく (roupa)."] });
  one("hyouki", { src: "Original · 表記 6", q: "__はなし__を きいて ください。", o: ["語", "話", "読", "計"], a: 1, tr: "Ouça a conversa, por favor.", exp: "話 = はなし (conversa, história). 話す = はなす.", why: ["語 = ご (língua).", "Correta.", "読 = よむ (ler).", "計 = けい (medir)."] });

  /* ---- 文脈規定 ---- */
  one("bunmyaku", { src: "Original · 文脈 1", q: "さむいですから、（　　）を きて ください。", o: ["コート", "ぼうし", "くつ", "めがね"], a: 0, tr: "Está frio, vista o casaco.", exp: "きる (着る) = vestir peças do tronco → コート.", why: ["Correta.", "ぼうしは かぶる (chapéu se 'põe na cabeça').", "くつは はく.", "めがねは かける."] });
  one("bunmyaku", { src: "Original · 文脈 2", q: "えんぴつが ２（　　） あります。", o: ["まい", "ほん", "さつ", "ひき"], a: 1, tr: "Há dois lápis.", exp: "Objetos longos e finos: 本 (ほん/ぽん/ぼん) → にほん.", why: ["まい = coisas finas e planas (papel).", "Correta.", "さつ = livros.", "ひき = animais pequenos."] });
  one("bunmyaku", { src: "Original · 文脈 3", q: "テストの まえに、ことばを なんかいも （　　）。", o: ["わすれました", "れんしゅうしました", "こまりました", "ならびました"], a: 1, tr: "Antes da prova, pratiquei as palavras várias vezes.", exp: "なんかいも (várias vezes) + preparar para a prova → れんしゅうする.", why: ["わすれる = esquecer.", "Correta.", "こまる = ficar em apuros.", "ならぶ = enfileirar-se."] });
  one("bunmyaku", { src: "Original · 文脈 4", q: "この みちは くるまが おおいですから、（　　）です。", o: ["しずか", "あぶない", "ひま", "きれい"], a: 1, tr: "Esta rua tem muitos carros, é perigosa.", exp: "Muitos carros → perigo (あぶない).", why: ["しずか = silenciosa (o oposto).", "Correta.", "ひま = desocupado.", "きれい = bonita/limpa."] });
  one("bunmyaku", { src: "Original · 文脈 5", q: "かぜを ひきましたから、（　　）へ いきます。", o: ["びょういん", "ぎんこう", "ゆうびんきょく", "としょかん"], a: 0, tr: "Peguei um resfriado, vou ao hospital.", exp: "かぜ (resfriado) → びょういん (hospital/clínica).", why: ["Correta.", "Banco.", "Correio.", "Biblioteca."] });
  one("bunmyaku", { src: "Original · 文脈 6", q: "でんきを （　　）から、へやが あかるく なりました。", o: ["けした", "つけた", "あけた", "しめた"], a: 1, tr: "Acendi a luz, então o quarto ficou claro.", exp: "でんきを つける = acender a luz.", why: ["けす = apagar (ficaria escuro).", "Correta.", "あける = abrir (porta/janela).", "しめる = fechar."] });

  /* ---- 言い換え ---- */
  one("iikae", { src: "Original · 言い換え 1", q: "__きょうしつは しずかです。__", o: ["きょうしつは うるさく ないです。", "きょうしつは ひろく ないです。", "きょうしつは きれいじゃ ないです。", "きょうしつは あかるく ないです。"], a: 0, tr: "A sala está silenciosa.", exp: "しずか = うるさくない.", why: ["Correta.", "Fala de tamanho.", "Fala de limpeza.", "Fala de luz."] });
  one("iikae", { src: "Original · 言い換え 2", q: "__あにの こどもは ふたりです。__", o: ["あにには むすこと むすめが います。", "わたしには おにいさんが ふたり います。", "あには ふたり います。", "あには こどもが ほしいです。"], a: 0, tr: "Meu irmão mais velho tem dois filhos.", exp: "むすこ (filho) + むすめ (filha) = dois filhos.", why: ["Correta.", "Fala de dois irmãos, não de filhos.", "Também diz que há dois irmãos.", "Diz que ele quer ter filhos."] });
  one("iikae", { src: "Original · 言い換え 3", q: "__ここは ちゅうしゃじょうです。__", o: ["ここに くるまを とめます。", "ここで ごはんを たべます。", "ここで きってを かいます。", "ここで ほんを かります。"], a: 0, tr: "Aqui é um estacionamento.", exp: "ちゅうしゃじょう = estacionamento → lugar onde se para o carro.", why: ["Correta.", "Restaurante.", "Correio.", "Biblioteca."] });
  one("iikae", { src: "Original · 言い換え 4", q: "__けさ ７じに おきました。__", o: ["きのうの あさ ７じに おきました。", "きょうの あさ ７じに おきました。", "きのうの よる ７じに おきました。", "きょうの よる ７じに おきました。"], a: 1, tr: "Acordei às 7h hoje de manhã.", exp: "けさ = きょうの あさ.", why: ["Ontem de manhã.", "Correta.", "Ontem à noite.", "Hoje à noite."] });
  one("iikae", { src: "Original · 言い換え 5", q: "__この ケーキは まずいです。__", o: ["この ケーキは おいしいです。", "この ケーキは おいしく ないです。", "この ケーキは たかく ないです。", "この ケーキは あまいです。"], a: 1, tr: "Este bolo está ruim.", exp: "まずい = おいしくない.", why: ["O oposto.", "Correta.", "Fala de preço.", "Fala de sabor doce, não de ser ruim."] });

  /* ---- 文法形式 ---- */
  one("bunpou1", { src: "Original · 文法 1", q: "つくえの 上{うえ}に ほん（　　） ノートが あります。", o: ["と", "を", "で", "へ"], a: 0, tr: "Em cima da mesa há um livro e um caderno.", exp: "A と B = A e B.", why: ["Correta.", "あります não usa を.", "で = meio/local de ação.", "へ = direção."] });
  one("bunpou1", { src: "Original · 文法 2", q: "わたしは まいにち 電車{でんしゃ}（　　） 会社{かいしゃ}へ 行{い}きます。", o: ["に", "で", "を", "が"], a: 1, tr: "Todos os dias vou à empresa de trem.", exp: "Meio de transporte: で.", why: ["に = destino.", "Correta.", "を = objeto/percurso.", "が = sujeito."] });
  one("bunpou1", { src: "Original · 文法 3", q: "A「この かさは だれの ですか。」\nB「（　　）の です。」", o: ["わたし", "わたしに", "わたしが", "わたしを"], a: 0, tr: "— De quem é este guarda-chuva? — É meu.", exp: "わたしの = meu (o meu).", why: ["Correta.", "に não forma posse.", "が não forma posse.", "を não forma posse."] });
  one("bunpou1", { src: "Original · 文法 4", q: "きのうは あめでしたから、どこ（　　） 行{い}きませんでした。", o: ["が", "も", "へも", "でも"], a: 2, tr: "Ontem choveu, então não fui a lugar nenhum.", exp: "どこへも + negativa = a lugar nenhum.", why: ["どこが é pergunta (onde?).", "どこも + negativa = em nenhum lugar (estado), mas com 行く usa-se へも.", "Correta.", "どこでも = em qualquer lugar."] });
  one("bunpou1", { src: "Original · 文法 5", q: "この へやは ひろくて、（　　）です。", o: ["あかるい", "あかるくて", "あかるかった", "あかるく"], a: 0, tr: "Este quarto é espaçoso e claro.", exp: "ひろくて (forma て) liga ao último adjetivo, que fecha a frase com です: あかるいです.", why: ["Correta.", "Forma て não fecha a frase antes de です.", "Mudaria para passado sem motivo.", "あかるくです não existe."] });
  one("bunpou1", { src: "Original · 文法 6", q: "まだ ごはんを 食{た}べて いません。いっしょに 食{た}べ（　　）。", o: ["ましょう", "ました", "ません", "ませんでした"], a: 0, tr: "Ainda não comi. Vamos comer juntos.", exp: "Convite/proposta: 〜ましょう.", why: ["Correta.", "Contradiz 'ainda não comi'.", "Negativa, não convida.", "Passado negativo."] });
  one("bunpou1", { src: "Original · 文法 7", q: "ねる まえに、はを （　　） ください。", o: ["みがく", "みがいて", "みがき", "みがいた"], a: 1, tr: "Antes de dormir, escove os dentes.", exp: "Pedido: forma て + ください.", why: ["Forma de dicionário não liga com ください.", "Correta.", "Forma ます sem ます + ください não existe.", "Forma た não liga."] });
  one("bunpou1", { src: "Original · 文法 8", q: "わたしは にく（　　） さかなの ほうが 好{す}きです。", o: ["より", "から", "まで", "ほど"], a: 0, tr: "Gosto mais de peixe do que de carne.", exp: "A より B の ほうが = B mais que A.", why: ["Correta.", "から = de/desde.", "まで = até.", "ほど + negativa = não tanto quanto (N4)."] });
  one("bunpou1", { src: "Original · 文法 9", q: "A「なつやすみに 何{なに}を しましたか。」\nB「うみで およいだり、山{やま}に のぼったり（　　）。」", o: ["です", "しました", "ます", "でした"], a: 1, tr: "Nadei no mar, subi montanha, entre outras coisas.", exp: "〜たり〜たり する: lista de ações. No passado: しました.", why: ["です não fecha 〜たり.", "Correta.", "ます sozinho não é verbo.", "でした não fecha 〜たり."] });
  one("bunpou1", { src: "Original · 文法 10", q: "わたしの へやは あまり （　　）。", o: ["ひろいです", "ひろく ないです", "ひろかったです", "ひろくて"], a: 1, tr: "Meu quarto não é muito espaçoso.", exp: "あまり + negativa = não muito.", why: ["あまり exige negativa.", "Correta.", "Afirmativo; não combina com あまり.", "Frase não termina."] });

  /* ---- 文の組み立て ---- */
  one("bunpou2", { src: "Original · ★ 1", q: "これは ___ ___ ★ ___ です。", o: ["先生{せんせい}", "かいた", "が", "え"], a: 1, tr: "Este é um quadro que o professor pintou.", exp: "これは 先生 が かいた え です. A oração 先生がかいた modifica え. ★ = 3ª = かいた.", why: ["先生 é a 1ª.", "Correta.", "が é a 2ª.", "え é a 4ª (antes de です)."] });
  one("bunpou2", { src: "Original · ★ 2", q: "あした ___ ___ ★ ___ 行{い}きます。", o: ["と", "ともだち", "デパート", "へ"], a: 2, tr: "Amanhã vou à loja de departamentos com um amigo.", exp: "あした ともだち と デパート へ 行きます. ★ = 3ª = デパート.", why: ["と é a 2ª.", "ともだち é a 1ª.", "Correta.", "へ é a 4ª."] });
  one("bunpou2", { src: "Original · ★ 3", q: "A「どこで ___ ___ ★ ___ か。」\nB「えきの 前{まえ}の 店{みせ}です。」", o: ["を", "かばん", "その", "買{か}いました"], a: 0, tr: "Onde você comprou essa bolsa?", exp: "どこで その かばん を 買いました か. ★ = 3ª = を.", why: ["Correta.", "かばん é a 2ª.", "その é a 1ª.", "買いました é a 4ª."] });
  one("bunpou2", { src: "Original · ★ 4", q: "わたしは ___ ___ ★ ___ を 読{よ}みます。", o: ["ねる", "まえに", "いつも", "本{ほん}"], a: 1, tr: "Eu sempre leio um livro antes de dormir.", exp: "わたしは いつも ねる まえに 本 を 読みます. ★ = 3ª = まえに.", why: ["ねる é a 2ª.", "Correta.", "いつも é a 1ª.", "本 é a 4ª (antes de を)."] });
  one("bunpou2", { src: "Original · ★ 5", q: "この ___ ___ ★ ___ が いいです。", o: ["は", "安{やす}くて", "店{みせ}", "あじ"], a: 1, tr: "Esta loja é barata e o sabor é bom.", exp: "この 店 は 安くて あじ が いいです. ★ = 3ª = 安くて.", why: ["は é a 2ª.", "Correta.", "店 é a 1ª.", "あじ é a 4ª (antes de が)."] });

  /* ---- 文章の文法 ---- */
  U.push({ type: "bunshou", origin: "original",
    passage: "留学生{りゅうがくせい}の マリアさんと トムさんが 「わたしの 週末{しゅうまつ}」の さくぶんを 書{か}きました。\n\n<b>(1) マリアさんの さくぶん</b>\n　わたしは 土曜日{どようび}に 友{とも}だちと 山{やま}へ 行{い}きました。山{やま}の 上{うえ}は とても さむかったです。[1]、けしきは とても きれいでした。山{やま}の 上{うえ}で おべんとうを [2]。\n\n<b>(2) トムさんの さくぶん</b>\n　わたしは 日曜日{にちようび}、どこ [3] 行{い}きませんでした。うちで 日本語{にほんご}の 本{ほん}を 読{よ}みました。むずかしい ことばが たくさん ありましたから、じしょを [4]。来週{らいしゅう}は 友{とも}だちと えいがを 見{み}に 行{い}きたいです。",
    questions: [
      { src: "Original · 文章 A1", q: "[1]", o: ["だから", "でも", "それから", "では"], a: 1, tr: "Estava muito frio. Mas a paisagem era linda.", exp: "Contraste (frio, porém bonito) → でも.", why: ["だから = por isso.", "Correta.", "それから = e depois.", "では = então."] },
      { src: "Original · 文章 A2", q: "[2]", o: ["食{た}べます", "食{た}べました", "食{た}べたいです", "食{た}べて ください"], a: 1, tr: "Comemos a marmita no topo da montanha.", exp: "Relato do sábado passado → passado.", why: ["Presente.", "Correta.", "Desejo.", "Pedido."] },
      { src: "Original · 文章 A3", q: "[3]", o: ["が", "へも", "でも", "に"], a: 1, tr: "No domingo não fui a lugar nenhum.", exp: "どこへも + negativa.", why: ["どこが = onde? (pergunta).", "Correta.", "どこでも = em qualquer lugar.", "どこに + negativa não tem esse sentido."] },
      { src: "Original · 文章 A4", q: "[4]", o: ["使{つか}いました", "使{つか}いません", "使{つか}いたいです", "使{つか}いましょう"], a: 0, tr: "Havia muitas palavras difíceis, então usei o dicionário.", exp: "Consequência no passado → 使いました.", why: ["Correta.", "Negativa contradiz a lógica.", "Desejo.", "Convite."] }
    ] });
  U.push({ type: "bunshou", origin: "original",
    passage: "日本語{にほんご}学校{がっこう}の 学生{がくせい}が 「わたしの すきな 店{みせ}」の ぶんしょうを 書{か}きました。\n\n<b>キムさんの ぶんしょう</b>\n　わたしの うちの 近{ちか}くに 小{ちい}さい パン屋{や}が あります。この パン屋{や}の パンは とても おいしいです。毎朝{まいあさ}、学校{がっこう}へ 行{い}く [1]、ここで パンを 買{か}います。\n　店{みせ}の 人{ひと}は とても しんせつです。わたしが 日本語{にほんご}で 話{はな}すと、ゆっくり [2]。ですから、わたしは この 店{みせ}が 大好{だいす}きです。\n　みなさんも ぜひ [3]。店{みせ}は 朝{あさ} ７時{しちじ}から [4]。",
    questions: [
      { src: "Original · 文章 B1", q: "[1]", o: ["まえに", "あとで", "ながら", "から"], a: 0, tr: "Toda manhã, antes de ir à escola, compro pão aqui.", exp: "Verbo dicionário + まえに = antes de.", why: ["Correta.", "あとで pede forma た (行ったあとで).", "ながら pede forma ます (行きながら).", "から = porque."] },
      { src: "Original · 文章 B2", q: "[2]", o: ["話{はな}して くれます", "話{はな}して ください", "話{はな}しましょう", "話{はな}したいです"], a: 0, tr: "Quando falo em japonês, eles falam devagar comigo.", exp: "Gentileza do funcionário para ela → 〜て くれます. (Mesmo sem estudar くれる a fundo, as outras opções não fazem sentido.)", why: ["Correta.", "Pedido.", "Convite.", "Desejo dela."] },
      { src: "Original · 文章 B3", q: "[3]", o: ["行{い}って ください", "行{い}きました", "行{い}って いません", "行{い}きませんでした"], a: 0, tr: "Vão lá vocês também!", exp: "Recomendação à turma → 行って ください.", why: ["Correta.", "Passado.", "Não foi (estado).", "Passado negativo."] },
      { src: "Original · 文章 B4", q: "[4]", o: ["です", "でした", "ます", "ありません"], a: 0, tr: "A loja abre às 7h.", exp: "Horário de funcionamento atual: 7時からです.", why: ["Correta.", "Passado.", "ます sozinho não é verbo.", "Diria que não abre."] }
    ] });

  /* ---- 読解 短文 ---- */
  U.push({ type: "dokkai1", origin: "original", questions: [
    { src: "Original · 短文 1", passage: "<b>(1)</b>\nわたしは 毎日{まいにち} バスで 学校{がっこう}へ 行{い}きます。でも、きのうは 雨{あめ}でしたから、父{ちち}が 車{くるま}で 学校{がっこう}まで つれて いきました。きょうは いい 天気{てんき}ですから、自転車{じてんしゃ}で 行{い}きました。",
      q: "「わたし」は きのう 何{なに}で 学校{がっこう}へ 行{い}きましたか。", o: ["バス", "車{くるま}", "自転車{じてんしゃ}", "歩{ある}いて"], a: 1, tr: "Como 'eu' fui à escola ontem?", exp: "Ontem choveu e o pai a levou de carro. Ônibus é o normal; bicicleta foi hoje.", why: ["É o normal (毎日), não ontem.", "Correta.", "Foi hoje.", "Não foi mencionado."] }] });
  U.push({ type: "dokkai1", origin: "original", questions: [
    { src: "Original · 短文 2", passage: "<b>(2)</b>\n（会社{かいしゃ}で）\nリンさんの 机{つくえ}の 上{うえ}に、この メモが あります。\n<div class='notice'>リンさん\n\n　３時{さんじ}から 会議{かいぎ}が あります。会議{かいぎ}の 前{まえ}に、この 紙{かみ}を 10まい コピーして ください。コピーは 会議室{かいぎしつ}の テーブルの 上{うえ}に おいて ください。\n　わたしは ２時{にじ}半{はん}に 会社{かいしゃ}に もどります。\n<span style='float:right'>田中{たなか}</span></div>",
      q: "リンさんは まず 何{なに}を しますか。", o: ["会議{かいぎ}に 出{で}ます。", "紙{かみ}を コピーします。", "田中{たなか}さんを 待{ま}ちます。", "会議室{かいぎしつ}で テーブルを ならべます。"], a: 1, tr: "O que Lin faz primeiro?", exp: "Antes da reunião: copiar o papel 10 vezes e deixar na sala.", why: ["A reunião é às 3h — depois.", "Correta.", "O bilhete não pede isso.", "Só deve deixar as cópias na mesa."] }] });
  U.push({ type: "dokkai1", origin: "original", questions: [
    { src: "Original · 短文 3", passage: "<b>(3)</b>\n（学校{がっこう}で）\n学生{がくせい}が この お知{し}らせを 見{み}ました。\n<div class='notice'>りゅうがくせいの みなさんへ\n\n　あしたは 学校{がっこう}の そうじの 日{ひ}です。じゅぎょうは ありません。\n　９時{くじ}に 学校{がっこう}に 来{き}て ください。きょうしつの そうじを します。\n　そうじの あとで、みんなで おべんとうを 食{た}べます。おべんとうは 学校{がっこう}が 買{か}います。</div>",
      q: "学生{がくせい}は あした 何{なに}を 持{も}って いきますか。", o: ["教科書{きょうかしょ}と ノート", "おべんとう", "おべんとうと 教科書{きょうかしょ}", "何{なに}も 持{も}って いきません"], a: 3, tr: "O que os alunos levam amanhã?", exp: "Não há aula (sem material) e a escola compra a marmita → não precisam levar nada.", why: ["Não há aula.", "A escola compra.", "Nem um nem outro.", "Correta."] }] });

  /* ---- 読解 中文 ---- */
  U.push({ type: "dokkai2", origin: "original",
    passage: "これは ナンさんが 書{か}いた さくぶんです。\n<div class='notice'><center><b>はじめての 日本{にほん}の なつ</b></center><div style='text-align:right'>ナン・ティ</div>\n　わたしは 去年{きょねん}の ４月{しがつ}に 日本{にほん}へ 来{き}ました。日本{にほん}の なつは とても あついです。わたしの 国{くに}も あついですが、日本{にほん}の なつは 雨{あめ}が 多{おお}くて、たいへんでした。\n　８月{はちがつ}に 友{とも}だちと 海{うみ}へ 行{い}きました。海{うみ}は 人{ひと}が たくさん いました。わたしは およぐことが できませんから、<u>すなの 上{うえ}で 本{ほん}を 読{よ}みました</u><sup>①</sup>。友{とも}だちは ずっと およいで いました。\n　夜{よる}、みんなで 花火{はなび}を 見{み}ました。花火{はなび}は とても きれいでした。<u>来年{らいねん}の なつも</u><sup>②</sup> 見{み}に 行{い}きたいです。</div>",
    questions: [
      { src: "Original · 中文 1", q: "どうして ナンさんは ①すなの 上{うえ}で 本{ほん}を 読{よ}みましたか。", o: ["海{うみ}が つめたかったから", "人{ひと}が 多{おお}かったから", "およぐことが できないから", "本{ほん}が 好{す}きだから"], a: 2, tr: "Por que Nan leu um livro na areia?", exp: "およぐことができませんから = porque não sabe nadar.", why: ["Não foi mencionado.", "Havia muita gente, mas não foi o motivo.", "Correta.", "Não foi o motivo dado."] },
      { src: "Original · 中文 2", q: "ナンさんは ②来年{らいねん}の なつ、何{なに}を したいですか。", o: ["海{うみ}で およぎたいです。", "国{くに}へ 帰{かえ}りたいです。", "花火{はなび}を 見{み}たいです。", "友{とも}だちと 本{ほん}を 読{よ}みたいです。"], a: 2, tr: "O que Nan quer fazer no próximo verão?", exp: "O 見に行きたい se refere aos fogos (花火) da frase anterior.", why: ["Ela não sabe nadar; não diz isso.", "Não mencionado.", "Correta.", "Não mencionado."] }
    ] });
  U.push({ type: "dokkai2", origin: "original",
    passage: "<div class='notice'>　わたしの 町{まち}には 大{おお}きい 図書館{としょかん}が あります。わたしは 毎週{まいしゅう} 土曜日{どようび}に 行{い}きます。\n　図書館{としょかん}は 朝{あさ} ９時{くじ}から 夜{よる} ８時{はちじ}までです。月曜日{げつようび}は 休{やす}みです。本{ほん}は 一回{いっかい}に ５さつ かりることが できます。２週間{にしゅうかん}で かえします。\n　先週{せんしゅう}、わたしは 日本{にほん}の りょうりの 本{ほん}を ３さつと、ざっしを １さつ かりました。りょうりの 本{ほん}を 見{み}て、カレーを 作{つく}りました。とても おいしかったです。</div>",
    questions: [
      { src: "Original · 中文 3", q: "図書館{としょかん}が 休{やす}みの 日{ひ}は いつですか。", o: ["土曜日{どようび}", "日曜日{にちようび}", "月曜日{げつようび}", "毎日{まいにち}あいています"], a: 2, tr: "Em que dia a biblioteca fecha?", exp: "月曜日は休みです.", why: ["É o dia em que a autora vai.", "Não mencionado.", "Correta.", "Fecha às segundas."] },
      { src: "Original · 中文 4", q: "「わたし」は 先週{せんしゅう} 何{なん}さつ かりましたか。", o: ["１さつ", "３さつ", "４さつ", "５さつ"], a: 2, tr: "Quantos itens 'eu' peguei semana passada?", exp: "3 livros de culinária + 1 revista = 4. 5 é o limite.", why: ["Só a revista.", "Só os livros.", "Correta.", "É o máximo permitido."] }
    ] });

  /* ---- 情報検索 ---- */
  U.push({ type: "jouhou", origin: "original",
    passage: "<div class='notice'><center><b>さくら スポーツクラブ　クラスの あんない</b></center><table class='route'><tr><th>クラス</th><th>曜日{ようび}</th><th>時間{じかん}</th><th>お金{かね}（1か月{げつ}）</th></tr><tr><td>①　すいえい</td><td>月{げつ}・水{すい}</td><td>18:00〜19:00</td><td>4,000円{えん}</td></tr><tr><td>②　テニス</td><td>火{か}・木{もく}</td><td>19:00〜20:30</td><td>5,000円{えん}</td></tr><tr><td>③　ヨガ</td><td>土{ど}</td><td>10:00〜11:00</td><td>3,000円{えん}</td></tr><tr><td>④　ダンス</td><td>金{きん}</td><td>19:00〜20:00</td><td>4,500円{えん}</td></tr></table></div>",
    questions: [
      { src: "Original · 情報 1", q: "ジョンさんは 月曜日{げつようび}から 金曜日{きんようび}まで 夕方{ゆうがた} ６時{ろくじ}まで しごとです。土曜日{どようび}は いそがしいです。お金{かね}は 4,500円{えん}までです。ジョンさんは どの クラスに 入{はい}りますか。", o: ["①", "②", "③", "④"], a: 3, noShuffle: true, tr: "John trabalha até as 18h de seg a sex, está ocupado no sábado e pode pagar até 4.500 ienes. Qual turma?", exp: "① começa às 18h, quando ele ainda está saindo do trabalho. ② custa 5.000 (passa do limite). ③ é no sábado. ④ sexta 19h, 4.500 ienes → cabe em tudo.", why: ["Começa às 18:00, hora em que ele termina o trabalho.", "5.000 ienes: passa do limite de 4.500.", "É no sábado, dia em que ele está ocupado.", "Correta."] }
    ] });
  U.push({ type: "jouhou", origin: "original",
    passage: "<div class='notice'><center><b>みどりレストラン　ランチ メニュー</b>（11:00〜14:00）</center><table class='route'><tr><td>Ａ　カレーライス</td><td>800円{えん}</td></tr><tr><td>Ｂ　カレーライス ＋ サラダ</td><td>1,000円{えん}</td></tr><tr><td>Ｃ　さかなの ていしょく（ごはん・みそしる つき）</td><td>950円{えん}</td></tr><tr><td>Ｄ　にくの ていしょく（ごはん・みそしる つき）</td><td>1,100円{えん}</td></tr></table><small>＊ コーヒーは ＋200円{えん}です。</small></div>",
    questions: [
      { src: "Original · 情報 2", q: "アンさんは にくを 食{た}べません。ごはんと みそしるが ほしいです。それから コーヒーも 飲{の}みたいです。ぜんぶで いくらですか。", o: ["1,000円{えん}", "1,150円{えん}", "1,200円{えん}", "1,300円{えん}"], a: 1, noShuffle: true, tr: "An não come carne, quer arroz e missoshiru, e um café. Quanto dá?", exp: "Sem carne e com arroz + missoshiru → C (peixe) 950 + café 200 = 1.150.", why: ["Só o B, sem café.", "Correta.", "B + café — mas o B não tem missoshiru.", "D + café — mas D é de carne."] }
    ] });
})(window.BANK_UNITS);
