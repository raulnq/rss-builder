export const up = async function (knex) {
  await knex.schema.table('entries', table => {
    table.string('author', 500);
  });
};

export const down = async function (knex) {
  await knex.schema.table('entries', table => {
    table.dropColumn('author');
  });
};
