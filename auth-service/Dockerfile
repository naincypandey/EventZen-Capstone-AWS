# Build Stage
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run Stage
# Using the standard Tomcat 10 image which is more reliable
FROM tomcat:10.0-jdk17-openjdk-slim
WORKDIR /usr/local/tomcat/webapps/

# Remove default Tomcat apps to avoid clashes
RUN rm -rf ROOT/

# Copy your war file as ROOT.war so it loads at http://ip:8080/
COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]