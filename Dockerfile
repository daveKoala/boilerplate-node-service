FROM node:14-alpine as base

WORKDIR /usr/src/app
COPY ./app/package.json package.json
COPY ./app/package-lock.json package-lock.json

RUN npm ci

FROM base as development
COPY ./app .
CMD ["npm", "run", "dev"]

FROM base as production
COPY ./app .
RUN npm run build
CMD ["npm", "start"]