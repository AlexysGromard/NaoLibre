import React, { useEffect, useRef } from "react";
import SectionTitle from "../../components/SectionTitle";
import avisDao from "../../dao/daoAvis.mjs";
import ModelAvis from "../../model/ModelAvis";
import Graphique from "./Graphique";
import Chart from 'chart.js/auto'; // Import Chart.js library
import "./style.css";

/**
 * AverageAttendance component
 * Represents the Average Attendance section with the average attendance of the public transport network in a chart.
 */
class AverageAttendance extends React.Component{

    render() {
        return (
            <section id="average-attendance">
                <SectionTitle title="Average attendance" subtitle="Since 24 hours and on all lines"/>
                <Graphique/>
            </section>
        );
    }
}

export default AverageAttendance;
