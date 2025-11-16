FROM node:24 as backend
LABEL authors="egor"

WORKDIR /app

COPY package*.json ./

COPY server/package.json ./server/package.json

RUN npm ci --include=dev

COPY server ./server

WORKDIR /app/server

ENTRYPOINT ["npm", "run", "start"]