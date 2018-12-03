document.addEventListener('keydown', (event) => {
    if (event.ctrlKey)
        $('#device-test').toggleClass('icon-green icon-red');

    if(event.altKey)
        $('#dispositivos-lista').append(`
            <tr>
                <td><i class="material-icons tiny icon-green">lens</i></td>
                <td>Notebook Acer</td>
                <td>${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}</td>
                <td>(92) 22222-22222</td>
                <td>3192231</td>
            </tr>
        `);
});