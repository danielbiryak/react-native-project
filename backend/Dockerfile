FROM node:16-alpine

WORKDIR /backend

EXPOSE 3000

COPY package* ./

RUN npm install

COPY . .

CMD ["npm","run","start-dev-backend"]