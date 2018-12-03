const express = require('express'),
    router = express.Router(),
    auth = require('../helpers/auth');

router
.get('/dispositivos', auth.isLogged, (request, response, next) => response.render('devices', {title: 'Scania | Dispositivos', op: 0, red: 'active active-red', blue: '', yellow: '', green: ''}))
.get('/prazos', auth.isLogged, (request, response, next) => response.render('deadlines', {title: 'Scania | Prazos', op: 1, red: '', blue: 'active active-blue', yellow: '', green: ''}));

module.exports = router;