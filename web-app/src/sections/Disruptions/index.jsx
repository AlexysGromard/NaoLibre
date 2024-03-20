import React from "react";
import SectionTitle from "../../components/SectionTitle";
import LineBox from "../../components/LineBox";

/**
 * Disruptions component
 * Represents the Disruptions section with the latest disruptions in the public transport network
 */
function Disruptions(){
    return (
        <section id="disruptions">
            <SectionTitle title="Disruptions" subtitle="Check out the latest disruptions in the public transport network"/>
            <div className="section-line-boxes">
                <LineBox 
                    lineName="C1" 
                    lineStop="Carnaval de Nantes" 
                    lineDescription="From 03/03/24 at 7am to 9pm" 
                    lineTextOrLink={`Work at the Galarne stop, lines 5 and 26 diverted in this sector in both directions
                    Where to take your bus 
                    Lines 5 and 26 
                    - Galarne stops postponed to temporary stops placed on bd Alexandre Millerand 
                    - Pompidou and Hôtel de Région stops postponed to temporary stops placed on bd Général de Bollardière`}
                    interactive={true}
                />
                <LineBox 
                    lineName="C2" 
                    lineStop="Carnaval de Nantes" 
                    lineDescription="From 03/03/24 at 7am to 9pm" 
                    lineTextOrLink={`Work at the Galarne stop, lines 5 and 26 diverted in this sector in both directions
                    Where to take your bus 
                    Lines 5 and 26 
                    - Galarne stops postponed to temporary stops placed on bd Alexandre Millerand 
                    - Pompidou and Hôtel de Région stops postponed to temporary stops placed on bd Général de Bollardière`}
                    interactive={true}
                />
                <LineBox 
                    lineName="C3" 
                    lineStop="Carnaval de Nantes" 
                    lineDescription="From 03/03/24 at 7am to 9pm" 
                    lineTextOrLink={`Work at the Galarne stop, lines 5 and 26 diverted in this sector in both directions
                    Where to take your bus 
                    Lines 5 and 26 
                    - Galarne stops postponed to temporary stops placed on bd Alexandre Millerand 
                    - Pompidou and Hôtel de Région stops postponed to temporary stops placed on bd Général de Bollardière`}
                    interactive={true}
                />
            </div>
        </section>
    );
}

export default Disruptions;