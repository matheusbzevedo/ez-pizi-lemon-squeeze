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
                    prazos: prazos.data.prazos,
                    usuarios: usuarios.data.usuarios,
                    dispositivos: dispositivos.data.dispositivos
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
.get('/perfil/listar', auth.isLogged, auth.isAdm, (request, response, next) => axios.get(`${process.env.API_URL}/perfil`).then(perfis => response.render('perfil/lista', { title: 'Scania | Lista', op: 0, red: '', blue: '', yellow: '', green: '', perfis: perfis.data.perfis })))
.get('/perfil/delete/:id', auth.isLogged, auth.isAdm, (request, response, next) => {
    axios({
        method: 'DELETE',
        url: `${process.env.API_URL}/perfil`,
        data: {
            id: request.params.id
        }
    })
    .then(res => response.redirect('/perfil/listar'))
    .catch(error => console.log(res));
})
.get('/setor/listar', auth.isLogged, auth.isAdm, (request, response, next) => axios.get(`${process.env.API_URL}/setor`).then(setores => response.render('setor/lista', { title: 'Scania | Lista', op: 0, red: '', blue: '', yellow: '', green: '', setores: perfis.data.setores })))
.get('/setor/delete/:id', auth.isLogged, auth.isAdm, (request, response, next) => {
    axios({
        method: 'DELETE',
        url: `${process.env.API_URL}/setor`,
        data: {
            id: request.params.id
        }
    })
    .then(res => response.redirect('/setor/listar'))
    .catch(error => console.log(res));
})
.get('/usuario/listar', auth.isLogged, auth.isAdm, (request, response, next) => axios.get(`${process.env.API_URL}/usuario`).then(usuarios => response.render('usuario/lista', { title: 'Scania | Lista', op: 0, red: '', blue: '', yellow: '', green: '', usuarios: perfis.data.usuarios })))
.get('/usuario/delete/:id', auth.isLogged, auth.isAdm, (request, response, next) => {
    axios({
        method: 'DELETE',
        url: `${process.env.API_URL}/usuario`,
        data: {
            id: request.params.id
        }
    })
    .then(res => response.redirect('/usuario/listar'))
    .catch(error => console.log(res));
});

module.exports = router;