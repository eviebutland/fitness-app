"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const logout = async (request, response) => {
    if (request.params.id === ':id') {
        response.status(404).json({ message: 'Please provide an id' });
        return;
    }
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        // remove the token on the user request
        const query = `
    UPDATE users
    SET token = null
    WHERE id = ${request.params.id}
    `;
        const result = await server_1.client.query(query);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json({ message: 'Sucessfully logged out' });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).send({ message: 'Something went wrong', error });
    }
};
exports.logout = logout;
