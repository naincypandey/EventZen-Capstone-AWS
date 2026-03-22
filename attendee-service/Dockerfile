# 1. Use the lightweight Node.js image
FROM node:18-alpine

# 2. Create app directory
WORKDIR /usr/src/app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# 4. Copy your source code (server.js, .env, etc.)
COPY . .

# 5. The Attendee service runs on port 5001
EXPOSE 5001

# 6. Start the service
CMD [ "node", "server.js" ]