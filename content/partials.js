// Shared chrome, rendered into pages by build.mjs between <!-- build:NAME -->
// and <!-- /build:NAME --> markers.
//
//   nav       header on every page except the homepage (which keeps its own
//             in-page section links)
//   footer    every page, homepage included
//   booking   the five-question form and the Calendly step, every page
//   cta       the closing card, every page except the homepage
//   crumbs    breadcrumb trail above a page's headline
//   byline    author and date on articles
//   related   sibling articles and the hub, at the foot of each article
//   post-list the blog index
//
// One copy of each means a new page can't become an orphan and the booking
// form can't drift between pages.

import { site } from './site.js';
import { posts, clusters } from './posts.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

export const BRAND_MARK = `<svg viewBox="0 0 300 300" fill="none" aria-hidden="true">
        <path d="M46 206 L96 140 L138 194" stroke="#7FC8A9" stroke-width="9" stroke-linejoin="round" opacity=".55"/>
        <path d="M254 206 L204 140 L162 194" stroke="#7FC8A9" stroke-width="9" stroke-linejoin="round" opacity=".55"/>
        <path d="M78 208 L150 100 L222 208 Z" fill="#0B1520" stroke="#7FC8A9" stroke-width="9" stroke-linejoin="round"/>
        <path d="M96 140 L112 161 L104 170 L96 158 L88 170 L80 161 Z" fill="#FFFFFF"/>
        <path d="M204 140 L220 161 L212 170 L204 158 L196 170 L188 161 Z" fill="#FFFFFF"/>
        <path d="M150 100 L180 145 L169 158 L160 140 L150 156 L140 139 L130 159 L120 145 Z" fill="#FFFFFF"/>
        <circle cx="150" cy="150" r="139" stroke="#7FC8A9" stroke-width="9"/>
      </svg>`;

const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

export const navLinks = [
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/work/', label: 'Our work' },
  { href: '/blog/', label: 'Articles' },
  { href: '/about/', label: 'About' },
];

// The button every page uses. Without JavaScript it is a plain link to
// Calendly; with it, assets/book.js opens the five-question form first.
export const bookButton = (label = 'See if you qualify', cls = 'btn') =>
  `<a class="${cls}" href="${site.booking.calendly}" data-book>${label}${cls === 'btn' ? ARROW : ''}</a>`;

// A link is current when it points at this page or at a section this page
// belongs to (an article belongs to /blog/, a case study to /work/).
function current(href, url) {
  return url === href || (href !== '/' && url.startsWith(href));
}

export function renderNav(page) {
  const links = (indent) =>
    navLinks
      .map(
        (l) =>
          `${indent}<a href="${l.href}"${current(l.href, page.url) ? ' aria-current="page"' : ''}>${l.label}</a>`
      )
      .join('\n');

  return `<header class="nav">
  <div class="wrap nav-in">
    <a href="/" class="brand" aria-label="Zenith Co. home">
      ${BRAND_MARK}
      <span>Zenith Co.</span>
    </a>
    <nav class="nav-links" aria-label="Site">
${links('      ')}
    </nav>
    ${bookButton('See if you qualify', 'btn btn-sm nav-cta')}
    <details class="menu">
      <summary>Menu</summary>
      <nav class="menu-panel" aria-label="Site">
${links('        ')}
        ${bookButton()}
      </nav>
    </details>
  </div>
</header>`;
}

