FROM eu.gcr.io/quatreapp/mvn-npm-builder:3.6-9.11 as builder

ENV BUILDIR=/build

# Pre-download from dependency to cache them in Docker layer
WORKDIR ${BUILDIR}/ui
COPY ui/package.json ui/package-lock.json ./
# Replace by npm ci with newer npm
RUN npm --no-save install

# Download all required to go offline: dependencies, plugins, reporting
WORKDIR ${BUILDIR}
COPY pom.xml .
COPY srv/pom.xml srv/
COPY ui/pom.xml ui/
RUN mvn -B de.qaware.maven:go-offline-maven-plugin:1.2.5:resolve-dependencies

# Build & package ui+war without downloading dependencies
COPY srv/ ./srv
COPY ui/ ./ui
RUN mvn -B --offline package


######### Build final image #########
FROM tomcat:7-jdk8-openjdk-slim

LABEL maintainer="ops@4sh.fr"

# Install war as ROOT.war
COPY --from=builder /build/srv/target/rxinvoice-srv-*.war /usr/local/tomcat/webapps/ROOT.war