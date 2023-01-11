"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExercise = void 0;
const server_1 = require("../../server");
const delete_1 = require("../utils/delete");
const rollback_1 = require("../utils/rollback");
const deleteExercise = async (api, request, response) => {
    if (request.params.id === ':id') {
        response.status(404).json({ message: 'Please provide an ID to delete' });
        return;
    }
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        // Get hold of record
        const findQuery = `SELECT * FROM exercises
    WHERE id = $1`;
        const exerciseToDelete = await server_1.client.query(findQuery, [request.params.id]);
        if (exerciseToDelete.rows.length > 0) {
            // Insert into archive database
            await (0, delete_1.archiveDocument)(exerciseToDelete.rows[0], 'exercises_archive');
        }
        else {
            response.json({
                message: `There is no exercise with ID: ${request.params.id}`
            });
            return;
        }
        // remove from current database
        const deletedRes = await (0, delete_1.deleteDocument)(request.params.id, 'exercises');
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json({
            message: `Exercise with ID: ${request.params.id} has been successfully deleted`,
            result: deletedRes
        });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.deleteExercise = deleteExercise;
