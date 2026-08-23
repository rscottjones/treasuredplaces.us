# Treasured Places — static site

Six hand-built HTML pages, no framework, no build step, nothing to run.
Every page — including the 495-row list table — is plain HTML you can open
and edit directly, including through GitHub's own in-browser editor.

```
index.html                        Our Treasured Places (home)
list/                              The List
join/                              Join the Quest!
faq/                               FAQ
updates/                           Updates (the three former blog posts)
404.html
blog/                              Redirect stub -> /updates/
3-new-nps-additions/               Redirect stub -> /updates/#3-new-nps-additions
4-new-additions-in-jan-2025/       Redirect stub -> /updates/#4-new-additions-in-jan-2025
the-treasured-places-list/         Redirect stub -> /list/ (old WordPress URL)
join-the-quest/                    Redirect stub -> /join/ (old WordPress URL)
assets/site.css                    All styling
assets/list-filter.js              Search/filter on the list page
data/treasured-places-checklist.csv   Downloadable spreadsheet, linked from the site
images/                            Site images
```

## 1. Images

All four site images are in place — `home-hero.jpg`, `list-hero.jpg`,
`faq-hero.jpg`, and `quest-hero.jpg` — resized to 1600px on the long edge and
re-encoded as JPEG at 82% quality. The Updates page has no image; the
trailhead photo that used to run there was dropped.

## 2. Editing the list

The list page (`list/index.html`) is plain HTML — the
495 rows are written out in full in the file, the same way the site
actually serves them. There's no spreadsheet behind it and nothing to run.
Edit it the same way you'd edit any of the other pages.

**On GitHub, entirely in your browser:**

1. Open the repository on github.com and click into
   `list/index.html`.
2. Click the pencil icon (top right of the file view) to edit it.
3. Use your browser's Find (Ctrl+F or Cmd+F) to jump to the place you want
   to change.
4. **To add a place:** find any existing row — it looks like this:

   ```
   <tr data-managers="NPS" data-name="Zion" data-states="UT" data-type="NP"><td data-col="name"><a href="http://www.nps.gov/zion/">Zion</a></td><td data-col="type"><span class="type-code">NP</span></td><td data-col="managers"><span class="managers">NPS</span></td><td data-col="states"><span class="states">UT</span></td></tr>
   ```

   Copy that whole line, paste it as a new line, and change the name
   (it appears twice), the link, the type code, the agency, and the
   location (each of the last two appears twice). Change every matching
   pair consistently — the `data-name`, `data-type`, `data-managers`, and
   `data-states` values are what the search and filter boxes at the top of
   the page read, so if they don't match the visible text, that row won't
   show up right when someone filters.

   Note that two attribute names don't match their column headings, for
   historical reasons: **`data-states` is the "Location" column** and
   **`data-managers` is the "Agency" column**. Both can hold more than one
   value, comma-separated — e.g. `data-managers="NPS, BLM"` for a jointly
   managed place — just keep the visible text in the matching `<span>` the
   same. Where you paste the new line in the file doesn't matter
   functionally — the alphabetical order is just for scanning by eye.
   Agency codes are listed on the list page itself, under "Agency codes."
5. **To remove a place:** delete its entire line, from `<tr` to `</tr>`.
6. **To edit a place** — new URL, redesignation, name change — just change
   the text in place.
7. Scroll to the bottom of the page, add a short commit message like
   "Add [place name]," and click "Commit changes directly to the main
   branch." GitHub Pages rebuilds automatically — your change is live
   within a minute or two, no separate deploy step.

Every other page (home, FAQ, Join the Quest, Updates) was always plain HTML
like this — nothing about them changes.

**A safety net:** every edit you make is saved as a separate version in
GitHub's history. Click "History" at the top of any file's page to see past
versions; if an edit ever breaks something, you can open the previous
version, copy its content, and paste it back in to undo the change.

**One thing that won't stay in sync:** the downloadable checklist
spreadsheet (`data/treasured-places-checklist.csv`) is a separate, static
file — editing the table doesn't update it. At roughly one change a year,
it'll only ever be off by a place or two, which is probably fine to leave.
If you'd like it refreshed to match, that's a quick thing to ask for in a
Claude chat any time — just upload or link the current site and ask.

## 3. Deploy — GitHub Pages

