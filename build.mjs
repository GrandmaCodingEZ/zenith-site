#!/usr/bin/env node
// Zenith Co. static build step.
//
// Generates robots.txt, sitemap.xml and llms.txt, writes the booking settings
// into assets/book.js, and fills the marked blocks in every page:
//
//   head-meta  canonical + Open Graph + Twitter tags
//   schema     the JSON-LD entity graph, plus page, breadcrumb, article and FAQ nodes
//   nav, footer, booking, cta, crumbs, byline, related, post-list
//              shared HTML from content/partials.js
//
// A block is the text between <!-- build:NAME --> and <!-- /build:NAME -->.
// Everything outside the markers is hand-written and left alone.
//
// Everything it writes is committed. GitHub Pages serves the repo as-is, so
// this runs locally before a push, not in CI.
//
//   node build.mjs          write the files
//   node build.mjs --check  fail if anything is out of date (nothing written)

import { readFileSync as readRaw, writeFileSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { site } from './content/site.js';
import { pages } from './content/pages.js';
import { posts, clusters } from './content/posts.js';
import {
  renderNav,
  renderFooter,
  renderBooking,
  renderCta,
  renderCrumbs,
  renderByline,
  renderRelated,
  renderPostList,
} from './content/partials.js';

// Read as LF whatever the checkout uses (git on Windows writes CRLF), so a
// --check on Windows compares like with like.
const readFileSync = (path, enc) => readRaw(path, enc).replace(/\r\n/g, '\n');

const root = dirname(fileURLToPath(import.meta.url));
const checkOnly = process.argv.includes('--check');
const written = [];
const stale = [];
const titles = new Map(); // page url -> <title>, filled by buildPages for llms.txt

/* ---------------------------------------------------------------- helpers */

const abs = (path) => site.url + (path.startsWith('/') ? path : '/' + path);

function decodeEntities(text) {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/&times;/g, 'x')
    .replace(/&middot;/g, '·')
    .replace(/&#8209;/g, '-')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim();
}

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// JSON-LD lives inside a <script> tag, so the one sequence that must never
// appear raw is "</script>". Escaping every "<" covers it.
const jsonLd = (obj) => JSON.stringify(obj, null, 2).replace(/</g, '\\u003C');

function tagValue(html, re) {
  const m = html.match(re);
  return m ? decodeEntities(m[1]) : '';
}

function lastModified(file) {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (iso) return iso.slice(0, 10);
  } catch {
    /* not a git checkout, or the file is untracked: fall through */
  }
  return statSync(join(root, file)).mtime.toISOString().slice(0, 10);
}

function replaceBlock(html, marker, body, { optional = false, open, close } = {}) {
  open = open || `<!-- build:${marker} -->`;
  close = close || `<!-- /build:${marker} -->`;
  const start = html.indexOf(open);
  const end = html.indexOf(close);
  if (start === -1 || end === -1) {
    if (optional) return html;
    throw new Error(`missing ${open} ... ${close} markers`);
  }
  return html.slice(0, start + open.length) + '\n' + body + '\n' + html.slice(end);
}

function put(file, next) {
  const path = join(root, file);
  let current = null;
  try {
    current = readFileSync(path, 'utf8');
  } catch {
    /* new file */
  }
  if (current === next) return;
  if (checkOnly) {
    stale.push(file);
    return;
  }
  writeFileSync(path, next);
  written.push(file);
}

/* ------------------------------------------------------- FAQ extraction --
 * The FAQ copy has one home: the HTML. Schema is derived from it so the two
 * cannot drift, because whatever sits in FAQPage schema is what gets quoted
 * back to a buyer word for word. Every page writes its FAQs the way the
 * homepage does:
 *
 *   <details><summary>Question</summary><div class="a"><p>Answer</p></div></details>
 */
