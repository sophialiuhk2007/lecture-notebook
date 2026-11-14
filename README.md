# Lecture Notebook

A notebook for math and statistics lectures that runs in the browser: nothing to install, no account.

**Open it:** https://sophialiuhk2007.github.io/lecture-notebook/

## What it does

- **Math in plain words.** Type `sum from i=1 to n of x_i` or `X ~ N(mu, sigma^2)` and it turns into proper math. LaTeX (`$...$`) works too, and you edit formulas as they look.
- **Structured notes.** Definitions, theorems, proofs, examples, equations with numbers, references like “Theorem 2”, tables, code, pictures.
- **Handwriting.** Handwritten notebooks with lined/grid paper, a stylus-friendly pen, highlighter, shapes and lasso, plus a scratch-paper whiteboard beside your notes. Works with Apple Pencil (Safari) and Windows pens (Chrome/Edge).
- **PDF readings.** Add a course's PDFs, read them next to your notes or as a page, highlight, draw and comment on them.
- **Comments and marks** in the margin, find & replace, outline. Any block can also be turned into a comment (right-click it → 💬 Turn into a comment): the card keeps the colour of the block type it was, and **↩ Block** puts it back.
- **Export** to PDF or LaTeX (Overleaf-ready).
- **Claude and Google Drive (optional)**, connected in **⚙ Settings** (top right). See below.

## ⚙ Settings: connecting Claude and Google Drive

Each person who uses the notebook connects **their own** accounts. Everything is stored only in that person's browser.

### Claude

Ask Claude, explanations, replies in comments, and turning handwriting or PDFs into typed notes all call Anthropic's API straight from your browser, using **your own API key**:

1. Create a key at <https://console.anthropic.com/settings/keys> (usage is billed to your Anthropic API account).
2. In the notebook: **⚙ Settings → Claude**, paste the key, pick a model, **Connect Claude**.

The key is kept only in your browser and is sent only to `api.anthropic.com`. A claude.ai Pro/Max subscription can't be used by other websites. The API is billed separately.

### Google Drive backup

**⚙ Settings → Google Drive → Connect Google Drive** signs you in with Google and backs up every note to a **Lecture Notebook backups** folder in your Drive (automatically, a few minutes after you stop typing, if you leave that on). **Load from Drive…** brings notes back on another device. The notebook asks only for Google's `drive.file` permission, so it can see only the files it created, not the rest of your Drive.

Google sign-in lasts about an hour. After that, automatic backups pause until you click the ☁ Drive button → **Back up now**, which signs you in again.

#### One-time setup for whoever hosts the site

Google sign-in needs an OAuth client ID that belongs to the website. Create it once:

1. In the [Google Cloud console](https://console.cloud.google.com/), create a project (or pick one).
2. **APIs & Services → Library**: enable the **Google Drive API**.
3. **APIs & Services → OAuth consent screen**: set up an *External* app (name, support email). Under scopes, add `.../auth/drive.file`. While the app is in *Testing*, only the Google accounts you list as test users can sign in. Publish the app to let anyone sign in. `drive.file` is a non-sensitive scope, so this needs no security review.
4. **APIs & Services → Credentials → Create credentials → OAuth client ID**: type *Web application*, and under **Authorized JavaScript origins** add the site's address, e.g. `https://sophialiuhk2007.github.io` (and `http://localhost:8000` if you test locally).
5. Put the client ID in [`config.js`](config.js):

   ```js
   window.NB_CONFIG = { googleClientId: '1234-abc.apps.googleusercontent.com' };
   ```

Until then, people can still paste their own client ID under **⚙ Settings → Google Drive → Advanced**.

## Where your notes are kept

In your browser, on your device (IndexedDB). Nothing is uploaded unless you connect Google Drive or ask Claude something. Clearing this site's data in your browser deletes the notes here. Turn on Google Drive backup, or use **Export → Back up whole notebook** now and then. To move to another device without Drive, back up on one and use **Export → Restore from a backup file** on the other.

On iPad: Share → **Add to Home Screen** opens it full screen like an app.

## Hosting your own copy

It's a static site: put these files on any web host. GitHub Pages works: Settings → Pages → Deploy from branch → `main` / root. For Google Drive, do the one-time setup above with your own site's address.

## Credits

Built with [KaTeX](https://katex.org) (MIT), [MathLive](https://cortexjs.io/mathlive/) (MIT), [PDF.js](https://mozilla.github.io/pdf.js/) (Apache-2.0), [EmbedPDF](https://www.embedpdf.com) / [PDFium](https://pdfium.googlesource.com/pdfium/) (MIT / BSD-3-Clause), [highlight.js](https://highlightjs.org) (BSD-3-Clause) and [JSZip](https://stuk.github.io/jszip/) (MIT or GPLv3). KaTeX's math fonts are included under their own open-source license (see the KaTeX repository). Text fonts (IBM Plex, Source Serif) are loaded from Google Fonts under the SIL Open Font License.
