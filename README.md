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
- **AI (Claude or OpenAI) and Google Drive (optional)**, connected in **⚙ Settings** (top right). See below.

## ⚙ Settings: connecting an AI and Google Drive

Each person who uses the notebook connects **their own** accounts. Everything is stored only in that person's browser.

### AI: Claude, OpenAI, or OpenAI through Harvard

Asking about your notes, explanations, replies in comments, and turning handwriting or PDFs into typed notes call an AI straight from your browser, using **your own API key**. Choose the provider in **⚙ Settings → AI**:

| | Claude (Anthropic) | OpenAI | Harvard OpenAI (HUIT) |
|---|---|---|---|
| Get a key | <https://console.anthropic.com/settings/keys> | <https://platform.openai.com/api-keys> | [HUIT API Portal](https://portal.apis.huit.harvard.edu/): your app's **Key** (not the Secret) |
| Key looks like | `sk-ant-…` | `sk-…` / `sk-proj-…` | letters and digits, no `sk-` |
| Sent only to | `api.anthropic.com` | `api.openai.com` | `go.apis.huit.harvard.edu` (or the gateway address you set) |

Paste the key, pick a model from the list (it shows the models your key can use), and press **Connect**. **Effort** sets how hard the model thinks before answering: *Automatic* matches it to the task; Low is fastest and cheapest, High (and, for Claude, Extra high and Max) most careful but slower and costlier. The handwriting / PDF conversion dialogs have their own model and effort pickers. Each provider keeps its own key, so you can switch back and forth. Usage is billed to your account with that provider. A claude.ai or ChatGPT subscription can't be used by other websites: the APIs are billed separately.

**Harvard OpenAI** is for Harvard affiliates using the HUIT API Portal. By default it uses the free **OpenAI for Community Developers** product (`go.apis.huit.harvard.edu/ais-openai-direct-comdev/v2`, $10 a month of credit, FAS and HUIT). For pay-as-you-go OpenAI Direct, set the gateway address to `…/ais-openai-direct/v2`. Use the app's **Key** from the portal, not the Secret, and check that the portal shows it approved: an unapproved key gets “ApiKey not approved”.

#### Harvard relay

Harvard's gateway works from code but doesn't send the CORS headers browsers require, so the notebook can't call it directly from a web page. [`relay/huit-relay.js`](relay/huit-relay.js) is a small Cloudflare Worker that forwards the notebook's requests to Harvard unchanged and adds those headers. It stores nothing; each person's own key passes straight through. Set it up once:

1. Make a free account at <https://dash.cloudflare.com/sign-up>.
2. **Workers & Pages → Create → Create Worker**, give it a name (e.g. `huit-relay`), **Deploy**.
3. **Edit code**: replace the code with [`relay/huit-relay.js`](relay/huit-relay.js), then **Deploy**. If your copy of the notebook lives somewhere other than `https://sophialiuhk2007.github.io`, add its address to `ALLOWED_ORIGINS` at the top first.
4. In the notebook: **⚙ Settings → AI → Harvard OpenAI → Gateway address** = `https://huit-relay.<your-subdomain>.workers.dev/comdev` (or `/direct` for pay-as-you-go), paste your Key, **Connect**.

The relay only forwards chat and model-list requests to Harvard's two OpenAI products, and only for pages from the allowed sites.

With OpenAI or Harvard OpenAI chosen, the notebook's buttons and messages say “GPT” instead of “Claude”.

### Google Drive backup

**⚙ Settings → Google Drive → Connect Google Drive** signs you in with Google and backs up every note to a **Lecture Notebook backups** folder in your Drive (automatically, a few minutes after you stop typing, if you leave that on). **Load from Drive…** brings notes back on another device. The notebook asks only for Google's `drive.file` permission, so it can see only the files it created, not the rest of your Drive.

A note you add or restore with **Load from Drive** stays linked to its Drive copy: your changes go there, and changes made to it in another browser come here on their own (every couple of minutes while the notebook is open). If you changed it in both places, yours stays and the other version is added as a separate note. **Load as a copy** makes a separate note that isn't linked. Notes created in another browser still come over with **Load from Drive**.

Google sign-in lasts about an hour. After that, automatic backups pause until you click the ☁ Drive button → **Back up now**, which signs you in again.

#### One-time setup for whoever hosts the site

