
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable('users', function (table) {
    table.string('id', 36).primary();
    table.string('username', 50).notNullable();
    // table.string('password', 60).notNullable();
    // table.index('id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
};
