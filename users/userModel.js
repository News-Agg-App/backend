const db = require("../database/dbConfig");

module.exports = {
  add,
  findById,
};

function add(user) {
  return db("users").insert(user, "id");
}

function findById(id) {
  return db("users")
    .select("id", "username", "political_orientation")
    .where({ id })
    .first();
}
