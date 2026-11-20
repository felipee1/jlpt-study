# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primarily the owner (a Brazilian Portuguese speaker) studying for the JLPT N5, using the site as an installed PWA on a phone. Others may use the public GitHub Pages copy, but they are not the design focus.

## Product Purpose
A personal JLPT N5 trainer: timed full mock exams that mirror the official structure (vocabulary 20 min, grammar + reading 40 min, listening 30 min), randomly assembled from a bank of real official questions plus originals in the same format, with a full commented correction afterwards and a dashboard tracking progress over time. A separate vocabulary/kanji drill asks for the Portuguese meaning and the hiragana reading of a word, with no hints, then shows the result, an explanation, and an example sentence.

Success: taking a 90-minute exam on a phone is comfortable and unambiguous, reviewing mistakes teaches something, and progress is visible across attempts.

## Positioning
A new exam on every attempt, built from the real official sample tests (2009, 2012, 2018) including the official listening audio cut per question, with every option explained in Portuguese. Fixed mock tests and generic flashcard apps cannot claim this.

## Operating Context
- Mostly phone, installed as an app, often one hand; also desktop. Works offline (service worker caches the whole site and the audio).
- Long focused sessions with a countdown timer per section; listening plays each audio once in exam mode and advances automatically.
- Results, settings, and progress live only in the browser's localStorage; export/import as JSON.

## Capabilities and Constraints
- Static HTML/CSS/vanilla JS, no build step, deployed on GitHub Pages; `build-sw.py` regenerates the service worker file list after edits.
- Question bank: `data/*.js` (units of type kanji, hyouki, bunmyaku, iikae, bunpou1, bunpou2, bunshou, dokkai1, dokkai2, jouhou, kadai, point, hatsuwa, sokuji). Furigana syntax `漢字{かな}`, underline `__x__`, blanks `___` / `★` / `[n]`.
- Japanese text must stay faithful to the exam booklet conventions: numbered question boxes, もんだい instructions in Japanese, furigana on grammar/reading/listening but not on the vocabulary section (it would give the answer away).
- Listening: official MP3 clips for official items, browser TTS for original items.
- Score is an estimate (0–180, pass at 80 with section minimums 38/120 and 19/60), always labelled as an estimate.

## Brand Commitments
- Interface language: Brazilian Portuguese; exam content in Japanese.
- Buy Me a Coffee link (buymeacoffee.com/thepineapplekingdom) with its QR code must remain available.
- The user explicitly allowed changing the entire visual identity; only function and content are fixed.

## Evidence on Hand
Official sample tests and audio from jlpt.jp (in `media/`), 201 official questions, 105 originals marked "original", 274 vocabulary entries. No testimonials, user counts, or pass-rate claims exist; none may be invented.

## Product Principles
1. The exam must feel like the exam: structure, timing, and conventions of the real JLPT N5.
2. Nothing gives the answer away before submission; everything is explained after.
3. Phone first, readable for 90 minutes: Japanese text large and calm, controls reachable with a thumb.
4. Progress is honest: estimates are labelled, data stays on the device.

## Accessibility & Inclusion
- Dark mode required (long study sessions at night).
- Toggle to show/hide furigana where the exam normally prints it.
- Comfortable reading size for Japanese with furigana on small screens; WCAG AA contrast.
