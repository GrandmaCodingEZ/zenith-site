// The article list. This is the only place posts are listed. The blog index,
// the sitemap, llms.txt, the breadcrumbs, the Article schema and the related
// reading at the foot of every post all read from here.
//
//   slug         directory under /blog/
//   title        <h1> and schema headline; a question where possible
//   question     the question this post answers, for llms.txt
//   blurb        one line, used on the index and in sibling links
//   cluster      key in `clusters` below; decides siblings and the hub link
//   published /  ISO dates. Set `updated` when the substance changes.
//   updated
//
// Topics come from what owners actually ask on calls. When a question comes
// up three times, it gets a post.

export const clusters = {
  'speed-to-lead': {
    name: 'Leads into estimates',
    hub: '/how-it-works/',
    hubLabel: 'How it works',
    hubBlurb: 'The whole loop, from the ad to the yard.',
  },
  'paying-for-leads': {
    name: 'Paying for leads',
    hub: '/pricing/',
    hubLabel: 'Pricing',
    hubBlurb: 'What you pay us, and what never bills.',
  },
  'choosing-a-vendor': {
    name: 'Choosing who runs your ads',
    hub: '/about/',
    hubLabel: 'About Zenith Co.',
    hubBlurb: 'Who you would be working with.',
  },
};

export const posts = [
  {
    slug: 'how-fast-to-call-back-a-tree-service-lead',
    title: 'How fast do you have to call back a tree service lead?',
    question:
      'How quickly a tree service company has to reach a new lead before the homeowner books someone else, what the lead response research says, and how to hit that window while the crew is working.',
    blurb: 'Minutes, not hours. What the research says and how to do it from up a tree.',
    cluster: 'speed-to-lead',
    published: '2026-10-05',
  },
  {
    slug: 'are-facebook-leads-worth-it-for-tree-service',
    title: 'Are Facebook leads worth it for a tree service company?',
    question:
      'Whether Facebook and Instagram ad leads are worth paying for in tree work, why so many feel like tire kickers, and what changes the math.',
    blurb: 'Why they feel like tire kickers, and the two things that change that.',
    cluster: 'speed-to-lead',
    published: '2026-10-05',
  },
  {
    slug: 'how-to-cut-no-shows-on-tree-estimates',
    title: 'How do you cut no-shows on tree estimates?',
    question:
      'Why homeowners miss booked tree estimates and the specific steps that cut no-shows: booking in the first conversation, a firm time, a reminder the day before, and an easy way to move it.',
    blurb: 'Most no-shows are set up in the first conversation. Here is how to fix that.',
    cluster: 'speed-to-lead',
    published: '2026-10-05',
  },
  {
    slug: 'pay-per-lead-vs-pay-per-appointment-vs-retainer',
    title: 'Pay per lead, per appointment, or a retainer: which is better for a tree company?',
    question:
      'The three common ways a tree service company pays for marketing (a monthly retainer, a price per lead, a price per booked or shown appointment), what each one rewards, and where each one goes wrong.',
    blurb: 'Each model pays for something different. Pick the one that pays for what you want.',
    cluster: 'paying-for-leads',
    published: '2026-10-05',
  },
  {
    slug: 'shared-lead-sites-vs-your-own-ads',
    title: 'Shared lead sites or your own ads: which should a tree company use?',
    question:
      'How buying leads from shared lead sites compares with running ads in your own name for a tree service company: who else gets the lead, who owns the customer, and what you are left with when you stop.',
    blurb: 'Renting leads versus building your own. What you keep when you stop paying.',
    cluster: 'paying-for-leads',
    published: '2026-10-05',
  },
  {
    slug: 'how-much-should-a-tree-company-spend-on-ads',
    title: 'How much should a tree service company spend on ads?',
    question:
      'How a tree service company should set its ad budget: working back from job value and close rate, why very small budgets cannot tell you anything, and why Zenith Co. asks for at least $50 a day.',
    blurb: 'Work back from your own numbers. A budget method, not a guess.',
    cluster: 'paying-for-leads',
    published: '2026-10-05',
  },
  {
    slug: 'who-should-own-your-ad-accounts',
    title: 'Who should own your Google and Facebook ad accounts?',
    question:
      'Why a tree service company should own its ad accounts and pay the ad platforms on its own card, what goes wrong when an agency owns them, and how to check who owns yours today.',
    blurb: 'You should. Here is why, and how to check in five minutes.',
    cluster: 'choosing-a-vendor',
    published: '2026-10-05',
  },
  {
    slug: 'questions-to-ask-before-hiring-an-ads-agency',
    title: 'What should a tree company ask before hiring someone to run its ads?',
    question:
      'The questions a tree service owner should ask any agency or lead company before signing: what you pay for, who owns the accounts, who follows up the leads, how you leave, and whether they work for your competitor.',
    blurb: 'Eight questions, and the answers that should make you walk.',
    cluster: 'choosing-a-vendor',
    published: '2026-10-05',
  },
];
