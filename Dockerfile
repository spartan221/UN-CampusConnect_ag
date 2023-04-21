FROM node:carbon-slim

# Create app directory
WORKDIR /un-campusconnect_ag

# Install app dependencies
COPY package.json /un-campusconnect_ag/
RUN npm install

# Bundle app source
COPY . /un-campusconnect_ag/
RUN npm run prepublish

# ENV variables
ENV AUTH_MS_URL=127.0.0.1
ENV AUTH_MS_PORT=3000

CMD [ "npm", "run", "runServer" ]