"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var RoomController_1 = __importDefault(require("./controllers/RoomController"));
var MapController_1 = __importDefault(require("./controllers/MapController"));
var app = express_1.default();
app.get('/', function (req, res) {
    res.status(200).json({ "status": "ok" });
});
app.use('/api/rooms', RoomController_1.default);
app.use('/api/map', MapController_1.default);
var PORT = 5000;
app.listen(PORT, function () {
    try {
        mongoose_1.default.connect("mongodb://localhost:27017/museumGO?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('It is working');
    }
    catch (e) {
        console.log("Error when connecting with the server", e);
    }
});
