import { chromium } from 'playwright-core';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

const out = {};

// 1. Open Services menu by focusing its trigger
const services = await page.$('nav[aria-label="Primary"] button[aria-haspopup="true"]'); // first = SERVICES
await services.focus();
await page.waitForTimeout(150);
out.servicesExpanded = await services.getAttribute('aria-expanded');

// 2. Locate the nested flyout parent link "Azure Data Analytics"
const flyoutParent = await page.$('nav[aria-label="Primary"] a[aria-haspopup="true"]:has-text("Azure Data Analytics")');
out.flyoutParentFound = !!flyoutParent;
if (flyoutParent) {
  out.flyoutParentVisible = await flyoutParent.isVisible();
  out.expandedBeforeFocus = await flyoutParent.getAttribute('aria-expanded');
  // 3. Focus it (keyboard path uses onFocus on wrapping div)
  await flyoutParent.focus();
  await page.waitForTimeout(200);
  out.expandedAfterFocus = await flyoutParent.getAttribute('aria-expanded');

  // 4. Are the 4 child links now visible?
  const childLinks = await page.$$('nav[aria-label="Primary"] .left-full a, nav[aria-label="Primary"] div.absolute.left-full a');
  const visibleChildren = [];
  for (const cl of await page.$$('nav[aria-label="Primary"] a')) {
    const txt = (await cl.innerText()).trim();
    if (['Microsoft Fabric Services','Data Integration As A Service','Data Visualization as a service','Data Warehousing as a Service'].includes(txt)) {
      if (await cl.isVisible()) visibleChildren.push(txt);
    }
  }
  out.flyoutChildrenVisible = visibleChildren;

  // 5. Tab forward — can we reach a child link by keyboard?
  await page.keyboard.press('Tab');
  const afterTab = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? { text: el.textContent.trim().slice(0,40), tag: el.tagName.toLowerCase(), href: el.getAttribute('href') } : null;
  });
  out.focusAfterTabFromParent = afterTab;

  // 6. Escape closes everything
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  out.parentExpandedAfterEsc = await flyoutParent.getAttribute('aria-expanded').catch(()=>'detached/closed');
  out.servicesExpandedAfterEsc = await services.getAttribute('aria-expanded');
}

// 7. Check Copilot Agent flyout too
await services.focus();
await page.waitForTimeout(150);
const copilot = await page.$('nav[aria-label="Primary"] a[aria-haspopup="true"]:has-text("Copilot Agent")');
out.copilotAgentFlyoutFound = !!copilot;
if (copilot) {
  await copilot.focus();
  await page.waitForTimeout(200);
  out.copilotExpandedAfterFocus = await copilot.getAttribute('aria-expanded');
  const vis = [];
  for (const cl of await page.$$('nav[aria-label="Primary"] a')) {
    const txt = (await cl.innerText()).trim();
    if (['RecruitFlow Copilot','SmartExpense Agent','ITAsset Copilot','KubeMonitor Copilot','Zammad Ticketing Copilot'].includes(txt)) {
      if (await cl.isVisible()) vis.push(txt);
    }
  }
  out.copilotChildrenVisible = vis;
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
