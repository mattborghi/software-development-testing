// DEPRECATED: Now I am only using the sql file but kept this jic.
const mysql = require("mysql2")
const fs = require("fs")

// Load .env variables
require("dotenv").config({ path: './.env.local' })

// Read SQL seed query
const seedQuery = fs.readFileSync("db/seed.sql", {
    encoding: "utf-8",
})

// Connect to database
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true, // IMPORTANT
})

connection.connect()

console.log("Running SQL seed...")

// Run seed query
connection.query(seedQuery, [], err => {
    if (err) {
        throw err
    }

    console.log("SQL seed completed!")
    connection.end()
})