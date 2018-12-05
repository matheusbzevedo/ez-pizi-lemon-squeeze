const express = require('express'),
    router = express.Router(),
    db = require('../../database');

router
.post('/', (request, response, next) => {
    db.query(`
        INSERT INTO dispositivos(descricao) VALUES (?)
    `, [
        request.body.descricao
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao cadastrar novo dispotivo. Tente novamente mais tarde. ${error}`);

        response.status(200).send(`Dispotivo ${request.body.descricao} cadastrado com sucesso!`);
    });
})
.get('/', (request, response, next) => {
    db.query(`
        SELECT
            prazos.id,
            DATE_FORMAT(prazos.retirada, '%Y-%m-%d %H:%i:%s') AS 'retirada',
            DATE_FORMAT(prazos.entrega, '%Y-%m-%d %H:%i:%s') AS 'entrega',
            usuario.nome,
            usuario.email,
            setor.descricao AS 'setor',
            dispositivos.descricao AS 'dispositivo'
        FROM prazos
        LEFT JOIN usuario ON usuario.id = prazos.usuario
        LEFT JOIN dispositivos ON dispositivos.id = prazos.dispositivo
        LEFT JOIN setor ON setor.id = usuario.setorID
    `, (error, results) => {
        if(error)
            response.status(500).send(`Erro ao buscar dispositivos. Tente novamente mais tarde. ${error}`);

        response.json({prazos: results});
    });
})
.put('/', (request, response, next) => {
    db.query(`
        UPDATE dispositivos SET descricao = ?
        WHERE dispositivos.id = ?
    `, [
        request.body.descricao,
        request.body.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao alterar dispositivo. Tente novamente mais tarde. ${error}`);

        response.status(200).send('Dispositivo alterado com sucesso!');
    });
})
.delete('/', (request, response, next) => {
    db.query(`
        DELETE FROM prazos WHERE prazos.id = ?
    `, [
        request.body.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao excluir dado. Tente novamente mais tarde. ${error}`);

        response.status(200).send('Dado excluído com sucesso!');
    });
})
.get('/:id', (request, response, next) => {
    db.query(`
        SELECT * FROM dispositivos WHERE dispositivos.id = ?
    `, [
        request.params.id
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao encontrar dispositivo. Tente novamente mais tarde. ${error}`);
        
        response.status(200).json(results);
    });
});

module.exports = router;