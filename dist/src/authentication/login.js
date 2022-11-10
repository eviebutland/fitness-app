"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const login = async (request, response) => {
    const query = `SELECT (name, email) FROM users
  WHERE email = $1
  AND password = $2`;
    try {
        const result = await server_1.client.query(query, [request.body.username, request.body.password]);
        if (!result.rowCount) {
            response.statusCode = 404;
            response.send({ message: 'No users found with match details' });
        }
        // if the user is an admin, we want to send back admin related fields
        // if the user is a subscriber, we want to only send subscriber related fields
        response.send(result.rows);
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
    }
    finally {
        // do something here
    }
};
exports.login = login;
