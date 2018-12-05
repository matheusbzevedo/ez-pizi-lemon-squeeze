

document.addEventListener('keydown', (event) => {
    // if (event.ctrlKey)
    //     console.log($('#dispositivos-lista').children());

    $('#dispositivos-lista').children('tr').each(() => {
        console.log(this.value);
    });
});