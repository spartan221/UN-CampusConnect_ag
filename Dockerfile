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
ENV AUTH_MS_URL=172.17.0.1
ENV AUTH_MS_PORT=3000
ENV CALL_MS_URL=172.17.0.1
ENV CALL_MS_PORT=8080
ENV TUTORPROFILE_MS_URL=172.17.0.1
ENV TUTORPROFILE_MS_PORT=3004
ENV BIENESTAR_MS_URL=172.17.0.1
ENV BIENESTAR_MS_PORT=80
ENV RABBIT_MQ_URL=172.17.0.1
ENV RABBIT_MQ_QUEUE=emails
ENV CALENDAR_MS_URL=172.17.0.1
ENV Event_MS_PORT=4000

CMD [ "npm", "run", "runServer" ]