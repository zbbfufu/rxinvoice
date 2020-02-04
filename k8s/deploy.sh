#!/bin/bash

kubectl config set-context --current --namespace=4sh-invoice-qa

kubectl apply -f invoice.yaml
