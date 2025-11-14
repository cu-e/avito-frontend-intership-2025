FROM node:24 as build
LABEL authors="egor"

WORKDIR /app

COPY package.json package-lock.json ./

COPY client/package.json ./client/package.json

RUN npm ci --workspaces --include=dev

COPY client ./client

WORKDIR /app/client

RUN npm run build

FROM nginx:1.28.0 AS runtime

RUN rm /etc/nginx/conf.d/default.conf
COPY client/deploy/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80