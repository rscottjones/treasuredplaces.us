# Updating the site

Everything here can be edited directly on github.com — open a file, click the
pencil icon, make the change, and commit. There's no build step.

---

## Adding, removing, or changing a place

### 1. Edit the table row

Open `list/index.html` and find the row (use Ctrl+F / Cmd+F). Each row looks
like this, all on one line:

```html
<tr data-managers="NPS" data-name="Zion" data-states="UT" data-type="NP"><td data-col="name"><a href="https://www.nps.gov/zion/">Zion</a></td><td data-col="type"><span class="type-code">NP</span></td><td data-col="managers"><span class="managers">NPS</span></td><td data-col="states"><span class="states">UT</span></td></tr>
```

To **add** a place, copy an existing row, paste it as a new line, and change
the values. To **remove** one, delete the whole line from `<tr` to `</tr>`.

**The catch:** each value appears twice — once in a `data-` attribute and once
in the visible text. They must match exactly, or the filters won't find that
row. Two attribute names don't match their column headings, for historical
reasons:

| Attribute | Column heading |
| --- | --- |
| `data-name` | Place name |
| `data-type` | Type |
| `data-managers` | **Agency** |
| `data-states` | **Location** |

`data-states` and `data-managers` can each hold several comma-separated
values — e.g. `data-managers="BLM, USFS"` for a jointly managed place. Keep
the matching `<span>` text identical.

Row order in the file doesn't matter functionally; alphabetical just makes it
easier to scan by eye.

### 2. Update the counts

**This is the easy thing to forget.** The totals are written out as plain text
in several places. If a new monument is designated or a unit is redesignated,
every one of these needs to change:

| File | Where | Contains |
| --- | --- | --- |
| `index.html` | Stat card 1 | **433** National Park units |
| `index.html` | Stat card 2 | **133** National Monuments |
| `index.html` | Stat card 3 | **17** National Conservation Areas |
| `index.html` | Green total card | **496** Treasured Places |
| `index.html` | Paragraph below the cards | "combined total of **496**…" |
| `index.html` | Paragraph below that | "That's **496** of our nation's best…" |
| `index.html` | `<meta name="description">` (top of file) | "**496** places in all" |
| `index.html` | `og:description` (top of file) | "**496** places in all" |
| `list/index.html` | Intro line under the heading | "**496** in total" |
| `list/index.html` | `<meta name="description">` | "**496** places" |
| `list/index.html` | `og:description` | "**496** places" |
| `404.html` | Body text | "the list of all **496** places" |
| `join/index.html` | First paragraph | "all **433** National Park units" |

A quick way to catch stragglers: use GitHub's search box within the repo to
search for the old number and confirm every hit is updated.

### 3. Regenerate the checklist spreadsheet

`data/treasured-places-checklist.csv` is a **separate static file** that does
not update itself when you edit the table. Its columns are:

```
Visited, Date visited, Place name, Type, Agency, State(s), Notes, Official page
```

For one or two changes, just edit the CSV by hand to match. If it drifts badly,
ask Claude to regenerate it from the current `list/index.html`.

### 4. If you add a new agency or designation code

Add it to the legend at the bottom of `list/index.html`, under **Designations**,
**Agencies**, or **Territories** as appropriate. The filter dropdowns build
themselves from the table, so they'll pick up a new value automatically — but
the legend is written by hand.

The Agency dropdown has a fixed display order set in
`assets/list-filter.js` (the `MANAGER_ORDER` array). Anything not listed there
sorts alphabetically after the named agencies.

---

## Other content

- **Updates page** — `updates/index.html`. Each post is an `<article
  class="post">` block. Add new ones at the top.
- **FAQ** — `faq/index.html`. If you add a question, also add it to the list
  of links at the top of that page.
- **Quest participants** — `join/index.html`, the `<ul class="roster">` block.
- **Footer text** — appears in all six HTML files; search for `class="colophon"`.

---

## Reference

**Pages:** `index.html`, `list/`, `join/`, `faq/`, `updates/`, `404.html`

**Redirect stubs** (old WordPress URLs → new ones; don't need editing):
`blog/`, `3-new-nps-additions/`, `4-new-additions-in-jan-2025/`,
`the-treasured-places-list/`, `join-the-quest/`

**Assets:**
- `assets/site.css` — all styling, including print styles at the bottom
- `assets/list-filter.js` — the list page's filtering
- `images/` — hero images (WebP) and `social-card.jpg` for link previews
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `favicon.ico`
- `sitemap.xml`, `robots.txt` — update `sitemap.xml` only if you add or
  remove a page

**Analytics:** Tinylytics, loaded via a script tag in each page's `<head>`.
It's on the five real pages plus `404.html`, and deliberately left off the
redirect stubs (they bounce instantly, so tracking them would log phantom
views).
