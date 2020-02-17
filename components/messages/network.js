const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    controller.getMessages()
        .then((messageList) => {
            response.success(req, res, messageList, 201)
        })
        .catch((error) => {
            response.fail(req, res, 'Unexpected Error', 500, error)
        });

});

router.post('/', (req, res) => {
    const {body} = req;
    controller.addMessage(body.user, body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201)
        }).catch(e => {
        response.fail(req, res, 'Información invalida', 400)
    })
});

module.exports = router;