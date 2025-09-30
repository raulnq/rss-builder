export const up = async knex => {
  await knex.schema.createTable('feeds', table => {
    table.uuid('feedId').primary();
    table.string('name', 500).notNullable();
    table.string('key', 1000).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('sources', table => {
    table.uuid('sourceId').primary();
    table.string('name', 500).notNullable();
    table.string('url', 1000).notNullable();
    table.timestamp('syncedAt');
    table.uuid('feedId').notNullable();
    table
      .foreign('feedId')
      .references('feedId')
      .inTable('feeds')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('entries', table => {
    table.uuid('entryId').primary();
    table.string('name', 500).notNullable();
    table.string('publisherId', 500).notNullable();
    table.string('url', 1000).notNullable();
    table.timestamp('publishedAt');
    table.uuid('sourceId').notNullable();
    table
      .foreign('sourceId')
      .references('sourceId')
      .inTable('sources')
      .onDelete('CASCADE');
  });
};

export const down = async knex => {
  await knex.schema.dropTableIfExists('entries');
  await knex.schema.dropTableIfExists('sources');
  await knex.schema.dropTableIfExists('feeds');
};
