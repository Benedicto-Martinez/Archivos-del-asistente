FROM openjdk:11

WORKDIR /usr/src/app

COPY build/libs/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
