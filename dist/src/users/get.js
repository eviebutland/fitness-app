"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const server_1 = require("../../server");
const getUsers = (request, response) => {
    response.send('Reached users');
    console.log(server_1.pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log('Error', error);
        }
        console.log(results);
    }));
    //
};
exports.getUsers = getUsers;
