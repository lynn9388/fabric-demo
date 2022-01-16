"use strict";

const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");
const debug = require("debug")("web:fabric");

async function getContract() {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.resolve(__dirname, "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    debug(`Wallet path: ${walletPath}`);

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    const connectionProfilePath = path.resolve(__dirname, "connection.json");
    debug(`Connection profile path: ${connectionProfilePath}`);

    const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, "utf8"));
    const connectionOptions = { wallet, identity: "Org1 Admin", discovery: { enabled: true, asLocalhost: true } };
    await gateway.connect(connectionProfile, connectionOptions);

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("contract");

    return contract;
}

async function evaluateTransaction(name, ...args) {
    try {
        const contract = await getContract();
        const result = await contract.evaluateTransaction(name, ...args);
        return `Successed to evaluate transaction: ${name}(${args})\nResult: ${result}`;
    } catch (error) {
        return `Failed to evaluate transaction:: ${name}(${args})\n` + error;
    }
}

async function submitTransaction(name, ...args) {
    try {
        const contract = await getContract();
        await contract.submitTransaction(name, ...args);
        return `Successed to submit transaction: ${name}(${args})`;
    } catch (error) {
        return `Failed to submit transaction:: ${name}(${args})\n` + error;
    }
}

module.exports = { evaluateTransaction, submitTransaction };
