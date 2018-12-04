const express = require('express'),
    router = express.Router(),
    auth = require('../helpers/auth');

router
.get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/login');
})
.get('/', auth.loginBlock, (request, response, next) => response.render('login'));

module.exports = router;