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
ENV AUTH_MS_URL=un-campusconnect_autenticacion_ms
ENV AUTH_MS_PORT=3000
ENV CALL_MS_URL=127.0.0.1
ENV CALL_MS_PORT=8080
ENV TUTORPROFILE_MS_URL=127.0.0.1
ENV TUTORPROFILE_MS_PORT=3004
ENV BIENESTAR_MS_URL = un-campusconnect_bienestar_ms
ENV BIENESTAR_MS_PORT = 80

CMD [ "npm", "run", "runServer" ]