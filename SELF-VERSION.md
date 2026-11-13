# self-version branch

This branch tracks the claude.ai **artifact** build of Lecture Notebook (Claude features run through the artifact runtime, `window.claude`), not the public API-key web build on `main`.
Each commit = one published artifact version or one fix round, so `git log -p index.html` shows exactly what changed.

- `index.html` — the artifact page
- `ep/` — EmbedPDF (PDFium/WASM) PDF viewer, `pdfjs/` — text extraction only, `fonts/` — KaTeX fonts
