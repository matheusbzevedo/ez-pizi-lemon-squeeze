$('#add-perfil').on('click', (event) => {
    axios({
        method: 'POST',
        url: '/api/perfil',
        data: {
            descricao: $('#descricao').val()
        }
    })
    .then(response => { Materialize.toast(response.data, 2000, 'rounded', () => { location.reload(); }); })
    .catch(error => { Materialize.toast(error, 2000, 'rounded'); });
});