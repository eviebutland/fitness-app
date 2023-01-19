"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatKeyValueStrings = exports.formatPatchBody = void 0;
const formatPatchBody = (columns) => {
    const set = [];
    columns.forEach((column, index) => {
        set.push(`${column} = $${index + 1}`);
    });
    return set;
};
exports.formatPatchBody = formatPatchBody;
const formatKeyValueStrings = (arrayOfValues) => {
    let valueString = '';
    for (const value of arrayOfValues) {
        if (arrayOfValues.indexOf(value) !== arrayOfValues.length - 1) {
            valueString += `${value}, `;
        }
        else {
            valueString += value;
        }
    }
    return valueString;
};
exports.formatKeyValueStrings = formatKeyValueStrings;
