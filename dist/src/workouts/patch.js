"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkout = void 0;
const server_1 = require("../../server");
const format_request_body_1 = require("../utils/format-request-body");
const rollback_1 = require("../utils/rollback");
const updateWorkout = async (api, request, response) => {
    if (request.params.id === ':id') {
        response.status(400).json({ message: 'Please provide an ID to update' });
        return;
    }
    if (!Object.keys(request.body).length) {
        response.status(400).json({ message: 'Please provide a request body' });
        return;
    }
    const keys = Object.keys(request.body);
    const values = Object.values(request.body);
    const set = (0, format_request_body_1.formatPatchBody)(keys);
    const query = `
    UPDATE exercises
    SET ${set}
    WHERE id = ${request.params.id}
    `;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        // Can update the set 1, 2, 3
        await server_1.client.query(query, [...values]);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(500).json({ message: `Successfully updated workout with id: ${request.params.id}` });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.updateWorkout = updateWorkout;
