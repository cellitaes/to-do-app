FROM node:20

WORKDIR /app

ENV VITE_APP_PORT=80
ENV VITE_SERVER_URL='http://localhost:5000'

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]