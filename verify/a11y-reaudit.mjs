// Re-audit accessibility runtime checks
import { chromium } from 'playwright-core';

const BASE = 'http://localhost:3000';
const browser = await chromium.launch({
  executablePath: undefined, // use channel-less bundled
});

function contrast(hexA, hexB) {
  const lum = (hex) => {
    const c = hex.replace('#','').match(/.{2}/g).map(h => {
      const v = parseInt(h,16)/255;
      return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
    });
    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
  };
  const L1 = lum(hexA), L2 = lum(hexB);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

const results = {};

// ---------- TEST 1: NAV DROPDOWN KEYBOARD ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  const triggers = await page.$$('nav[aria-label="Primary"] button[aria-haspopup="true"]');
  results.navTriggerCount = triggers.length;

  // Focus the first dropdown trigger and check aria-expanded flips on focus
  const trigger = triggers[0];
  const labelBefore = await trigger.getAttribute('aria-expanded');
  await trigger.focus();
  await page.waitForTimeout(150);
  const labelAfter = await trigger.getAttribute('aria-expanded');
  results.firstTriggerLabel = (await trigger.innerText()).trim();
  results.ariaExpandedBeforeFocus = labelBefore;
  results.ariaExpandedAfterFocus = labelAfter;

  // Are submenu links now visible/reachable?
  const submenuLinks = await page.$$eval('nav[aria-label="Primary"] .group >> div >> a',
    els => els.filter(e => e.offsetParent !== null).map(e => e.textContent.trim())).catch(() => []);
  results.submenuVisibleLinks = submenuLinks.slice(0, 12);

  // Escape closes
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  results.ariaExpandedAfterEsc = await trigger.getAttribute('aria-expanded');

  // ---------- NESTED FLYOUT ----------
  // Find a trigger whose menu has a nested flyout (aria-haspopup link). Look across all triggers.
  let nested = null;
  for (let i = 0; i < triggers.length; i++) {
    await triggers[i].focus();
    await page.waitForTimeout(120);
    const flyoutParents = await page.$$('nav[aria-label="Primary"] a[aria-haspopup="true"]');
    const visible = [];
    for (const fp of flyoutParents) {
      if (await fp.isVisible()) visible.push(fp);
    }
    if (visible.length) {
      const triggerLabel = (await triggers[i].innerText()).trim();
      // focus the nested flyout parent (e.g. Azure Data Analytics)
      const fp = visible[0];
      const fpLabel = (await fp.innerText()).trim();
      const expBefore = await fp.getAttribute('aria-expanded');
      await fp.focus();
      await page.waitForTimeout(150);
      const expAfter = await fp.getAttribute('aria-expanded');
      // child links of flyout now visible?
      const childLinks = await page.$$('nav[aria-label="Primary"] .absolute.left-full a');
      const childVisible = [];
      for (const cl of childLinks) {
        if (await cl.isVisible()) childVisible.push((await cl.innerText()).trim());
      }
      nested = { underTrigger: triggerLabel, flyoutParent: fpLabel, expBefore, expAfter, childLinks: childVisible };
      // Escape from nested
      await page.keyboard.press('Escape');
      await page.waitForTimeout(120);
      nested.afterEscParentExpanded = await fp.getAttribute('aria-expanded').catch(() => 'detached');
      break;
    }
    await page.keyboard.press('Escape');
  }
  results.nested = nested;

  await page.close();
}

