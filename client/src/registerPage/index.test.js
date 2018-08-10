const puppeteer = require('puppeteer');

describe('df', () => {
  it('account created', async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('localhost:3000/register', { waitUntil: 'networkidle0' });
    let fakeEmail = Math.floor((Math.random() * 100) + 1).toString() + '@mail.com';
    await page.type('#email', fakeEmail);
    await page.type('#name', 'username');
    await page.type('#password', 'short');
    await page.type('#password2', 'short');
    await page.click('Button[id="submit"]');

    const errorMsg = await page.$eval('#password-helper-text', e => e.innerHTML);
    expect(errorMsg).toBe('Password must be at least 6 character.');

    await page.screenshot({
      path: `./__tests__/screenshots/register-${Date.now()}.png`,
      fullPage: true,
    });

    await browser.close();
  });
})