# Build Stage
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run Stage
# Using Eclipse Temurin - the most stable Java 17 image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Spring Boot 3 builds a .jar file in the target folder
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]