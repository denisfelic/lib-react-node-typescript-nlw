import { Request, Response } from 'express';
import knexConnection from 'knex';

class ItemsController {

    public async index(request: Request, response: Response) {
        
        const items = await knexConnection('items').select('*');

        const serializedItems = items.map((item, indice) => {
            return {
                id: item.id,
                name: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            }
        })

        return response.json(serializedItems);
    }
}


export default ItemsController;