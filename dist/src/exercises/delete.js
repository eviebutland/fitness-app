"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExercise = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const deleteExercise = async (request, response) => {
    console.log(request.params.id);
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
        console.log(exerciseToDelete);
        if (exerciseToDelete.rows.length) {
            // Insert into archive database
            const insertToArchiveQuery = `INSERT INTO exercises_archive`;
            await archiveDocument(exerciseToDelete.rows[0], 'exercises_archive');
        }
        // remove from current database
        // commit transaction
    }
    catch (error) {
        console.log(error);
        (0, rollback_1.rollback)(server_1.client);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.deleteExercise = deleteExercise;
const archiveDocument = async (rowToArchive, database) => {
    try {
        const dataToArchive = {
            name: rowToArchive.name,
            description: rowToArchive.description,
            resttime: rowToArchive.resttime,
            recommendedreprange: rowToArchive.recommendedreprange,
            catergory: rowToArchive.catergory,
            intensity: rowToArchive.intensity,
            iscompound: rowToArchive.iscompound,
            exercisetime: rowToArchive.exercisetime,
            video: rowToArchive.video,
            variations: rowToArchive.variations
        };
        const keys = Object.keys(dataToArchive);
        const postgresVars = [];
        Object.keys(dataToArchive).forEach((key, index) => postgresVars.push(`$${index + 1}`));
        console.log(...postgresVars);
        const archiveRes = await server_1.client.query(`INSERT INTO ${database} (${, ...keys);
    }
    finally { }
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) `,
      [...Object.values(dataToArchive)]
    )
    // console.log(archiveRes)
  } catch (error) {
    rollback(client)
  }
}
    ;
};
