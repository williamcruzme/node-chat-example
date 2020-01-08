FROM mhart/alpine-node

# Need git for not-published npm modules
RUN apk update && \
    apk add --no-cache git openssh

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN yarn
COPY . /usr/src/app

EXPOSE 3001

ENV WEBSOCKET_PATH chat
ENV REDIS_SERVICE_HOST 35.192.173.135

CMD [ "yarn", "start"]
