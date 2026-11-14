/* Site settings for this copy of Lecture Notebook (see README.md → "Hosting your own copy").
   googleClientId: a Google OAuth 2.0 client ID ("Web application") whose authorized JavaScript origins include this
     site's address. With it, visitors connect Google Drive in one click. Empty = each visitor pastes their own in ⚙ Settings.
   harvardRelay: the address of a relay to Harvard's API gateway (relay/huit-relay.js), which refuses calls from web pages.
     With it, Harvard users only paste their key. Empty = each visitor sets their own relay in ⚙ Settings. */
window.NB_CONFIG = {
  googleClientId: '344166359377-6gpkfdbqjlkund557j6s4n3oli8uj509.apps.googleusercontent.com',
  harvardRelay: 'https://huit-relay.sophialiuhk2007.workers.dev/comdev'
};
