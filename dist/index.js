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
// import { getUsers } from './server'
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(routes_1.router);
// app.get('/', (request: Request, response: Response): void => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })
// app.get('/users', getUsers)
exports.app.listen(3030, () => {
    console.log(`App running on port 3030.`);
});
