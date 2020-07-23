exports.up = function (knex) {
    return knex.schema
    .createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("username", 128).notNullable().unique();
        tbl.string("password", 128).notNullable();
        tbl.string('political_orientation', 500).notNullable();
        tbl.string('email', 500).notNullable();
    })
    .createTable("posts", (tbl) => {
        tbl.increments();
        tbl.string("url", 1000).unique().notNullable();
    })
    .createTable("user_posts", tbl => {
        tbl
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl
            .integer("post_id")
            .unsigned()
            .references("id")
            .inTable("posts")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl
            .integer("vote")
            .unsigned()
        tbl
            .boolean("creator").notNullable().defaultTo(0)
        tbl.primary(["user_id", "post_id"])
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("user_posts")
        .dropTableIfExists("posts")
        .dropTableIfExists("users")
};
