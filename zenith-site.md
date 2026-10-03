# Zenith Co. site: how to finish and edit it

The homepage (`index.html`) is a one-page sales letter with one job: get a
qualified tree company owner to book a call. It's plain HTML, CSS, and a
little JavaScript, with no build step. Push to `main` and GitHub Pages
serves it at zenithcomarketing.com.

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

The form choices for crews and ad budget are in `crewOptions` and
`budgetOptions`, in the same block. Match the budget ranges to your minimum.
The page says "a day" after the ad spend amount; the form asks for a monthly
budget, so its ranges start at $1,500 (about $50 a day).

## 2. Images and the slots still empty

The page uses no photos from clients or anyone else. The visuals are drawn in
HTML: a missed-calls phone screen and a sample calendar week (both labeled as
illustrative examples), the test lead phone, and simple browser outlines for
the two client sites. The share image (`assets/og-image.png`) follows the same
rule.

The one video is Jenniffer's testimonial, in the King's Tree Service card under
Our work, with her "Google ad" line beside it. It only loads when someone
presses play. The hero holds the founder video slot, not a testimonial; keep
it that way. Don't join quotes that weren't said together, and don't describe
her as an ads-program client: her work with us is the website and her Google
Ads.

Still to add:

| Slot | How |
|------|-----|
| Founder video (hero) | Replace the `.vph` block inside `<div class="video">` with a YouTube/Vimeo `<iframe>` or a `<video>` tag. |
| Founder photo (closing card) | Save as `assets/photos/founder.jpg`. It fills the box by itself. |
| A Tree Surgeons testimonial (Our work) | Replace the dashed `.v-ph` box with a `<video>` like the King's card, and update the caption with Fred's own words. Convert any phone video to MP4 (H.264) first; iPhone .mov files are HEVC and HDR, which many browsers can't play. |
| First ads case study (Our work) | Replace the `.case` box once a client has real numbers. |

## 3. Booking

Every "See if you qualify" button opens a 5-question form. Then it shows the
Calendly calendar for `zenith-co-consultation`. On phones, a bar with the same
button sits at the bottom of the screen between the hero and the closing card.
It hides while the form is open, while someone is typing, and while the test
lead demo plays.

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

The page order and copy came out of a review on 2026-10-02 against other
agencies selling booked or shown appointments (Etlio, Booked Then Built,
HomeWise, Tree Care Leadz, Tree Traction, Home Service Direct). Choices made
on purpose: no "is your area open" checker (there is no territory data behind
it), no third-party statistics, no scarcity lines, and the comparison with
retainers and lead sites stays three plain rows inside The deal.

## 5. Legal pages

`privacy.html` and `terms.html` are light reading pages with a navy header,
set in Barlow. The Terms were rewritten on 2026-10-02 for the per-shown-estimate
offer and keep the website and automation plans in their own section. They
are a draft: have a Florida attorney review them before they go live, and
email current clients 30 days before they take effect. The deal card and FAQ
on the homepage summarize the Terms; if one changes, change the other.
