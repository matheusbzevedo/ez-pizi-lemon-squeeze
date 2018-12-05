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
$('.edit-item').on('click', (event) => {
    $('#lista-editar-item').ready(() => {
        $('.input-field input[name=descricao]').attr('value', $(event.currentTarget).parent().prev().text());
        $('.input-field input[name=id]').attr('value', $(event.currentTarget).parent().prev().prev().text());
    })
});
$('#updt-perfil').on('click', (event) => {
    $('.edit-item').ready(() => {
        axios({
            method: 'PUT',
            url: '/api/perfil',
            data: {
                id: $('#id').val(),
                descricao: $('#descricao').val()
            }
        })
        .then(response => { Materialize.toast(response.data, 2000, 'rounded', () => { location.reload(); }); })
        .catch(error => { Materialize.toast(error, 2000, 'rounded'); });
    });
});
$('.del-item').on('click', (event) => {
    return confirm('Deseja realmente apagar?');
})