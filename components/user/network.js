const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();


router.post('/', (req, res) => {
    const { body } = req;
    controller.addUser(body.name)
        .then((data) => {
            response.success(req, res, data, 201)
        }).catch(e => {
        response.fail(req, res, 'Información invalida', 400)
    })
});

router.get('/', (req, res) => {
    const { body } = req;
    controller.listUsers()
        .then((users) => {
            response.success(req, res, users, 201)
        }).catch(e => {
        response.fail(req, res, 'Internal Error', 500, e)
    })
});

module.exports = router;