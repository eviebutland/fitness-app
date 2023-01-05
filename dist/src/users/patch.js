"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const format_request_body_1 = require("../utils/format-request-body");
const security_1 = require("../utils/security");
const updateUser = async (request, response) => {
    if (request.params.id === ':id') {
        response.status(404).json({ message: 'Please provide an id' });
        return;
    }
    let data = request.body;
    const columns = Object.keys(data);
    if (columns.includes('password')) {
        (0, security_1.passwordValidation)(request.body.password, response, server_1.client);
        // Reset status if password is updated
        data = { ...request.body, password: await (0, security_1.saltAndHash)(request.body.password), status: 'active' };
    }
    const values = Object.values(data);
    const set = (0, format_request_body_1.formatPatchBody)(columns);
    const query = `
    UPDATE users
    SET ${set}
    WHERE id = ${request.params.id}
    `;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const res = await server_1.client.query(query, [...values]);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(201).send({ message: 'Successfully Updated user' });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.updateUser = updateUser;
