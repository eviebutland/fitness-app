"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExcerise = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const createExcerise = async (request, response) => {
    const query = `
  INSERT INTO exercises (name, description, restTime, recommendedRepRange, catergory, intensity, isCompound, exerciseTime, video, variations)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    let model = request.body;
    model = {
        ...request.body,
        variations: JSON.stringify(request.body.variations)
    };
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        // Check if name already exists and end transacation?
        // Can we make the name also a primary key
        // Add to new database
        const result = await server_1.client.query(query, Object.values(model));
        await server_1.client.query('COMMIT TRANSACTION');
        response.send({ message: 'Sucessfully added new workout', data: result });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.json({ message: 'Something went wrong', error });
    }
};
exports.createExcerise = createExcerise;
