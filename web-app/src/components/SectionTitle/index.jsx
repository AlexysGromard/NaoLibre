import React from "react";

/**
 * SectionTitle component
 * @param {string} title - The title of the section
 * @param {string} subtitle - The subtitle of the section
 */
function SectionTitle(props){
    return (
        <div className="section-title-box">
            {/* Vérification et utilisation de props.title */}
            {props.title && <h2 className="section-title">{props.title}</h2>}
            {/* Vérification et utilisation de props.subtitle */}
            {props.subtitle && <h3 className="section-subtitle">{props.subtitle}</h3>}
        </div>
    );
}

export default SectionTitle;
