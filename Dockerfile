FROM node:20-alpine3.18 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

FROM nginx:1.20.1-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

FROM mysql:8.0.33

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=mozart_q_submissions
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root

ADD /etc/localtime /etc/localtime
EXPOSE 3306

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /home/mozart
VOLUME /tmp
ARG JAR_FILE
COPY /home/mozart/mozart-portal-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","/app.jar"]