const perfil = require('./perfil'),
    setor = require('./setor'),
    auth = require('./auth');

module.exports = (app) => {
    app
    .use('/api/perfil', perfil)
    .use('/api/setor', setor)
    .use('/api/auth', auth);
};