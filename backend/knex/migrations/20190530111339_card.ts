import * as Knex from "knex";

const tableName = 'cards';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(tableName, (t:any) => {
    t.increments('id').unsigned().primary();
    t.string('name').notNullable();
    t.string('description').nullable();
    t.integer('playerId').unsigned().notNullable();

    t.foreign('playerId')
      .references('id')
      .inTable('players')
      .onDelete('CASCADE');

    t.timestamp('createdAt');
    t.timestamp('updatedAt');
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
}
