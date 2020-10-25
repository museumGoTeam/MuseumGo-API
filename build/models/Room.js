"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = new mongoose_1.default.Schema({
    label: {
        type: String,
        required: true
    },
    pos: {
        x: Number,
        y: Number
    }
});
exports.default = mongoose_1.default.model("Room", Schema);
