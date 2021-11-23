FROM node:16-slim

WORKDIR /app

COPY web/package.json ./

RUN npm install

COPY web/ ./web/

ENV NODE_ENV=development

ENTRYPOINT npm start
EXPOSE 3000