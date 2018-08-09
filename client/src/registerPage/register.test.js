const puppeteer = require('puppeteer');

describe('Test validation of sign up =', () => {
	test('Length of password > 5', async () => {
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 });
		await page.goto('localhost:3000/register', { waitUntil: 'networkidle2' });
		await page.waitFor(2000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    // await page.focus('#username');
		await page.focus('input[name=email]');
		// await page.type('test@mail.com');
		// await page.focus('input[name="username"]');
		await page.type('username');
		await page.focus('input[name="password"]');
		await page.type('short');
		await page.focus('input[name="password2"]');
		await page.type('short');
		await page.click('input[type="submit"]');

		const errorMsg = await page.$eval('#password-error', e => e.innerHTML);
		expect(errorMsg).toBe('The password must be at least 6 characters.');

		await browser.close();
	});
});
