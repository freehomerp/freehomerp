/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      id: '2333104f-34cc-44ce-8981-c61592647568',
      username: 'admin',
      password: '$2a$10$mOVkGhNvjMLqVGk0OZ4X7OzWK.7maaVPwHoeDRfLlLq5elt8MNJIW',
    },
  ]);
};
