FROM tomcat:7-jdk8

LABEL maintainer="ops@4sh.fr"

RUN rm -rf /usr/local/tomcat/webapps/*
ADD target/ROOT.war /usr/local/tomcat/webapps/

EXPOSE 8080

CMD ["catalina.sh", "run"]