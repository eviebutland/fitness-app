"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollback = void 0;
const rollback = async (client) => {
    try {
        return await client.query('ROLLBACK;');
    }
    catch (error) {
        console.log('could not rollback: ', error);
        throw new Error('Unable to rollback');
    }
};
exports.rollback = rollback;
