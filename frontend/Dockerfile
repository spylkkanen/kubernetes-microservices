FROM node:8-alpine

LABEL version="1.0.0"
ARG basedir="frontend"
ENV NODE_ENV production
WORKDIR ${basedir}/ .

# Copy package.json
COPY ${basedir}/package*.json ./

# Install npm packages
RUN npm install --silent

# Copy project files to the workdir.
COPY ${basedir}/ .

# Install bash inside container. Only if you need to debug app inside of the container.
RUN apk update && apk add bash

EXPOSE 9000
CMD npm start