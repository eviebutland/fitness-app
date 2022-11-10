"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const updateUser = async (request, response) => {
    if (request.params.id === ':id') {
        response.status(404);
        response.send({ message: 'Please provide an id' });
        return;
    }
    const columns = Object.keys(request.body);
    const values = Object.values(request.body);
    const set = [];
    columns.forEach((column, index) => {
        set.push(`${column} = $${index + 1}`);
    });
    const query = `
    UPDATE users
    SET ${set}
    WHERE id = ${request.params.id}
    `;
    try {
        const res = await server_1.client.query(query, [...values]);
        console.log(res);
        response.json(res);
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
    }
    finally {
        // do something here
    }
};
exports.updateUser = updateUser;
