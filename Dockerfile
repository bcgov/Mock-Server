FROM node:alpine

RUN mkdir -p /app
COPY . /app

RUN chown -R 1001:0 /opt/app && chmod -R ug+rwx /opt/app
USER 1001

WORKDIR /app

EXPOSE 8080

RUN npm install

CMD [ "npm", "start" ]