module.exports = {
    isLogged: (request, response, next) => {
        if(request.session.token) return next();
        response.redirect('/login');
    }
};