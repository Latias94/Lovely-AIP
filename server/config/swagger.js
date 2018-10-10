// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating RESTful API',
  },
  host: require('./keys').backendHost,
  basePath: '/',
};


module.exports = swaggerDefinition;
