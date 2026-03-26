# Stage 1: Build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Relative paths for universal hosting
ARG VITE_AUTH_API_URL=/api/auth
ARG VITE_VENUE_API_URL=/api/venue
ARG VITE_ATTENDEE_API_URL=/api/attendee

ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_VENUE_API_URL=$VITE_VENUE_API_URL
ENV VITE_ATTENDEE_API_URL=$VITE_ATTENDEE_API_URL

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]