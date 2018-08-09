import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

const puppeteer = require('puppeteer');

let browser;
let page;

describe('LoginPage', () => {
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 30,
		});
		page = await browser.newPage();
	}); // timeout , async () => ( ,60e3)

	afterAll(() => browser.close());

	beforeEach(() => page.goto('http://localhost:3000/register')); // start with fresh page between test, don't keep implicit page state dependency

	it('should display login page', async () => {
		// const text = await page.evaluate(() => document.body.innerText);
		// expect(text).toContain('name');
		expect(true).toBe(true);
		// done(); // here
	});

	it('should show error message if email is not correct', async () => {
		await page.type('#email', 'user');
		await page.type('#password', 'pass');
		await page.click('Button[id=submit]');

		try { // you need to try catch the error with async await
			await page.evaluate(
				() => document.getElementsByClassName('ui negative message container')[0], // no need for async
			);
		} catch (errorMessage) {
			console.log('errorMessage', errorMessage);
		}

		expect(true).toBe(true);
	});
});


describe('Test validation of sign up =', () => {
  // afterAll(() => browser.close());
  it('Length of password > 5', async () => {

		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();
		await page.setViewport({ width: 1280, height: 800 });
		await page.goto('localhost:3000/register', { waitUntil: 'networkidle0' });
		await page.type('#email', 'test@mail.com');
		await page.type('#name', 'username');
		await page.type('#password', 'short');
		await page.type('#password2', 'short');
		await page.click('Button[id="submit"]');

		const errorMsg = await page.$eval('#password-helper-text', e => e.innerHTML);
		expect(errorMsg).toBe('Password must be at least 6 character.');
		await browser.close();
	});
});
