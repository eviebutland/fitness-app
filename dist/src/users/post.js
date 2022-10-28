"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
// import { pool } from '../../server'
const createUser = async (request, response) => {
    const name = 'Evie';
    const email = 'evie.butland@gamol.com';
    // await pool.query(
    //   'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    //   [name, email],
    //   (error, results) => {
    //     if (error) {
    //       console.log('theres an error', error)
    //       return
    //     }
    //     console.log(results)
    //     response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    //   }
    // )
};
exports.createUser = createUser;
