const { Pool } = require("pg");

console.log({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME
});

const pool = new Pool({
    host: process.env.DB_HOST || "postgres",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: '-c search_path=db'
});

pool.on("connect", () => {
    console.log("Connected to the database");
})

pool.on("error", (err) => {
    console.error("Unexpected Postgres error", err);
    process.exit(-1);
});

module.exports = pool;