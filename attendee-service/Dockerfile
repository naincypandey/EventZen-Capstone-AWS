FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5001
CMD ["node", "server.js"]