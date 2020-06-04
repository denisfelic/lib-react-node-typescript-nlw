import Knex from "knex";

export async function seed(knex: Knex) {
    await knex('items').insert([
        {   image : 'lampadas.svg' , title: 'Lâmpadas'},
        {   image : 'baterias.svg' , title: 'Pilhas e Baterias'},
        {   image : 'papeis-papelao.svg' , title: 'Papéis e Papelão'},
        {   image : 'eletronicos.svg' , title: 'Resíduos Elêtronicos'},
        {   image : 'organicos.svg' , title: 'Resíduos Orgânicos'},
        {   image : 'oleo.svg' , title: 'Óleos'},
    ]);
}