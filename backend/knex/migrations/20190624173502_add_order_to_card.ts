import * as Knex from "knex";

const tableName = 'cards';
const columnName = 'order';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(tableName, function(t) {
    t.integer(columnName).notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(tableName, function(t) {
    t.dropColumn(columnName);
  });
}
