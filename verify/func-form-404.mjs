import { chromium } from 'playwright';
const browser = await chromium.launch();

// === 404 page content ===
const ctx = await browser.newContext();
const p1 = await ctx.newPage();
const r404 = await p1.goto('http://localhost:3000/totally-bogus-url-xyz/', { waitUntil: 'networkidle' });
const bodyText = (await p1.locator('body').innerText()).slice(0, 300).replace(/\n+/g,' | ');
const hasHeader = await p1.locator('header').count();
const hasFooter = await p1.locator('footer').count();
const has404 = /404|not found|doesn.t exist|can.t find/i.test(bodyText);
console.log(`404 page: status=${r404.status()} | has404Text=${has404} | header=${hasHeader>0} footer=${hasFooter>0}`);
console.log('404 body snippet:', bodyText);

// === Full form flow ===
const p2 = await ctx.newPage();
const formErrs = [];
p2.on('pageerror', e => formErrs.push(e.message));
await p2.goto('http://localhost:3000/contact-us/', { waitUntil: 'networkidle' });
// client-side validation: submit empty
const submitBtn = p2.locator('form button[type="submit"]').first();
await submitBtn.scrollIntoViewIfNeeded();
await submitBtn.click();
await p2.waitForTimeout(400);
const errCount = await p2.locator('form p.text-red-600').count();
console.log('Empty submit -> client validation error msgs shown:', errCount);
// fill valid
await p2.fill('input[placeholder="Full name *"]', 'QA Functional');
await p2.fill('input[placeholder="Work email *"]', 'qa-func@example.com');
await p2.fill('input[placeholder="Phone"]', '12345678');
await p2.fill('textarea', 'This is a valid functional QA test message.');
await Promise.all([
  p2.waitForURL('**/thank-you/**', { timeout: 8000 }).catch(()=>null),
  submitBtn.click(),
]);
await p2.waitForTimeout(800);
console.log('After valid submit, URL:', p2.url());
console.log('Reached thank-you:', p2.url().includes('thank-you'));
console.log('Form page errors:', formErrs.length ? formErrs : 'NONE');
await browser.close();
