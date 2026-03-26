# Stage 1: Build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set relative paths for the proxy to pick up
ENV VITE_AUTH_API_URL=/api/auth
ENV VITE_VENUE_API_URL=/api/venue
ENV VITE_ATTENDEE_API_URL=/api/attendee

RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]