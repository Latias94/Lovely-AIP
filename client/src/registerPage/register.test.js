const puppeteer = require('puppeteer');
import { mount } from 'enzyme';

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
			headless: false
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

		const errorMsg = await page.$eval('#password-helper-text', e => e.innerHTML);
		expect(errorMsg).toBe('Password must be at least 6 character.');

    await page.screenshot({
      path: `./__tests__/screenshots/register-${Date.now()}.png`,
      fullPage: true,
    });

		await browser.close();
	});

  it('Button click calls onAdd', () => {
    onAdd = jest.fn();
    add = mount(<Add onAdd={onAdd} />);
    const button = add.find('button').first();
    const input = add.find('input').first();
    input.simulate('change', { target: { value: 'Name 4' }});
    button.simulate('click');
    expect(onAdd).toBeCalledWith('Name 4');
  });
});


// "jest": {
//   "collectCoverageFrom": [
//     "src/**/*.{js,jsx}"
//   ],
//     "setupFiles": [
//     "<rootDir>/config/polyfills.js"
//   ],
//     "testMatch": [
//     "<rootDir>/src/**/__tests__/**/*.js?(x)",
//     "<rootDir>/src/**/?(*.)(spec|test).js?(x)"
//   ],
//     "testEnvironment": "node",
//     "testURL": "http://localhost",
//     "transform": {
//     "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
//       "^.+\\.(scss|css)$": "<rootDir>/config/jest/cssTransform.js",
//       "^(?!.*\\.(js|jsx|css|scss|json)$)": "<rootDir>/config/jest/fileTransform.js"
//   },
//   "transformIgnorePatterns": [
//     "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
//   ],
//     "moduleFileExtensions": [
//     "web.js",
//     "js",
//     "json",
//     "web.jsx",
//     "jsx",
//     "node"
//   ]
// }