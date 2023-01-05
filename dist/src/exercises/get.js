"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExercises = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const getAllExercises = async (c, request, response) => {
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const result = await server_1.client.query('SELECT * FROM exercises');
        await server_1.client.query('COMMIT TRANSACTION');
        // c.response.status(200).json({ message: 'Successful transaction', data: result.rows })
        console.log(c.response);
        console.log(c);
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        // c.response.json({ message: 'Something went wrong', error })
    }
};
exports.getAllExercises = getAllExercises;
