# Client Side
We use React.js and Redux for the client side.


![home_page](https://i.loli.net/2018/10/19/5bc9a534cd8f7.png)


The structure of the client project is mainly organised by  features (i.e. pages), such as log in, account, and books.
Each feature folder may contain containers, components, actions, reducers, and so on.
## Features
### Account
The basic login and sign up are implemented. Avatar could be uploaded and cropped. After signing up, the account need to be activated via one email.
The user can view his or her book lists in the account page.
### Book
Apart from the introduction of the book, it also provides functionalities of adding books to book list and cart .
Related books will show below information of the book.
### Book review
The user could post a review to a book as well as view other ones' reviews.
### Book category
There are two levels of the book category. We use List from MUI to implement the control of the category selection.
### Book List
The book list is for the user to collect their favourite books as well as review the books. It can be accessed from the account page.
The book list supports CRUD. The book can be added from the book page. Only the reviews and stars from the owner will appear in the list. When deleting the list, only the owner or the administrator has the permission to do so.
### Recommended book list
It will show a simple list of recommended book lists.
### Cart
Books can be added and deleted from the cart. After checking out, the products will be cleared. We haven't implemented the payment process yet.
### Search
The search supports book and book list searching.
### RSS
The user could subscribe the update of new books.
### Dashboard
User viewer and book manager

From it, the administrator could add and delete the books. Unfortunately, the management of users is under development.
## UI
We use [Material UI](https://material-ui.com/) in most of our pages.
We also implemented the responsive layout for our home page.
### Heads Up Display
This is done by the [Sweet Alert 2](https://sweetalert2.github.io/#usage). We encapsulated several functions for global success and error message.
## Test
We use [Puppetteer](https://github.com/GoogleChrome/puppeteer/) with [Jest](https://jestjs.io/). But there are only several test cases for now.

To execute tests:

```bash
npm run test
```
## Lint
This project uses [ESLint](http://eslint.org) and [Prop Types](https://github.com/facebook/prop-types) to maintain the code convention in *JavaScript* files.
