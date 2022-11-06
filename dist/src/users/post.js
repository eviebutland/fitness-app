"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const server_1 = require("../../server");
const createUser = async (request, response) => {
    const query = `
INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`;
    // Workout preferences mising - no type for object
    console.log(typeof request.body.workoutPreference);
    let model = request.body;
    if (typeof request.body.workoutPreference === 'object') {
        console.log(JSON.stringify(request.body.workoutPreference));
        model.workoutPreference = JSON.stringify(request.body.workoutPreference);
    }
    try {
        const res = await server_1.client.query(query, [...Object.values(model)]);
        console.log(res);
        response.json(res.rows);
    }
    catch (error) {
        server_1.client.query('ROLLBACK;');
        console.log('ROLLBACK', error);
        response.json(error);
    }
    finally {
        // await client.end()
    }
};
exports.createUser = createUser;
