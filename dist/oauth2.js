"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
const passport_1 = __importDefault(require("passport"));
const server_1 = require("./server");
const passport_local_1 = require("passport-local");
const passport_http_bearer_1 = require("passport-http-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
passport_1.default.use(new passport_local_1.Strategy(async function verify(username, password, done) {
    try {
        const user = await server_1.client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [
            username,
            password
        ]);
        if (!user.rows[0]) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user.rows[0]);
    }
    catch (error) {
        done(error);
    }
}));
passport_1.default.use(new passport_http_bearer_1.Strategy(async function verify(token, done) {
    if (!token) {
        return done('No Token', false, { message: 'Please provide a token', scope: 'none' });
    }
    try {
        const user = await server_1.client.query('SELECT * FROM users WHERE token = $1', [token]);
        if (!user.rows[0] || !jsonwebtoken_1.default.verify(token, 'secret')) {
            return done(null, false, { message: 'Incorrect token. Please login again', scope: 'none' });
        }
        return done(null, user.rows[0], { scope: user.rows[0]?.permissions });
    }
    catch (error) {
        done(error);
    }
}));
exports.default = passport_1.default;
