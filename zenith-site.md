# Zenith Co. site: how to finish and edit it

The homepage (`index.html`) is a one-page sales letter with one job: get a
qualified tree company owner to book a call. It's plain HTML, CSS, and a
little JavaScript, with no build step. Push to `main` and GitHub Pages
serves it at zenithcomarketing.com.

## 1. Fill in the blanks

Open `index.html`, find `var SITE = {` near the bottom, and set:

| Key            | What it is                                   | Example              |
|----------------|----------------------------------------------|----------------------|
| `fitThreshold` | Who qualifies                                | `"2 or more crews"`  |
| `minAdSpend`   | Minimum monthly ad spend                     | `"$2,000"`           |
| `startTime`    | How long until ads go live                   | `"7 days"`           |
| `founderName`  | Your name                                    |                      |

Until a key is set, the page shows a dashed `[blank]` box wherever it's used.
For search engines, you can also type the values straight into the HTML (search
for `data-fill="..."`).

The form choices for crews and ad budget are in `crewOptions` and
`budgetOptions`, in the same block. Match the budget ranges to your minimum.

## 2. Photos, screenshots, and the slots still empty

The tree work photos come from the two client sites' own repos
(`kings-tree-service` and `fred-tree-service-site`), compressed to WebP in
`assets/photos/`. Each one is captioned or credited as that client's crew.
**Confirm with both owners that you can use their photos and screenshots on
your site.**

The screenshots in `assets/work/` were rendered from each client site's source
code in its repo, not from the live site. Retake them if the live sites change.

Still to add:

| Slot | How |
|------|-----|
| Founder video (hero) | Replace the `.vph` block inside `<div class="video">` with a YouTube/Vimeo `<iframe>` or a `<video>` tag. |
| Founder photo (closing section) | Save as `assets/photos/founder.jpg`. It fills the box by itself. |
| Owner testimonials (Proof) | Replace each `.quote-slot` box with the owner's real words or video. |
| First ads case study (Proof) | Replace the `.case` box once a client has real numbers. |

## 3. Booking

Every "See If You Qualify" button opens a 5-question form. Then it shows the
Calendly calendar for `zenith-co-consultation`.

- The answers go to Calendly as the prefilled answer to the event's **first
  custom question** (`a1`). In Calendly, make question 1 a multi-line text box
  such as "About your company". If you don't want that, set
  `calendlyAnswerParam: null`.
- To also send every submission to your CRM, set `formEndpoint` to a webhook
  URL, such as a GoHighLevel inbound webhook. It receives JSON with company,
  service_area, crews, monthly_ad_budget, phone, sms_consent, page, and
  submitted_at.
- If JavaScript is off, the buttons link straight to Calendly.

## 4. Copy rules used on the page

Short sentences in the owner's words. No em dashes. No "no X, no Y" lists. Say
each thing once. No invented numbers, testimonials, or clients.

Colors are green and blue: deep navy for the header, hero, demo, the deal,
the calculator, the closing section, and the footer; cool light gray and white
for the fit, outcome, proof, and FAQ sections; green (#34C77B) for buttons and
highlights only. No gradients, glows, or glass effects. Corners are square or
barely rounded.

Headlines are Barlow Condensed in caps; body text is Archivo. Each section opens
with a numbered title on a measuring-tape rule. The "Send a test lead" demo is
the only animation on the page.

## 5. Legal pages

`privacy.html` and `terms.html` use the same navy and green. Their body font is
Barlow, not Archivo. Their text was not changed.
The Terms still describe the old website and automation services and monthly
billing, so they need updating for the per-shown-estimate offer.
