"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const delete_1 = require("../utils/delete");
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
            await (0, delete_1.archiveDocument)(rowToArchive, 'users_archive');
            const deletedRes = await (0, delete_1.deleteDocument)(request, 'users');
            response.json({
                message: `User with ID: ${request.params.id} has been successfully deleted`,
                result: deletedRes
            });
            await server_1.client.query('COMMIT');
            response.status(200).json({ message: 'Successfully deleted user' });
        }
        else {
            response.json({
                message: `There is no user with ID: ${request.params.id}`
            });
            return;
        }
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.deleteUser = deleteUser;
