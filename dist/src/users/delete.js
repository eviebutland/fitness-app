"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const deleteUser = async (request, response) => {
    if (request.params.id === ':id') {
        response.send({ message: 'Error: Please provide an ID' });
        return;
    }
    // Get the record first
    const query = `SELECT * FROM users
    WHERE id = $1`;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const res = await server_1.client.query(query, [request.params.id]);
        const rowToArchive = res.rows.find(row => row.id == request.params.id);
        if (rowToArchive) {
            await archiveDocument(rowToArchive);
            await deleteDocument(request, response);
            await server_1.client.query('COMMIT');
            response.status(200).json({ message: 'Successfully deleted user' });
        }
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.deleteUser = deleteUser;
const archiveDocument = async (rowToArchive) => {
    try {
        const dataToArchive = {
            name: rowToArchive.name,
            age: rowToArchive.age,
            email: rowToArchive.email,
            password: rowToArchive.password,
            levelOfAccess: rowToArchive.levelofaccess,
            premium: rowToArchive.premium,
            completedWorkouts: rowToArchive.completedworkouts,
            permissions: rowToArchive.permissions,
            workoutPreference: rowToArchive.workoutpreference
        };
        const archiveRes = await server_1.client.query(`INSERT INTO users_archive (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [...Object.values(dataToArchive)]);
        console.log(archiveRes);
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
    }
};
const deleteDocument = async (request, response) => {
    try {
        const query = `DELETE FROM users
    WHERE id = $1`;
        const deletedRes = await server_1.client.query(query, [request.params.id]);
        response.json({
            message: `User with ID: ${request.params.id} has been successfully deleted`,
            result: deletedRes
        });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
    }
};
