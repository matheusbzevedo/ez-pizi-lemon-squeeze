$('form').on('submit', (event) => {
    event.preventDefault();
    axios.post('/login', {
        usuario: $('#usuario').val(),
        senha: $('#senha').val()
    })
    .then(response => {
        Materialize.toast(response.data.message, 2000, 'rounded');
        if(response.data.status == 200)
            window.location.href = response.data.redirection;
    })
    .catch(err => console.log(err));
});