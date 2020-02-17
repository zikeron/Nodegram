const db = require('mongoose');
const config = require('dotenv').config();
const Model = require('./model');

const {
    DB_PREFIX,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
    DB_SUFFIX
} = process.env;

const mongoUrl = `${DB_PREFIX}${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}${DB_SUFFIX}`;
console.log('mongoURL', mongoUrl);
db.Promise = global.Promise;
db.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('[db]  Conectada con éxito');

const list = [];

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
    list.push(message);
}

async function getMessage(user) {
    let filter = {};
    if(user) {
        filter = {user}
    }
    return await Model.find(filter);
}

async function updateText(id, message) {
    let foundMessage = await Model.findOne({_id:id});
    foundMessage.message = message;
    const newMessage = foundMessage.save();
    return newMessage;
}

function removeMessage(id) {
    return Model.deleteOne({ _id: id});
}

module.exports = {
    add: addMessage,
    list: getMessage,
    update: updateText,
    remove: removeMessage
};

