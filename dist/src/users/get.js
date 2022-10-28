"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const server_1 = require("../../server");
const getUsers = async (request, response) => {
    // response.send('Reached users')
    const res = await server_1.client.query('SELECT * FROM users');
    response.json(res.rows);
    await server_1.client.end();
    //
};
exports.getUsers = getUsers;
