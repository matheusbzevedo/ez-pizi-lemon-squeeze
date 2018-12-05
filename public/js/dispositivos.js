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
            retirada: $('#dataRetirada').val() + ' ' + $('#horaRetirada').val(),
            entrega: $('#dataEntrega').val() + ' ' + $('#horaEntrega').val()
        }
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
});