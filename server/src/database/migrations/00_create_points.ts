import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {

        table.increments('id').primary();

        // Dados
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();

        // Localização
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();

        // Endereço
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('street').nullable();
        table.string('number').nullable();
        table.string('cep', 8).nullable();

    });
}

export async function down(knext : Knex) {
    knext.schema.dropTable('points');
 }