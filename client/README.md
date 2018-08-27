# Client Side

We use React.js in client side.
The documentation is placed in `documentation` branch under `client/app-docs`. You could also generate the documentation by running `npm run esdoc` under `/client` in `master` branch.

For testing, we use [Puppetteer](https://github.com/GoogleChrome/puppeteer/) with [Jest](https://jestjs.io/).

The project structure is divided by the feature(i.e. page), such as loign, account and books.
Each feature folder may contains components, actions, reducers, and so on.
