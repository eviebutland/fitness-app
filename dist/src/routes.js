"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const get_1 = require("./users/get");
const post_1 = require("./users/post");
exports.router = express_1.default.Router();
console.log('reached routes');
exports.router.get('/users', get_1.getUsers);
exports.router.post('/users', post_1.createUser);
// export { getUsers }
