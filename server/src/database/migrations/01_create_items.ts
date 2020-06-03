import Knex from 'knex';

export async function up(knex : Knex) {
    return knex.schema.createTable('items', item => {
        
                item.increments('id').primary();

                item.string('image').notNullable();
                item.string('title').notNullable();
    });
 }

export async function down(knex : Knex) { 
    knex.schema.dropTable('items');
}