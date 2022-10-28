"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
console.log('reached server file');
exports.pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 3030
});
// export const getUsers = (request: Request, response: Response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     console.log(results)
//     // response.status(200).json(results.rows)
//   })
// }
// pool.connect((err, client: pg.PoolClient, done) => {
//   console.log(client)
// })
exports.pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
