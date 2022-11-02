"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./users/index");
exports.router = express_1.default.Router();
exports.router.get('/users', index_1.getUsers);
exports.router.post('/users', index_1.createUser);
exports.router.patch('/users', index_1.updateUser);
exports.router.delete('/users', index_1.deleteUser);