"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const get_1 = require("./get");
Object.defineProperty(exports, "getUsers", { enumerable: true, get: function () { return get_1.getUsers; } });
const post_1 = require("./post");
Object.defineProperty(exports, "createUser", { enumerable: true, get: function () { return post_1.createUser; } });
const patch_1 = require("./patch");
Object.defineProperty(exports, "updateUser", { enumerable: true, get: function () { return patch_1.updateUser; } });
const delete_1 = require("./delete");
Object.defineProperty(exports, "deleteUser", { enumerable: true, get: function () { return delete_1.deleteUser; } });
