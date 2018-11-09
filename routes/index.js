const login = require('./login'),
    dashboard = require('./dashboard');

module.exports = (app) => {
    app
    .use('/', dashboard)
    .use('/login', login);
};