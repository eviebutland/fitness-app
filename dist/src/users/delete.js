"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const server_1 = require("../../server");
const deleteUser = async (request, response) => {
    // this command will delete all that match
    const query = `
    DELETE FROM users
    WHERE email = 'johndoe@gmail.com'
    `;
    try {
        const res = await server_1.client.query(query);
        console.log(res);
        response.json('Delete successful');
    }
    catch (error) {
        console.log('Query failed');
        await server_1.client.query('ROLLBACK;');
    }
    finally {
        // do someting here
    }
};
exports.deleteUser = deleteUser;