1. Create a new repository (public, so Pages is free).
2. Upload every file in this folder — drag the whole unzipped folder onto
   GitHub's "Upload files" page in one drop and it preserves the folder
   structure.
3. Repo Settings → Pages → Source: **Deploy from a branch**, branch **main**,
   folder **/ (root)**.
4. Before adding your domain in the repo, verify you own it: your GitHub
   account Settings → Pages → **Add a domain**, add `treasuredplaces.us`,
   and add the TXT record it gives you at your DNS provider. Click Verify
   once it's added — this can take a few minutes to a few hours.
5. Back in the repo's Settings → Pages, set Custom domain to
   `www.treasuredplaces.us` and save. This writes a `CNAME` file into the
   repo automatically.
6. At your DNS provider, add:
   - Four **A** records for the apex (`treasuredplaces.us`) pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and
     `185.199.111.153`
   - A **CNAME** record for `www` pointing to `<your-username>.github.io`
7. Wait for DNS to propagate, then check **Enforce HTTPS** in Pages
   settings once it becomes available.

No `.nojekyll` file is needed here. GitHub's default Jekyll processing
mainly affects files and folders that start with an underscore — this site
doesn't have any, so there's nothing for it to touch. Everything passes
through unprocessed since there's no Liquid template syntax or YAML front
matter anywhere in the site either.

GitHub Pages has no server-side redirect rules — there's no config file
that tells it "send this old URL to that new one." That's what the `blog/`,
`3-new-nps-additions/`, and `4-new-additions-in-jan-2025/`
folders are: real, static pages that redirect via
`<meta http-equiv="refresh">` the instant they load, since a real file is
the only thing GitHub Pages can serve. Broader old WordPress URLs — category
archives, tag archives, author pages, feeds — aren't covered this way and
will hit the 404 page instead; those never had the inbound-link traffic the
four post URLs did.

## Alternative: Netlify or Cloudflare Pages

Push to a Git repo (or drag-and-drop the folder directly on Netlify — no
Git needed) and connect it. Neither needs a build command; set the build
output directory to the repo root. The `blog/`, etc. stub
folders work the same way there as on GitHub Pages.

Both of those hosts also support a `_redirects` file for pattern-based
rules (`/category/*` → `/updates/`, and similar), which this project doesn't
include — GitHub Pages can't use it, so it was dropped. If you switch to
Netlify or Cloudflare later and want those broader old-URL redirects back,
that's a quick file to regenerate; just ask.

Point `treasuredplaces.us` and `www.treasuredplaces.us` at the new host and
keep `www` as the canonical hostname, since that's what your existing pages
and inbound links use.

## Changes from the WordPress version

- **Updates** is one page (`/updates/`) instead of a blog. Old post URLs
  redirect to anchors on it: `/3-new-nps-additions` →
  `/updates/#3-new-nps-additions`, etc. The "Coming soon" placeholder post
  and its `/coming-soon` redirect were both removed once the site had
  actual content to show instead.
- **The list is filterable** — search by name, narrow by designation type or
  state. The dropdowns build themselves from the table, so new rows appear
  in them automatically.
- **The list collapses to a stacked layout** on phones instead of scrolling
  sideways.
- **The checklist spreadsheet exists now.** The list page and the FAQ both
  link to `data/treasured-places-checklist.csv`, which has Visited and Date
  visited columns. Both pages previously said "coming soon."
- Social links and the WordPress credit are gone from the footer, replaced
  with the R Scott Jones / Scott Jones Enterprises line.
- The Google Form is embedded directly on the Join the Quest page, with a
  fallback link underneath.
- The whole site uses one typeface, Public Sans, loaded from Google Fonts.
  Headings, body text, and the homepage stat cards all use it — there's no
  longer a separate display font. If you'd rather have zero external
  requests, delete the three font-related `<link>` tags near the top of
  each page's `<head>` (two `preconnect` tags plus the stylesheet one);
  the CSS falls back to the system sans stack.
