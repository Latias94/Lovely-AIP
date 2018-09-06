# Server
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

### Book Recommendation

The Book Recommendation Engine bases on [k-nearest neighbors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm).

Basically it depends on the star of book review provided by other users.

Related Code can be referred to [Lovely-AIP/server/recommendation/](https://github.com/Latias94/Lovely-AIP/tree/master/server/recommendation).

Related API document can be referred to [http://localhost:5000/swagger/#/Recommendation](http://localhost:5000/swagger/#/Recommendation).

You can test API by the following link:

[http://localhost:5000/api/recommendation/book/5b5c0edc1e744f9760543a07](http://localhost:5000/api/recommendation/book/5b5c0edc1e744f9760543a07)