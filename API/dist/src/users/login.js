"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const server_1 = require("../../server");
const rollback_1 = require("../utils/rollback");
const login = async (request, response) => {
    try {
        await setTimeout(() => console.log('signing in'), 300);
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
    }
    finally {
        // do something here
    }
};
exports.login = login;
