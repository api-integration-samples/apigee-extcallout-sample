FROM node:21
RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist" ]