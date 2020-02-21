#!/bin/bash

set -e

codeship_google authenticate

gcloud container clusters get-credentials quatreapp-cl --zone=europe-west1-c
kubectl config set-context --current --namespace=4sh-invoice-dev

kubectl apply -f k8s/invoice-dev.yaml