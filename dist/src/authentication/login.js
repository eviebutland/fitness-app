"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (request, response) => {
    const query = `
  SELECT * FROM users
  WHERE email = $1
  AND password = $2;
  `;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const result = await server_1.client.query(query, [request.body.username, request.body.password]);
        if (!result.rowCount) {
            response.statusCode = 404;
            response.send({ message: 'No users found with match details' });
        }
        // if the user is an admin, we want to send back admin related fields
        // if the user is a subscriber, we want to only send subscriber related fields
        // const filteredResponse =
        const token = jsonwebtoken_1.default.sign({
            id: result.rows[0].id,
            email: result.rows[0].email
        }, 'secret', { expiresIn: '1h' });
        const updateQuery = `
    UPDATE users
    SET token = '${token}'
    WHERE id = ${result.rows[0].id}
    `;
        const updateResult = await server_1.client.query(updateQuery);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).send({ message: 'Successfully logged in', user: { ...result.rows[0], token } });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).send({ message: 'Something went wrong', error });
    }
};
exports.login = login;
