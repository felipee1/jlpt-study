# Simulado JLPT N5 — banco de questões + provas aleatórias

Site estático (HTML/CSS/JS puro) para GitHub Pages.

## O que tem
- **Prova aleatória**: cada clique gera uma prova nova na estrutura oficial do N5 (2020+):
  vocabulário 7·5·6·3 (20 min) · gramática 9·4 + texto + leituras (40 min) · listening 7·6·5·6 (30 min).
  O sorteio prioriza **questões oficiais** e as que você **ainda não viu** (contagem salva no navegador).
  Opção "só oficiais".
- **Banco**: 306 questões — 201 oficiais (provas de exemplo do jlpt.jp: 2009, 2012, 2018) e 105 originais no mesmo formato.
  - Listening oficial: 48 questões com **o MP3 oficial cortado por questão**, figuras do caderno oficial e transcrição oficial.
  - Listening original: 48 questões faladas pela voz japonesa do navegador.
- **Provas fixas**: Simulado A (exemplo 2018) e B (exemplo 2012).
- **Correção**: todas as alternativas, a correta, por que cada uma está certa/errada; no listening, transcrição com a fala da resposta destacada e botão para ouvir de novo.
- **Dashboard**: evolução, acertos por tipo de questão, % do banco já visto, histórico; exportar/importar JSON.

- **Vocabulário & Kanji** (`#/vocab`): 274 palavras do N5. Mostra a palavra; você escreve o significado em português e a leitura em hiragana; ao verificar aparecem o resultado, a explicação e uma frase de exemplo. Prioriza palavras novas e as que você errou. Opção de converter romaji → hiragana.
- **PWA**: instalável no celular (Android: menu ⋮ → Instalar app; iPhone: Compartilhar → Adicionar à Tela de Início) e funciona offline, inclusive o listening.

## Estrutura
```
index.html  css/  js/app.js
data/simulado-a.js, simulado-b.js        provas fixas (também entram no banco)
data/bank-oficial-extra.js               demais questões oficiais (2009/2012/2018)
data/bank-listening-oficial.js           listening oficial (áudio + figura + transcrição)
data/bank-originais.js                   questões originais
data/vocab-1.js, vocab-2.js, vocab-3.js   vocabulário (palavra | leitura | significados | explicação | exemplo | tradução)
manifest.webmanifest, sw.js              PWA (sw.js é gerado por build-sw.py)
media/audio/  media/img/                 MP3 e figuras recortados das provas oficiais
```

## Publicar no GitHub Pages
1. Envie o conteúdo desta pasta para um repositório (index.html na raiz).
2. Settings → Pages → Deploy from a branch → `main` / `(root)`.
3. Acesse `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

> Áudios, figuras e questões oficiais são material do Japan Foundation / JEES (jlpt.jp), usados aqui para estudo.
> O GitHub Pages gratuito exige repositório público.

## Adicionar questões
Crie um arquivo em `data/` que faça `window.BANK_UNITS.push({ type, origin, questions:[...] })` (veja os existentes)
e inclua o `<script>` no `index.html`. Tipos: kanji, hyouki, bunmyaku, iikae, bunpou1, bunpou2, bunshou,
dokkai1, dokkai2, jouhou, kadai, point, hatsuwa, sokuji.

## Depois de editar arquivos
Rode `python build-sw.py` para atualizar a lista de cache do PWA (senão o app instalado pode continuar com a versão antiga).
