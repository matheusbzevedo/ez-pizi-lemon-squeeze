const express = require('express'),
    router = express.Router(),
    db = require('../../database');

router
.post('/', (request, response, next) => {
    db.query(`
        SELECT
            usuario.id,
            usuario.email,
            usuario.nome,
            perfil.descricao AS 'perfil',
            perfil.id AS 'perfilID',
            setor.id AS 'setorID',
            setor.descricao AS 'setor'
        FROM
            usuario
        LEFT JOIN perfil ON usuario.perfilID = perfil.id
        LEFT JOIN setor ON usuario.setorID = setor.id
        WHERE
            email LIKE ? AND
            senha LIKE ?
    `, [
        request.body.login,
        request.body.senha
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao encontrar usuário. Tente novamente mais tarde. ${error}`);
        
        if(results.length == 0)
            response.status(401).send('Login e/ou senha incorretos!');
        else
            response.json(results);
    });
});

module.exports = router;