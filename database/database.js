require("dotenv").config();
const Pool = require('pg').Pool;

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = pool;