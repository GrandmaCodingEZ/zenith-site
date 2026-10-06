/* Booking: every "See if you qualify" button ([data-book]) opens the
   five-question form, then the Calendly calendar. Every page loads this file;
   the form markup comes from content/partials.js.

   Without JavaScript (or in a browser with no <dialog>), the buttons stay
   plain links to Calendly. */
(function () {
  'use strict';

/* build:config */
var CONFIG = {
  "calendly": "https://calendly.com/zacharyspencer/zenith-co-consultation",
  "calendlyAnswerParam": "a1",
  "formEndpoint": "https://dialer.zenithcomarketing.com/api/inbound/website-form",
  "crewOptions": [
    "None yet, just me",
    "1 crew",
    "2 crews",
    "3 to 4 crews",
    "5 or more crews"
  ],
  "budgetOptions": [
    "Under $1,500",
    "$1,500 to $3,000",
    "$3,000 to $5,000",
    "More than $5,000",
    "Not sure yet"
  ]
};
/* /build:config */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var has = function (v) { return v !== null && v !== undefined && String(v).trim() !== ''; };

  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Where this visit started: the first page seen this session and the site
  // that sent them (an assistant's link carries utm_source=chatgpt.com, for
  // one). It rides along in the dialer note's Page line, which is how a lead
  // that found us through an AI assistant becomes visible.
  var first = null;
  try {
    first = JSON.parse(sessionStorage.getItem('zc_first') || 'null');
    if (!first) {
      first = { url: location.href, ref: document.referrer || '' };
      sessionStorage.setItem('zc_first', JSON.stringify(first));
    }
  } catch (e) { first = null; }
  function pageLine() {
    var line = location.href;
    if (!first) return line;
    if (first.url !== location.href) line += ' | landed on ' + first.url;
    if (first.ref && first.ref.indexOf(location.origin) !== 0) line += ' | from ' + first.ref;
    return line;
  }

  var dlg = $('#book'), form = $('#qual'), err = $('#f-err');
  if (!dlg || !form || typeof dlg.showModal !== 'function') return; // the links go straight to Calendly

  var crewSel = $('#f-crews'), budSel = $('#f-budget');
  function fillSelect(sel, items) {
    items.forEach(function (t) { var o = document.createElement('option'); o.textContent = t; sel.appendChild(o); });
  }
  fillSelect(crewSel, CONFIG.crewOptions);
  fillSelect(budSel, CONFIG.budgetOptions);

  function openBook(e) {
    e.preventDefault();
    var menu = e.currentTarget.closest('details[open]');
    if (menu) menu.open = false;
    document.documentElement.classList.add('locked');
    dlg.showModal();
  }
  $$('[data-book]').forEach(function (a) { a.addEventListener('click', openBook); });
  dlg.addEventListener('close', function () { document.documentElement.classList.remove('locked'); });
  $$('[data-close]', dlg).forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  var cal = $('#cal');
  cal.addEventListener('load', function () { if (cal.src) cal.classList.add('ready'); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var lead = {
      company: String(fd.get('company') || '').trim(),
      service_area: String(fd.get('area') || '').trim(),
      crews: crewSel.value,
      monthly_ad_budget: budSel.value,
      phone: String(fd.get('phone') || '').trim(),
      sms_consent: fd.get('sms_consent') === 'yes',
      url_hp: String(fd.get('url_hp') || '') // hidden from people; bots fill it in
    };
    var missing = [];
    if (!lead.company) missing.push('company name');
    if (!lead.service_area) missing.push('service area');
    if (!lead.crews) missing.push('number of crews');
    if (!lead.monthly_ad_budget) missing.push('ad budget');
    if (lead.phone.replace(/\D/g, '').length < 10) missing.push('phone number (10 digits)');
    if (missing.length) { err.textContent = 'Please fill in: ' + missing.join(', ') + '.'; return; }
    err.textContent = '';

    if (has(CONFIG.formEndpoint)) {
      lead.page = pageLine();
      lead.submitted_at = new Date().toISOString();
      fetch(CONFIG.formEndpoint, {
        // text/plain: no preflight, so it still goes out as the calendar loads.
        method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(lead), keepalive: true
      }).catch(function () {});
    }

    var q = new URLSearchParams({ embed_domain: location.hostname || 'zenithcomarketing.com', embed_type: 'Inline', hide_gdpr_banner: '1' });
    if (has(CONFIG.calendlyAnswerParam)) {
      q.set(CONFIG.calendlyAnswerParam, 'Company: ' + lead.company + ' | Area: ' + lead.service_area +
        ' | Crews: ' + lead.crews + ' | Ad budget: ' + lead.monthly_ad_budget +
        ' | Phone: ' + lead.phone + ' | SMS consent: ' + (lead.sms_consent ? 'yes' : 'no'));
    }
    cal.src = CONFIG.calendly + '?' + q.toString();
    form.hidden = true;
    $('#step-cal').hidden = false;
    $('#book-h').textContent = 'Pick a time';
    dlg.classList.add('wide');
    dlg.scrollTop = 0;
  });
})();
