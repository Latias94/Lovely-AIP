import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

const puppeteer = require('puppeteer');

describe('Test account page', () => {
	test('App name === Knight Frank', async () => {
		const browser = await puppeteer.launch({
			headless: false,
		});

		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 });

		await page.goto('localhost:3000/login', { waitUntil: 'networkidle2' });
		// TODO: move to App.test.js
		const title = await page.title();
		expect(title).toBe('Knight Frank'); // code behind it won't execute
		await browser.close();
	});

	test('view account page', async () => {
		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 });

		// page.emulate({
		//   viewport: {
		//     width: 500,
		//     height: 2400,
		//   },
		//   userAgent: ''
		// })

		//   page.on('dialog', async dialog => {
		//     console.log(dialog.message());
		//     await dialog.dismiss();
		// });
		// await page.authenticate({ username: 'admin', password: 'admin' });
		await page.goto('localhost:3000/login', { waitUntil: 'networkidle2' });

		//   const html = await page.$eval('.App-title', e => e.innerHTML);
		//   expect(html).toBe('Welcome to React');


		//   test('Title == Pronto Tools', async () => {
		//     await page.goto(url);
		//     const title = await page.title();
		//     expect(title).toBe("Pronto Tools");
		//   });
		//   test("Center == Tools for Your Growing Business", async () => {
		//     await page.goto(url);
		//     const center = await page.$eval('h2.font-34.uppercase > strong', e => e.innerHTML);
		//     expect(center).toBe("Tools for Your Growing Business");
		//   });


		//   await page.goto('localhost:3000/login', {waitUntil: 'networkidle2'});
		//   await page.goto('http://192.168.1.254/lancfg2menu.cgi?brName=Default', {waitUntil: 'networkidle2'});


		//   await page.waitFor('input[name=email]');
		//   await page.waitForSelector('#email');

		//   await page.click('input[type="submit"]');
		await page.focus('#email');
		// for (let i = 0; i< '192.168.1.254'.length; i++) {
		//     await page.keyboard.press('Delete');
		// }
		await page.keyboard.type('sf4@sf.com');
		await page.focus('input[name="password"]');
		await page.keyboard.type('12345678');
		//   await page.focus('input[name="chkIgmpSnp"]')
		//   await page.type('#login_field', 'admin')
		await page.screenshot({
			path: '/Users/anluoridge/Downloads/TEMP/KnightFrank.png',
			fullPage: true,
		});
		const inputElement = await page.$('input[type=submit]');
		await inputElement.click();
		await page.waitFor(1000);
		// 等待几秒
		// _sleep(5);
		//   await page.goto('localhost:3000/account'); // a new tab
		const accountButton = await page.$('a[href$=account]');
		await accountButton.click();
		await page.waitFor(3000);

		const errorMsg = await page.$eval('#password-helper-text', e => e.innerHTML);
		expect(errorMsg).toBe('Password must be at least 6 character.');
		await browser.close();
	});
});
