import React from "react";
import SectionTitle from "../../components/SectionTitle";
import LineBox from "../../components/LineBox";

/**
 * Favorites component
 * Represents the Favorites section with the user's favorite lines
 */
function Favorites(){
    return (
        <section id="favorites">
            <SectionTitle title="Your favorites" subtitle="You can add lines to favorites"/>
            <div className="section-line-boxes">
                <LineBox
                    lineName="C1"
                    lineStop="Rond-point de Paris"
                    lineDescription="To Haluchère-Batignolles"
                    lineTextOrLink={``}
                    interactive={false}
                />
            </div>
        </section>
    )
}

export default Favorites;