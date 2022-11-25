"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutByID = exports.getAllWorkouts = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const getAllWorkouts = async (request, response) => {
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const query = `
    SELECT w.name as workoutName, e.name AS set_1, e2.name AS set_2, e3.name AS set_3 FROM workouts w
    LEFT JOIN exercises e ON w.set_1 = e.id
    LEFT JOIN exercises e2 on w.set_2 = e2.id
    LEFT JOIN exercises e3 on w.set_3 = e3.id
    `;
        const result = await server_1.client.query(query);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json({ data: result.rows, total: result.rowCount });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.getAllWorkouts = getAllWorkouts;
// get by name also?
const getWorkoutByID = () => {
    // SELECT workouts.name as workoutName, set_3, exercises.name AS name FROM workouts
    // LEFT JOIN exercises ON workouts.set_3 = exercises.id
};
exports.getWorkoutByID = getWorkoutByID;
