const perfil = require('./perfil'),
    setor = require('./setor'),
    auth = require('./auth'),
    usuario = require('./usuario');

module.exports = (app) => {
    app
    .use('/api/perfil', perfil)
    .use('/api/setor', setor)
    .use('/api/auth', auth)
    .use('/api/usuario', usuario);
};