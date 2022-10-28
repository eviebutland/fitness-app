"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const server_1 = require("../../server");
const createUser = async (request, response) => {
    const name = 'Evie';
    const email = 'evie.butland@gamol.com';
    await server_1.pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            console.log('theres an error', error);
            return;
        }
        console.log(results);
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    });
};
exports.createUser = createUser;
