import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('points_items', points_items => {

        points_items.increments('id').primary();

        points_items.integer('point_id').notNullable()
        .references('id')
        .inTable('points');

        points_items.integer('item_id').notNullable()
        .references('id')
        .inTable('items');

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points_items');
 }