import React, { useEffect, useRef } from "react";
import SectionTitle from "../../components/SectionTitle";
import Chart from 'chart.js/auto'; // Importer la bibliothèque Chart.js

/**
 * AverageAttendance component
 * Represents the Average Attendance section with the average attendance of the public transport network in a chart.
 */
function AverageAttendance(){
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = document.getElementById('average-attendance-chart');

        if (ctx) {
            if (chartRef.current !== null) {
                chartRef.current.destroy(); // Destroy the previous chart if it exists
            }

            chartRef.current = new Chart(ctx, {
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
                                stepSize: 35,
                                callback: function(value, index, values) {
                                    // Définir les étiquettes manuellement
                                    return ['no data', 'not many', 'moderate', 'full'][index];
                                },
                                maxRotation: 90,
                                minRotation: 90
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
        }

        return () => {
            if (chartRef.current !== null) {
                chartRef.current.destroy(); // Clear the chart when the component is unmounted
            }
        };
    }, []) // Run only once when the component is mounted

    return (
        <section id="average-attendance">
            <SectionTitle title="Average attendance" subtitle="Since 24 hours and on all lines"/>
            <canvas id="average-attendance-chart"></canvas>
        </section>
    );
}

export default AverageAttendance;
