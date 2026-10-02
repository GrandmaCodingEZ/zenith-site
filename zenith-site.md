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

## 2. Images and the slots still empty

The page uses no photos from clients or anyone else. The visuals are drawn in
HTML: the founder video box, a sample calendar week (labeled as an
illustrative example), the test lead phone, and simple browser outlines for
the two client sites. The share image (`assets/og-image.png`) follows the same
rule.

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

The look matches the services site that was live on 2026-10-02: a dark navy
page, quiet cards with thin borders, small green section labels, and product
mockups instead of photos. Green (#34C77B) is for buttons and highlights only.
No gradients, glows, glass effects, or emoji. Corners are barely rounded (4px).

Headlines and body text are both Archivo, mixed case. The "Send a test lead"
demo is the only animation on the page.

## 5. Legal pages

`privacy.html` and `terms.html` are light reading pages with a navy header,
set in Barlow. Their text was not changed.
The Terms still describe the old website and automation services and monthly
billing, so they need updating for the per-shown-estimate offer.
