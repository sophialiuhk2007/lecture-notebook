# Lecture Notebook

A notebook for math and statistics lectures that runs in your browser. Nothing to install, no account.

### **[Open the notebook →](https://sophialiuhk2007.github.io/lecture-notebook/)**  ·  **[User guide](https://sophialiuhk2007.github.io/lecture-notebook/guide.html)**

The first time you open it, a one-minute tour shows you around (replay it any time from **Export → ✦ Take the tour**).

## What it does

- **Math without the pain.** Type `mk` and a space, then `sum_(i=1)^n x_i` or `bar(X)_n -> mu`, and see real math as you type. LaTeX (`$...$`) works too.
- **Tidy structure.** Start a line with `def:`, `thm:`, `pf:`, `ex:` for coloured boxes; `$$` for numbered equations; write “by Theorem 3” and it becomes a live link.
- **Handwriting.** Pages for Apple Pencil, Windows pens or a mouse, plus scratch paper beside your typed notes.
- **Course readings.** Keep PDFs next to your notes: highlight, draw, box a formula and comment on it.
- **Comments and marks** in the margin; a Marks tab collects your to-dos and questions for the teacher.
- **Study tools.** Study mode hides definitions and theorems to test yourself; Review makes flashcards; Results shows a cheat sheet.
- **Export** to PDF or Overleaf-ready LaTeX (including a clean “for handing in” version).
- **Optional AI help** (Claude, OpenAI, or Harvard’s free OpenAI access): explain a passage, check a proof, build an interactive demo, turn handwriting or PDFs into typed notes.
- **Optional Google Drive backup** to use your notes on several devices.

## Setting up the optional extras

Both live in **⚙ Settings** (top right) and take under a minute.

- **Google Drive:** press **Connect Google Drive** and sign in. Your notes back up to a *Lecture Notebook backups* folder in your own Drive; on another device, connect the same account and **Load from Drive**. The app can see only the files it creates.
- **AI:** pick Claude, OpenAI or Harvard OpenAI, paste a key, press **Connect**. Settings has step-by-step “How do I get a key?” instructions for each. Harvard affiliates can use the free *OpenAI for Community Developers* allowance from the [HUIT API Portal](https://portal.apis.huit.harvard.edu/) (paste the app’s **Key**, not the Secret). A claude.ai or ChatGPT subscription can’t be used by other websites; their APIs are billed separately.

Everything else works without either.

## Where your notes are kept

In your browser, on your device. There’s no server storing them. Clearing the site’s data deletes them, so keep Drive backup on or use **Export → Back up whole notebook** now and then. **Export → Restore from a backup file** brings a backup into any browser, including one made in the claude.ai version of the notebook.

On iPad: Share → **Add to Home Screen** opens it full screen like an app.

The [user guide](https://sophialiuhk2007.github.io/lecture-notebook/guide.html) covers every feature, all the shortcuts and an FAQ.

---

## Hosting your own copy

It’s a static site: put these files on any web host. On GitHub Pages: Settings → Pages → Deploy from branch → `main` / root. Then set up the two site-wide settings in [`config.js`](config.js), so visitors don’t have to:

### Google Drive sign-in

Google sign-in needs an OAuth client ID that belongs to the website. Create it once:

1. In the [Google Cloud console](https://console.cloud.google.com/), create a project (or pick one).
2. **APIs & Services → Library**: enable the **Google Drive API**.
3. **APIs & Services → OAuth consent screen**: set up an *External* app (name, support email). Under scopes, add `.../auth/drive.file`. While the app is in *Testing*, only the Google accounts you list under **Audience → Test users** can sign in. That includes your own account: add it, or Google shows “Access blocked … Error 403: access_denied”. **To let the public sign in, publish it: Google Auth Platform → Audience → Publish app.** `drive.file` is a non-sensitive scope, so this needs no security review.
4. **APIs & Services → Credentials → Create credentials → OAuth client ID**: type *Web application*, and under **Authorized JavaScript origins** add the site's address, e.g. `https://sophialiuhk2007.github.io` (and `http://localhost:8000` if you test locally).
5. Put the client ID in [`config.js`](config.js):

   ```js
   window.NB_CONFIG = { googleClientId: '1234-abc.apps.googleusercontent.com', harvardRelay: '' };
   ```

Until then, people can still paste their own client ID under **⚙ Settings → Google Drive → Advanced**.

Google can take from 5 minutes to a few hours to apply changes to these settings.

#### If Google sign-in fails

When the Google window closes without connecting, Google usually showed an “Access blocked” page first. The code at the bottom of that page says what to fix:

| Code | Fix |
|---|---|
| `origin_mismatch` | The client's **Authorized JavaScript origins** must contain exactly `https://sophialiuhk2007.github.io`: no `/lecture-notebook`, no trailing `/`. It goes under JavaScript origins, not redirect URIs. |
| `access_denied` (app is being tested) | Add the account you're signing in with under **Audience → Test users**, or publish the app. |
| `admin_policy_enforced` / “Your institution's admin…” | A school or work Google account whose admin blocks apps it hasn't approved. Use a personal Gmail account instead (add it as a test user). |
| `invalid_client` / `unauthorized_client` | The client ID is mistyped, deleted, or not of type *Web application*. |
| Google Drive API has not been used… (after connecting) | Enable the **Google Drive API** in the same project. |

Pop-up blockers and some in-app browsers also stop the sign-in window. Use a regular browser window (Chrome, Safari, Edge or Firefox) with pop-ups allowed for the site.

### Harvard relay

Harvard's gateway works from code but doesn't send the CORS headers browsers require, so the notebook can't call it directly from a web page. [`relay/huit-relay.js`](relay/huit-relay.js) is a small Cloudflare Worker that forwards the notebook's requests to Harvard unchanged and adds those headers. It stores nothing; each person's own key passes straight through. Set it up once:

1. Make a free account at <https://dash.cloudflare.com/sign-up>.
2. **Workers & Pages → Create → Create Worker**, give it a name (e.g. `huit-relay`), **Deploy**.
3. **Edit code**: replace the code with [`relay/huit-relay.js`](relay/huit-relay.js), then **Deploy**. If your copy of the notebook lives somewhere other than `https://sophialiuhk2007.github.io`, add its address to `ALLOWED_ORIGINS` at the top first.
4. Put its address in [`config.js`](config.js) as `harvardRelay: 'https://huit-relay.<your-subdomain>.workers.dev/comdev'` (or `/direct` for pay-as-you-go). Visitors then only paste their Key. (Without it, each visitor can set a relay under **⚙ Settings → AI → Harvard OpenAI → Advanced: gateway address**.)

The relay only forwards chat and model-list requests to Harvard's two OpenAI products, and only for pages from the allowed sites.

## Credits

Built with [KaTeX](https://katex.org) (MIT), [MathLive](https://cortexjs.io/mathlive/) (MIT), [PDF.js](https://mozilla.github.io/pdf.js/) (Apache-2.0), [EmbedPDF](https://www.embedpdf.com) / [PDFium](https://pdfium.googlesource.com/pdfium/) (MIT / BSD-3-Clause), [highlight.js](https://highlightjs.org) (BSD-3-Clause) and [JSZip](https://stuk.github.io/jszip/) (MIT or GPLv3). KaTeX's math fonts are included under their own open-source license (see the KaTeX repository). Text fonts (IBM Plex, Source Serif) are loaded from Google Fonts under the SIL Open Font License.
