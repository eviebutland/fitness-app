"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./authentication/login");
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
function isAuthenticated(req, res, next) {
    return oauth2_1.default.authenticate('local', { session: false }, function (err, user, info) {
        if (!err) {
            next();
        }
    })(req, res, next);
}
exports.isAuthenticated = isAuthenticated;
// Authentication
exports.router.get('/login', login_1.login);
// Users
// router.get('/users', isAuthenticated(req, res, done), getUsers)
exports.router.get('/users', isAuthenticated, index_1.getUsers);
// router.get('/users', passport.authenticate('bearer', { session: false }), function (req, res) {
//   console.log(req)
//   console.log(res)
//   res.json(req.user)
// })
// router.get('/users', getUsers)
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
