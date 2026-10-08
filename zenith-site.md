# Zenith Co. site: how to finish and edit it

The homepage (`index.html`) is a one-page sales letter with one job: get a
qualified tree company owner to book a call. Around it sit the inner pages
(how it works, pricing, about, our work, articles), built for AI assistants to
cite (the AEO plan behind them is kept outside this public repo). Everything is plain HTML, CSS and a little
JavaScript. A small build step (`npm run build`, section 6) fills in the
shared parts. Push to `main` and GitHub Pages serves it at
zenithcomarketing.com.

## 1. Fill in the blanks

Open `index.html`, find `var SITE = {` near the bottom, and set:

| Key            | What it is                                   | Example              |
|----------------|----------------------------------------------|----------------------|
| `fitThreshold` | Who qualifies. Lowercase; it reads after "a tree company with" and is capitalized in the list | `"two or more crews ready for more work"` |
| `minAdSpend`   | Minimum daily ad spend (set to $50)          | `"$50"`              |
| `startTime`    | How long until ads go live (set)             | `"1 to 2 weeks"`     |
| `founderName`  | Your name                                    |                      |

Until a key is set, the page shows a dashed `[blank]` box wherever it's used.
For search engines, you can also type the values straight into the HTML (search
for `data-fill="..."`).

The form choices for crews and ad budget are in `booking.crewOptions` and
`booking.budgetOptions` in `content/site.js` (section 6). Match the budget
ranges to your minimum.
The page says "a day" after the ad spend amount; the form asks for a monthly
budget, so its ranges start at $1,500 (about $50 a day).

## 2. Images, and what to add later

The page uses no photos from clients or anyone else. The visuals are drawn in
HTML: the "One lead, start to finish" card in the hero, a missed-calls phone
screen and a sample calendar week (labeled as examples), the test lead phone,
and small versions of the two client sites with their real headlines. The
share image (`assets/og-image.png`) follows the same rule.

The one video is Jenniffer's testimonial, in the King's Tree Service card under
Our work, with her "Google ad" line beside it. It only loads when someone
presses play. Don't join quotes that weren't said together, and don't describe
her as an ads-program client: her work with us is the website and her Google
Ads.

The founder photo in the closing card is `assets/photos/founder.jpg` (400 by 400). Replace that file to change it; if it's missing, the card shows "ZS" initials.

Nothing on the page is an empty placeholder (they made it look unfinished).
Each missing item has a finished stand-in and a comment in `index.html`
marking where the real thing goes:

| When you have | Do this |
|------|-----|
| The founder video | Replace the "One lead, start to finish" card in the hero with the video. The `FOUNDER VIDEO` comment above the card has the markup. Convert phone video to MP4 (H.264) first; iPhone .mov files are HEVC and HDR, which many browsers can't play. |
| Fred's testimonial | Replace the "What runs behind the site" panel in the A Tree Surgeons card with a `figure.testimonial` like the King's one, in Fred's own words. |
| Real ads results | Add a case study card where the `FIRST ADS CASE STUDY` comment sits, under the two client cards. Real numbers only. |

## 3. Booking

Every "See if you qualify" button, on every page, opens a 5-question form. Then it shows the
Calendly calendar for `zenith-co-consultation`. On phones, a bar with the same
button sits at the bottom of the screen between the hero and the closing card.
It hides while the form is open, while someone is typing, and while the test
lead demo plays.

- The answers go to Calendly as the prefilled answer to the event's **first
  custom question** (`a1`). In Calendly, make question 1 a multi-line text box
  such as "About your company". If you don't want that, set
  `calendlyAnswerParam: null`. Add any other questions (like "How did you
  hear about us?") after it.
- Every submission also goes to the dialer the moment they press "Next",
  whether or not they book: `formEndpoint` is
  `https://dialer.zenithcomarketing.com/api/inbound/website-form`. It becomes a
  pending lead in the dialer's **Website form** list (switched off until you
  turn it on), with every answer in a pinned note. A number already in the
  dialer gets the note instead of a second lead. The dialer only accepts posts
  from this site (its `INBOUND_FORM_ORIGINS` setting), five per visitor per ten
  minutes. A hidden "leave this empty" field catches bots.
- The body is JSON with company, service_area, crews, monthly_ad_budget, phone,
  sms_consent, page, submitted_at and the hidden url_hp. It's sent as
  text/plain so the browser doesn't need a preflight. Set `formEndpoint` to
  null to stop sending.
