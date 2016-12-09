FROM node:alpine

RUN mkdir -p /app
COPY . /app

WORKDIR /app

EXPOSE 8080

RUN npm install

RUN chown -R 1001:0 app && chmod -R ug+rwx app
USER 1001

CMD [ "npm", "start" ]