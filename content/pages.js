// The page registry. One entry per page that exists on disk.
//
// The sitemap, llms.txt, the breadcrumbs and the head/schema injection all read
// from this list, so adding a page means adding one entry here and running
// `npm run build`.
//
//   file      path on disk, relative to the repo root
//   url       the path it is served at
//   crumb     short name for this level in a breadcrumb trail
//   kind      home | about | hub | process | pricing | case-study
//   question  the question this page answers, in one line. llms.txt publishes
//             this instead of the title, because it is what an engine matches
//             against when it decides which page to pull.
//   group     the llms.txt heading it is listed under
//   faq       true if the page has FAQ <details> blocks to lift into FAQPage schema
//   og        optional { title, description } when the share card should read
//             differently from the <title>
//   priority / changefreq  sitemap hints
//
// privacy.html, terms.html and terms-draft.html are noindex and stay out of
// this list, so they stay out of the sitemap and llms.txt too.

export const pages = [
  {
    file: 'index.html',
    url: '/',
    crumb: 'Home',
    kind: 'home',
    group: 'Core pages',
    question:
      'What Zenith Co. does for a Florida tree service company: runs its ads, texts and calls every lead, books estimates on its calendar, and bills only for estimates where the homeowner showed up. Who qualifies, and how to book a call.',
    faq: true,
    priority: '1.0',
    changefreq: 'weekly',
    og: {
      title: 'Booked estimates. You only pay when the homeowner shows up.',
      description:
        'Paid ads for established Florida tree companies, billed per shown estimate. One company per service area.',
    },
  },
  {
    file: 'how-it-works/index.html',
    url: '/how-it-works/',
    crumb: 'How it works',
    kind: 'process',
    group: 'Core pages',
    question:
      'Step by step, what happens between a homeowner tapping a tree company\'s ad and the owner standing in their yard: the landing page, the text and call, the booking, the reminder, and how each estimate gets marked shown or not shown.',
    faq: true,
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    file: 'pricing/index.html',
    url: '/pricing/',
    crumb: 'Pricing',
    kind: 'pricing',
    group: 'Core pages',
    question:
      'How Zenith Co. charges: ad spend on the client\'s own card, a one-time setup fee, and a flat fee per shown estimate. What counts as shown, what never bills, how disputes work, and why the fees are set on a call instead of published.',
    faq: true,
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    file: 'about/index.html',
    url: '/about/',
    crumb: 'About',
    kind: 'about',
    group: 'Core pages',
    question:
      'Who runs Zenith Co., why it works with Florida tree companies only, why it takes one company per service area, and who it turns away.',
    faq: true,
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    file: 'work/index.html',
    url: '/work/',
    crumb: 'Our work',
    kind: 'hub',
    group: 'Client work',
    question:
      'Which tree service companies Zenith Co. has built for, what it built for each, and why no lead or revenue numbers are published yet.',
    faq: false,
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    file: 'work/kings-tree-service/index.html',
    url: '/work/kings-tree-service/',
    crumb: "King's Tree Service",
    kind: 'case-study',
    group: 'Client work',
    question:
      "What Zenith Co. built and runs for King's Tree Service in Palm Bay, Florida: the website, the photo estimate form, the job gallery and its Google Ads, with the co-owner's own words on the ads.",
    faq: true,
    priority: '0.6',
    changefreq: 'yearly',
  },
  {
    file: 'work/a-tree-surgeons/index.html',
    url: '/work/a-tree-surgeons/',
    crumb: 'A Tree Surgeons Enterprise',
    kind: 'case-study',
    group: 'Client work',
    question:
      'What Zenith Co. built for A Tree Surgeons Enterprise in Tampa, its first client: the website with an estimate form on the first screen, the missed-call text back, and review requests after each job.',
    faq: true,
    priority: '0.6',
    changefreq: 'yearly',
  },
  {
    file: 'blog/index.html',
    url: '/blog/',
    crumb: 'Articles',
    kind: 'hub',
    group: 'Articles',
    question:
      'Plain answers for tree service owners on paid ads, lead response, no-shows and how to pay for marketing, written by Zachary Spencer.',
    faq: false,
    priority: '0.7',
    changefreq: 'weekly',
  },
];
