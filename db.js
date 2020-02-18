const db = require('mongoose');
const config = require('dotenv').config();

db.Promise = global.Promise;

async function connect(mongoUrl) {
    await db.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('[db]  Conectada con éxito');
}

module.exports = connect;