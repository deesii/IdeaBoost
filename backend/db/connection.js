/**
 * Create your connection to the DB in this file
 * and remember to export it
 */
require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool();

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = pool;
