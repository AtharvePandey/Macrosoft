"use strict";
// Data Models for Polispace Application
// These models represent the core entities in the Polispace and their relationships.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostClassification = exports.FeedScope = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["Poster"] = 0] = "Poster";
    Role[Role["Commenter"] = 1] = "Commenter";
})(Role || (exports.Role = Role = {}));
var FeedScope;
(function (FeedScope) {
    FeedScope[FeedScope["Local"] = 0] = "Local";
    FeedScope[FeedScope["State"] = 1] = "State";
    FeedScope[FeedScope["Federal"] = 2] = "Federal";
})(FeedScope || (exports.FeedScope = FeedScope = {}));
var PostClassification;
(function (PostClassification) {
    PostClassification[PostClassification["Text"] = 0] = "Text";
    PostClassification[PostClassification["Image"] = 1] = "Image";
    PostClassification[PostClassification["Video"] = 2] = "Video";
    PostClassification[PostClassification["Poll"] = 3] = "Poll";
})(PostClassification || (exports.PostClassification = PostClassification = {}));
