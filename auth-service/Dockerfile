# Build Stage
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run Stage
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy the JAR file (Spring Boot 3 apps build as .jar, not .war by default)
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
# Run as a standalone Java application
ENTRYPOINT ["java", "-jar", "app.jar"]