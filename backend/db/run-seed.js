const seed = require("./seed");
const db = require("./connection");
const data = require("./data/index.js");
require('dotenv').config();

seed(data).then(() => {
  return db.end();
});
