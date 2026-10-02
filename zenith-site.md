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

## 2. Drop in photos and screenshots

Each slot shows a labeled placeholder until its file exists. Save the file at
the path and it covers the placeholder by itself. No code changes needed.

| File                          | What                                         |
|-------------------------------|----------------------------------------------|
| `assets/photos/crew.jpg`      | Real tree work, landscape, 1600px+ wide      |
| `assets/photos/founder.jpg`   | Founder photo, portrait 4:5                  |
| `assets/work/atreesurgeons.jpg` | Homepage screenshot, 1600 x 1000           |
| `assets/work/kingstreecare.jpg` | Homepage screenshot, 1600 x 1000           |

Keep JPGs under about 300 KB each so the page stays fast on a phone.

These slots need an HTML edit when you have the content:

- **Founder video** (hero): replace the `.ph` box inside `<div class="media video">`
  with a YouTube/Vimeo `<iframe>` or a `<video>` tag.
- **Owner testimonials** (Proof): replace each `.quote` box with the owner's
  real words or video.
- **First ads case study** (Proof): replace `.slot-empty` once a client has real numbers.

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
each thing once. No invented numbers, testimonials, or clients. Green is only
for buttons, amber only for the key number in the calculator, and navy only for
the calculator band and the footer.

## 5. Legal pages

`privacy.html` and `terms.html` got the new look. Their text was not changed.
The Terms still describe the old website and automation services and monthly
billing, so they need updating for the per-shown-estimate offer.
