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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var datamodels_1 = require("./datamodels");
var datamodels_2 = require("./datamodels");
//we need a datawrapper that has mock data of a user
var userData = new Map([
    [
        "TEST1",
        {
            userId: "1",
            username: "Alice",
            email: "alice@example.com",
            passwordHash: "hashed_pw",
            role: datamodels_2.Role.Poster,
            feeds: (_a = {},
                _a[datamodels_1.FeedScope.Local] = "TEST",
                _a),
        },
    ],
    [
        "TEST2",
        {
            userId: "2",
            username: "Bob",
            email: "bob@example.com",
            passwordHash: "hashed_pw",
            role: datamodels_2.Role.Commenter,
            feeds: (_b = {},
                _b[datamodels_1.FeedScope.Local] = "TEST",
                _b),
        },
    ],
]);
//mock feed
var feedData = new Map([
    [
        "TEST",
        {
            feedID: "TEST",
            feedLevel: datamodels_1.FeedScope.Local,
            regionID: "Washington, D.C.",
            getPosts: function (_start, _amount) {
                return [
                    {
                        item: postData.get("TEST"),
                        id: "TEST",
                        fetch: function () {
                            return this.item;
                        },
                    },
                    {
                        item: postData.get("TEST2"),
                        id: "TEST2",
                        fetch: function () {
                            return this.item;
                        },
                    },
                ];
            },
        },
    ],
]);
//gonna do the same thing for a mock post obj
var postData = new Map([
    [
        "TEST",
        {
            postId: "1",
            authorId: "2",
            title: "Test post title!",
            contentType: datamodels_1.PostClassification.Poll,
            primaryContent: "skdlsjf",
            textContent: "Test content here. Everyone to be given free puppies by the state.",
            category: "policy",
            createdAt: new Date(),
            updatedAt: new Date(),
            getComments: function (_start, _amount) {
                return [
                    {
                        item: commentData.get("TEST"),
                        id: "TEST",
                        fetch: function () {
                            return this.item;
                        },
                    },
                ];
            },
            getReactionAmounts: function () {
                return new Map();
            },
            getReactions: function () {
                return [];
            },
        },
    ],
    [
        "TEST2",
        {
            postId: "2",
            authorId: "1",
            title: "Another test title???",
            contentType: datamodels_1.PostClassification.Text,
            primaryContent: "skdlsjf",
            textContent: "Another test post? In this economy???",
            category: "policy",
            createdAt: new Date(),
            updatedAt: new Date(),
            getComments: function (_start, _amount) {
                return [];
            },
            getReactionAmounts: function () {
                return new Map();
            },
            getReactions: function () {
                return [];
            },
        },
    ],
]);
//same thing for comments, where post ID for comments will match post
var commentData = new Map([
    [
        "TEST",
        {
            commentId: "1",
            postId: "1",
            authorId: "1", //user 1 commented on user 2's post
            content: "lol f u",
            createdAt: new Date(), //using this to mock stuff
            updatedAt: new Date(),
        },
    ],
]);
function getFromCollection(collection, id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    return setTimeout(function () { return resolve(collection.get(id)); }, 300);
                })];
        });
    });
}
var DataWrapper = (function () { return ({
    getCurrentUser: function () { return getFromCollection(userData, "TEST1"); },
    getFeed: function (feedId) { return getFromCollection(feedData, feedId); },
    getUser: function (userId) { return getFromCollection(userData, userId); },
    getPost: function (postId) { return getFromCollection(postData, postId); },
    getComments: function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // THIS SHOULD BE CHANGED TO GRAB FROM LIST OF COMMENT IDS IN POST DATASTRUCTURE
                return [2 /*return*/, new Promise(function (resolve) {
                        return setTimeout(function () {
                            return resolve(Array.from(commentData.values()).filter(function (c) { return c.postId === postId; }));
                        }, 300);
                    })];
            });
        });
    },
}); })();
exports.default = DataWrapper;