Google sign-in needs an OAuth client ID that belongs to the website. Create it once:

1. In the [Google Cloud console](https://console.cloud.google.com/), create a project (or pick one).
2. **APIs & Services → Library**: enable the **Google Drive API**.
3. **APIs & Services → OAuth consent screen**: set up an *External* app (name, support email). Under scopes, add `.../auth/drive.file`. While the app is in *Testing*, only the Google accounts you list under **Audience → Test users** can sign in. That includes your own account: add it, or Google shows “Access blocked … Error 403: access_denied”. Publish the app to let anyone sign in. `drive.file` is a non-sensitive scope, so this needs no security review.
4. **APIs & Services → Credentials → Create credentials → OAuth client ID**: type *Web application*, and under **Authorized JavaScript origins** add the site's address, e.g. `https://sophialiuhk2007.github.io` (and `http://localhost:8000` if you test locally).
5. Put the client ID in [`config.js`](config.js):

   ```js
   window.NB_CONFIG = { googleClientId: '1234-abc.apps.googleusercontent.com' };
   ```

Until then, people can still paste their own client ID under **⚙ Settings → Google Drive → Advanced**.

Google can take from 5 minutes to a few hours to apply changes to these settings.

#### If sign-in fails

When the Google window closes without connecting, Google usually showed an “Access blocked” page first. The code at the bottom of that page says what to fix:

| Code | Fix |
|---|---|
| `origin_mismatch` | The client's **Authorized JavaScript origins** must contain exactly `https://sophialiuhk2007.github.io`: no `/lecture-notebook`, no trailing `/`. It goes under JavaScript origins, not redirect URIs. |
| `access_denied` (app is being tested) | Add the account you're signing in with under **Audience → Test users**, or publish the app. |
| `admin_policy_enforced` / “Your institution's admin…” | A school or work Google account whose admin blocks apps it hasn't approved. Use a personal Gmail account instead (add it as a test user). |
| `invalid_client` / `unauthorized_client` | The client ID is mistyped, deleted, or not of type *Web application*. |
| Google Drive API has not been used… (after connecting) | Enable the **Google Drive API** in the same project. |

Pop-up blockers and some in-app browsers also stop the sign-in window. Use a regular browser window (Chrome, Safari, Edge or Firefox) with pop-ups allowed for the site.

## Moving notes between the claude.ai notebook, the website and other accounts

- **From the claude.ai notebook to the website:** in the claude.ai notebook, **Export → Back up whole notebook to a file**. On the website, **Export → Restore from a backup file** (or ⚙ Settings → Backup file → Restore from a file) and pick that file. Notes, handwriting, comments, chats, course readings and their PDF annotations, pictures and PDFs all come along.
- **From one browser or account's website copy to another:** **Back up to a file** on one, **Restore from a file** on the other. Or connect the same Google account's Drive on both and use **Load from Drive**.
- Restoring adds the notes that aren't there yet and replaces the ones that are (the same note, not just the same title); nothing else is deleted.

## Where your notes are kept

In your browser, on your device (IndexedDB). Nothing is uploaded unless you connect Google Drive or ask Claude something. Clearing this site's data in your browser deletes the notes here. Turn on Google Drive backup, or use **Export → Back up whole notebook** now and then. To move to another device without Drive, back up on one and use **Export → Restore from a backup file** on the other.

On iPad: Share → **Add to Home Screen** opens it full screen like an app.

## Hosting your own copy

It's a static site: put these files on any web host. GitHub Pages works: Settings → Pages → Deploy from branch → `main` / root. For Google Drive, do the one-time setup above with your own site's address.

## Credits

Built with [KaTeX](https://katex.org) (MIT), [MathLive](https://cortexjs.io/mathlive/) (MIT), [PDF.js](https://mozilla.github.io/pdf.js/) (Apache-2.0), [EmbedPDF](https://www.embedpdf.com) / [PDFium](https://pdfium.googlesource.com/pdfium/) (MIT / BSD-3-Clause), [highlight.js](https://highlightjs.org) (BSD-3-Clause) and [JSZip](https://stuk.github.io/jszip/) (MIT or GPLv3). KaTeX's math fonts are included under their own open-source license (see the KaTeX repository). Text fonts (IBM Plex, Source Serif) are loaded from Google Fonts under the SIL Open Font License.
