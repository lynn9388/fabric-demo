"use strict";

const { Contract } = require("fabric-contract-api");

class AssetContract extends Contract {

    async assetExists(ctx, assetId) {
        const buffer = await ctx.stub.getState(assetId);
        return buffer && buffer.length > 0;
    }

    async createAsset(ctx, assetId, value) {
        const exists = await this.assetExists(ctx, assetId);
        if (exists) {
            throw new Error(`The asset ${assetId} already exists`);
        }
        const asset = {
            id: assetId,
            value: value
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(assetId, buffer);
    }

    async readAsset(ctx, assetId) {
        const buffer = await ctx.stub.getState(assetId);
        if (!buffer || buffer.length === 0) {
            throw new Error(`The asset ${assetId} does not exist`);
        }
        return buffer.toString();
    }

    async updateAsset(ctx, assetId, newValue) {
        const exists = await this.assetExists(ctx, assetId);
        if (!exists) {
            throw new Error(`The asset ${assetId} does not exist`);
        }
        const asset = {
            id: assetId,
            value: newValue
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(assetId, buffer);
    }

    async deleteAsset(ctx, assetId) {
        const exists = await this.assetExists(ctx, assetId);
        if (!exists) {
            throw new Error(`The asset ${assetId} does not exist`);
        }
        await ctx.stub.deleteState(assetId);
    }

}

module.exports = AssetContract;
