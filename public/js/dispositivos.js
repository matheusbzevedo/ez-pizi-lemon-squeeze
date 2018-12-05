$('.deletePrazo').on('click', () => {
    return confirm('Deseja realmente apagar?');
});

$('#adicionar-lista').on('click', (event) => {
    $('#dispositivos-lista').append(`
        <tr>
            <td><i class="material-icons tiny icon-green">lens</i></td>
            <td>${$('#nome').val()}</td>
            <td>${$('#dispositivo').val()}</td>
            <td>${$('#retirada').val()} 8:24:56</td>
            <td>${$('#entrega').val()} 12:00:00</td>
            <td>${$('#setor').val()}</td>
            <td>(92) 99999-9999</td>
            <td>${$('#matricula').val()}</td>
        </tr>
    `);
    $('#nome').val('');
    $('#matricula').val('');
    $('#dispositivo').val('');
    $('#setor').val('');
    $('#retirada').val('');
    $('#entrega').val('');
});