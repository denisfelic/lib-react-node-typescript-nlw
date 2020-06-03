import knex from 'knex';
import pathResolve from 'path'; // Lib para lidar com caminhos internos;

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: pathResolve.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,

});

export default connection;