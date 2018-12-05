const jwt = require('jsonwebtoken');

module.exports = {
    isLogged: (request, response, next) => {
        if(request.session.token) return next();
        response.redirect('/login');
    },
    isAdm: (request, response, next) => {
        if(request.session.perfil == 1)
            return next();
        else
            response.redirect('/verificar');
    },
    isCommomUser: (request, response, next) => {
        if(request.session.perfil == 2)
            return next();
        else
            response.redirect('/dispositivos');
    },
    loginBlock: (request, response, next) => {
        if(request.session.token)
            if(request.session.perfil == 1) return response.redirect('/dispositivos');
            if(request.session.perfil == 2) return response.redirect('/verificar');
        else 
            return next();
    }
};