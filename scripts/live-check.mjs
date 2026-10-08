#!/usr/bin/env node
// Checks the LIVE site after a push: that every page in the sitemap is
// reachable and carries what it should, that the machine-readable files are
// served, and — the one people forget — that the working files in this repo
// are NOT public.
//
// Read-only. It only ever GETs our own domain.
//
//   node scripts/live-check.mjs                 checks zenithcomarketing.com
//   node scripts/live-check.mjs localhost:4321  checks a local preview
//   npm run live

const target = (process.argv[2] || 'zenithcomarketing.com').replace(
  /^https?:\/\//,
  ''
);
const isLocal = target.startsWith('localhost') || target.startsWith('127.');
const origin = `${isLocal ? 'http' : 'https'}://${target}`;

// Working files that must never be published. GitHub Pages serves the whole
// repository unless _config.yml excludes them, and a silent failure here means
// the strategy doc and the unconfirmed-claim notes are quotable from our own
// domain.
const MUST_BE_PRIVATE = [
  '/AEO-PLAN.md',
  '/MEASUREMENT.md',
  '/content/site.js',
  '/content/pages.js',
  '/content/posts.js',
  '/content/partials.js',
  '/build.mjs',
  '/dev-server.mjs',
  '/package.json',
  '/offsite/PLAYBOOK.md',
  '/offsite/linkedin-drafts.md',
  '/offsite/reddit-answers.md',
  '/scripts/live-check.mjs',
  '/zenith-site.md',
];

const MUST_BE_PUBLIC = ['/robots.txt', '/sitemap.xml', '/llms.txt'];

let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`  ✗ ${msg}`);
};
const pass = (msg) => console.log(`  ✓ ${msg}`);

async function get(path) {
  try {
    const res = await fetch(origin + path, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
    });
    return { status: res.status, body: await res.text() };
  } catch (err) {
    return { status: err.name === 'TimeoutError' ? 'timeout' : 'error', body: '' };
  }
}

console.log(`\nLive check — ${origin}\n`);

/* ---------------------------------------------- machine-readable files */
console.log('Machine-readable files');
const robots = await get('/robots.txt');
if (robots.status !== 200) fail(`robots.txt returned ${robots.status}`);
else if (!robots.body.includes('Sitemap:'))
  fail(
    'robots.txt is served but has no Sitemap: line — this is probably ' +
      "Cloudflare's managed file, not ours"
  );
else pass('robots.txt is ours (has a Sitemap: line)');

for (const path of MUST_BE_PUBLIC.slice(1)) {
  const res = await get(path);
  if (res.status === 200) pass(`${path} served`);
  else fail(`${path} returned ${res.status}`);
}

/* ------------------------------------------------------ sitemap pages */
console.log('\nPages in the sitemap');
const sitemap = await get('/sitemap.xml');
const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!locs.length) {
  fail('no <loc> entries found in sitemap.xml');
} else {
  let ok = 0;
  const problems = [];
  for (const loc of locs) {
    // The sitemap always carries production URLs, so take the path from them
    // rather than assuming the origin matches what we are checking.
    const path = new URL(loc).pathname;
    const res = await get(path);
    if (res.status !== 200) {
      problems.push(`${path} → ${res.status}`);
      continue;
    }
    if (!res.body.includes('application/ld+json'))
      problems.push(`${path} → 200 but no JSON-LD in the source`);
    else if (!res.body.includes(`rel="canonical" href="${loc}"`))
      problems.push(`${path} → canonical does not match the sitemap URL`);
    else ok++;
  }
  if (ok === locs.length) pass(`all ${locs.length} pages: 200, JSON-LD present, canonical matches`);
  else {
    pass(`${ok}/${locs.length} pages fully healthy`);
    problems.forEach(fail);
  }
}

/* --------------------------------------------------- privacy of source */
console.log('\nWorking files (these must NOT be public)');
let leaked = 0;
// The local dev server has no Jekyll and serves the repo raw, so this check
// only means anything against the deployed site.
for (const path of isLocal ? [] : MUST_BE_PRIVATE) {
  const res = await get(path);
  // Jekyll may also publish a .md file as .html, so check both spellings.
  const alt = path.endsWith('.md')
    ? await get(path.replace(/\.md$/, '.html'))
    : { status: 404 };
  if (res.status === 200 || alt.status === 200) {
    leaked++;
    fail(`${path} is PUBLIC — check the exclude list in _config.yml`);
  }
}
if (isLocal)
  console.log('  – skipped: the dev server serves the repo raw, so only the deployed site can be judged');
else if (!leaked) pass(`none of the ${MUST_BE_PRIVATE.length} working files are reachable`);

/* -------------------------------------------------------- legal pages */
console.log('\nNoindex pages');
for (const path of ['/privacy.html', '/terms.html', '/terms-2026-08-01.html']) {
  const res = await get(path);
  if (res.status !== 200) fail(`${path} returned ${res.status}`);
  else if (!/name="robots" content="noindex"/.test(res.body))
    fail(`${path} has lost its noindex tag`);
  else pass(`${path} is served and noindex`);
}

console.log(
  failures
    ? `\n✗ ${failures} problem(s) found.\n`
    : '\n✓ Everything checks out.\n'
);
process.exit(failures ? 1 : 0);
