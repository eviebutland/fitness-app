"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidation = exports.saltAndHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function saltAndHash(password) {
    try {
        const saltCost = 10; // May need to increase this
        const salt = await bcrypt_1.default.genSalt(saltCost);
        const hash = await bcrypt_1.default.hash(password, salt);
        return hash;
    }
    catch (error) {
        console.log('Error using bcrypt');
    }
}
exports.saltAndHash = saltAndHash;
const passwordValidation = (password) => {
    const passwordRegex = /([A-Z]+)([a-z]{3,})([!@£$%^&*()_+]+)([0-9])+/;
    if (!passwordRegex.test(password)) {
        return {
            error: true,
            message: 'Password must require at least 1 uppercase, 3 or more lower case, 1 special character and at least 1 number '
        };
    }
    else {
        return {
            error: false
        };
    }
};
exports.passwordValidation = passwordValidation;
