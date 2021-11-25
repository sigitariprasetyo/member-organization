FROM node:latest

EXPOSE 3006

WORKDIR /app

COPY ./member-services/package.json ./member-services/package-lock*.json  ./

RUN npm install

COPY ./member-services .

CMD ["node", "server.js"]