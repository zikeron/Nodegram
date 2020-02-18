const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage(user) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (user) {
            filter = {user}
        }
        Model.find(filter)
            .populate('user')
            .exec((err, populated) => {
                if (err) {
                    reject(err);
                    return false;
                }
                resolve(populated)
            })
    });
}

async function updateText(id, message) {
    let foundMessage = await Model.findOne({_id: id});
    foundMessage.message = message;
    const newMessage = foundMessage.save();
    return newMessage;
}

function removeMessage(id) {
    return Model.deleteOne({_id: id});
}

module.exports = {
    add: addMessage,
    list: getMessage,
    update: updateText,
    remove: removeMessage
};

