"use strict";
const mongoose = require("mongoose");
const VideoDiskSchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String },
});
exports.VideoDisk = mongoose.model("VideoDisk", VideoDiskSchema);
