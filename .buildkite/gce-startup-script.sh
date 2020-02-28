#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/install-monitoring-agent.sh
sudo bash install-monitoring-agent.sh

curl -sSO https://dl.google.com/cloudagents/install-logging-agent.sh
sudo bash install-logging-agent.sh

sudo apt-get update
# Docker dependencies
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

echo "deb https://apt.buildkite.com/buildkite-agent stable main" | sudo tee /etc/apt/sources.list.d/buildkite-agent.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 32A37959C2FA5C3C99EFBC32A79206696452D198

sudo apt-get update
sudo apt-get install -y buildkite-agent docker-ce docker-ce-cli containerd.io

sudo usermod -aG docker buildkite-agent

sudo sed -i "s/xxx/c7152c8d47c911664e7907d52149e6e0df4cb9ec183d0a2175/g" /etc/buildkite-agent/buildkite-agent.cfg

sudo systemctl enable buildkite-agent
sudo systemctl restart buildkite-agent