- **The list has a fourth filterable column, Land Manager** (NPS, BLM,
  USFS, FWS, or one of two one-off agencies). I determined each place's
  manager from the domain of its official link — `nps.gov` → NPS,
  `blm.gov` → BLM, and so on. Four places didn't have a link that fit that
  pattern, so I looked each one up individually rather than guessing: Camp
  Hale-Continental Divide (USFS), Castner Range (US Army — the only
  national monument under military management), Military Working Dog Teams
  (US Air Force, at Lackland AFB), and St Francis Dam Disaster (USFS). This
  method has a real limitation worth knowing: a place's link usually names
  only the lead agency, so genuinely co-managed places don't surface
  automatically. Four have since been corrected by hand — Bears Ears
  (BLM, USFS), Grand Canyon-Parashant (BLM, NPS), Browns Canyon
  (BLM, USFS), and Berryessa Snow Mountain (USFS, BLM) — but others may
  still show only their primary agency. The field supports multiple
  comma-separated values for exactly that case —
  `data-managers="NPS, BLM"` — see "Editing the list" above.
- **Two reusable callout box styles** — `.info-box` (light blue) and
  `.alert-box` (light yellow) — are in `site.css`, ready to wrap around any
  paragraph: `<div class="info-box"><p>Your text.</p></div>`. Neither is
  used anywhere yet.

## Things I fixed, and a couple you should check

Fixed:

- The **Type** column header on the list page linked to
  `wp-admin/post.php?post=37&action=edit`. That was an editor link that
  leaked into the published page. Removed.
- **Cascade–Siskiyou** had a mangled URL:
  `http://Cascade–Siskiyouhttps://www.blm.gov/...`. Corrected to the BLM page.
- **Hohokam Pima** rendered as "Hohokam Pim" plus a stray one-letter link.
  Fixed to the full name.
- **Mount St. Helens** pointed at a 200-character legacy Forest Service
  portal URL. Replaced with
  `fs.usda.gov/visit/national-monuments/mount-st-helens`.
- The FAQ contact address read "contact @ treasured lands.us". Changed to
  `contact @ treasuredplaces.us`. Confirm that's the address you want.
- The FAQ's Aleutian alternative was labeled "Naval Aerology," which links to
  the Aleutian WWII visitor center page. Relabeled.
- The FAQ said the *fifth* of five listed sites has no transportation, but
  Aleutian Islands is fifth and the sentence was counting from a list where
  it reads as ambiguous. Changed to "the last."
- The Join the Quest page said 429 National Park units; the homepage's 433
  is correct, so Join the Quest now matches.
- **Salt River Bay**'s type read `NHP& EP` — a missing space before the
  ampersand. Normalized to `NHP&EP`, matching the style of the other combined
  designations (`NHP&P`, `NM&HisShr`).
- Three designation codes appear in the list but were missing from the
  abbreviations guide: **EHP** (Timucuan), **IHS** (Saint Croix Island), and
  the corrected **NHP&EP** (Salt River Bay). Added to the guide.
- **Typographic quotes were straight (`'` `"`) instead of curly (`’` `"` `"`)
  throughout the site.** I'd written the pages with plain ASCII punctuation;
  the live WordPress site uses proper typographic marks everywhere in its
  prose. Converted sitewide to match.
- **The Join the Quest roster was missing Twitter links** for R Scott Jones
  and Tabitha Berry. These are two different things that both happened to
  say "Twitter": the site's own header/footer social icons (which you asked
  me to drop, and which are still gone) versus individual questers' personal
  social links in their own roster entries. I'd conflated the two and
  stripped both — restored the roster links. (Both were later removed again,
  deliberately this time, since neither account is still in use.)
- A few small wording restorations to match the source exactly: "work in
  progress" → "work-in-progress", "specially protected" →
  "specially-protected", and the roster note's "we'll add it" restored to
  "I promise we'll be adding it".
- "they still miss out some of the nation's best public lands" was missing a
  word in the source. Added "on" — "miss out **on** some of."

Worth checking, left as-is:

- **Congaree** links to `nps.gov/cosw/`, the old Congaree Swamp code. The
  current page is `nps.gov/cong/`.
- **Herbet Hoover** is probably meant to be **Herbert Hoover**.
- **Edgar Allen Poe** — the NPS site spells it Edgar Allan Poe.
- **Russel Cave** is probably meant to be **Russell Cave**.
- **Devil's Postpile** and **Devil's Tower** — NPS uses Devils Postpile and
  Devils Tower, no apostrophe.
- All four are spelled that way on the live WordPress site too, so these are
  pre-existing typos, not something the conversion introduced. I left the
  data as-is rather than silently rewriting place names; fix them directly
  in `list/index.html` if you want them corrected —
  each name appears twice in its row (once in the link text, once in the
  `data-name` attribute).
