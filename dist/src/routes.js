"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("./authentication");
const exercises_1 = require("./exercises");
const index_1 = require("./users/index");
const workouts_1 = require("./workouts");
// import passport from '../oauth2'
exports.router = express_1.default.Router();
function isAuthorized(req, res, next, permission) {
    const access = permission.split(':')[0];
    const area = permission.split(':')[1];
    const userPermissions = req?.authInfo?.scope;
    const permissionToCheck = JSON.parse(userPermissions).find((userPermission) => userPermission.includes(area));
    return permissionToCheck.includes(access)
        ? next()
        : res.status(401).json({ message: 'You do not have access to this resource' });
}
exports.isAuthorized = isAuthorized;
// Authentication
exports.router.get('/login', authentication_1.login);
exports.router.get('/logout/:id', authentication_1.logout);
exports.router.post('/reset-password', authentication_1.resetPassword);
// Users
exports.router.get('/users', (req, res, next) => {
    // Minimum level of access required to get the list of users is read:users
    isAuthorized(req, res, next, 'r:user');
}, index_1.getUsers);
exports.router.post('/users', (req, res, next) => {
    isAuthorized(req, res, next, 'w:user');
}, index_1.createUser);
exports.router.patch('/users/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'w:user');
}, index_1.updateUser);
exports.router.delete('/users/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'a:user');
}, index_1.deleteUser);
exports.router.get('/users/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'r:user');
}, index_1.getAUser);
// Exercises
exports.router.get('/exercises', (req, res, next) => {
    isAuthorized(req, res, next, 'r:exercises');
}, exercises_1.getAllExercises);
exports.router.post('/exercises', (req, res, next) => {
    isAuthorized(req, res, next, 'w:exercises');
}, exercises_1.createExcerise);
exports.router.patch('/exercises/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'w:exercises');
}, exercises_1.updateExercise);
exports.router.delete('/exercises/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'a:exercises');
}, exercises_1.deleteExercise);
// Workouts
exports.router.get('/workouts', (req, res, next) => {
    isAuthorized(req, res, next, 'r:workouts');
}, workouts_1.getAllWorkouts);
exports.router.get('/workouts/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'r:workouts');
}, workouts_1.getWorkoutByID);
exports.router.get('/workouts/catergory/:catergory', (req, res, next) => {
    isAuthorized(req, res, next, 'r:workouts');
}, workouts_1.getAllExercisesInCatergory);
exports.router.post('/workouts', (req, res, next) => {
    isAuthorized(req, res, next, 'w:workouts');
}, workouts_1.createWorkout);
exports.router.patch('/workouts/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'w:workouts');
}, workouts_1.updateWorkout);
exports.router.delete('/workouts/:id', (req, res, next) => {
    isAuthorized(req, res, next, 'a:workouts');
}, workouts_1.deleteWorkout);
// Will need a UI to access these
// router.get('/login/google', passport.authenticate('google'))
// router.get(
//   '/oauth2/redirect/google',
//   passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
//   function (req, res) {
//     console.log('sucessfully authenticated with google')
//     res.redirect('/')
//   }
// )
