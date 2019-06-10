FROM node:10.7.0

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm i yarn -g
RUN yarn install
RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]
