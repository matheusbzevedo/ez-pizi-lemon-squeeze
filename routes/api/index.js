const perfil = require('./perfil'),
    setor = require('./setor'),
    auth = require('./auth'),
    usuario = require('./usuario'),
    dispositivo = require('./devices'),
    prazos = require('./prazos');

module.exports = (app) => {
    app
    .use('/api/perfil', perfil)
    .use('/api/setor', setor)
    .use('/api/auth', auth)
    .use('/api/usuario', usuario)
    .use('/api/dispositivo', dispositivo)
    .use('/api/prazos', prazos);
};