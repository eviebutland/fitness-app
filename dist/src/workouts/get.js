"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodaysWorkout = exports.getAllExercisesInCatergory = exports.getWorkoutByID = exports.getAllWorkouts = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const courier_1 = require("@trycourier/courier");
const workoutJoinQuery = `SELECT w.id,  w.name as workoutName, e.name AS set_1_exercise_name, 
e.description AS set_1_description,
e.recommendedreprange AS set_1_repranage,
e.intensity AS set_1_intensity,
e.exercisetime AS set_1_excercisetime,
e.video AS set_1_video,
e.variations AS set_1_variations,

e2.name AS set_2_exercise_name, e2.description  AS set_2_description, 
e2.recommendedreprange AS set_2_repranage,
e2.intensity AS set_2_intensity,
e2.exercisetime AS set_2_excercisetime,
e2.video AS set_2_video,
e2.variations AS set_2_variations,

e3.name AS set_3_exercise_name, 
e3.description AS set_3_description,
e3.recommendedreprange AS set_3_repranage,
e3.intensity AS set_3_intensity,
e3.exercisetime AS set_3_excercisetime,
e3.video AS set_3_video,
e3.variations AS set_3_variations,
e.resttime FROM workouts w
RIGHT JOIN exercises e ON w.set_1 = e.id
RIGHT JOIN exercises e2 on w.set_2 = e2.id
RIGHT JOIN exercises e3 on w.set_3 = e3.id`;
// const shorterQuery = `SELECT w.name as workoutname , e.*, e2.*, e3.* FROM workouts w
// RIGHT JOIN exercises e ON w.set_1 = e.id
// RIGHT JOIN exercises e2 on w.set_2 = e2.id
// RIGHT JOIN exercises e3 on w.set_3 = e3.id`
const getAllWorkouts = async (api, request, response) => {
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const results = await server_1.client.query(workoutJoinQuery);
        const formattedResult = formatWorkoutJoin(results).filter(value => value !== null);
        // Is this possible to be done in the query?
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json({ data: formattedResult, total: formattedResult.length });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.getAllWorkouts = getAllWorkouts;
const getWorkoutByID = async (api, request, response) => {
    if (api.request.params.id === ':id') {
        response.status(400).json({ message: 'Please provide an ID' });
        return;
    }
    try {
        await server_1.client.query('BEGIN TRANSACTION');
        const query = workoutJoinQuery + ' WHERE w.ID = $1';
        const results = await server_1.client.query(query, [api.request.params.id]);
        const formattedResult = formatWorkoutJoin(results).filter(value => value !== null);
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json({ data: formattedResult });
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.getWorkoutByID = getWorkoutByID;
const getAllExercisesInCatergory = async (api, request, response) => {
    try {
        let results = {};
        if (api.request.params.catergory) {
            await server_1.client.query('BEGIN TRANSACTION');
            results = await handleSelectAllExercisesInCategory(api.request.params.catergory, response);
        }
        else {
            response.status(404).json({ message: 'Please provide a catergory to search by' });
            return;
        }
        await server_1.client.query('COMMIT TRANSACTION');
        response.status(200).json(results);
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.getAllExercisesInCatergory = getAllExercisesInCatergory;
const formatWorkoutJoin = (results) => {
    return results.rows.map(row => {
        const result = {
            id: row.id,
            workoutName: row.workoutname,
            resttime: row.resttime,
            set1: {
                name: row.set_1_exercise_name,
                description: row.set_1_description,
                variations: JSON.parse(row.set_1_variations),
                intensity: row.set_1_intensity,
                video: row.set_1_video,
                exerciseTime: row.set_1_excercisetime
            },
            set2: {
                name: row.set_2_exercise_name,
                description: row.set_2_description,
                variations: JSON.parse(row.set_2_variations),
                intensity: row.set_2_intensity,
                video: row.set_2_video,
                exerciseTime: row.set_2_excercisetime
            },
            set3: {
                name: row.set_3_exercise_name,
                description: row.set_3_description,
                variations: JSON.parse(row.set_3_variations),
                intensity: row.set_3_intensity,
                video: row.set_3_video,
                exerciseTime: row.set_3_excercisetime
            }
        };
        return result.id !== null ? result : null;
    });
};
const getTodaysWorkout = async (api, request, response) => {
    // Based off the user's logged in workout preference find a workout that matches
    const userWorkoutPreference = JSON.parse(api.request.user.workoutpreference);
    const todaysDay = new Date().toLocaleString('en-gb', { weekday: 'long' });
    const todaysWorkoutCatergory = userWorkoutPreference[todaysDay.toLowerCase()];
    const workout = await handleSelectAllExercisesInCategory(todaysWorkoutCatergory.toLowerCase(), response);
    const courier = (0, courier_1.CourierClient)({ authorizationToken: 'pk_prod_MJAHFWSKV24TJXQJAV7KHKC975SW' });
    try {
        const { requestId } = await courier.send({
            message: {
                to: {
                    email: 'evie.butland@gmail.com'
                },
                template: 'HBDVP38QPSMS4YG676E20DGYP7X6',
                data: {
                    recipientName: 'Evie',
                    workoutName: workout?.data.workoutName // Fix data being sent
                }
            }
        });
        console.log(requestId);
        response.status(200).json({ message: 'Succesfully emailed', workout });
    }
    catch (error) {
        console.log(error);
        (0, rollback_1.rollback)(server_1.client);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.getTodaysWorkout = getTodaysWorkout;
const handleSelectAllExercisesInCategory = async (category, response) => {
    const query = workoutJoinQuery + ` WHERE w.name = '${category}'`;
    try {
        const results = await server_1.client.query(query);
        const formattedResult = formatWorkoutJoin(results).filter(value => value !== null);
        return { data: formattedResult, total: formattedResult.length };
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        response.status(500).json({ message: 'Something went wrong', error });
    }
};
