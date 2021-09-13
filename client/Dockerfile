FROM node:16.9

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

USER node

EXPOSE 3000

CMD ["npm", "start"]