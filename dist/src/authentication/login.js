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
const login = async (request, response) => {
    const query = `
  SELECT * FROM users
  WHERE email = $1
  `;
    if (failedLoginAttempts >= 3) {
        response.send({ message: 'You have been locked out, please reset your password', failedLoginAttempts });
        return;
    }
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const result = await server_1.client.query(query, [request.body.username]);
        const comparePassword = await bcrypt_1.default.compare(request.body.password, result.rows[0]?.password);
        if (!result.rowCount) {
            response.statusCode = 404;
            response.send({ message: 'No users found with match details' });
        }
        // if the user is an admin, we want to send back admin related fields
        // if the user is a subscriber, we want to only send subscriber related fields
        if (!comparePassword) {
            response.statusCode = 404;
            failedLoginAttempts++;
            response.send({ message: 'Details are incorrect, please check email and password', failedLoginAttempts });
            return;
        }
        if (result.rows[0].id) {
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
                        return key !== 'password';
                    })),
                    token
                }
            });
        }
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).send({ message: 'Something went wrong', error });
    }
};
exports.login = login;