- `page` is the page they booked from, plus where the visit started when
  that differs: "| landed on" the first page they saw, "| from" the site that
  sent them. It shows in the dialer note's Page line, and it's how a lead from
  an AI assistant (`utm_source=chatgpt.com`) becomes visible.
- The settings (`calendly`, `calendlyAnswerParam`, `formEndpoint` and the
  two option lists) live under `booking` in `content/site.js`. The build
  copies them into `assets/book.js`, which runs the form on every page. The
  form's HTML is in `content/partials.js`.
- If JavaScript is off, the buttons link straight to Calendly.

## 4. Copy rules used on the page

Short sentences in the owner's words. No em dashes. No "no X, no Y" lists. Say
each thing once. No invented numbers, testimonials, or clients.

The look matches the services site that was live on 2026-10-02: a dark navy
page, quiet cards with thin borders, small green section labels, and product
mockups instead of photos. Green (#34C77B) is for buttons and highlights only.
No gradients, glows, glass effects, or emoji. Cards have 12px corners and
buttons 8px, and the mockups sit on a soft shadow, like the services site.

Headlines and body text are both Archivo, mixed case, on the services site's
calmer scale (46px hero headline and 34px section headings on desktop).

Motion, like the services site: blocks fade up 18px over 0.7 seconds the
first time their section scrolls into view. A section fades in as one group,
never line by line; only the deal card and the calculator (far down a long
section) are their own groups (`data-rv-group`). Buttons lift 1px on hover, client cards light their border, FAQ answers slide
open, and section links scroll smoothly. The "Send a test lead" demo plays
when tapped. Everyone who has reduced motion turned on gets all of it with no
movement.

The page order and copy came out of a review on 2026-10-02 against other
agencies selling booked or shown appointments (Etlio, Booked Then Built,
HomeWise, Tree Care Leadz, Tree Traction, Home Service Direct). Choices made
on purpose: no "is your area open" checker (there is no territory data behind
it), no third-party statistics, no scarcity lines, and the comparison with
retainers and lead sites stays three plain rows inside The deal.

## 5. Legal pages

`privacy.html` and `terms.html` are light reading pages with a navy header.

`terms.html` covers the per-shown-estimate ads offer and, in Section 7, the
website and automation plans, which are still for sale. It took effect on
2026-10-05 for new clients. Clients who signed up earlier (A Tree Surgeons and
King's Tree Service) get 30 days' notice by email, so it applies to them from
2026-11-04; until then they're under `terms-2026-08-01.html`, the earlier
version, which is kept online and marked as replaced. After 2026-11-04, keep
that page (it's the record of what they agreed to) but nothing needs to link
to it except the notice in `terms.html`, which can come out then.

The Terms went live before an attorney looked at them. When a Florida
attorney reviews them, publish any changes as a normal update: new "Last
updated" date, and 30 days' email notice to clients for anything material
(Section 22).

The homepage's deal card and FAQ say the same things as the Terms. When either
changes, check the other still matches. Fees, the service area and the
minimum daily ad budget live in each client's order form, not on the site.

## 6. Inner pages and the build

The inner pages, `robots.txt`, `sitemap.xml` and `llms.txt` come from
`content/`:

| File | What's in it |
|------|-----|
| `content/site.js` | Business facts used in schema and `llms.txt`, and the booking settings. Change it in the same commit as any homepage copy it repeats |
| `content/pages.js` | One entry per page, with the question that page answers |
| `content/posts.js` | The articles and their topic groups |
| `content/partials.js` | Nav, footer, booking form, closing card, breadcrumbs, bylines |

Run `npm run build` after any change and commit what it writes. It fills the
`<!-- build:NAME -->` blocks in every page, including the homepage's head tags,
footer and booking form. Edit outside those blocks; anything inside them is
overwritten. `npm run check` fails if something is out of date.

Inner pages use `assets/site.css`. Its colors and shared components are copied
from the homepage's inline styles, so change both together. FAQs on every page
are `<details><summary>Question</summary><div class="a">...</div></details>`;
the build turns them into FAQ schema, so the visible answer is the one
assistants quote.

To add an article: copy an existing one in `blog/`, add an entry to
`content/posts.js`, run `npm run build`. The nav, related links, sitemap and
`llms.txt` pick it up.

`_config.yml` keeps the working files (this one included) off the live site.
Add any new working file to its list.
