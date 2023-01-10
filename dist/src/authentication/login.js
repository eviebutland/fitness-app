"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let failedLoginAttempts = 0;
const login = async (api, request, response) => {
    const query = `
  SELECT * FROM users
  WHERE email = $1
  `;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const result = await server_1.client.query(query, [request.body.username]);
        if (result.rows[0]?.status === 'inactive') {
            await server_1.client.query('COMMIT TRANSACTION');
            response.status(401).send({ message: 'Your account is locked out, please reset your password' });
            return;
        }
        if (failedLoginAttempts >= 3) {
            // Update the status to show as locked out
            const updateQuery = `
      UPDATE users
      SET status = 'inactive'
      WHERE id = ${result.rows[0].id}
      `;
            const updateResult = await server_1.client.query(updateQuery);
            await server_1.client.query('COMMIT TRANSACTION');
            response
                .status(401)
                .send({ message: 'You have been locked out, please reset your password', failedLoginAttempts });
            failedLoginAttempts = 0;
            return;
        }
        const comparePassword = await bcrypt_1.default.compare(request.body.password, result.rows[0]?.password);
        if (!result.rowCount) {
            response.status(404).send({ message: 'No users found with match details' });
        }
        if (!comparePassword) {
            failedLoginAttempts++;
            response
                .status(404)
                .send({ message: 'Details are incorrect, please check email and password', failedLoginAttempts });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: result.rows[0].id,
            email: result.rows[0].email
        }, 'secret', { expiresIn: '1h' });
        const updateQuery = `
      UPDATE users
      SET token = '${token}'
      WHERE id = ${result.rows[0].id}
      `;
        const updateResult = await server_1.client.query(updateQuery);
        failedLoginAttempts = 0;
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).send({
            message: 'Successfully logged in',
            user: {
                ...Object.fromEntries(Object.entries(result.rows[0]).filter(([key, value]) => {
                    // Omit password from being returned to the user
                    if (result.rows[0].levelofaccess === 'admin') {
                        return (key !== 'password' &&
                            key !== 'workoutpreference' &&
                            key !== 'premium' &&
                            key !== 'completedworkouts');
                    }
                    else {
                        return key !== 'password';
                    }
                })),
                token
            }
        });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).send({ message: 'Something went wrong', error });
    }
};
exports.login = login;
