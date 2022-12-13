"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const google = new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: 'https://localhost:3030/oauth2/redirect/google',
    scope: ['profile'],
    state: true
    // http://localhost:3030/oauth2/redirect/google
}, (accessToken, refreshToken, profile, cb) => {
    console.log('running verify', accessToken, refreshToken, profile, cb);
});
passport_1.default.use(google);
exports.default = passport_1.default;
