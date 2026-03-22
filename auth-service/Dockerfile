# Use Tomcat because you are building a .war file
FROM tomcat:10-jdk17-openjdk-slim

# Remove default Tomcat apps to keep it clean
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy your WAR file and rename it to ROOT.war so it runs at the base URL
COPY target/auth-service-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]