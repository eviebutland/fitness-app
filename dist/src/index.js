"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const exercises_1 = require("./exercises");
const authentication_1 = require("./authentication");
const index_1 = require("./users/index");
const workouts_1 = require("./workouts");
exports.handlers = {
    login: authentication_1.login,
    logout: authentication_1.logout,
    resetPassword: authentication_1.resetPassword,
    getAllExercises: exercises_1.getAllExercises,
    createExcerise: exercises_1.createExcerise,
    updateExercise: exercises_1.updateExercise,
    deleteExercise: exercises_1.deleteExercise,
    getUsers: index_1.getUsers,
    // createUser,
    updateUser: index_1.updateUser,
    deleteUser: index_1.deleteUser,
    getAUser: index_1.getAUser,
    getAllWorkouts: workouts_1.getAllWorkouts,
    // getWorkoutByID,
    getAllExercisesInCatergory: workouts_1.getAllExercisesInCatergory,
    updateWorkout: workouts_1.updateWorkout,
    deleteWorkout: workouts_1.deleteWorkout,
    createWorkout: workouts_1.createWorkout
};
