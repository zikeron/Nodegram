const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

router.get('/', (req, res) => {
    console.log(req.query);
    res.send('Hola')
});

app.listen(port);
console.log(`La aplicación está escuchando en http://localhost:${port} `);