export const footerColumns = [
  {
    heading: 'Site',
    links: [
      { href: '/how-it-works/', label: 'How it works' },
      { href: '/pricing/', label: 'Pricing' },
      { href: '/work/', label: 'Our work' },
      { href: '/blog/', label: 'Articles' },
      { href: '/about/', label: 'About' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { href: `mailto:${site.email}`, label: site.email },
      { href: site.booking.calendly, label: 'See if you qualify', book: true },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/privacy.html', label: 'Privacy Policy' },
      { href: '/terms.html', label: 'Terms of Service' },
    ],
  },
];

export function renderFooter() {
  const cols = footerColumns
    .map(
      (col) =>
        `<div><p class="foot-h">${col.heading}</p>${col.links
          .map((l) => `<a href="${l.href}"${l.book ? ' data-book' : ''}>${l.label}</a>`)
          .join('')}</div>`
    )
    .join('\n        ');

  return `<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        <a href="/" class="brand" aria-label="Zenith Co. home">
          ${BRAND_MARK}
          <span>Zenith Co.</span>
        </a>
        <p class="foot-note">Paid ads for established Florida tree companies, billed per shown estimate.</p>
      </div>
      <div class="foot-cols">
        ${cols}
      </div>
    </div>
    <p class="copy">&copy; <span id="yr">${new Date().getFullYear()}</span> Zenith Co Marketing, LLC</p>
  </div>
</footer>`;
}

// The five-question form, then Calendly. assets/book.js drives it.
export function renderBooking() {
  return `<dialog class="book" id="book" aria-labelledby="book-h">
  <div class="book-head">
    <h2 id="book-h">See if you qualify</h2>
    <button class="x" type="button" data-close>Close</button>
  </div>
  <div class="book-body">
    <form id="qual" novalidate>
      <div class="fld">
        <label for="f-company">Company name</label>
        <input id="f-company" name="company" type="text" autocomplete="organization" required>
      </div>
      <div class="fld">
        <label for="f-area">Service area</label>
        <input id="f-area" name="area" type="text" placeholder="Counties or cities you work" aria-describedby="f-area-hint" required>
        <p class="hint" id="f-area-hint">List every county you want covered.</p>
      </div>
      <div class="fld">
        <label for="f-crews">Number of crews</label>
        <select id="f-crews" name="crews" required><option value="">Pick one</option></select>
      </div>
      <div class="fld">
        <label for="f-budget">Monthly ad budget</label>
        <select id="f-budget" name="budget" required><option value="">Pick a range</option></select>
      </div>
      <div class="fld">
        <label for="f-phone">Cell phone</label>
        <input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
      </div>
      <label class="consent">
        <input type="checkbox" name="sms_consent" value="yes">
        <span><b>Text me about my booking.</b> By checking this box, you agree to receive text messages from Zenith Co. at the number above about your inquiry and your appointment, including reminders. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase. See our <a href="/privacy.html" target="_blank">Privacy Policy</a> and <a href="/terms.html" target="_blank">Terms of Service</a>.</span>
      </label>
      <div class="hp" aria-hidden="true"><label for="f-url">Leave this empty</label><input id="f-url" name="url_hp" type="text" tabindex="-1" autocomplete="off"></div>
      <p class="err" id="f-err" role="alert"></p>
      <button class="btn" type="submit">Next: pick a time</button>
    </form>

    <div id="step-cal" hidden>
      <p>Thanks. Pick a time to talk with Zachary.</p>
      <div class="cal-wrap">
        <p class="cal-wait" aria-hidden="true">Loading the calendar&hellip;</p>
        <iframe class="cal-frame" id="cal" title="Book a call with Zenith Co."></iframe>
      </div>
    </div>
  </div>
</dialog>`;
}

// The closing card, the same one the homepage ends on.
export function renderCta() {
  return `<section class="sec" aria-labelledby="final-h">
  <div class="wrap">
    <div class="card final">
      <div class="fin-main">
        <h2 id="final-h">Keep your crews <span class="accent">booked.</span></h2>
        <p class="who">If your crews can take on more estimates, answer five questions and pick a time to talk.</p>
        ${bookButton()}
      </div>
      <div class="fin-side">
        <div class="founder">
          <div class="fph"><span aria-hidden="true">ZS</span><img src="/assets/photos/founder.jpg" alt="Zachary Spencer, founder of Zenith Co." loading="lazy" decoding="async" onload="this.classList.add('ok')" onerror="this.remove()"></div>
          <div class="f-id"><b>${site.founder.name}</b><span>Founder, Zenith Co.</span></div>
        </div>
        <p class="f-note">You'll be talking to me on the call.</p>
        <p class="f-mail"><span>Questions before then?</span><a href="mailto:${site.email}"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 4l6 5 6-5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span>zachary@<wbr>zenithcomarketing.com</span></a></p>
      </div>
    </div>
  </div>
</section>`;
}

// Home and each parent level. The page itself is left off: its headline sits
// right under the trail.
export function renderCrumbs(trail) {
  if (!trail || trail.length < 2) return '';
  const parents = trail.slice(0, -1);
  return `<nav class="crumbs" aria-label="Breadcrumb">${parents
    .map((c) => `<a href="${c.path}">${esc(c.name)}</a>`)
    .join('<span aria-hidden="true">/</span>')}</nav>`;
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}

export function renderByline(post) {
  const date = post.updated || post.published;
  const label = post.updated ? 'Updated' : 'Published';
  return `<p class="byline"><span class="by-ph"><img src="/assets/photos/founder.jpg" alt="" width="40" height="40" loading="lazy" decoding="async"></span><span>By <a href="/about/">${site.founder.name}</a>, founder of Zenith Co.<br>${label} <time datetime="${date}">${formatDate(date)}</time></span></p>`;
}

// Up to three siblings from the same cluster, plus the page that cluster feeds,
// so no article is a dead end.
export function renderRelated(post) {
  const cluster = clusters[post.cluster];
  const siblings = posts.filter((p) => p.cluster === post.cluster && p.slug !== post.slug).slice(0, 3);
  const cards = siblings.map(
    (p) => `      <a class="rel" href="/blog/${p.slug}/"><b>${esc(p.title)}</b><span>${esc(p.blurb)}</span></a>`
  );
  if (cluster) {
    cards.push(
      `      <a class="rel rel-hub" href="${cluster.hub}"><b>${cluster.hubLabel}</b><span>${cluster.hubBlurb}</span></a>`
    );
  }
  return `<section class="related" aria-labelledby="rel-h">
  <div class="wrap narrow">
    <h2 id="rel-h">Keep reading</h2>
    <div class="rel-grid">
${cards.join('\n')}
    </div>
  </div>
</section>`;
}

// The blog index, grouped by cluster, newest first inside each group.
export function renderPostList() {
  return Object.keys(clusters)
    .filter((key) => posts.some((p) => p.cluster === key))
    .map((key) => {
      const cluster = clusters[key];
      const items = posts
        .filter((p) => p.cluster === key)
        .sort((a, b) => (a.published < b.published ? 1 : -1));
      return `<section class="cluster">
  <div class="cluster-head">
    <h2>${cluster.name}</h2>
    <a class="link" href="${cluster.hub}">${cluster.hubLabel}</a>
  </div>
  <div class="post-list">
${items
  .map(
    (p) => `    <a class="post-row" href="/blog/${p.slug}/">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.blurb)}</p>
      <span class="post-date"><time datetime="${p.published}">${formatDate(p.published)}</time></span>
    </a>`
  )
  .join('\n')}
  </div>
</section>`;
    })
    .join('\n');
}
