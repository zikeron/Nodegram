const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    const {user} = req.query;
    controller.getMessages(user)
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

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const { text } = req.body;
    controller.updateMessage(id, text)
        .then((data) => {
            response.success(req, res, data, 200)
        }).catch((error) => {
        response.fail(req, res, 'Error interno', 500, error)
    })
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    controller.deleteMessage(id)
        .then((data) => {
            response.success(req, res, `Usuario ${id} eliminado`, 200)
        }).catch((error) => {
        response.fail(req, res, 'Error interno', 500, error)
    })
});

module.exports = router;