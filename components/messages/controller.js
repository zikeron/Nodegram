const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageContoler] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }

        let fileUrl = '';
        if (file) {
            fileUrl = `http://localhost:3000/app/files/${file.filename}`
        }

        const fullMessage = {
            chat,
            message,
            user,
            date: new Date(),
            file: fileUrl
        };
        store.add(fullMessage);
        socket.io.emit('message', fullMessage);
        resolve(fullMessage);
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message){
            reject('Invalid Data');
            return false;
        }

        const result = await store.update(id, message);
        resolve(result);
    });
}

function getMessages(user) {
    return new Promise((resolve, reject) => {
        resolve(store.list(user))
    });
}

function deleteMessage(id){
    return new Promise((resolve, reject) => {
        if (!id){
            reject('invalid id');
            return false;
        }
       store.remove(id)
           .then(() => resolve())
           .catch(error => reject(error))
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};