# Lecture Notebook

A notebook for math and statistics lectures that runs in the browser — nothing to install, no account.

**Open it:** https://sophialiuhk2007.github.io/lecture-notebook/

## What it does

- **Math in plain words.** Type `sum from i=1 to n of x_i` or `X ~ N(mu, sigma^2)` and it turns into proper math. LaTeX (`$...$`) works too, and you edit formulas as they look.
- **Structured notes.** Definitions, theorems, proofs, examples, equations with numbers, references like “Theorem 2”, tables, code, pictures.
- **Handwriting.** Handwritten notebooks with lined/grid paper, a stylus-friendly pen, highlighter, shapes and lasso, plus a scratch-paper whiteboard beside your notes. Works with Apple Pencil (Safari) and Windows pens (Chrome/Edge).
- **Comments and marks** in the margin, find & replace, outline.
- **Export** to PDF or LaTeX (Overleaf-ready).
- **Claude (optional).** Ask Claude about your notes, write a section, or turn handwriting into typed notes — using *your own* Anthropic API key (Export → Claude API key…).

## Where your notes are kept

In your browser, on your device (IndexedDB). Nothing is uploaded anywhere. Clearing this site's data in your browser deletes the notes, so use **Export → Back up whole notebook** now and then. To move to another device, back up on one and use **Export → Restore from a backup file** on the other.

On iPad: Share → **Add to Home Screen** opens it full screen like an app.

## Claude API key

The Claude features call Anthropic's API straight from your browser with your key. The key is stored only in your browser and sent only to `api.anthropic.com`; usage is billed to your Anthropic API account. Create a key at <https://console.anthropic.com/settings/keys>. (A claude.ai subscription can't be used by other websites.)

## Hosting your own copy

It's a static site: put these files on any web host (GitHub Pages works — Settings → Pages → Deploy from branch → `main` / root).

## Credits

Built with [KaTeX](https://katex.org) (MIT), [MathLive](https://cortexjs.io/mathlive/) (MIT), [PDF.js](https://mozilla.github.io/pdf.js/) (Apache-2.0), [highlight.js](https://highlightjs.org) (BSD-3-Clause) and [JSZip](https://stuk.github.io/jszip/) (MIT or GPLv3). KaTeX's math fonts are included under their own open-source license (see the KaTeX repository). Text fonts (IBM Plex, Source Serif) are loaded from Google Fonts under the SIL Open Font License.
