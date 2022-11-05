"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const server_1 = require("../../server");
const createUser = async (request, response) => {
    const firstName = 'Evie';
    const lastName = 'B';
    const email = 'evie.butland@gamol.com';
    // Insert into means adding a record to the table
    const query = `
INSERT INTO users (email, name)
VALUES ('johndoe@gmail.com', 'john')
`;
    try {
        const res = await server_1.client.query(query);
        console.log(res);
        response.json(res.rows);
    }
    catch (error) {
        server_1.client.query('ROLLBACK;');
        console.log(error);
        response.json(error);
    }
    finally {
        // await client.end()
    }
};
exports.createUser = createUser;
