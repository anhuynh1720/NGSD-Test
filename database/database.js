const Pool = require('pg').Pool;

const pool = new Pool({
    host: "103.245.248.167",
    user: "phonesystem",
    port: 5432,
    password: "P8CVKJvanVBm12",
    database: "database_single"
});

module.exports = pool;