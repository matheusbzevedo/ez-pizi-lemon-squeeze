const express = require('express'),
    router = express.Router(),
    db = require('../../database');

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
        SELECT * FROM setor
    `, (error, results) => {
        if(error)
            response.status(500).send(`Erro ao buscar setor. Tente novamente mais tarde. ${error}`);

        response.json({setores: results});
    });
})
.put('/', (request, response, next) => {
    db.query(`
        UPDATE setor SET descricao = ?
        WHERE setor.id = ?
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
        DELETE FROM setor WHERE setor.id = ?
    `, [
        request.body.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao excluir setor. Tente novamente mais tarde. ${error}`);

        response.status(200).send(`Setor excluído com sucesso!`);
    });
})
.get('/:id', (request, response, next) => {
    db.query(`
        SELECT * FROM setor WHERE setor.id = ?
    `, [
        request.params.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao buscar setor. Tente novamente mais tarde. ${error}`);

        response.status(200).json({setor: results});
    });
});

module.exports = router;