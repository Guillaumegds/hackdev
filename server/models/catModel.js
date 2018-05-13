"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var catSchema = new mongoose.Schema({
    name: String,
    weight: String,
    team: String,
    age: String,
    win: Number,
});
var catModel = mongoose.model('cat', catSchema);
exports.default = catModel;
//# sourceMappingURL=catModel.js.map