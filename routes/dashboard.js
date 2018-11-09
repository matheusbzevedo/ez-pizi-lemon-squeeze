const express = require('express'),
    router = express.Router(),
    auth = require('../helpers/auth');

router.get('/', auth.isLogged, (request, response, next) => response.render('index'));

module.exports = router;