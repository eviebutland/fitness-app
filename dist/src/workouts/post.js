"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkout = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const createWorkout = async (api, request, response) => {
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const query = `INSERT INTO workouts (name, set_1, set_2, set_3)
    VALUES ($1, $2, $3, $4)`;
        const values = Object.values(api.request.body);
        await server_1.client.query(query, [...values]);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(201).json({ message: 'Successfully created new workout', data: api.request.body });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.createWorkout = createWorkout;
