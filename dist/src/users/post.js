"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const createUser = async (request, response) => {
    const query = `
INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`;
    let model = request.body;
    model = {
        ...request.body,
        workoutPreference: JSON.stringify(request.body.workoutPreference)
    };
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const res = await server_1.client.query(query, [...Object.values(model)]);
        await server_1.client.query('COMMIT TRANSACTION');
        response.json(res.rows);
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        response.status(500).json({ message: 'Something went wrong', error });
    }
    finally {
        // await client.end()
    }
};
exports.createUser = createUser;
