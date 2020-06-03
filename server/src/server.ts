import express from 'express';
import routes from './rotas';
import path from 'path';
import cors from 'cors';


const app = express();  
app.use(cors());
app.use(express.json());    // habilita express para enter REST e receber JSON no Body das requests.
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, '..', 'uploads')));


app.listen(3333);