"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPatchBody = void 0;
const formatPatchBody = (columns) => {
    const set = [];
    columns.forEach((column, index) => {
        set.push(`${column} = $${index + 1}`);
    });
    return set;
};
exports.formatPatchBody = formatPatchBody;
