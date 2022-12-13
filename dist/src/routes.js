"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./authentication/login");
const exercises_1 = require("./exercises");
const index_1 = require("./users/index");
const workouts_1 = require("./workouts");
const oauth2_1 = __importDefault(require("../oauth2"));
exports.router = express_1.default.Router();
// Will need a UI to access these
exports.router.get('/login/google', oauth2_1.default.authenticate('google'));
exports.router.get('/oauth2/redirect/google', oauth2_1.default.authenticate('google', { failureRedirect: '/login', failureMessage: true }), function (req, res) {
    console.log('sucessfully authenticated with google');
    res.redirect('/');
});
// Authentication
exports.router.get('/login', login_1.login);
// Users
exports.router.get('/users', index_1.getUsers);
exports.router.post('/users', index_1.createUser);
exports.router.patch('/users/:id', index_1.updateUser);
exports.router.delete('/users/:id', index_1.deleteUser);
exports.router.get('/users/:id', index_1.getAUser);
// Exercises
exports.router.get('/exercises', exercises_1.getAllExercises);
exports.router.post('/exercises', exercises_1.createExcerise);
exports.router.patch('/exercises/:id', exercises_1.updateExercise);
exports.router.delete('/exercises/:id', exercises_1.deleteExercise);
// Workouts
exports.router.get('/workouts', workouts_1.getAllWorkouts);
exports.router.get('/workouts/:id', workouts_1.getWorkoutByID);
exports.router.get('/workouts/catergory/:catergory', workouts_1.getAllExercisesInCatergory);
exports.router.post('/workouts', workouts_1.createWorkout);
exports.router.patch('/workouts/:id', workouts_1.updateWorkout);
exports.router.delete('/workouts/:id', workouts_1.deleteWorkout);
