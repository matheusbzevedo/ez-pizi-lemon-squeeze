const express = require('express'),
    router = express.Router(),
    auth = require('../helpers/auth');

router
.get('/dispositivos', auth.isLogged, (request, response, next) => response.render('devices', {title: 'Scania | Dispositivos', op: 0}))
.get('/prazos', auth.isLogged, (request, response, next) => response.render('deadlines', {title: 'Scania | Prazos', op: 1}));

module.exports = router;