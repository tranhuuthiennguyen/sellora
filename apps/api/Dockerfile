FROM node:24-alpine3.21

WORKDIR /usr/src/app

COPY package.json ./ 
COPY package-lock.json ./

COPY apps/api/package.json ./apps/api/package.json

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]