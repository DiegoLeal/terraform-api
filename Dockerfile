FROM node:16

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

COPY src /app/src

RUN npm install
RUN npm run build

COPY . .

CMD [ "node", "./dist/index.js" ]