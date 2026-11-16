// Everything you'd edit on the pre-call page (/pre-call/), in one place: the
// video, the questions and answers, and the results cards. Change it here, run
// `npm run build`, and the page picks it up.
//
// The answers repeat the homepage, /pricing/ and /how-it-works/. When the deal
// changes there, change it here too.

export const precall = {
  // STEP 1 VIDEO
  // TODO (Zac): paste the video link once it's recorded. It can be:
  //   a YouTube link   'https://youtu.be/XXXXXXXXXXX' or 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
  //   a Loom link      'https://www.loom.com/share/xxxxxxxxxxxxxxxx'
  //   a file in here   '/assets/video/pre-call.mp4' (MP4, H.264, under about 40 MB)
  // While it's null, Step 1 shows the "One lead, start to finish" card in its
  // place, so the page never has an empty player on it.
  video: {
    url: null,
    title: 'Zachary Spencer explains how Zenith Co. books estimates for tree companies',
    // Only used with an MP4 file: a 1280 by 720 frame shown before play.
    poster: null,
  },

  // QUESTIONS
  // Plain text, in the order they show. The first one starts open.
  //
  // TODO (Zac): each question can have its own short video. Paste a link on
  // its `video` line (YouTube, Loom, or a path to an MP4 in assets/video/,
  // same as the Step 1 video) and it plays above the written answer. While
  // the line is null, that question shows the written answer alone. The
  // scripts are in the site notes folder (PRE-CALL-QUESTION-SCRIPTS.md).
  faqs: [
    {
      q: "What's involved on your end?",
      video: null,
      a: "Give us access to your ad accounts and your calendar, and keep your open times current. Then show up at the booked time, walk the job and write the quote. We build and run the ads and the landing page, and we text and call every lead in your company's name. After each visit, you mark it shown or not shown.",
    },
    {
      // TODO (Zac): there's no time-to-first-lead number here on purpose. The
      // site has no client data to back one yet. Add a line once you have it.
      q: 'How fast do leads come in?',
      video: null,
      a: "Ads go live 1 to 2 weeks after the setup fee is paid and we have access to your ad accounts and calendar. Leads can start as soon as the ads are running. On the call I'll tell you what to expect for your area.",
    },
    {
      q: 'Are the leads exclusive to me?',
      video: null,
      a: "Yes. The ads run in ad accounts in your business's name and send homeowners to a landing page with your company on it, so those leads go to you and nobody else. We also take one tree company per service area. While you're in, we won't run ads for another tree company there.",
    },
    {
      q: 'Who pays for the ad spend?',
      video: null,
      a: 'You do, straight to the ad platforms on your own card, so you see every dollar they charge. Plan on at least $50 a day. You pay us a one-time setup fee, and after that a flat fee only for estimates where the homeowner showed up.',
    },
    {
      // This is the definition from the Terms and /pricing/. Keep them the same.
      q: 'What counts as a shown estimate?',
      video: null,
      a: "A homeowner booked through your ads, you showed up at the booked time, and they were there to walk the job. You mark each one within 3 business days. Leads outside your area, work you don't do, duplicate bookings and estimates you cancel never bill.",
    },
    {
      // TODO (Zac): your draft said the ad form filters by job type and
      // homeowner status. The site doesn't say that anywhere, so it's left out.
      // Add it back if the form really asks both.
      q: 'How do you make sure leads are qualified?',
      video: null,
      a: "The ads only show in the area written down when you sign up, and the landing page asks for the job details. We text and call every lead right away, aiming for under a minute, while they're still holding the phone. A lead outside your area or asking for work you don't do doesn't bill.",
    },
    {
      // No client dashboard exists, so this answers with what the owner can
      // already see: their own ad accounts, their calendar, the weekly bill.
      q: "How do I see what's happening?",
      video: null,
      a: "The ad accounts are in your business's name, so you see every dollar the platforms charge. Every booked estimate lands on your calendar with the homeowner's name, address and the job they described. We bill once a week, only for shown estimates.",
    },
    {
      q: "What happens if it doesn't work?",
      video: null,
      a: "A homeowner who isn't there doesn't bill. If the ads don't book anything, you've paid your ad spend and the setup fee, and no per-estimate fees. There is no long-term contract. Email us and the ads go off within 2 business days, and the ad accounts stay yours.",
    },
  ],

  // RECENT RESULTS
  // TODO (Zac): empty until there are real ads numbers. While it's empty the
  // page shows the three client sites and Jenniffer's video and no results
  // heading at all. Add a card and the "Recent results" row appears above them.
  //
  // Real numbers only, ones you can back up with the ad account and the
  // calendar, from a client who has said yes to being named. The page adds a
  // "Results vary" line under the cards by itself. Each card:
  //   client  the company name
  //   place   city and state
  //   stat    the headline number, kept short: '14 shown estimates in 30 days'
  //   detail  two or three sentences: what they spent, over how long, what came back
  //
  // Example shape (not a real client, don't publish it):
  //   { client: 'Company name', place: 'City, FL', stat: 'Headline number', detail: 'What ran, for how long, and what came of it.' },
  results: [],
};

export default precall;
