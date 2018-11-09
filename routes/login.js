const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken');

router
.post('/', (request, response, next) => {
    if(request.body.usuario == 'admin' && request.body.senha == 'admin') {
        request.session.token = jwt.sign('topzera', 'secretkey');
        response.json({message: 'Logado com sucesso!', redirection: '/', status: 200});
    } else
        response.json({message: 'Login ou usuário inválido.', redirection: '', status: 400});
})
.get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/');
})
.get('/', (request, response, next) => response.render('login'));

module.exports = router;