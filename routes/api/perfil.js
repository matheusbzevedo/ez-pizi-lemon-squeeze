const express = require('express'),
    router = express.Router(),
    db = require('../../database');

router
.post('/', (request, response, next) => {
    db.query(`
        INSERT INTO perfil(descricao) VALUES (?)
    `, [
        request.body.descricao
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao cadastrar novo perfil. Tente novamente mais tarde. ${error}`);

        response.status(200).send(`Perfil ${request.body.descricao} cadastrado com sucesso!`);
    });
})
.get('/', (request, response, next) => {
    db.query(`
        SELECT * FROM perfil
    `, (error, results) => {
        if(error)
            response.status(500).send(`Erro ao buscar perfil. Tente novamente mais tarde. ${error}`);

        response.json(results);
    });
})
.put('/', (request, response, next) => {
    db.query(`
        UPDATE perfil SET descricao = ?
        WHERE perfil.id = ?
    `, [
        request.body.descricao,
        request.body.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao alterar perfil. Tente novamente mais tarde. ${error}`);

        response.status(200).send('Perfil alterado com sucesso!');
    });
})
.delete('/', (request, response, next) => {
    db.query(`
        DELETE FROM perfil WHERE perfil.id = ?
    `, [
        request.body.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao excluir perfil. Tente novamente mais tarde. ${error}`);

        response.status(200).send('Perfil excluído com sucesso!');
    });
})
.get('/:id', (request, response, next) => {
    db.query(`
        SELECT * FROM perfil WHERE perfil.id = ?
    `, [
        request.params.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao encontrar perfil. Tente novamente mais tarde. ${error}`);
        
        response.status(200).json(results);
    });
});

module.exports = router;