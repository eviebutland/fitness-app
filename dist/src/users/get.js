"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAUser = exports.getUsers = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const format_response_1 = require("../utils/format-response");
const getUsers = async (request, response) => {
    try {
        const res = await server_1.client.query('SELECT * FROM users');
        const data = (0, format_response_1.formatResponse)(res, 'workoutpreference');
        response.json({ data, total: res.rows.length });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
    }
    finally {
        // Best practice to have a finally and end the session
        // await client.end()
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
        const result = await server_1.client.query(query, [request.params.id]);
        const data = (0, format_response_1.formatResponse)(result, 'workoutpreference');
        response.send({ data: data[0] });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
    }
    finally {
        // do something here
    }
};
exports.getAUser = getAUser;
