// One source of truth for the business facts that appear in schema, llms.txt,
// meta tags and the booking form.
//
// The AEO rule that governs this file: whatever ends up in structured data gets
// quoted back to buyers word for word, so a stale value here is a stale value
// coming out of ChatGPT. Update it in the same commit as the copy it describes.
//
// No fees live here on purpose. The setup fee and the per-estimate fee are set
// on the call, so the only numbers published are the ones the homepage already
// states: the $50 a day minimum ad spend and the 1 to 2 week start.

export const site = {
  name: 'Zenith Co.',
  url: 'https://zenithcomarketing.com',
  email: 'zachary@zenithcomarketing.com',

  description:
    'Paid ads for established Florida tree service companies. Every lead gets a text and a call in your company\'s name, aiming for under a minute, and a time on your calendar. You pay per estimate where the homeowner shows. One company per service area.',

  // The paragraph that opens llms.txt: what the business is and who it is for.
  // Re-read it whenever the offer changes. Whatever is in it is what
  // assistants will say about us.
  summary:
    'Zenith Co. runs paid ads for established Florida tree service companies and books the resulting leads as estimates on the owner\'s calendar. Every lead gets a text and a call in the tree company\'s name, aiming for under a minute, then a reminder before the visit. The tree company pays its ad spend on its own card, in ad accounts in its own name, plus a one-time setup fee and a flat fee for each estimate where the homeowner was there. Leads that do not show, fall outside the service area, or ask for work the company does not do are not billed. Zenith Co. takes one tree company per service area and has no long-term contract. It is run by its founder, Zachary Spencer.',

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
    'Billing: ad spend paid directly to the ad platforms on the client\'s own card; a one-time setup fee; a flat fee per shown estimate, billed weekly. Both fees are set on the call, based on the area and the mix of jobs.',
    'What counts as shown: a homeowner booked through the ads, the company showed up at the booked time, and the homeowner was there to walk the job.',
    'Not billed: leads outside the service area, leads asking for work the company does not do, homeowners who do not show, duplicate bookings, estimates the company cancels.',
    'Marking: the company marks each estimate shown or not shown within 3 business days. Unmarked estimates count as shown. Billing questions within 14 days of a bill are checked against the records and credited if they did not count.',
    'Exclusivity: one tree company per service area. The area is written down at sign-up.',
    'Term: no long-term contract. Email and the ads go off within 2 business days.',
    'Start: ads go live 1 to 2 weeks after setup is paid and access is granted.',
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
    'Appointment setting for home service companies',
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
    crewOptions: ['None yet, just me', '1 crew', '2 crews', '3 to 4 crews', '5 or more crews'],
    budgetOptions: ['Under $1,500', '$1,500 to $3,000', '$3,000 to $5,000', 'More than $5,000', 'Not sure yet'],
  },
};

export default site;
