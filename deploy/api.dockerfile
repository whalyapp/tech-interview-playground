FROM node:16-slim

WORKDIR /app

COPY api/package.json api/package-lock.json ./

RUN npm install

COPY api/ ./

RUN npm run build

ENV NODE_ENV=development

ENTRYPOINT npm start
EXPOSE 4000
EXPOSE 5000