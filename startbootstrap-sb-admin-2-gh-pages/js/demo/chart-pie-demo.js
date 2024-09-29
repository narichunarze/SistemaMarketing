// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Plugin para mostrar el texto en el centro del gráfico
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.type === 'doughnut' || chart.config.type === 'pie') {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            // Calcula el porcentaje
            var totalValue = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
            var value = chart.config.data.datasets[0].data[0];
            var percentage = ((value / totalValue) * 100).toFixed(1) + "%";

            var textX = Math.round((width - ctx.measureText(percentage).width) / 2);
            var textY = height / 2;

            ctx.fillText(percentage, textX, textY);
            ctx.save();
        }
    }
});

// Configuración del gráfico de pastel
var ctx = document.getElementById("myPieChart");
var totalSolicitudes = 50; // El total de solicitudes que corresponde al 100%
var solicitudesRealizadas = 30; // Cambia este valor según tus datos reales

var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Solicitudes"],
        datasets: [{
            data: [solicitudesRealizadas, totalSolicitudes - solicitudesRealizadas],
            backgroundColor: ['#e74a3b', '#e9ecef'], // Color principal y color gris para el restante
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
        },
        legend: {
            display: false
        },
        cutoutPercentage: 80,
    },
});
