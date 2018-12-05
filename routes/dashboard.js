const express = require('express'),
    router = express.Router(),
    axios = require('axios'),
    auth = require('../helpers/auth');

router
.get('/', auth.isLogged, auth.isAdm, (request, response, next) => response.redirect('/dispositivos'))
.get('/dispositivos', auth.isLogged, auth.isAdm, (request, response, next) => response.render('devices', {title: 'Scania | Dispositivos', op: 0, red: 'active active-red', blue: '', yellow: '', green: ''}))
.get('/prazos', auth.isLogged,auth.isAdm, (request, response, next) => {
    axios({
        method: 'GET',
        url: `${process.env.API_URL}/prazos`
    })
    .then(prazos => {
        axios({
            method: 'GET',
            url: `${process.env.API_URL}/usuario`
        })
        .then(usuarios => {
            axios({
                method: 'GET',
                url: `${process.env.API_URL}/dispositivo`
            })
            .then(dispositivos => {
                response.render('deadlines', {
                    title: 'Scania | Prazos',
                    op: 1,
                    red: '',
                    blue: 'active active-blue',
                    yellow: '',
                    green: '',
                    prazos: prazos.data,
                    usuarios: usuarios.data,
                    dispositivos: dispositivos.data
                });
            })
            .catch(dispositivosError => console.log(dispositivosError));
        })
        .catch(usuariosError => console.log(usuariosError));
    })
    .catch(prazosError => console.log(prazosError));
})
.get('/prazos/delete/:id', auth.isLogged, auth.isAdm, (request, response, next) => {
    axios({
        method: 'DELETE',
        url: `${process.env.API_URL}/prazos`,
        data: {
            id: request.params.id
        }
    })
    .then(res => response.redirect('/prazos'))
    .catch(error => console.log(res));
})
.get('/verificar', auth.isLogged, auth.isCommomUser, (request, response, next) => {
    response.send('Usuário comum.');
})
.get('/perfil/listar', auth.isLogged, auth.isAdm, (request, response, next) => axios.get(`${process.env.API_URL}/perfil`).then(perfis => response.render('perfil/lista', { title: 'Scania | Lista', op: 0, red: '', blue: '', yellow: '', green: '', perfis: perfis.data })));

module.exports = router;