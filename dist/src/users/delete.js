"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const deleteUser = async (request, response) => {
    // this command will delete all that match
    if (request.params.id === ':id') {
        response.send({ message: 'Error: Please provide an ID' });
        return;
    }
    // Get the record first
    const query = `SELECT * FROM users
  WHERE id = $1`;
    try {
        const res = await server_1.client.query(query, [request.params.id]);
        const rowToArchive = res.rows.find(row => row.id == request.params.id);
        try {
            const dataToArchive = {
                name: rowToArchive.name,
                age: rowToArchive.age,
                email: rowToArchive.email,
                password: rowToArchive.password,
                levelOfAccess: rowToArchive.levelofaccess,
                premuim: rowToArchive.premium,
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
        // if successfull?
        try {
            const query = `DELETE FROM users
      WHERE id = $1`;
            const deletedRes = await server_1.client.query(query, [request.params.id]);
            console.log(deletedRes);
            response.json({ message: `User with ID: ${request.params.id} has been successfully deleted` });
        }
        catch (error) {
            (0, rollback_1.rollback)(server_1.client);
        }
    }
    catch (error) {
        console.log('Query failed');
        await server_1.client.query('ROLLBACK;');
    }
    finally {
        // do someting here
    }
};
exports.deleteUser = deleteUser;
