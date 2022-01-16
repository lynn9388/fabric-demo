"use strict";

const express = require("express");
const fabric = require("../fabric/fabric");

const router = express.Router();

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.number = 1;

/**
 * /api/assets/:asset_id    POST      Create asset
 * /api/assets/:asset_id    GET       Read asset
 * /api/assets/:asset_id    PUT       Update asset
 * /api/assets/:asset_id    DELETE    Delete asset
 */
router.route("/assets/:asset_id")
    .post(async function (req, res) {
        const asset_id = req.params.asset_id;
        const asset_value = req.body.asset_value;
        const result = await fabric.submitTransaction("createAsset", asset_id, asset_value);
        res.json({ message: result });
    })
    .get(async function (req, res) {
        const asset_id = req.params.asset_id;
        const result = await fabric.evaluateTransaction("readAsset", asset_id);
        res.json({ message: result });
    })
    .put(async function (req, res) {
        const asset_id = req.params.asset_id;
        const asset_value = req.body.asset_value;
        const result = await fabric.submitTransaction("updateAsset", asset_id, asset_value);
        res.json({ message: result });
    })
    .delete(async function (req, res) {
        const asset_id = req.params.asset_id;
        const result = await fabric.submitTransaction("deleteAsset", asset_id);
        res.json({ message: result });
    });

module.exports = router;
