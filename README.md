# Lovely-AIP
This project is an assignment of a full stack subject.

It is a website for readers to purchase, review and manage the books in it. 

Our inspiration comes from the Amazon and Douban (the equivalent of Goodreads in China).

The demo is running on: http://knight-frank-web.s3-website-ap-southeast-2.amazonaws.com/

For more details:

Client: [README](https://github.com/Latias94/Lovely-AIP/blob/master/client/README.md)

Server: [README](https://github.com/Latias94/Lovely-AIP/blob/master/server/README.md)


## Getting Started
```bash
# Enter server folder
cd server
# Install server's dependence
npm install
# Install client's dependence (or you can cd to ../client folder and do `npm install`)
npm run install-client
# Run server and client concurrently
npm run dev
```
The server runs on port 3000.  
The client runs on port 5000.

However, there are some variables need to be set before running this app.

They are in `/server/config/key.js`.
```js
 module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  email: process.env.EMAIL,
  emailPwd: process.env.EMAIL_PWD,
  redisURI: process.env.REDIS_URI,
  redisPort: process.env.REDIS_PORT,
  redisPwd: process.env.REDIS_PWD,
};
```
## Lovely-AIP's Code Style Guide

For both React.js and Express.js We decided to follow [Airbnb's JavaScript Code Style](https://github.com/airbnb/javascript).

### JavaScript Style Guide
Here are some basic rules:

1. Use space between `=` and `variables`.
    ```javascript
    // bad
    const steps=1;

    // good
    const steps = 1;
    ```
2. Use `const` for all of your references; avoid using `var`.
3. If you must reassign references, use `let` instead of `var`.
4. Use the literal syntax for object creation.
    ```javascript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```
5. Use property value shorthand.

    > Why? It is shorter to write and descriptive.

    ```javascript
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
    };
    ```
6. Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`.

    > Why? These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`).

    ```javascript
    // bad
    console.log(object.hasOwnProperty(key));

    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // best
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    /* or */
    import has from 'has'; // https://www.npmjs.com/package/has
    // ...
    console.log(has.call(object, key));
    ```
7. Use the literal syntax for array creation.

    ```javascript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```
8. Use `Array#push` instead of direct assignment to add items to an array.

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```
9. Since currently there's no JavaScript engine natively supports ES6 modules, server side uses `require()`  to import modules.
    ```javascript
    const mongoose = require('mongoose');
    ```

### React/JSX Style Guide

React has its own sytax. Following are some basic rules in [Airbnb's React Code Style](https://github.com/airbnb/javascript/tree/master/react).

#### Basic Rules

  1. Only include one React component per file.
  1. Always use JSX syntax.
  1. Always use`class extends React.Component` to create class.
  1. Extensions use `.jsx` extension for React components.
  1. Filename uses PascalCase for filenames. E.g., `ReservationCard.jsx`.
  1. Reference uses PascalCase for React components and camelCase for their instances.

```jsx
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```
  7. Component uses the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:

```jsx
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```

  8. Props naming should avoid using DOM component prop names for different purposes.

> Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

```jsx
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />
```
