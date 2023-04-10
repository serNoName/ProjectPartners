$('form.popup_log-time').find('.btn').click(function(e) {
    e.preventDefault();

    const form = $(this).parent().parent()
    const regex = /\d{2}/;
    const startTime = regex.exec(form.find('.data-start').text())[0]
    const endTime = regex.exec(form.find('.data-end').text())[0]
    const text = form.find('.form-activity').val()
    const logCard = `<div class="timesheetLog popup-trigger currentLog" data-interval="" data-popup="edit-time""> <div class="timesheetLog__line"></div> <div class="timesheetLog__time"></div> <div class="timesheetLog__descr"></div></div>`

    let col = new Date(form.find('.input-date').val()).getDay()

    if(col == 0) col = 1;
    else if(col == 6) col = 5;

    let row;
    switch (parseInt(startTime)) {
        case 00:
            row = 1
            break;
        case 01:
            row = 2
            break;
        case 02:
            row = 3
            break;
        case 03:
            row = 4
            break;
        case 04:
            row = 5
            break;
        case 05:
            row = 6
            break;
        case 06:
            row = 7
            break;
        case 07:
            row = 8
            break;
        case 08:
            row = 9
            break;
        case 09:
            row = 10
            break;
        case 10:
            row = 11
            break;
        case 11:
            row = 12
            break;
        case 12:
            row = 13
            break;
        case 13:
            row = 14
            break;
        case 14:
            row = 15
            break;
        case 15:
            row = 16
            break;
        case 16:
            row = 17
            break;
        case 17:
            row = 18
            break;
        case 18:
            row = 19
            break;
        case 19:
            row = 20
            break;
        case 20:
            row = 21
            break;
        case 21:
            row = 22
            break;
        case 22:
            row = 23
            break;
        case 23:
            row = 24
            break;
    }

    $(`.timesheet__body>.timesheet__row:nth-child(${213})`)
    $(`.timesheet__body`).find(`.timesheet__row:nth-child(${row})`).find(`.timesheet__col:nth-child(${col+1}`).html(logCard)

    $('.currentLog').find('.timesheetLog__time').text(`${startTime}:00 - ${endTime}:00`)
    $('.currentLog').find('.timesheetLog__descr').text(text)
    $('.currentLog').attr('data-interval', Math.abs(parseInt(startTime) - parseInt(endTime)))
    $('.currentLog').removeClass('currentLog')

    timesheetLog()
})


// timesheetLog

function timesheetLog() {
    const timesheetLog = $('.timesheetLog') //find .timesheetLog

    timesheetLog.each(function () {
        const colHeight = $(this).parent().height() // get the height of one cell
        const interval = $(this).attr('data-interval') // get the interval

        $(this).css('min-height', `${colHeight * interval}px`); // set the min height of the current .timesheetLog
    })
}