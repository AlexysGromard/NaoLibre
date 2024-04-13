import React, { useEffect, useRef } from "react";
import avisDao from "../../dao/daoAvis.mjs";
import ModelAvis from "../../model/ModelAvis";
import Chart from 'chart.js/auto'; // Import Chart.js library
//import { Bar } from 'react-chartjs-2';
import "./style.css";

/**
 * AverageAttendance component
 * Represents the Average Attendance section with the average attendance of the public transport network in a chart.
 */
class Graphique extends React.Component{

    
    constructor(props) {
        super(props);

        this.char = null
    }

    componentDidMount(){
        //graph
        const ctx = document.getElementById('average-attendance-chart');
        
        this.updateChart(ctx,Array(24).fill(0)) // valeur inisiale
        
        ///charge tout les avis
        avisDao.getAllAvis().then((lignes) =>{
            //calcule la moyenne des avis pour chaque heurs d'aujourd'hui
            const values = ModelAvis.moyenneOftheHouresofManyList(new Date(),lignes)

            this.updateChart(ctx,values)            
        } )

        
        
    }


    //mette a jours le Graphique
    updateChart(ctx,data){
        // si il y a déjà un char on le suprime pour en même un nouveau plus tard
        if (this.char !== null){
            this.char.destroy()
        }

        //création du graphique
        this.char = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h'],
                datasets: [{
                    data: data,//24 valeurs
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
                        max: 3,
                        ticks: {
                            stepSize: 1,
                            callback: function(value, index, values) {
                                // Définir les étiquettes manuellement
                                return [' ', 'not many', 'moderate', 'full'][index];
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


    render() {
        return (
            <canvas id="average-attendance-chart"></canvas>
        );
    }
}

export default Graphique;
