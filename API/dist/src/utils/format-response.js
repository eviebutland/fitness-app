"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = exports.composeObject = void 0;
const composeObject = (data) => {
    return data !== null ? JSON.parse(data) : null;
};
exports.composeObject = composeObject;
const formatResponse = (data, fields) => {
    return data.rows.map(row => {
        const formattedField = {};
        fields.forEach((field) => {
            formattedField[field] = JSON.parse(row[field]);
        });
        return {
            ...row,
            ...formattedField
        };
    });
};
exports.formatResponse = formatResponse;
