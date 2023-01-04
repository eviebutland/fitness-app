"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const security_1 = require("../utils/security");
const resetPassword = async (request, response) => {
    try {
        // Get hold of user by email
        const query = `SELECT * FROM users
    WHERE email = $1
    `;
        await server_1.client.query('BEGIN TRANSACTION');
        const existingUser = await server_1.client.query(query, [request.body.email]);
        // Reset the password
        const updateQuery = `
    UPDATE users
    SET password = $1, status = $2
    WHERE id = ${existingUser.rows[0].id}
    `;
        const passwordRegex = /([A-Z]+)([a-z]{3,})([!@£$%^&*()_+]+)([0-9])+/;
        if (!passwordRegex.test(request.body.newPassword)) {
            await server_1.client.query('COMMIT TRANSACTION');
            response.status(400).json({
                message: 'Password must require at least 1 uppercase, 3 or more lower case, 1 special character and at least 1 number '
            });
            return;
        }
        const password = await (0, security_1.saltAndHash)(request.body.newPassword);
        const updatedUser = await server_1.client.query(updateQuery, [password, 'active']);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json({ message: 'Successfully updated password' });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.resetPassword = resetPassword;
