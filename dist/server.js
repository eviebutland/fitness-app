"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.client = void 0;
// import { Request, Response } from 'express'
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = new pg_1.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432
});
const connectDb = async () => {
    try {
        await exports.client.connect();
        // const res = await client.query('SELECT * FROM users')
        // console.log(res.rows)
        // await client.end()
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDb = connectDb;
// pool.on('error', (err: Error) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// })
