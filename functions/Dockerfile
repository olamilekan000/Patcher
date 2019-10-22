FROM node:8.16.2

RUN mkdir /app

WORKDIR /app

COPY package.json package-lock.json /app/
COPY ./lib  /app/
RUN npm install

EXPOSE 9090

CMD ["npm", "start:image"]
