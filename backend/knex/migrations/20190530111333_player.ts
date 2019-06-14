import * as Knex from "knex";

const tableName = 'players';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').unsigned().primary();
    t.string('name').notNullable();

    t.timestamp('createdAt');
    t.timestamp('updatedAt');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}

