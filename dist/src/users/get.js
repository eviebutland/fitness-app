"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAUser = exports.getUsers = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const format_response_1 = require("../utils/format-response");
const getUsers = async (request, response) => {
    console.log('RUNNING');
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const res = await server_1.client.query('SELECT id, name, email, age, password, levelofaccess, premium, completedworkouts, permissions, workoutpreference FROM users');
        const data = (0, format_response_1.formatResponse)(res, 'workoutpreference');
        await server_1.client.query('COMMIT TRANSACTION');
        response.json({ data, total: res.rows.length });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Error getting all users', error });
    }
};
exports.getUsers = getUsers;
const getAUser = async (request, response) => {
    if (request.params.id === ':id') {
        response.status(404);
        response.send({ message: 'Error: Please provide an ID' });
        return;
    }
    const query = `SELECT * FROM users
  WHERE id = $1`;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const result = await server_1.client.query(query, [request.params.id]);
        const data = (0, format_response_1.formatResponse)(result, 'workoutpreference');
        await server_1.client.query('COMMIT TRANSACTION');
        response.send({ data: data[0] });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error: error });
    }
};
exports.getAUser = getAUser;
