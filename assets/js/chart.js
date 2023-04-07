$(document).ready( setCharts() )

function setCharts(chart) {
    if (typeof chart === 'undefined') chart =  $('.chart');

    chart.each(function() {
        let percent = $(this).find('.chart__svg').attr('data-percent');
        const circle = $(this).find('[stroke-dashoffset]');
        const totalDasharray = $(this).find('[stroke-dasharray]').attr('stroke-dasharray');

        if (!$(this).hasClass('no-change')) {
            if (percent == 100) $(this).removeClass('chart-rose').addClass('chart-yellow')
            else if (percent < 100) $(this).removeClass('chart-yellow').removeClass('chart-rose')
            else if (percent > 100) $(this).removeClass('chart-yellow').addClass('chart-rose'), percent = 100
        }

        // Calculate the required value of the 'stroke-dashoffset' attribute using the percentage value of the chart and the total stroke length
        const resoult = (totalDasharray / 100) * percent;

        circle.attr('stroke-dashoffset', resoult)
    })
}