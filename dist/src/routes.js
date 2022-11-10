"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./authentication/login");
const index_1 = require("./users/index");
exports.router = express_1.default.Router();
// Authentication
exports.router.get('/login', login_1.login);
// Users
exports.router.get('/users', index_1.getUsers);
exports.router.post('/users', index_1.createUser);
exports.router.patch('/users/:id', index_1.updateUser);
exports.router.delete('/users/:id', index_1.deleteUser);
exports.router.get('/users/:id', index_1.getAUser);
