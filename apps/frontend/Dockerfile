FROM node:20-alpine

WORKDIR /app/frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
