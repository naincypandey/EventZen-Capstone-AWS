FROM node:20
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5001
CMD ["node", "server.js"]