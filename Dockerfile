FROM node:10
LABEL maintainer="Kylan Hurt <kylan.hurt@gmail.com>"
WORKDIR /usr/src/eos-block-explorer
COPY package*.json ./
COPY . .
RUN npm install -g yarn
RUN yarn
RUN yarn global add sucrase rimraf chalk
EXPOSE 3000

CMD [ "yarn", "start" ]