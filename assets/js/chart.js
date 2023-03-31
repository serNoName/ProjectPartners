$(document).ready( setCharts() )

function setCharts(chart) {
    if (typeof chart === 'undefined') chart =  $('.chart');

    chart.each(function() {
        const percent = $(this).find('.chart__svg').attr('data-percent');
        const circle = $(this).find('[stroke-dashoffset]');
        const totalDasharray = $(this).find('[stroke-dasharray]').attr('stroke-dasharray');

        if (percent > 100) percent = 100;

        // Calculate the required value of the 'stroke-dashoffset' attribute using the percentage value of the chart and the total stroke length
        const resoult = (totalDasharray / 100) * percent;

        circle.attr('stroke-dashoffset', resoult)
    })
}