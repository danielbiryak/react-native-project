FROM node:16-alpine

WORKDIR /mobile

EXPOSE 19002

COPY package* ./
COPY yarn.lock ./

RUN npm install
RUN npm install -g expo-cli

COPY . .

CMD ["npm","run","start-frontend"]