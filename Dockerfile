FROM node:15.0-alpine

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/nuxt-app/
RUN yarn

RUN yarn build

EXPOSE 80

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80

CMD [ "yarn", "start" ]
