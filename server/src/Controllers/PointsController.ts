import { Request, Response } from 'express';
import knexConnection from '../database/connection';

class PointsController {


    public async index(request: Request, response: Response) {
        // Cidade , uf , Items || Filters = Query
        const { city, uf, items } = request.query;

        // Remove a virgula, os espaços, e transforma a string em array 
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knexConnection('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }

    public async show(request: Request, response: Response) {
        const { id } = request.params;
        const point = await knexConnection('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ error: 'Point not found.' });
        }

        /**
         * SELECT * FROM items 
         *     JOIN point_items ON items.id = point items.items_id
         * WHERE point_items.point_id = id;
         */
        const items = await knexConnection('items')
            .join('points_items', 'item_id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title');


        return response.json({ point, items });
    }

    public async create(request: Request, response: Response) {

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            street,
            number,
            cep,
            items,

        } = request.body;

        /**Não está funcionando, fica carregando eternamente.
         * Precisa dar um Drop em todas as tabelas, e testar com elas vazias.
         *  // TODO
         Adicionar o trx ao lugar do knexConnection pois ira trazer mais segurança tratando-se de async  
         */
        const trx = await knexConnection.transaction(); 

        const point = {
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            street,
            number,
            cep,
        }

        const pointId = await trx('points').insert(point);

        const pointItemsTable = items.map((item_id: Number) => {
            return {
                item_id,
                point_id: pointId[0]
            };
        });

        await trx('points_items').insert(pointItemsTable);

        await trx.commit();
        
        return response.json({
            id: pointId[0],
            ...point
        });
    };



}


export default PointsController;