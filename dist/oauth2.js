"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
const passport_1 = __importDefault(require("passport"));
const server_1 = require("./server");
const passport_local_1 = require("passport-local");
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
exports.default = passport_1.default;
