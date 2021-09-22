FROM node:14-alpine as base

# ENV PORT 8080
WORKDIR /usr/src/app
COPY ./app/package.json package.json
COPY ./app/package-lock.json package-lock.json

# RUN npm install -g nodemon
# RUN npm install
RUN npm ci

FROM base as development
# RUN npm install -g nodemon
# RUN npm ci
COPY ./app .
CMD ["npm", "run", "dev"]

FROM base as production
# RUN npm ci
COPY ./app .
CMD ["npm", "run", "build"]