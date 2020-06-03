import express from 'express';
import PointsController from './Controllers/PointsController';
import ItemsController from './Controllers/ItemsController';

const routes = express.Router();

// index, show, create, update, delete -> Padrões utilizado par nomenclaturas.

// Controllers
routes.get('/items', new ItemsController().index);

routes.get('/points', new PointsController().index);
routes.get('/points/:id', new PointsController().show);
routes.post('/points', new PointsController().create);





export default routes;
