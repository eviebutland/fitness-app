"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveDocument = exports.deleteDocument = void 0;
const server_1 = require("../../server");
const format_request_body_1 = require("./format-request-body");
const rollback_1 = require("./rollback");
const deleteDocument = async (docId, database) => {
    try {
        const query = `DELETE FROM ${database}
      WHERE id = $1`;
        const deletedRes = await server_1.client.query(query, [docId]);
        return deletedRes;
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        throw Error('Something went wrong');
    }
};
exports.deleteDocument = deleteDocument;
// Share this between other deletes
const archiveDocument = async (dataToArchive, archiveDatabase) => {
    try {
        const postgresVars = [];
        const keys = Object.keys(dataToArchive);
        keys.forEach((key, index) => postgresVars.push(`$${index + 1}`));
        const valueString = (0, format_request_body_1.formatKeyValueStrings)(postgresVars);
        const keyString = (0, format_request_body_1.formatKeyValueStrings)(keys);
        const archiveRes = await server_1.client.query(`INSERT INTO ${archiveDatabase} (${keyString})
        VALUES (${valueString})`, [...Object.values(dataToArchive)]);
        //   'INSERT INTO documents(id, doc) VALUES(${id}, ${this})', {
        //     id: 123,
        //     body: 'some text'
        // }
        // ('INSERT INTO users(first_name, last_name, age) VALUES(${name.first}, $<name.last>, $/age/)', {
        //   name: { first: 'John', last: 'Dow' },
        //   age: 30
        // })
        return archiveRes;
    }
    catch (error) {
        (0, rollback_1.rollback)(server_1.client);
        console.log(error);
        throw Error('Something went wrong');
    }
};
exports.archiveDocument = archiveDocument;
