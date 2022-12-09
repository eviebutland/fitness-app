"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
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
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).send({ message: 'Successfully logged in', user: result.rows });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).send({ message: 'Something went wrong', error });
    }
};
exports.login = login;
