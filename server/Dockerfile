FROM node:8
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

# Set up your environment valuables
ENV MONGO_URI ""
ENV REDIS_PORT ""
ENV REDIS_PWD ""
ENV REDIS_URI ""
ENV EMAIL ""
ENV EMAIL_PWD ""

CMD [ "npm", "run", "server" ]
