const sqlite3 = require("sqlite3").verbose();
const path = require('path')
const db = new sqlite3.Database(path.join(__dirname, "../data.db"));

module.exports = db