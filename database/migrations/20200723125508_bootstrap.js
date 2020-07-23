exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username", 128).notNullable().unique();
    tbl.string(political_orientation).notNullable();
  });
};

exports.down = function (knex) {};
