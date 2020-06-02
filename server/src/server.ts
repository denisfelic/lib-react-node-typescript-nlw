import express from 'express';

console.log('Try connect');
const app = express();

app.get('/users', (request, response) => {
    console.log('Conexão estabelecida.');
    console.log(request.statusCode);
    const data = [
        {
            'name': 'Denis',
            'phone': '129412949',
            'city': 'São Paulo',
            'Country': 'Brazil',
        }
    ];

    return response.json(data);
});

app.listen(3000);