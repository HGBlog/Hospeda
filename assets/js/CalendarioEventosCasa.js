/*!
 * AVISO: PARA USAR A DOCUMENTAÇÃO USE: 
 * FullCalendar v3.9.0
 * Docs & License: https://fullcalendar.io/
 * (c) 2018 Adam Shaw
 */
$(document).ready(function() {
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek'
    },
    timeFormat: 'H:mm - ',
    defaultDate: '2017-10-01',
    aspectRatio: 2,
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectHelper: true,
    dayClick: function(date, jsEvent, view) {
      $(this).css('background-color', '#e00947');
      window.open('Cad-Evento-P1.html', '_self');
    },
    eventClick: function(calEvent, jsEvent, view) {
      $(this).css('background-color', '#e00947');
      window.open('Org-Quarto-P2.html', '_self');
    },
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        id: 001,
        title: 'Convivência de Curso',
        start: '2017-10-05T20:00:00',
        end: '2017-10-09T15:00:00',
        color: '#28a745'   // COR PARA INSCRIÇÃO CONCLUIDA
      },
      {
        id: 002,
        title: 'Convivência das Famílias',
        start: '2017-10-15T20:00:00',
        end: '2017-10-24T15:00:00',
        color: '#ffc107',   // COR PARA INSCRIÇÃO EM ANDAMENTO
        textColor: '#212529' // COR DE TEXTO P/ INSCRIÇÃO EM ANDAMENTO 
      },      
    ]
  });
});

$(document).ready(function() {
  $('#MiniCalendario').dcalendar();
});

