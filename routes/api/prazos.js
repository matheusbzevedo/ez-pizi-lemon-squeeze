const express = require('express'),
    router = express.Router(),
    db = require('../../database'),
    date = require('../../helpers/date');

router
.post('/', (request, response, next) => {
    let entrega = date.dateFormat(request.body.entrega);
    let retirada = date.dateFormat(request.body.retirada);
    db.query(`
        INSERT INTO prazos(usuario, dispositivo, retirada, entrega, setor) VALUES (?, ?, ?, ?, 1)
    `, [
        request.body.usuario,
        request.body.dispositivo,
        retirada,
        entrega
    ], (error, results) => {
        if(error)
            response.status(500).send(`Erro ao cadastrar novo prazo. Tente novamente mais tarde. ${error}`);

        response.status(200).send(`Prazo cadastrado com sucesso!`);
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
            dispositivos.descricao AS 'dispositivo',
            IF(entrega <= retirada, 'icon-red', 'icon-green') AS 'icone'
        FROM prazos
        LEFT JOIN usuario ON usuario.id = prazos.usuario
        LEFT JOIN dispositivos ON dispositivos.id = prazos.dispositivo
        LEFT JOIN setor ON setor.id = usuario.setorID
        ORDER BY entrega
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