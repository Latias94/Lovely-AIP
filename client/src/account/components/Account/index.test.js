const puppeteer = require('puppeteer');

const loginURL = 'http://localhost:3000/login';

describe('Test account page', () => {
	test('App name === Knight Frank', async () => {
		const browser = await puppeteer.launch({
			headless: false,
		});

		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 });

		await page.goto(loginURL, { waitUntil: 'networkidle2' });
		// TODO: move to App.test.js
		const title = await page.title();
		expect(title).toBe('Knight Frank'); // code behind it won't execute
		await browser.close();
	});

	test('view account page', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			//   slowMo: 30 // slow down the whole process by 30ms
		});
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 });
		await page.goto(loginURL, { waitUntil: 'networkidle2' });
		await page.focus('#email');
		await page.keyboard.type('sf4@sf.com');
		await page.focus('input[name="password"]');
		await page.keyboard.type('12345678');
		await page.screenshot({
			path: '/Users/anluoridge/Downloads/TEMP/KnightFrank.png',
			fullPage: true,
		});
		const inputElement = await page.$('input[type=submit]');
		await inputElement.click();
		await page.waitFor(1000);
		// _sleep(5);
		//   await page.goto(url+'/account'); // a new tab
		const accountButton = await page.$('a[href$=account]');
		await accountButton.click();
		await page.waitFor(3000);

		const url = page.url();
		expect(url).toBe(url+'login');

		await page.screenshot({
			path: '/Users/anluoridge/Downloads/TEMP/KnightFrankAccount.png',
			fullPage: true,
		});
		await browser.close();
	});
});
