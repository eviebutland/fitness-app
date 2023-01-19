"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = void 0;
const server_1 = require("../../server");
const delete_1 = require("../utils/delete");
const rollback_1 = require("../utils/rollback");
const deleteWorkout = async (api, request, response) => {
    if (api.request.params.id === ':id') {
        response.status(404).json({ message: 'Please provide an id' });
        return;
    }
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        // Get hold of workout to delete
        const getWorkoutQuery = `SELECT * FROM workouts
    WHERE id = $1`;
        const workoutToDelete = await server_1.client.query(getWorkoutQuery, [api.request.params.id]);
        if (workoutToDelete.rows[0]) {
            // Move to archive collection
            await (0, delete_1.archiveDocument)(workoutToDelete.rows[0], 'workouts_archive');
            const deletedWorkout = await (0, delete_1.deleteDocument)(api.request.params.id, 'workouts');
            // Delete from main workout table
            response.status(200).json({
                message: `Workout with ID: ${api.request.params.id} has been successfully deleted`,
                result: deletedWorkout
            });
        }
        await server_1.client.query('COMMIT TRANSACTION');
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.deleteWorkout = deleteWorkout;
