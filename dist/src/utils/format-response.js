"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = exports.composeObject = void 0;
const composeObject = (data) => {
    return data !== null ? JSON.parse(data) : null;
};
exports.composeObject = composeObject;
const formatResponse = (data, field) => {
    return data.rows.map(row => {
        return {
            ...row,
            [field]: (0, exports.composeObject)(row[field])
        };
    });
};
exports.formatResponse = formatResponse;