// ---------- TEST 2: CONTACT FORM ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/contact-us/', { waitUntil: 'networkidle' });

  results.formCount = await page.$$eval('form', f => f.length);

  // collect all input/textarea/select ids (exclude aria-hidden honeypots)
  const fields = await page.$$eval('form input, form textarea, form select', els =>
    els.map(e => ({
      tag: e.tagName.toLowerCase(),
      type: e.type || '',
      id: e.id || null,
      name: e.getAttribute('name'),
      ariaHidden: e.getAttribute('aria-hidden') === 'true' || e.closest('[aria-hidden="true"]') != null,
      hidden: e.offsetParent === null && e.type !== 'hidden',
      tabindex: e.getAttribute('tabindex'),
      ariaLabel: e.getAttribute('aria-label'),
    }))
  );

  // For each non-honeypot field, does it have an associated <label for=id> or aria-label?
  const labelled = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('form input, form textarea, form select').forEach(e => {
      const isHoney = e.getAttribute('aria-hidden') === 'true' || e.closest('[aria-hidden="true"]') != null;
      if (isHoney || e.type === 'hidden') return;
      const labelFor = e.id ? document.querySelector(`label[for="${CSS.escape(e.id)}"]`) : null;
      out.push({
        id: e.id || '(none)',
        name: e.getAttribute('name'),
        placeholder: e.getAttribute('placeholder') || null,
        hasLabelFor: !!labelFor,
        labelText: labelFor ? labelFor.textContent.trim() : null,
        ariaLabel: e.getAttribute('aria-label') || null,
        ariaRequired: e.getAttribute('aria-required'),
      });
    });
    return out;
  });
  results.formFields = fields;
  results.formLabelled = labelled;

  // duplicate id detection across whole document
  const allIds = await page.$$eval('[id]', els => els.map(e => e.id));
  const seen = {}, dups = [];
  allIds.forEach(id => { seen[id] = (seen[id]||0)+1; });
  Object.entries(seen).forEach(([id,n]) => { if (n>1) dups.push({id, count:n}); });
  results.duplicateIds = dups;

  // Trigger validation to confirm role=alert + aria-invalid (use first form's submit, force click past overlays)
  const submitBtn = await page.$('form button[type="submit"]');
  if (submitBtn) {
    try { await submitBtn.click({ force: true, timeout: 5000 }); }
    catch { await submitBtn.evaluate(b => b.click()); }
    await page.waitForTimeout(500);
    results.alertCount = await page.$$eval('form [role="alert"]', a => a.length);
    results.invalidCount = await page.$$eval('form [aria-invalid="true"]', a => a.length);
    results.alertSamples = await page.$$eval('form [role="alert"]', a => a.slice(0,4).map(e => e.textContent.trim()));
  }

  await page.close();
}

// ---------- TEST 3: SKIP LINK + MOBILE TOGGLE ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const skip = await page.$('a[href="#main"]');
  results.skipLinkExists = !!skip;
  if (skip) {
    results.skipLinkText = (await skip.innerText().catch(()=> '')) || (await skip.evaluate(e=>e.textContent.trim()));
    results.mainTargetExists = await page.$eval('#main', () => true).catch(() => false);
    results.mainIsMainTag = await page.$eval('#main', e => e.tagName.toLowerCase()).catch(()=>null);
    // skip link reachable as first tab?
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      return { tag: el.tagName.toLowerCase(), href: el.getAttribute('href'), text: el.textContent.trim() };
    });
    results.firstTabTarget = focused;
  }

  // mobile toggle at small viewport
  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(200);
  const mobBtn = await page.$('button[aria-controls="mobile-menu"]');
  results.mobileBtnExists = !!mobBtn;
  if (mobBtn) {
    results.mobileAriaExpandedBefore = await mobBtn.getAttribute('aria-expanded');
    results.mobileAriaLabel = await mobBtn.getAttribute('aria-label');
    await mobBtn.click();
    await page.waitForTimeout(200);
    results.mobileAriaExpandedAfter = await mobBtn.getAttribute('aria-expanded');
    results.mobileMenuRendered = await page.$eval('#mobile-menu', () => true).catch(() => false);
  }
  await page.close();
}

// ---------- TEST 4: CONTRAST ----------
results.contrast = {
  '6A6C70_on_white': +contrast('#6A6C70', '#FFFFFF').toFixed(2),
  '6A6C70_on_tint_F5F8FE': +contrast('#6A6C70', '#F5F8FE').toFixed(2),
  '808285_on_white_OLD': +contrast('#808285', '#FFFFFF').toFixed(2),
  'white_on_2453BF_banner': +contrast('#FFFFFF', '#2453BF').toFixed(2),
};

// ---------- TEST 5: AI-SCENARIO bg photos decorative ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(BASE + '/ai-scenario-library/', { waitUntil: 'networkidle' });
  // industry cards = aspect-[4/3] with bg image + #2453BF banner
  const cards = await page.$$eval('div.group.relative', els =>
    els.filter(e => e.querySelector('div')?.style?.backgroundColor || e.querySelector('img'))
       .map(e => {
         const img = e.querySelector('img');
         const h3 = e.querySelector('h3');
         return img && h3 ? { alt: img.getAttribute('alt'), heading: h3.textContent.trim() } : null;
       }).filter(Boolean)
  );
  results.industryCards = cards.slice(0, 8);

  // any informative images with empty alt across the page? (heuristic: imgs not in known decorative roles)
  const imgs = await page.$$eval('img', els => els.map(e => ({
    alt: e.getAttribute('alt'),
    src: (e.getAttribute('src')||'').split('?')[0].split('/').pop(),
    w: e.width, h: e.height
  })));
  results.totalImgs = imgs.length;
  results.emptyAltImgs = imgs.filter(i => i.alt === '').length;
  results.nullAltImgs = imgs.filter(i => i.alt === null).map(i => i.src);
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
