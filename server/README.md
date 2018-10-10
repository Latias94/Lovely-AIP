# Server

- [Set Up Environment Variable](#set-up-environment-variable)
- [API](#api)
    - [Using Swagger](#using-swagger)
    - [Register](#register)
    - [Confirm account](#confirm-account)
    - [Login](#login)
- [Development](#development)
    - [Testing](#testing)
- [Book Recommendation](#book-recommendation)
- [Redis](#redis)
    - [Caching Data](#caching-data)
    - [Rate Limit](#rate-limit)
- [Docker](#docker)
    - [Build](#build)
    - [Run](#run)
- [RSS](#rss)

## Set Up Environment Variable
Before start the server, you ought to set up environment variables as the following table.

| Variable       | Value                                                           |
| ---------- | ------------------------------------------------------------ |
| MONGO_URI  | { Your Mongo URI, we recommend to use 'mlab' for free MongoDB server } |
| REDIS_PORT | { Your Redis Port, we recommend to use 'RedisLabs' for free Redis service  } |
| REDIS_PWD  | { Your Redis Password } |
| REDIS_URI  | { Your Redis URI } |
| EMAIL      | { Email account that support SMTP protocol, for the usage of send validation email }   |
| EMAIL_PWD  | { Email password } |

If you are using mail service rather than QQ, like Gmail or Hotmail, you should change the service name in server/utils/mailer.js Line 15.
For more supported well-known services can be found in [Nodemailer](https://nodemailer.com/smtp/well-known/).

## API
Recommend REST API Testing Tools: [Postman](https://www.getpostman.com/) or [Restlet](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm).

Or use built-in tool: [Swagger](https://swagger.io/)

### Using Swagger

Swagger API document: [http://localhost:5000/swagger/](http://localhost:5000/swagger/)

How to use Swagger UI: [How to Use Swagger UI for API Testing](https://www.blazemeter.com/blog/getting-started-with-swagger-ui)

When access some private route, you may need to add JWT to header.
![](https://i.loli.net/2018/07/27/5b59f67a4322b.png)

![](https://i.loli.net/2018/07/27/5b59f74dc06de.png)

### Register
[http://localhost:5000/api/users/register](http://localhost:5000/api/users/register)
![register](https://ws4.sinaimg.cn/large/0069RVTdly1fuo1mr1oc8j31hu0x40z9.jpg)

### Confirm account
After register a new user, the user have to activate his account via activation link in email. Or you can activate account thought the Api in the following.

[http://localhost:5000/api/users/active/{activeToken}](http://localhost:5000/api/users/active/{activeToken})
![Activate Account](https://ws1.sinaimg.cn/large/0069RVTdly1fuo1pd6opvj31i20hujuh.jpg)

Then you can login successfully.

### Login
[http://localhost:5000/api/users/login](http://localhost:5000/api/users/login)
![login](https://ws3.sinaimg.cn/large/0069RVTdly1fuo1kr5lrhj31hm0pydky.jpg)

## Development

This project uses ESLint to detect suspicious code in JavaScript files.
Visit [http://eslint.org](http://eslint.org) for details.

### Testing

This project uses [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest) for testing.  
Visit [https://jestjs.io/](https://jestjs.io/) and [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest) for details.

To execute tests:

```bash
npm run test
```

## Book Recommendation

The Book Recommendation Engine bases on [k-nearest neighbors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm).

Basically it depends on the star of book review provided by other users.

Related Code can be referred to [Lovely-AIP/server/recommendation/](https://github.com/Latias94/Lovely-AIP/tree/master/server/recommendation).

Related API document can be referred to [http://localhost:5000/swagger/#/Recommendation](http://localhost:5000/swagger/#/Recommendation).

You can test API by the following link:

[http://localhost:5000/api/recommendation/book/5b5c0edc1e744f9760543a07](http://localhost:5000/api/recommendation/book/5b5c0edc1e744f9760543a07)

## Redis
We implement some advance features base on Redis.

![](https://i.loli.net/2018/09/12/5b98811a057e3.png)

Related Code can be referred to [Lovely-AIP/server/config/cache.js](https://github.com/Latias94/Lovely-AIP/blob/master/server/config/cache.js).

### Caching Data
Redis Lab provides free Redis database with AWS region endpoint of 'ap-southeast-2', which is located in Sydney.

![](https://i.loli.net/2018/09/13/5b99dafd4186c.png)

### Rate Limit
Provide ability to limit the rate of API request in a period of time.  
In this project, APIs of 'Create User' and 'Send Validation Email' are under limitation of two requests each minute.   
If reach the limitation, server will respond a status code of 429 which stands for 'Too Many Request'.

Related Code can be referred to [Lovely-AIP/server/middlewares/rateLimit.js](https://github.com/Latias94/Lovely-AIP/blob/master/server/middlewares/rateLimit.js).

## Docker
Set environment valuables inside of Dockerfile.

### Build

```shell
cd server/
docker build -t server .
```

### Run

```shell
docker run -p 5000:5000 -d --restart=always server
```

## RSS
Provide feeds of the newest book lists and books.  
[The Newest Book RSS](https://lovely-aip.herokuapp.com/api/feed/books)

![](https://i.loli.net/2018/10/06/5bb8d65366cae.png)