function extractFaqs(html) {
  const faqs = [];
  // Neither part may cross into another <details> or <summary>: the nav's Menu
  // is a <details> too, and a lazy match would run from it into the first FAQ.
  const re =
    /<details[^>]*>\s*<summary>((?:(?!<\/?summary|<details)[\s\S])*?)<\/summary>\s*<div class="a">((?:(?!<\/details>|<details)[\s\S])*?)<\/div>\s*<\/details>/g;
  let m;
  while ((m = re.exec(html))) {
    const question = decodeEntities(m[1]);
    const answer = decodeEntities(m[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

/* ------------------------------------------------------- the entity graph */

const ID = {
  org: `${site.url}/#organization`,
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  service: `${site.url}/#service`,
};

const areaServed = {
  '@type': site.areaServed.type,
  name: site.areaServed.name,
  containedInPlace: { '@type': 'Country', name: site.areaServed.country },
};

function entityGraph() {
  const organization = {
    '@type': 'Organization',
    '@id': ID.org,
    name: site.name,
    url: site.url + '/',
    description: site.description,
    email: site.email,
    logo: { '@type': 'ImageObject', url: abs(site.logo) },
    areaServed,
    founder: { '@id': ID.person },
    knowsAbout: site.knowsAbout,
  };
  if (site.sameAs.length) organization.sameAs = site.sameAs;

  const person = {
    '@type': 'Person',
    '@id': ID.person,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    description: site.founder.description,
    email: site.founder.email,
    image: abs(site.founder.image),
    url: site.url + '/about/',
    worksFor: { '@id': ID.org },
  };
  if (site.founder.sameAs.length) person.sameAs = site.founder.sameAs;

  const website = {
    '@type': 'WebSite',
    '@id': ID.website,
    url: site.url + '/',
    name: site.name,
    description: site.description,
    inLanguage: 'en-US',
    publisher: { '@id': ID.org },
  };

  // No prices. The fees are set on the call, so there is no number here to go
  // stale; the billing model itself is the description.
  const service = {
    '@type': 'Service',
    '@id': ID.service,
    name: site.service.name,
    serviceType: site.service.serviceType,
    description: site.summary,
    provider: { '@id': ID.org },
    areaServed,
    audience: { '@type': 'BusinessAudience', name: 'Tree service companies' },
  };

  return [organization, person, website, service];
}

const PAGE_TYPE = {
  home: 'WebPage',
  about: 'AboutPage',
  hub: 'CollectionPage',
  'case-study': 'WebPage',
  process: 'WebPage',
  pricing: 'WebPage',
  post: 'WebPage',
};

// Each post in content/posts.js is projected into the page registry's shape,
// so the head, schema, nav, footer, sitemap and llms.txt treat it like a page.
const postAsPage = (post) => ({
  file: `blog/${post.slug}/index.html`,
  url: `/blog/${post.slug}/`,
  crumb: post.title,
  kind: 'post',
  group: 'Articles',
  question: post.question,
  faq: true,
  priority: '0.6',
  changefreq: 'yearly',
  post,
});

const allPages = [...pages, ...posts.map(postAsPage)];

// Breadcrumb trail from the URL path, naming each level from the registry.
function trail(page) {
  const items = [{ name: 'Home', path: '/' }];
  if (page.url === '/') return items;
  let path = '';
  for (const segment of page.url.split('/').filter(Boolean)) {
    path += '/' + segment;
    const match = allPages.find((p) => p.url === path + '/' || p.url === path);
    if (!match) throw new Error(`${page.file}: no registry entry for ${path}/ in its breadcrumb`);
    items.push({ name: match.crumb, path: match.url });
  }
  return items;
}

function breadcrumbNode(page) {
  if (page.url === '/') return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': abs(page.url) + '#breadcrumb',
    itemListElement: trail(page).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

function pageSchema(page, html, title, description) {
  const graph = entityGraph();
  const pageId = abs(page.url) + '#webpage';

  const webPage = {
    '@type': PAGE_TYPE[page.kind] || 'WebPage',
    '@id': pageId,
    url: abs(page.url),
    name: title,
    description,
    isPartOf: { '@id': ID.website },
    about: { '@id': page.kind === 'about' ? ID.person : ID.service },
    inLanguage: 'en-US',
    publisher: { '@id': ID.org },
  };
  if (page.kind === 'about') webPage.mainEntity = { '@id': ID.person };
  const crumbs = breadcrumbNode(page);
  if (crumbs) webPage.breadcrumb = { '@id': crumbs['@id'] };
  graph.push(webPage);
  if (crumbs) graph.push(crumbs);

  // Every article names the same Person as its author, by id. Engines look
  // for an expert to cite; a post published by a logo does worse.
  if (page.post) {
    const { post } = page;
    graph.push({
      '@type': 'Article',
      '@id': abs(page.url) + '#article',
      headline: post.title,
      description,
      author: { '@id': ID.person },
      publisher: { '@id': ID.org },
      datePublished: post.published,
      dateModified: post.updated || post.published,
      image: abs(site.ogImage),
      inLanguage: 'en-US',
      isPartOf: { '@id': ID.website },
      mainEntityOfPage: { '@id': pageId },
      articleSection: clusters[post.cluster]?.name || 'Articles',
      about: { '@id': ID.service },
    });
  }

  if (page.faq) {
    const faqs = extractFaqs(html);
    if (!faqs.length) throw new Error(`${page.file}: marked faq: true but no FAQ <details> found`);
    graph.push({
      '@type': 'FAQPage',
      '@id': abs(page.url) + '#faq',
      isPartOf: { '@id': pageId },
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return `<script type="application/ld+json">\n${jsonLd({
    '@context': 'https://schema.org',
    '@graph': graph,
  })}\n</script>`;
}

/* ------------------------------------------------------------- head meta */

function headMeta(page, title, description) {
  const url = abs(page.url);
  const ogTitle = attr(page.og?.title || title);
  const ogDesc = attr(page.og?.description || description);
  const [w, h] = site.ogImageSize;
  return [
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${page.post ? 'article' : 'website'}">`,
    `<meta property="og:site_name" content="${site.name}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${ogTitle}">`,
    `<meta property="og:description" content="${ogDesc}">`,
    `<meta property="og:image" content="${abs(site.ogImage)}">`,
    `<meta property="og:image:width" content="${w}">`,
    `<meta property="og:image:height" content="${h}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta name="twitter:card" content="${site.twitterCard}">`,
    `<meta name="twitter:title" content="${ogTitle}">`,
    `<meta name="twitter:description" content="${ogDesc}">`,
    `<meta name="twitter:image" content="${abs(site.ogImage)}">`,
  ].join('\n');
}

/* ------------------------------------------------------------ generators */

function buildPages() {
  for (const page of allPages) {
    const html = readFileSync(join(root, page.file), 'utf8');

    // Title and description stay in the HTML; the build reads them rather
    // than owning a second copy.
    const title = tagValue(html, /<title>([\s\S]*?)<\/title>/);
    const description = tagValue(html, /<meta name="description" content="([^"]*)"/);
    if (!title || !description) throw new Error(`${page.file}: missing <title> or meta description`);
    titles.set(page.url, page.post ? page.post.title : title);

    let next = replaceBlock(html, 'head-meta', headMeta(page, title, description));
    next = replaceBlock(next, 'schema', pageSchema(page, html, title, description));
    next = replaceBlock(next, 'footer', renderFooter(page));
    next = replaceBlock(next, 'booking', renderBooking());
    next = replaceBlock(next, 'nav', renderNav(page), { optional: true });
    next = replaceBlock(next, 'cta', renderCta(page), { optional: true });
    next = replaceBlock(next, 'crumbs', renderCrumbs(trail(page)), { optional: true });
    if (page.post) {
      next = replaceBlock(next, 'byline', renderByline(page.post));
      next = replaceBlock(next, 'related', renderRelated(page.post));
    }
    next = replaceBlock(next, 'post-list', renderPostList(), { optional: true });
    put(page.file, next);
  }
}

// The booking settings live in content/site.js; book.js gets a copy written
// between its /* build:config */ markers.
function buildBookingScript() {
  const file = 'assets/book.js';
  const js = readFileSync(join(root, file), 'utf8');
  const config = `var CONFIG = ${JSON.stringify(site.booking, null, 2)};`;
  put(file, replaceBlock(js, 'config', config, { open: '/* build:config */', close: '/* /build:config */' }));
}

function buildRobots() {
  put(
    'robots.txt',
    `# ${site.url.replace('https://', '')}
# Generated by build.mjs.
#
# Everything is allowed on purpose. The search crawlers (OAI-SearchBot,
# ChatGPT-User, Claude-SearchBot, PerplexityBot) are the ones that cite us, and
# the training crawlers (GPTBot, ClaudeBot, CCBot) are allowed deliberately.
#
# Cloudflare can serve a managed robots.txt in place of this file. Check
# ${site.url}/robots.txt after any Cloudflare change (npm run crawlers).

User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`
  );
}

function buildSitemap() {
  const entries = allPages.map((p) => ({
    url: abs(p.url),
    // An article states its own dates; everything else is dated by the last
    // commit that touched it.
    lastmod: p.post ? p.post.updated || p.post.published : lastModified(p.file),
    changefreq: p.changefreq || 'monthly',
    priority: p.priority || '0.7',
  }));

  put(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by build.mjs. A statement of what we want indexed: the noindex
     legal pages are left out on purpose. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`
  );
}

function buildLlmsTxt() {
  const groups = new Map();
  for (const page of allPages) {
    const group = page.group || 'Pages';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(page);
  }

  const sections = [...groups].map(
    ([group, items]) =>
      `## ${group}\n\n` +
      items.map((p) => `- [${titles.get(p.url) || p.url}](${abs(p.url)}): ${p.question}`).join('\n')
  );

  put(
    'llms.txt',
    `# ${site.name}

> ${site.summary}

Each line below describes the question that page answers.

${sections.join('\n\n')}

## Facts

${site.facts.map((f) => `- ${f}`).join('\n')}
- Founder: ${site.founder.name}, who takes every qualifying call.
- Contact: ${site.email}. Calls are booked through the "See if you qualify" form at ${site.url}/
`
  );
}

// CONFIRM and TODO notes are HTML comments, and HTML comments ship in the page
// source where anyone (and any crawler) can read them. They are fine while
// drafting; --check refuses to pass while any remain.
function openNotes() {
  const found = [];
  for (const page of allPages) {
    const html = readFileSync(join(root, page.file), 'utf8');
    for (const m of html.matchAll(/<!--\s*(CONFIRM|TODO)\b[^\n]*/g)) found.push(`${page.file}: ${m[0].slice(5, 90)}`);
  }
  return found;
}

/* ------------------------------------------------------------------- run */

try {
  buildPages();
  buildBookingScript();
  buildRobots();
  buildSitemap();
  buildLlmsTxt();
} catch (err) {
  console.error(`build failed: ${err.message}`);
  process.exit(1);
}

const notes = openNotes();
if (notes.length) {
  console.warn(`\n${notes.length} open CONFIRM/TODO note(s), visible in page source until removed:\n  ${notes.join('\n  ')}\n`);
}

if (checkOnly) {
  if (stale.length) {
    console.error(`out of date: ${stale.join(', ')}\nrun: npm run build`);
    process.exit(1);
  }
  if (notes.length) {
    console.error('resolve the notes above before publishing');
    process.exit(1);
  }
  console.log('up to date');
} else {
  console.log(written.length ? `wrote ${written.join(', ')}` : 'no changes, already up to date');
}
