#!/bin/bash

kubectl config set-context --current --namespace=4sh-invoice-qa

kubectl rollout restart deployment invoice