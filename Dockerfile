FROM node:16-alpine

WORKDIR /app
COPY . /app

RUN yarn install --silent
RUN yarn build

# Variables
ARG PORT
ENV PORT  ${PORT:-4000}

EXPOSE ${PORT:-4000}

CMD yarn serve

