// import React from 'react';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import renderer from 'react-test-renderer';
import RegisterForm from './index';
const puppeteer = require('puppeteer');

// let browser;
// let page;
//
// describe('LoginPage', () => {
// 	beforeAll(async () => {
// 		browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 30,
// 		});
// 		page = await browser.newPage();
// 	}); // timeout , async () => ( ,60e3)
//
// 	afterAll(() => browser.close());
//
// 	beforeEach(() => page.goto('http://localhost:3000/register')); // start with fresh page between test, don't keep implicit page state dependency
//
// 	it('should display login page', async () => {
// 		// const text = await page.evaluate(() => document.body.innerText);
// 		// expect(text).toContain('name');
// 		expect(true).toBe(true);
// 		// done(); // here
// 	});
//
// 	it('should show error message if email is not correct', async () => {
// 		await page.type('#email', 'user');
// 		await page.type('#password', 'pass');
// 		await page.click('Button[id=submit]');
//
// 		try { // you need to try catch the error with async await
// 			await page.evaluate(
// 				() => document.getElementsByClassName('ui negative message container')[0], // no need for async
// 			);
// 		} catch (errorMessage) {
// 			console.log('errorMessage', errorMessage);
// 		}
//
// 		expect(true).toBe(true);
// 	});
// });


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

    await page.screenshot({
      path: `./__tests__/screenshots/register-${Date.now()}.png`,
      fullPage: true,
    });

    await browser.close();
  });

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


  // it('renders correctly', () => {
  //   const rendered = renderer.create(
  //     <RegisterForm />
  //   );
  //   expect(rendered.toJSON()).toMatchSnapshot();
  // });

  // it('Button click calls onAdd', () => {
  //   onAdd = jest.fn();
  //   add = mount(<Add onAdd={onAdd} />);
  //   const button = add.find('button').first();
  //   const input = add.find('input').first();
  //   input.simulate('change', { target: { value: 'Name 4' }});
  //   button.simulate('click');
  //   expect(onAdd).toBeCalledWith('Name 4');
  // });

  // it('Email is required', () => {
  //   Enzyme.configure({ adapter: new Adapter() })
  //   const wrapper = shallow(<RegisterForm />);
  // 	const res = wrapper.validate({
  // 		email: '',
  // 	});
  // 	expect(res).toBe(false);
  // });
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
