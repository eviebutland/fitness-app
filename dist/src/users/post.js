"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const security_1 = require("../utils/security");
const createUser = async (api, request, response) => {
    const insertQuery = `
  INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference, token, status)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '', 'active')
  ON CONFLICT (id) DO NOTHING 
  `;
    let model = api.request.body;
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const existingUserResult = await server_1.client.query(`
    SELECT email FROM users
    WHERE email = $1
    `, [api.request.body.email]);
        if (existingUserResult.rowCount === 0) {
            if ((0, security_1.passwordValidation)(api.request.body.password).error) {
                response.status(400).json({ message: (0, security_1.passwordValidation)(api.request.body.password)?.message });
                return;
            }
            model = {
                ...api.request.body,
                password: await (0, security_1.saltAndHash)(api.request.body.password),
                workoutPreference: JSON.stringify(api.request.body.workoutPreference)
            };
            const res = await server_1.client.query(insertQuery, [...Object.values(model)]);
            response.json({ message: 'Successfully inserted new user' });
        }
        else {
            response.json({ message: 'This user already exists, please try with different details' });
        }
        await server_1.client.query('COMMIT TRANSACTION');
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.createUser = createUser;
