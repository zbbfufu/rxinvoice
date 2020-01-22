#!/bin/sh

IMAGE=eu.gcr.io/quatreapp/mvn-npm-builder
TAG=0.1

docker build -t $IMAGE:$TAG -f Dockerfile.mvn-npm-builder .
docker tag $IMAGE:$TAG $IMAGE:latest 
docker push $IMAGE:$TAG
docker push $IMAGE:latest