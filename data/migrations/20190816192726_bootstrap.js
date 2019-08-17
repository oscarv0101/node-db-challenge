
exports.up = function(knex) {
    return knex.schema
    .createTable("project", tbl => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.string("description", 255);
      tbl.boolean("completed").notNullable().defaultTo(false);
    })
    .create("resource", tbl => {
      tbl.increments();
      tbl.string("name", 128).unique().notNullable();
      tbl.string("description", 255);
    })
    .createTable("task", tbl => {
      tbl.increments();
      tbl.string("description", 255).notNullable();
      tbl.string("notes", 1000);
      tbl.boolean("completed").notNullable().defaultTo(false);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    
    
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("project_resource")
    .dropTableIfExists("task")
    .dropTableIfExists("resource")
    .dropTableIfExists("project");
};
