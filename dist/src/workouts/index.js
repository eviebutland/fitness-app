"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkout = exports.getAllExercisesInCatergory = exports.getWorkoutByID = exports.getAllWorkouts = void 0;
const get_1 = require("./get");
Object.defineProperty(exports, "getAllWorkouts", { enumerable: true, get: function () { return get_1.getAllWorkouts; } });
Object.defineProperty(exports, "getWorkoutByID", { enumerable: true, get: function () { return get_1.getWorkoutByID; } });
Object.defineProperty(exports, "getAllExercisesInCatergory", { enumerable: true, get: function () { return get_1.getAllExercisesInCatergory; } });
const patch_1 = require("./patch");
Object.defineProperty(exports, "updateWorkout", { enumerable: true, get: function () { return patch_1.updateWorkout; } });
