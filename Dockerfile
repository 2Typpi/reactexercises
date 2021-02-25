FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npx", "webpack", "serve", "--host", "0.0.0.0", "--config", "webpack.config.debug.js", "--content-base", "dev" ]