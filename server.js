const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const db = require('./db');

const {
    DB_PREFIX,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
    DB_SUFFIX
} = process.env;

const mongoUrl = `${DB_PREFIX}${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}${DB_SUFFIX}`;

db(mongoUrl);

const port = process.env.PORT || 3000;
const socket = require('./socket');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
socket.connect(server);
router(app);

app.use('/app', express.static('public'));

server.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port} `);
});
