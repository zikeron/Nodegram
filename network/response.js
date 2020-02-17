exports.success = (req, res, message, statusCode) => {
    res.status(statusCode || 200).send({
        status: 0,
        error: '',
        body: message,
    });
};

exports.fail = (req, res, message, statusCode, error) => {

    res.status(statusCode || 500).send({
        status: 1,
        error: '',
        body: message,
    });

    console.error(error)
};