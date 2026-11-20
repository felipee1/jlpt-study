# Simulado JLPT N5

Simulado completo do JLPT N5 que roda direto no navegador (HTML/CSS/JS puro, sem build).

- **3 seções cronometradas** como na prova real: Vocabulário (20 min), Gramática + Leitura (40 min), Listening (30 min).
- **2 provas completas**: vocabulário, gramática e leitura vêm das provas oficiais de exemplo (jlpt.jp, 2012 e 2018); o listening (24 questões por prova, nos 4 tipos oficiais) tem roteiros originais falados pela voz japonesa do navegador.
- **Correção comentada**: todas as alternativas, a correta, por que ela está certa e por que cada uma das outras está errada. No listening, a transcrição só aparece no final, com a fala da resposta destacada.
- **Dashboard** com evolução, pontos fracos por tipo de questão e histórico (localStorage), com exportar/importar JSON.

## Publicar no GitHub Pages
1. Crie um repositório e envie o conteúdo desta pasta (o `index.html` na raiz).
2. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → main / (root)**.
3. Acesse `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Áudio do listening
Usa a Web Speech API. Melhor no **Microsoft Edge** (vozes naturais Nanami/Keita) ou Chrome. No Windows dá para instalar vozes japonesas em Configurações → Hora e idioma → Fala.

## Adicionar novas provas
Crie `data/simulado-c.js` seguindo o formato dos arquivos existentes e inclua o `<script>` no `index.html`.
Sintaxe nos textos: `漢字{かんじ}` = furigana, `__texto__` = sublinhado, `___` / `★` = lacunas, `[22]` = lacuna numerada.
