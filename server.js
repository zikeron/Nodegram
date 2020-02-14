const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/', (req, res) => {
    res.send('Hola')
});

app.listen(port);
console.log(`La aplicación está escuchando en http://localhost:${port} `);