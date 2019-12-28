// This script uses Chart.js
// See https://www.chartjs.org/docs/latest/

var ctx = document.getElementById('myChart').getContext('2d');
// Bar graph
/* var myChart = new Chart(ctx, {
 * 	type: 'bar',
 * 	data: {
 * 		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
 * 		datasets: [{
 * 			label: '# of Votes',
 * 			data: [12, 19, 3, 5, 2, 3],
 * 			backgroundColor: [
 * 				'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
 * 				'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
 * 			],
 * 			borderColor: [
 * 				'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
 * 				'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
 * 			],
 * 			borderWidth: 1
 * 		}]
 * 	},
 * 	options: {scales: {yAxes: [{ticks: {beginAtZero: true}}]}}
 * }); */

var gBalanceOverTimeChart = new Chart(ctx, {
	type: 'line',
	data: {datasets: [{label: 'Balance over time', data: gBalanceOverTime, backgroundColor: 'rgba(200, 30, 30, 0.2)'}]},
	options: {scales: {xAxes: [{type: 'time'}]}}
});

function updateVisualizations()
{
	gBalanceOverTimeChart.data.datasets[0].data = gBalanceOverTime;
	gBalanceOverTimeChart.update();
}
