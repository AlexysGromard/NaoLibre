// Chart JS file
const ctx = document.getElementById('average-attendance-chart');

new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      datasets: [{
        data: [12, 10, 3, 2, 3, 4,35,60, 80, 70, 35, 30, 65, 50, 20, 10, 65, 85, 80],
        backgroundColor: function(context) {
            // Rendre la dernière barre verte
            return context.dataIndex === context.dataset.data.length - 1 ? '#84CF39' : '#3A6F97';
        }
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    // Set no data, not many, moderate, full
                    stepSize: 35,
                    callback: function(value, index, values) {
                        // Définir les étiquettes manuellement
                        return ['no data', 'not many', 'moderate', 'full'][index];
                    },
                    maxRotation: 90,
                    minRotation: 90 // Rotation minimale du texte à 90 degrés
                }
            }
        },
        plugins: {
            legend: {
            display: false
            }
        }
    }
});

