import pathResolve from 'path'; // Lib para lidar com caminhos internos;

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: pathResolve.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: pathResolve.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
        directory: pathResolve.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true

};
// executar o comando