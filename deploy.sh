export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_MSPCONFIGPATH=/opt/microfab/data/admin-org1
export CORE_PEER_ADDRESS=org1peer-api.127-0-0-1.nip.io:8080

cd /home/ibp-user/
peer lifecycle chaincode package contract.tar.gz --path /contract --lang node --label contract

peer lifecycle chaincode install contract.tar.gz

export CC_PACKAGE_ID=`peer lifecycle chaincode queryinstalled | grep -o -P '(?<=Package ID: ).*(?=, Label)'`

peer lifecycle chaincode approveformyorg -o orderer-api.127-0-0-1.nip.io:8080 --channelID channel1 --name contract --version 1 --sequence 1 --waitForEvent --package-id ${CC_PACKAGE_ID}

peer lifecycle chaincode commit -o orderer-api.127-0-0-1.nip.io:8080 --channelID channel1 --name contract --version 1 --sequence 1
