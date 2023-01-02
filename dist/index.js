"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./src/routes");
const server_1 = require("./server");
const openapi_backend_1 = __importDefault(require("openapi-backend"));
const index_1 = require("./src/index");
const schema_1 = require("./schema/schema");
const express_session_1 = __importDefault(require("express-session"));
const oauth2_1 = __importDefault(require("./oauth2"));
const api = new openapi_backend_1.default({
    definition: schema_1.document,
    handlers: index_1.handlers
});
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, express_session_1.default)({
    name: 'expressSessionHere',
    secret: 'something is in the secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}));
exports.app.use(oauth2_1.default.initialize());
exports.app.use(oauth2_1.default.session());
exports.app.use((request, response, next) => {
    request.url.includes('login') || request.url.includes('logout')
        ? next()
        : oauth2_1.default.authenticate('bearer', { session: false })(request, response, next);
});
// app.use(
//   passport.authenticate('oauth2Bearer', (error, done, next) => {
//     console.log('using bearer token to authorise', error)
//     // error prints null
//     // done prints false
//     // next prints Bearer realm="Users" ??
//     console.log(done)
//     console.log(next)
//   })
// )
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(routes_1.router);
exports.app.use((req, res, next) => api.handleRequest(req, req, res, next));
exports.app.listen(3030, () => {
    console.log(`App running on port 3030.`);
});
(0, server_1.connectDb)();
