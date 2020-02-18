const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/', (req, res) => {
    const { users } = req.body;
    controller.addChat(users)
        .then((data) => response.success(req, res, data, 201))
        .catch((err) => response.fail(req, res, 'Internal Server Error', 500, err))
});

router.get('/:userId', (req, res) => {
    const { userId } = req.body;
    controller.listChats(userId)
        .then((users) => response.success(req, res, users, 200))
        .catch((err) => response.fail(req, res, 'Internal Server Error', 500, err))
});

module.exports = router;