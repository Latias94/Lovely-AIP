const puppeteer = require('puppeteer');

const registerURL = 'http://localhost:3000/register';
let browser;
let page;

describe('Test sign up', () => {
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
		});
		page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 });
	});

	beforeEach(async () => {
		await page.goto(registerURL, { waitUntil: 'networkidle0' });
	}); // start with fresh page between test, don't keep implicit page state dependency

	afterAll(async () => {
		await page.screenshot({
			path: `./__tests__/screenshots/register-${Date.now()}.png`,
			fullPage: true,
		});
		browser.close();
	});

  it('Success: update the page after the account created', async () => {
    const fakeEmail = `${Math.floor((Math.random() * 1000) + 1).toString()}@mail.com`;
    await page.type('#email', fakeEmail);
    await page.type('#name', 'username');
    await page.type('#password', 'rightPassword');
    await page.type('#password2', 'rightPassword');
    await page.click('Button[id="submit"]');
    await page.waitFor(1000);
    const submitButton = await page.$('Button[id="submit"]');
    expect(submitButton).toBe(null);
  });

	it('Validation: Length of password > 5 error hint', async () => {
		await page.type('#email', 'test@mail.com');
		await page.type('#name', 'username');
		await page.type('#password', 'short');
		await page.type('#password2', 'short');
		await page.click('Button[id="submit"]');

		const errorMsg = await page.$eval('#password-helper-text', e => e.innerHTML);
		expect(errorMsg).toBe('Password must be at least 6 character.');
	});

	it('Validation: short name error hint', async () => {
		await page.type('#email', 'test@mail.com');
		await page.type('#name', 'o');
		await page.type('#password', '12345678');
		await page.type('#password2', '12345678');
		await page.click('Button[id="submit"]');

		const errorMsg = await page.$eval('#name-helper-text', e => e.innerHTML);
		expect(errorMsg).toContain('Name must be between 2 and 30 characters.');
	});

	it('Email already exists', async () => {
		await page.type('#email', 'sf4@sf.com');
		await page.type('#name', 'username');
		await page.type('#password', 'rightPassword');
		await page.type('#password2', 'rightPassword');
		await page.click('Button[id="submit"]');
		await page.waitFor(1000);
		const errorMsg = await page.$eval('#email-helper-text', e => e.innerHTML);
		expect(errorMsg).toContain('already');
	});

	it('should display register page', async () => {
		const text = await page.evaluate(() => document.body.innerText);
		expect(text).toContain('Sign up');
	});
});
