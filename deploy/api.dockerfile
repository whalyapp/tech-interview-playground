FROM node:16-slim

WORKDIR /app

COPY api/package.json api/package-lock.json ./

RUN npm install

COPY api/ ./api/

ENV NODE_ENV=development

ENTRYPOINT npm start
EXPOSE 5000