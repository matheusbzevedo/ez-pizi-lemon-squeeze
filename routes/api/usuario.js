const express = require('express'),
    router = express.Router(),
    db = require('../../database'),
    auth = require('../../helpers/auth');

router
.post('/', (request, response, next) => {
    db.query(`
        INSERT INTO setor(descricao) VALUES (?)
    `, [
        request.body.descricao
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao cadastrar setor. Tente novamente mais tarde. ${error}`);

        response.status(200).send(`Setor ${request.body.descricao} cadastrado com sucesso!`);
    });
})
.get('/', (request, response, next) => {
    db.query(`
        SELECT * FROM usuario
    `, (error, results) => {
        if(error)
            response.status(500).send(`Erro ao buscar usuários. Tente novamente mais tarde. ${error}`);

        response.json({usuarios: results});
    });
})
.put('/', (request, response, next) => {
    db.query(`
        UPDATE usuario SET descricao = ?
        WHERE usuario.id = ?
    `, [
        request.body.descricao,
        request.body.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao alterar setor. Tente novamente mais tarde. ${error}`);

        response.status(200).send(`Setor alterado com sucesso!`);
    });
})
.delete('/', (request, response, next) => {
    db.query(`
        DELETE FROM usuario WHERE usuario.id = ?
    `, [
        request.body.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao excluir usuário. Tente novamente mais tarde. ${error}`);

        response.status(200).send(`Usuário excluído com sucesso!`);
    });
    response.status(200).send(request.body);
})
.get('/:id', (request, response, next) => {
    response.send(request.params);
});

module.exports = router;