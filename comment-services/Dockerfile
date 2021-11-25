FROM node:latest

EXPOSE 3005

WORKDIR /app

COPY ./comment-services/package.json ./comment-services/package-lock*.json  ./

RUN npm install

COPY ./comment-services .

CMD ["node", "server.js"]