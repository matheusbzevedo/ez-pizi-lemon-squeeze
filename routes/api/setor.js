const express = require('express'),
    router = express.Router(),
    db = require('../../database');

router
.get('/', (request, response, next) => {
    db.query(`
        SELECT * FROM setor
    `, (error, results) => {
        if(error)
            response.send(`Erro ao buscar setor. Tente novamente mais tarde. ${error}`);

        response.json(results);
    });
});

module.exports = router;