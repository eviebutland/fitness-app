"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExercise = void 0;
const server_1 = require("../../server");
const format_request_body_1 = require("../utils/format-request-body");
const rollback_1 = require("../utils/rollback");
const updateExercise = async (api, request, response) => {
    if (api.request.params.id === ':id') {
        response.status(404).json({ message: 'Please provide an ID to update' });
        return;
    }
    if (!Object.keys(api.request.body).length) {
        response.status(400).json({ message: 'Please provide a request body' });
        return;
    }
    try {
        const keys = Object.keys(api.request.body);
        const values = Object.values(api.request.body);
        const set = (0, format_request_body_1.formatPatchBody)(keys);
        const query = `
    UPDATE exercises
    SET ${set}
    WHERE id = ${api.request.params.id}
    `;
        await server_1.client.query('BEGIN TRANSACTION');
        await server_1.client.query(query, [...values]);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json({ message: 'Successfully updated exercise', id: api.request.params.id });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.updateExercise = updateExercise;
