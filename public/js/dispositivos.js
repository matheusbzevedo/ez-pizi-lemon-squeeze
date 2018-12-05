$('.deletePrazo').on('click', () => {
    return confirm('Deseja realmente apagar?');
});

$('#adicionar-lista').on('click', (event) => {
    axios({
        method: 'POST',
        url: 'http://localhost:3000/api/prazos',
        data: {
            usuario: $('#usuario').val(),
            dispositivo: $('#dispositivo').val(),
            retirada: $('#dataRetirada').val() + ' ' + $('#horaRetirada').val() + ':00',
            entrega: $('#dataEntrega').val() + ' ' + $('#horaEntrega').val() + ':00'
        }
    })
    .then(response => Materialize.toast(response.data, 2000, 'rounded', () => location.reload()))
    .catch(error => Materialize.toast(error, 2000, 'rounded'));
});