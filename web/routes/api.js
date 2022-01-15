"use strict";

const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

/**
 * /api/assets/:asset_id    POST      Create asset
 * /api/assets/:asset_id    GET       Read asset
 * /api/assets/:asset_id    PUT       Update asset
 * /api/assets/:asset_id    DELETE    Delete asset
 */
router.route("/assets/:asset_id")
    .post(function (req, res) {
        const asset_id = req.params.asset_id;
        const asset_value = req.body.asset_value;
        res.json({ message: `Crate asset: ${asset_id}:${asset_value}` });
    })
    .get(function (req, res) {
        const asset_id = req.params.asset_id;
        res.json({ message: `Read asset: ${asset_id}` });
    })
    .put(function (req, res) {
        const asset_id = req.params.asset_id;
        const asset_value = req.body.asset_value;
        res.json({ message: `Update asset: ${asset_id}:${asset_value}` });
    })
    .delete(function (req, res) {
        const asset_id = req.params.asset_id;
        res.json({ message: `Delete asset: ${asset_id}` });
    });

module.exports = router;
