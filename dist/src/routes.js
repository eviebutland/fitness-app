"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isAuthorized = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("./authentication");
const exercises_1 = require("./exercises");
const index_1 = require("./users/index");
const workouts_1 = require("./workouts");
const oauth2_1 = __importDefault(require("../oauth2"));
exports.router = express_1.default.Router();
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
function isAuthorized(request, response, next, permissions) {
    return oauth2_1.default.authorize('bearer', { session: false }, function (err, user, info) {
        console.log(user);
        if (!user.permissions || user.permissions !== permissions) {
            response.status(401).json({ message: 'You do not have permissions to access this resource', error: info });
            return;
        }
        else {
            next();
        }
        console.log(info);
    })(request, response, next);
}
exports.isAuthorized = isAuthorized;
function isAuthenticated(request, response, next) {
    return oauth2_1.default.authenticate('bearer', { session: false }, function (err, user, info) {
        if (err === null && user) {
            next();
        }
        else if (err) {
            response.status(401).json({ message: info, error: err });
            return;
        }
    })(request, response, next);
}
exports.isAuthenticated = isAuthenticated;
// Authentication
exports.router.get('/login', authentication_1.login);
exports.router.get('/logout/:id', authentication_1.logout);
// Users
exports.router.get('/users', (req, res, next) => {
    isAuthenticated(req, res, next);
    if (res.statusCode !== 401) {
        isAuthorized(req, res, next, 'rw:user');
    }
    next();
}, index_1.getUsers);
exports.router.post('/users', isAuthenticated, index_1.createUser);
exports.router.patch('/users/:id', isAuthenticated, index_1.updateUser);
exports.router.delete('/users/:id', isAuthenticated, index_1.deleteUser);
exports.router.get('/users/:id', isAuthenticated, index_1.getAUser);
// Exercises
exports.router.get('/exercises', isAuthenticated, exercises_1.getAllExercises);
exports.router.post('/exercises', isAuthenticated, exercises_1.createExcerise);
exports.router.patch('/exercises/:id', isAuthenticated, exercises_1.updateExercise);
exports.router.delete('/exercises/:id', isAuthenticated, exercises_1.deleteExercise);
// Workouts
exports.router.get('/workouts', isAuthenticated, workouts_1.getAllWorkouts);
exports.router.get('/workouts/:id', isAuthenticated, workouts_1.getWorkoutByID);
exports.router.get('/workouts/catergory/:catergory', isAuthenticated, workouts_1.getAllExercisesInCatergory);
exports.router.post('/workouts', isAuthenticated, workouts_1.createWorkout);
exports.router.patch('/workouts/:id', isAuthenticated, workouts_1.updateWorkout);
exports.router.delete('/workouts/:id', isAuthenticated, workouts_1.deleteWorkout);
