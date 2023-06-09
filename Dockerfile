FROM node:latest

WORKDIR /app

COPY ./package.json /app/package.json

COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY . /app

COPY .env /app

ENV NODE_ENV=production

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
