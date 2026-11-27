# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing site for KubeSkills (kubeskills.com). Plain HTML/CSS/vanilla JS. No package manager, build step, linter config, or tests.

## Commands

```bash
# Local preview. Use a server rather than file://: grow/index.html uses root-absolute asset paths
python3 -m http.server 8080
# then open http://localhost:8080/ and http://localhost:8080/grow/
```

Deploy by uploading the repo contents as-is to any static host. Relative and absolute asset paths both assume the repo root is the web root.

## Git workflow (overrides the global branch/PR conventions)

- Commit directly on `main` and push straight to `origin main`. Do **not** create `feature/*` branches or open or merge PRs for this repo.
- Still show the staged files and the proposed commit message, and get approval before each commit and push.
- `main` has branch protection that requires 1 review, but `enforce_admins` is off. A direct push from the repo admin goes through, and GitHub prints a "bypassed rule violations" notice. That notice is expected.

## Structure

- `index.html` is the homepage. Assets are referenced **relatively** (`./css/...`).
- `grow/index.html` is the GROW landing page (served at `/grow/`). Assets are referenced **root-absolute** (`/css/...`). Any new subdirectory page needs the root-absolute form.
- `css/styles.css` is the only hand-written stylesheet. It is split into commented sections (`/* Navigation */`, `/* Homepage refresh */`, `/* Cookie banner */`, `/* Grow page */`), and new page-specific styles go in a new section. `bootstrap.min.css` and `line-awesome.min.css` are vendored and must not be edited.
- `js/consent.js` is loaded first in `<head>` on every page, and it is the only place GTM (`GTM-N88FP9P`) is loaded. It exposes `window.kubeskillsConsent` (`get` / `accept` / `decline`) and injects GTM only after consent is `accepted`. **Never add an inline GTM snippet or the GTM `<noscript>` iframe to a page**, because either would load GTM before consent.
- `js/script.js` is shared by all pages. It wraps everything in one `DOMContentLoaded` handler, and each feature checks for its element before running, so the file is safe to load on pages without that markup.

## Cross-page shared markup (duplicated, not templated)

These blocks are copy-pasted into **every** page. A change to one must be repeated in all pages:

- `<script src="…/js/consent.js"></script>` as the first element in `<head>`
- An inline minified **affiliate tracking** script in `<head>`. It reads `?affiliate_code=`, stores it in a 60-day `affiliate_code` cookie, and appends it to every link pointing at `kubeskills.circle.so` or `community.kubeskills.com`.
- The `site-nav` header (Blog / Courses / Join the Community)
- The footer
- The `#cookieBanner` markup (`#cookieAcceptButton`, `#cookieDeclineButton`)
- The Font Awesome 6.5.0 stylesheet from cdnjs, alongside the vendored Line Awesome icons

## Runtime behavior in `js/script.js`

- **Mobile nav:** `.nav-toggle` toggles `.nav-links.is-open` and keeps `aria-expanded` in sync.
- **Cookie banner:** the visitor's choice is saved to `localStorage["kubeskills-cookie-consent"]` (`accepted` / `declined`). The banner buttons call `kubeskillsConsent.accept()` / `.decline()`. Accepting loads GTM right away, with Consent Mode v2 `default: granted` pushed before `gtm.js`. Declining or ignoring the banner means no request to googletagmanager.com is made.
- **Latest blog card:** on `#latestBlogCard`, the script POSTs a GraphQL query to `https://gql.hashnode.com` for the newest post on `blog.kubeskills.com`. It fills the `data-blog-*` attribute hooks (`-loading`, `-date`, `-title`, `-excerpt`, `-cover`, `-link`). If the request fails, the card falls back to linking the blog root. Keep those `data-blog-*` attributes when editing the card markup.

## External integrations

- Newsletter signup is a ConvertKit embed (`ck.page` script, `data-uid="024ce68ad3"`) in the homepage hero.
- The community and courses run on Circle (`community.kubeskills.com`), and the blog runs on Hashnode (`blog.kubeskills.com`). The privacy policy is linked at `https://kubeskills.com/privacy`, but no such page exists in this repo.
