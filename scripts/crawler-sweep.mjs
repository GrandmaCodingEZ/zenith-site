#!/usr/bin/env node
// Checks that the AI crawlers that cite us can actually reach the site, and
// prints the robots.txt that is really being served.
//
// Run it after any Cloudflare change and once a quarter regardless. The whole
// reason it exists: when a crawler is blocked, nothing looks broken. Pages
// still load in your browser, Googlebot still gets a 200, and the assistants
// simply never see you.
//
//   node scripts/crawler-sweep.mjs                 checks zenithcomarketing.com
//   node scripts/crawler-sweep.mjs example.com     checks another domain
//   npm run crawlers

const domain = (process.argv[2] || 'zenithcomarketing.com').replace(
  /^https?:\/\//,
  ''
);
const origin = `https://${domain}`;

// The first four are the ones that cite you in an answer. The last three are
// training crawlers plus Googlebot as a control — if Googlebot gets a 200 and
// the others don't, that is the signature of a bot rule aimed at AI.
const AGENTS = [
  ['OAI-SearchBot/1.0', 'search'],
  ['ChatGPT-User/1.0', 'search'],
  ['Claude-SearchBot/1.0', 'search'],
  ['PerplexityBot/1.0', 'search'],
  ['GPTBot/1.2', 'training'],
  ['ClaudeBot/1.0', 'training'],
  ['Googlebot/2.1', 'control'],
];

const PATHS = ['/', '/blog/', '/pricing/'];

async function status(path, agent) {
  try {
    const res = await fetch(origin + path, {
      headers: { 'user-agent': agent },
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
    });
    return res.status;
  } catch (err) {
    return err.name === 'TimeoutError' ? 'timeout' : 'error';
  }
}

console.log(`\nCrawler sweep — ${origin}\n`);
console.log(
  'user agent'.padEnd(22) + 'kind'.padEnd(10) + PATHS.map((p) => p.padEnd(9)).join('')
);
console.log('-'.repeat(22 + 10 + PATHS.length * 9));

let blocked = 0;
for (const [agent, kind] of AGENTS) {
  const results = [];
  for (const path of PATHS) results.push(await status(path, agent));
  if (results.some((r) => r !== 200)) blocked++;
  console.log(
    agent.padEnd(22) +
      kind.padEnd(10) +
      results.map((r) => String(r).padEnd(9)).join('')
  );
}

console.log(`\nrobots.txt actually served at ${origin}/robots.txt:\n`);
try {
  const res = await fetch(`${origin}/robots.txt`, {
    signal: AbortSignal.timeout(20000),
  });
  const body = await res.text();
  console.log(
    body
      .split('\n')
      .map((line) => '  ' + line)
      .join('\n')
  );

  // Cloudflare can prepend a managed robots.txt ahead of the repo's own file.
  // The sweep above does not catch that, which is the second half of the trap.
  if (body.includes('content-signal') && !/^user-agent:/im.test(body)) {
    console.log(
      '\n  ⚠ This looks like Cloudflare\'s managed robots.txt, not ours.\n' +
        '    Security → Settings → Bot traffic → Manage your robots.txt → Disable,\n' +
        '    so the robots.txt in this repo is the one being served.'
    );
  }
  if (!body.includes('Sitemap:')) {
    console.log('\n  ⚠ No Sitemap: line in the served robots.txt.');
  }
} catch {
  console.log('  could not fetch robots.txt');
}

console.log(
  blocked
    ? `\n✗ ${blocked} agent(s) got something other than 200. Check Cloudflare AI Crawl Control, Bot Fight Mode and AI Labyrinth.\n`
    : '\n✓ Every crawler reached every page.\n'
);
