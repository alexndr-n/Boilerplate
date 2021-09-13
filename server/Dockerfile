FROM node:16.9

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 3001

CMD ["npm", "start"]