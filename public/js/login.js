$('form').on('submit', (event) => {
    event.preventDefault();
    axios.post('/api/auth/', {
        login: $('#usuario').val(),
        senha: $('#senha').val()
    })
    .then(response => {
        Materialize.toast(response.data, 2000, 'rounded');
        window.location.href = '/dispositivos';
    })
    .catch(err => {
        if(err.response.status == 401)
            Materialize.toast(err.response.data, 2000, 'rounded');
    });
});