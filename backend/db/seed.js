const format = require("pg-format");
const db = require("./connection");

function seed({ users, ideas }) {
  return db
    .query("DROP TABLE IF EXISTS ideas;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return createIdeas();
    })
    .then(() => {
      return insertUsersData(users);
    })
    .then(() => {
      return insertIdeasData(ideas);
    })
    .then(() => {});
}

function createUsers() {
  /* Create your users table in the query below */

  return db.query(
    "CREATE TABLE users (user_id SERIAL PRIMARY KEY, username VARCHAR(40) NOT NULL, first_name VARCHAR(40) NOT NULL);"
  );
}

function createIdeas() {
  return db.query(
    `CREATE TABLE ideas 
    (idea_id SERIAL PRIMARY KEY, 
      user_id INT REFERENCES users(user_id), 
      title VARCHAR(100) NOT NULL, 
      body VARCHAR NOT NULL);`
  );
}

function insertUsersData(users) {
  const usersData = users.map((user) => {
    return [user.username, user.first_name];
  });
  const sqlString = format(
    "INSERT INTO users (username, first_name) VALUES %L RETURNING *;",
    usersData
  );
  return db.query(sqlString);
}

function insertIdeasData(ideas) {
  const ideasData = ideas.map((idea) => {
    return [idea.user_id, idea.title, idea.body];
  });

  const sqlString = format(
    "INSERT INTO ideas (user_id, title, body) VALUES %L RETURNING *;",
    ideasData
  );

  return db.query(sqlString);
}

module.exports = seed;
