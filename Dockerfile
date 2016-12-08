FROM node:alpine

COPY . .

EXPOSE 8080

RUN npm install

CMD [ "npm", "start" ]