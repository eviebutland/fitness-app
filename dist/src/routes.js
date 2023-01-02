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
function isAuthorized(permissions) {
    return oauth2_1.default.authorize('bearer', { session: false }, function (err, user, info) {
        // return user?.permissions || user.permissions === permissions
        console.log(user);
        if (!user?.permissions || user?.permissions !== permissions) {
            return false;
        }
        else {
            console.log('has access');
            return true;
        }
    })();
}
exports.isAuthorized = isAuthorized;
// Authentication
exports.router.get('/login', authentication_1.login);
exports.router.get('/logout/:id', authentication_1.logout);
// Users
exports.router.get('/users', 
// isAuthorized('yes'),
// isAuthorized('rw:users'),
// (req: Request, res: Response, next: NextFunction) => {
//   console.log(isAuthenticated(req, res, next))
//   return isAuthenticated(req, res, next) ? next() : res.status(401).json({ message: 'Please login' })
// ? isAuthorized(req, res, next, 'rw:user')
//   ? next()
//   : res.status(401).json({ message: 'You do not have access to this resource' })
// : res.status(401).json({ message: 'Please login' })
// it shouldn't fall into here if the first fails
// },
index_1.getUsers);
exports.router.post('/users', isAuthorized, index_1.createUser);
exports.router.patch('/users/:id', isAuthorized, index_1.updateUser);
exports.router.delete('/users/:id', isAuthorized, index_1.deleteUser);
exports.router.get('/users/:id', isAuthorized, index_1.getAUser);
// Exercises
exports.router.get('/exercises', isAuthorized, exercises_1.getAllExercises);
exports.router.post('/exercises', isAuthorized, exercises_1.createExcerise);
exports.router.patch('/exercises/:id', isAuthorized, exercises_1.updateExercise);
exports.router.delete('/exercises/:id', isAuthorized, exercises_1.deleteExercise);
// Workouts
exports.router.get('/workouts', isAuthorized, workouts_1.getAllWorkouts);
exports.router.get('/workouts/:id', isAuthorized, workouts_1.getWorkoutByID);
exports.router.get('/workouts/catergory/:catergory', isAuthorized, workouts_1.getAllExercisesInCatergory);
exports.router.post('/workouts', isAuthorized, workouts_1.createWorkout);
exports.router.patch('/workouts/:id', isAuthorized, workouts_1.updateWorkout);
exports.router.delete('/workouts/:id', isAuthorized, workouts_1.deleteWorkout);
