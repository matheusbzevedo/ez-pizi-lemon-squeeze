const express = require('express'),
    router = express.Router(),
    auth = require('../helpers/auth');

router
.get('/', auth.isLogged, auth.isAdm, (request, response, next) => response.redirect('/dispositivos'))
.get('/dispositivos', auth.isLogged, auth.isAdm, (request, response, next) => response.render('devices', {title: 'Scania | Dispositivos', op: 0, red: 'active active-red', blue: '', yellow: '', green: ''}))
.get('/prazos', auth.isLogged,auth.isAdm, (request, response, next) => response.render('deadlines', {title: 'Scania | Prazos', op: 1, red: '', blue: 'active active-blue', yellow: '', green: ''}))
.get('/verificar', auth.isLogged, auth.isCommomUser, (request, response, next) => {
    response.send('Usuário comum.');
});

module.exports = router;