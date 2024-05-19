FROM node:20

WORKDIR /app

ENV PORT=5000

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 5000

CMD ["npm", "run", "start"]