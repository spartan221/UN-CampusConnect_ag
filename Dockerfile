FROM node:carbon-slim

# Create app directory
WORKDIR /un-campusconnect_ag

# Install app dependencies
COPY package.json /un-campusconnect_ag/
RUN npm install

# Bundle app source
COPY . /un-campusconnect_ag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]