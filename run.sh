#!/bin/bash

# This script is used to run the fabric-demo application.
# Detailed instructions can be found in https://fabcar-samples.github.io/docs/networks/microfab/.

# Start the Hyperledger Fabric network, remove the previous network if it exists.
docker ps -a | grep -q fabric && docker rm -f fabric
docker run -d -p 8080:8080 -v "$(pwd)"/contract:/contract --name fabric ibmcom/ibp-microfab

echo "Waiting for Fabric to start..."
sleep 2

# Get the MicroFab configuration.
npm list -g | grep -q @hyperledgendary/weftility || npm install -g @hyperledgendary/weftility
curl -s http://console.127-0-0-1.nip.io:8080/ak/api/v1/components | weft microfab -w ./web/fabric/wallets -p ./web/fabric/gateways -m ./web/fabric/msp -f

# Deploy the smart contract to the Hyperledger Fabric network.
docker exec -i fabric bash < deploy.sh

# Start the web application.
cd web
npm install
npm run serverstart
