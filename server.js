const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
router(app);

app.use('/app', express.static('public'));

app.listen(port);
console.log(`La aplicación está escuchando en http://localhost:${port} `);