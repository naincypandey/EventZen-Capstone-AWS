FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pass AWS IP to Vite during build
ARG VITE_AUTH_API_URL
ARG VITE_VENUE_API_URL
ARG VITE_ATTENDEE_API_URL
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_VENUE_API_URL=$VITE_VENUE_API_URL
ENV VITE_ATTENDEE_API_URL=$VITE_ATTENDEE_API_URL

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]