"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const server_1 = require("../../server");
const getUsers = async (request, response) => {
    try {
        const res = await server_1.client.query('SELECT * FROM users');
        response.json({ data: res.rows, total: res.rows.length });
    }
    catch (error) {
        try {
            await server_1.client.query('ROLLBACK;');
            console.log(error);
        }
        catch (e) {
            console.log('could not rollback: ', e);
        }
    }
    finally {
        // Best practice to have a finally and end the session
        // await client.end()
    }
};
exports.getUsers = getUsers;
