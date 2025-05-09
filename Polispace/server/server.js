"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var datawrapper_1 = require("../src/datawrapper");
var dataWrapper = datawrapper_1.default;
var app = (0, express_1.default)();
var port = 3001; //making this port cause idk what other parts of the applications use
app.use((0, cors_1.default)());
// /user/atharve --> where atharve will be the user we are searching for
app.get('/user/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                user = req.body.user;
                if (!user) {
                    res.status(404).send("user is null, try querying again"); //user not found? actually this should be done in the physical datawrapper class...
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                _b = (_a = res).send;
                return [4 /*yield*/, dataWrapper.getUser(user)];
            case 2:
                _b.apply(_a, [_d.sent()]);
                return [3 /*break*/, 4];
            case 3:
                _c = _d.sent();
                res.status(404).send("user not in the db");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// /feed/12 where 12 is gonna be id of the feed
app.get('/feed/:feedID', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var feed, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                feed = req.body.feed;
                if (!feed) {
                    res.status(404).send("can't find the feed id womp womp"); //its jover
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                _b = (_a = res).send;
                return [4 /*yield*/, dataWrapper.getFeed(feed)];
            case 2:
                _b.apply(_a, [_d.sent()]); //we are so barack
                return [3 /*break*/, 4];
            case 3:
                _c = _d.sent();
                res.status(404).send("feed not found"); //its so jover
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// /feed/12 where 12 is gonna be id of the feed
app.get('/post/:postID', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                post = req.body.post;
                if (!post) {
                    res.status(404).send("can't find the post womp womp"); //its jover
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                _b = (_a = res).send;
                return [4 /*yield*/, dataWrapper.getPost(post)];
            case 2:
                _b.apply(_a, [_d.sent()]); //we are so barack
                return [3 /*break*/, 4];
            case 3:
                _c = _d.sent();
                res.status(404).send("post not found"); //its so jover
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//add app.post stuff after we change the datawrapper thingie
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
