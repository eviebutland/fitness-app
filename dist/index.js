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
const api = new openapi_backend_1.default({
    definition: schema_1.document,
    handlers: index_1.handlers
});
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(routes_1.router);
exports.app.use((req, res) => api.handleRequest(req, req, res));
exports.app.listen(3030, () => {
    console.log(`App running on port 3030.`);
});
(0, server_1.connectDb)();
