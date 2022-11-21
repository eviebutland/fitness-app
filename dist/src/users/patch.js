"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const format_patch_body_1 = require("../utils/format-patch-body");
const updateUser = async (request, response) => {
    if (request.params.id === ':id') {
        response.status(404);
        response.send({ message: 'Please provide an id' });
        return;
    }
    const columns = Object.keys(request.body);
    const values = Object.values(request.body);
    const set = (0, format_patch_body_1.formatPatchBody)(columns);
    const query = `
    UPDATE users
    SET ${set}
    WHERE id = ${request.params.id}
    `;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const res = await server_1.client.query(query, [...values]);
        console.log(res);
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
