"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const server_1 = require("./server");
const BearerStrategy = passport_http_bearer_1.Strategy;
const findUser = async (token, done) => {
    const query = `
    SELECT * FROM users
    WHERE token = $1
    `;
    try {
        console.log('running strategery');
        const user = await server_1.client.query(query, [token]);
        console.log(user);
        if (!user.rows.length) {
            return done(null, false);
        }
        return done(null, user, { scope: 'all' });
    }
    catch (error) {
        return done(error);
    }
};
passport_1.default.use('oauth2Bearer', new BearerStrategy(function (accessToken, done) {
    // jwt.verify(accessToken, config.secrets.session, (err, decoded) => {
    // if (err) {
    //   return done(null, false, err)
    // }
    // On future, scopes can ve taken from token.
    var info = {
        scope: '*'
    };
    console.log('running');
    done(null, true, info);
    // })
}));
exports.default = passport_1.default;
