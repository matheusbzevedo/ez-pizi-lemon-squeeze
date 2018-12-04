$(() => {
    $('.modal').modal();
    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();
    $('.datepicker').pickadate({
        min: new Date(2018,11,8),
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Mai', 'Abr', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione um mês',
        labelYearSelect: 'Selecione um ano',
        showWeekdaysFull: undefined,
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Ok',
        closeOnSelect: true, // Close upon selecting a date,
        formatSubmit: 'yyyy/mm/dd'
    });
});