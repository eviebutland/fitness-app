"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const server_1 = require("../../server");
const updateUser = async (request, response) => {
    const query = `
    UPDATE users
    SET name = 'evie'
    WHERE email = 'johndoe@gmail.com'
    `;
    try {
        const res = await server_1.client.query(query);
        response.json(res);
    }
    catch (error) {
        await server_1.client.query('ROLLBACK;');
    }
    finally {
        // do something here
    }
};
exports.updateUser = updateUser;
