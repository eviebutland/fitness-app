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
const api = new openapi_backend_1.default({
    definition: schema_1.document,
    handlers: {
        ...index_1.handlers,
        validationFail: validationFailHandler
    },
    validate: true,
    strict: true
});
async function validationFailHandler(c, req, res) {
    return res.status(400).json({ status: 400, err: c.validation.errors });
}
// TODO use this instead of homemade authorization
// function unauthorizedHandler(c, req, res) {
//   return res.status(401).json({ status: 401, err: 'Please authenticate first' })
// }
// api.registerHandler('unauthorizedHandler', unauthorizedHandler)
api.init();
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
// API handle request will trigger handlers (and validation fail)
exports.app.use((req, res) => api.handleRequest(req, req, res));
exports.app.use(routes_1.router);
exports.app.listen(3030, () => {
    console.log(`App running on port 3030.`);
});
(0, server_1.connectDb)();
