// One source of truth for the business facts that appear in schema, llms.txt,
// meta tags and the booking form.
//
// The AEO rule that governs this file: whatever ends up in structured data gets
// quoted back to buyers word for word, so a stale value here is a stale value
// coming out of ChatGPT. Update it in the same commit as the copy it describes.
//
// No fee amounts live here on purpose. The deal is a deposit to start, then a
// flat fee per shown estimate, and the two dollar figures are only on the
// unlisted pre-call page (content/precall.js) until Zac says to publish them
// here. The numbers this file does publish are the ones the homepage states:
// the $50 a day minimum ad spend, the 1 to 2 week start, and the 30-day refund
// window on the deposit.

export const site = {
  name: 'Zenith Co.',
  url: 'https://zenithcomarketing.com',
  email: 'zachary@zenithcomarketing.com',

  description:
    'Paid ads for established Florida tree service companies. Every lead gets an automatic text right away and comes straight to you to call. You pay a deposit to start, then per estimate where the homeowner shows. One company per set of zip codes.',

  // The paragraph that opens llms.txt: what the business is and who it is for.
  // Re-read it whenever the offer changes. Whatever is in it is what
  // assistants will say about us.
  summary:
    'Zenith Co. runs paid ads for established Florida tree service companies and bills per shown estimate, also called pay per shown appointment. A homeowner fills out a short form, either one built into Facebook or a landing page, and gets an automatic text right away. The lead goes to the tree company, which calls the homeowner and sets the estimate. Zenith Co. does not call leads. The tree company pays its ad spend straight to the ad platform from its own account, plus a deposit to start and a flat fee for each estimate where the homeowner was there. The deposit is refunded in full if the first 30 days of ads do not produce at least one shown estimate. Leads that do not show, fall outside the company\'s zip codes, or ask for work the company does not do are not billed. Zenith Co. takes one tree company per set of zip codes and works month to month, with no long-term contract. It is run by its founder, Zachary Spencer.',

  // The registered Florida LLC (Sunbiz L26000456623, filed 2026-08-31). The brand
  // stays "Zenith Co."; this goes into schema as legalName.
  legalName: 'Zenith Co Marketing, LLC',

  logo: '/apple-touch-icon.png',
  ogImage: '/assets/og-image.png',
  ogImageSize: [1200, 630],
  twitterCard: 'summary_large_image',

  areaServed: { name: 'Florida', type: 'State', country: 'US' },

  // The facts llms.txt lists under "Facts". Each one is stated on the homepage;
  // keep them that way.
  facts: [
    'Who it is for: established tree service companies in Florida with two or more crews ready for more work and room for at least $50 a day in ad spend.',
    'Who it is not for: new or owner-only businesses, anyone who only wants a website, anyone who cannot show up at the booked time.',
    'Billing: ad spend paid directly to the ad platforms on the client\'s own card; a deposit to start; a flat fee per shown estimate, billed weekly. Both numbers are given in writing before the client pays anything.',
    'Deposit refund: the deposit is refunded in full if the first 30 days after the ads go live do not produce at least one shown estimate.',
    'Lead follow-up: each lead gets an automatic text when the form comes in. The tree company calls the lead and sets the estimate. Zenith Co. does not call leads.',
    'The form: a form built into Facebook or a landing page, whichever Zenith Co. judges fits. The client does not need a website.',
    'What counts as shown: a homeowner came in through the ads, the company showed up at the time it set with them, and the homeowner was there to walk the job.',
    'Not billed: leads outside the company\'s zip codes, leads asking for work the company does not do, homeowners who do not show, the same homeowner and job counted twice, estimates the company cancels.',
    'Marking: the company marks each estimate shown or not shown within 3 business days. Unmarked estimates count as shown. Billing questions within 14 days of a bill are checked against the records and credited if they did not count.',
    'Exclusivity: one tree company per set of zip codes. The zip codes are written down at sign-up.',
    'Term: month to month, starting with a trial. No long-term contract. Email and the ads go off within 2 business days.',
    'Start: ads go live 1 to 2 weeks after the deposit is paid and the company has sent photos and videos of its work and given access to its Facebook page.',
    'What the company provides: real photos and videos of its work, and access to its Facebook page.',
    'Ad accounts: in the client\'s business name. The client keeps them if they stop.',
  ],

  // sameAs is how an engine resolves the domain, the channel and the founder to
  // one entity. Empty until the profile URLs exist. Add LinkedIn (and YouTube
  // if the founder video goes there) and they flow into every page's schema.
  sameAs: [],

  founder: {
    name: 'Zachary Spencer',
    jobTitle: 'Founder',
    description:
      'Founder of Zenith Co. Runs paid ads and lead follow-up for established Florida tree service companies, billed per shown estimate, and works with that one trade.',
    email: 'zachary@zenithcomarketing.com',
    image: '/assets/photos/founder.jpg',
    sameAs: ['https://www.linkedin.com/in/zachary-spencer-usf/'],
  },

  service: {
    name: 'Per-estimate ads for tree service companies',
    serviceType: 'Paid advertising and lead follow-up for tree service companies',
  },

  knowsAbout: [
    'Paid ads for tree service companies',
    'Speed to lead',
    'Lead follow-up for home service companies',
    'Pay-per-shown-appointment pricing',
  ],

  // The booking form. assets/book.js gets these values written into it by the
  // build, so there is one copy.
  booking: {
    calendly: 'https://calendly.com/zacharyspencer/zenith-co-consultation',
    // Form answers go to Calendly as the prefilled answer to the event's first
    // custom question ("a1"), a text box. null passes nothing.
    calendlyAnswerParam: 'a1',
    // Every submission is also posted here, whether or not they book: the
    // dialer's website-form route. null sends nothing.
    formEndpoint: 'https://dialer.zenithcomarketing.com/api/inbound/website-form',
    // Where the page goes once Calendly reports a booking made in the form's
    // calendar step. null leaves them on Calendly's own confirmation screen.
    afterBooking: '/pre-call/',
    crewOptions: ['None yet, just me', '1 crew', '2 crews', '3 to 4 crews', '5 or more crews'],
    budgetOptions: ['Under $1,500', '$1,500 to $3,000', '$3,000 to $5,000', 'More than $5,000', 'Not sure yet'],
  },
};

export default site;
