# DESIGN.md — Simulado JLPT N5

## Mundo visual: folha de respostas (マークシート)
O app imita a folha de respostas óptica da prova: papel branco sobre mesa cinza, tinta rosa-magenta de impressão (`--print`) nas bolhas e réguas, grafite (`--graphite`) para o que *você* marcou. Nada de decoração além disso: as marcas de sincronismo (timing marks) na lateral do cartão de início e na faixa de navegação das questões são a única ornamentação.

## Tokens (css/style.css)
| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--desk` | #e8eaee | #111317 | fundo da página |
| `--sheet` / `--sheet-2` | #fff / tom acima | #1a1d22 / #20242a | cartões, campos |
| `--ink` / `--ink-2` / `--muted` | texto | texto | 3 níveis de texto |
| `--print` / `--print-strong` / `--print-soft` | #b8336a | #e27a9f | bolhas, rótulos, ação principal |
| `--rule` / `--rule-strong` | | | bordas de "papel impresso" |
| `--graphite` / `--on-graphite` | | | bolha preenchida, seleção |
| `--ok` `--bad` `--warn` (+ `-soft`) | | | só estado (certo/errado/branco), sempre com texto ou ◯/✕ |
| `--c1..c3` | #c2334d #2c7bb6 #a87a12 | #d9576e #3e8ed0 #b98a22 | séries do gráfico (paleta validada) |

Tema: `auto` segue o sistema; `data-theme="light|dark"` em `<html>` força. Furigana: classe `.no-furi` em `<html>` esconde `<rt>`. Ambos salvos em `n5sim.settings.v1` e aplicados antes da pintura por script inline no `<head>`.

## Tipografia
- Japonês: **N5 Mincho** (subset local de Noto Serif CJK JP, 400/600) — `--mincho`, como no caderno da prova. Opções 1.0625rem, line-height 1.8 para caber furigana.
- Interface: pilha de sistema `--sans`. Números sempre `tabular-nums`.

## Componentes-chave
- `.opt` + `.n`: alternativa com bolha oval numerada; selecionada = bolha preenchida em grafite (animação de preenchimento 220 ms, desligada em reduced-motion).
- `.exam-head`: barra fixa com cronômetro (`.timer`, pisca em ≤60 s), nome da seção, botão **Folha** e **Encerrar**; abaixo, progresso e `.qnav` (marcas de sincronismo; `.done` preenchida, `.cur` a questão visível).
- `.answer-sheet`: folha completa com 4 bolhas por questão; tocar numa linha leva à questão.
- Correção `.rq`: carimbo ◯/✕ no canto, `.ropt.correct` circulada em verde, `.ropt.mine` com bolha preenchida, transcrição com falas-chave marcadas "resposta".
- `.seg`: controle segmentado (rádios) para todas as configurações.
- Mobile (≤680 px): navegação inferior fixa, alvos ≥44 px, colunas secundárias da tabela ocultas (`.hide-sm`).

## Regras
- Sem emoji como ícone: sprite SVG em `index.html` (`icon(name)` em app.js).
- Cor nunca sozinha para certo/errado: sempre rótulo + símbolo.
- Ao adicionar arquivos, rode `python3 build-sw.py` para atualizar o cache offline.
