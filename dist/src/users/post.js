"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const security_1 = require("../utils/security");
const createUser = async (api, request, response) => {
    const query = `
  INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference, token, status)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '', 'active')
  ON CONFLICT (id) DO NOTHING 
  `;
    let model = api.request.body;
    (0, security_1.passwordValidation)(api.request.body.password, response, server_1.client);
    model = {
        ...api.request.body,
        password: await (0, security_1.saltAndHash)(api.request.body.password),
        workoutPreference: JSON.stringify(api.request.body.workoutPreference)
    };
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const res = await server_1.client.query(query, [...Object.values(model)]);
        await server_1.client.query('COMMIT TRANSACTION');
        response.json({ message: 'Successfully inserted new user' });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.createUser = createUser;
