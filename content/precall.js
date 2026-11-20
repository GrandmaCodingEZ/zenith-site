// Everything you'd edit on the pre-call page (/pre-call/), in one place: the
// video, the questions and answers, and the results cards. Change it here, run
// `npm run build`, and the page picks it up.
//
// The written answers under a video say what that video says. The rest of the
// site (the homepage, /pricing/, /how-it-works/, the Terms) should say the same
// deal. When the deal changes in one place, change it in the others.

export const precall = {
  // STEP 1 VIDEO
  // The link can be:
  //   a YouTube link   'https://youtu.be/XXXXXXXXXXX' or 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
  //   a Loom link      'https://www.loom.com/share/xxxxxxxxxxxxxxxx'
  //   a file in here   '/assets/video/pre-call.mp4' (MP4, H.264, under about 40 MB)
  // Set it to null and Step 1 shows the "One lead, start to finish" card in
  // its place, so the page never has an empty player on it.
  //
  // To swap in a new cut, replace assets/video/pre-call.mp4 and pre-call.jpg.
  // Export it with no black bars around the picture, and set `shape` to match.
  video: {
    url: '/assets/video/pre-call.mp4',
    title: 'Zachary Spencer explains how Zenith Co. books estimates for tree companies',
    // Only used with an MP4 file: one frame of the video, shown before play.
    poster: '/assets/video/pre-call.jpg',
    // The shape of the picture, so the player fits it with no black bars:
    //   'wide'    16:9, a screen recording or a phone held sideways (the default)
    //   'square'  1:1
    //   'tall'    9:16, a phone held upright
    shape: 'square',
  },

  // QUESTIONS
  // Plain text, in the order they show. The first one starts open.
  //
  // A question can have its own short video. It plays above the written
  // answer and stops when another question opens. The lines for it:
  //   video   a YouTube link, a Loom link, or a path to an MP4 in assets/video/
  //   poster  only with an MP4: one frame of it, shown before play
  //   shape   'wide', 'square' or 'tall', same as the Step 1 video
  // Leave `video` as null and the question shows its written answer alone.
  //
  // The videos open with the question read out loud, so each `q` is worded the
  // way it's said, and each `a` says what the video says. If you re-record
  // one, change its answer to match.
  faqs: [
    {
      // The "3 business days" line is from the Terms; the video doesn't say it.
      q: 'What counts as a shown appointment?',
      video: '/assets/video/pre-call-faq-shown-appointment.mp4',
      poster: '/assets/video/pre-call-faq-shown-appointment.jpg',
      shape: 'tall',
      a: "A homeowner in your service area meets you at the property for the estimate. That's the only time you pay us. If they don't show, cancel, or turn out to be outside your service area, you don't pay. You mark each visit shown or not shown within 3 business days. Whether the job closes is up to you.",
    },
    {
      // No video yet. The answer is what the Step 1 video says.
      q: 'How fast do leads come in?',
      video: null,
      a: "Once your ads are live, leads usually start coming in within 1 to 2 weeks. Every lead gets a text from us right away, and the faster you call them back, the more of them show up. On the call I'll tell you what to expect for your zip codes.",
    },
    {
      // No video yet. The answer is what the Step 1 video says.
      q: 'Who pays for the ad spend?',
      video: null,
      a: 'You do. It goes straight from your account to Facebook, not through us, so you see every dollar. We usually recommend around $50 a day. Our fee is separate: a $500 deposit to start, then $197 for each shown appointment.',
    },
    {
      q: 'Is there a long-term contract?',
      video: '/assets/video/pre-call-faq-contract.mp4',
      poster: '/assets/video/pre-call-faq-contract.jpg',
      shape: 'tall',
      a: "No. It's month to month. We start with a trial, so you see leads coming in before you commit to anything, and I'll go over how the trial works on the call. If it isn't working for you, you aren't locked in.",
    },
    {
      // Zac confirmed 2026-11-20: the deposit comes back if the trial doesn't
      // work out, and "working" is at least one shown appointment in the
      // first month. Section 9 of the Terms says the same. Keep them matched.
      q: "What if the ads don't work?",
      video: '/assets/video/pre-call-faq-if-it-doesnt-work.mp4',
      poster: '/assets/video/pre-call-faq-if-it-doesnt-work.jpg',
      shape: 'tall',
      a: "You only pay us the $197 when a homeowner shows up for the estimate. If nobody shows, you pay us nothing per appointment. What you put in is the $500 deposit and your ad spend, which goes straight to Facebook. If the trial doesn't bring at least one shown appointment in your first month, we refund the full deposit. We check the numbers with you during the trial, so you never have to guess whether it's working.",
    },
    {
      q: 'How is this different from Angi or Thumbtack?',
      video: '/assets/video/pre-call-faq-angi-thumbtack.mp4',
      poster: '/assets/video/pre-call-faq-angi-thumbtack.jpg',
      shape: 'tall',
      a: "On those sites you pay for a lead that usually goes to other companies too, so you're racing them to call back, and you pay whether the homeowner answers or not. With us the ads run for your business only, and we don't take another tree company in your zip codes. The homeowner is asking for you, not a list. And you pay per shown appointment, not per lead.",
    },
    {
      q: 'Do I need a website to run ads?',
      video: '/assets/video/pre-call-faq-website.mp4',
      poster: '/assets/video/pre-call-faq-website.jpg',
      shape: 'tall',
      // The video says a form inside Facebook. Zac may use a landing page for
      // some clients instead (his call), and either way no website is needed.
      a: "No. The ads can run on a form built into Facebook, so homeowners never have to leave the app. A lot of them will look you up on Google before the estimate, though, and a good website and good reviews make them more likely to show up. If you don't have those yet, we can help with both, but you don't need them to start.",
    },
    {
      q: 'What do I have to do on my end?',
      video: '/assets/video/pre-call-faq-your-end.mp4',
      poster: '/assets/video/pre-call-faq-your-end.jpg',
      shape: 'tall',
      a: 'Three things. Send us real photos and videos of your work, because real jobs beat stock photos every time. Give us access to your Facebook page so we can run the ads under your name. And when a lead comes in, call them as soon as you can. We handle the leads, the form and the follow-up text. You handle the closing.',
    },
    {
      q: 'Do you work with other tree companies in my area?',
      video: '/assets/video/pre-call-faq-other-companies.mp4',
      poster: '/assets/video/pre-call-faq-other-companies.jpg',
      shape: 'tall',
      a: "Not in your zip codes. Each client gets their own zip codes, and once they're taken, we don't add another tree company there. If I ran your ads and a competitor's down the road, you'd be bidding against each other, which is the opposite of what I want. I check that your zip codes are open before I run any ads.",
    },
    {
      // No video. Reworded 2026-11-20 to match the videos: the form is in
      // Facebook, we text the lead and the owner calls.
      // TODO (Zac): if the form asks for the job type or whether they own the
      // home, say so here.
      q: 'How do you make sure leads are qualified?',
      video: null,
      a: "The ads only show to homeowners in your zip codes, and each lead fills out a short form. They get a text back right away, and the sooner you call, the more of them show up. A lead outside your service area never bills, and neither does a homeowner who isn't there.",
    },
    {
      // No video. No client dashboard exists, so this answers with what the
      // owner already sees: their own ad spend, their leads, the trial numbers.
      q: "How do I see what's happening?",
      video: null,
      a: "Your ad spend goes straight from your account to Facebook, so you see every dollar. Every lead comes to you with what the homeowner put on the form, so you know who you're calling. And during the trial we go over the numbers with you, so you never have to guess whether it's working.",
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
