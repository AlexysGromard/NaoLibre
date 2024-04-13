import React from "react";

import SectionTitle from "../../components/SectionTitle";
import LineBoxOpenable from "../../components/LineBoxOpenable";
import travauxDAO from "../../dao/daoTravaux.mjs";
import "./style.css";


/**
 * Disruptions component
 * Represents the Disruptions section with the latest disruptions in the public transport network
 */
class Disruptions extends React.Component{
    constructor() {
        super();
        this.state = {
            listProb: [], // List of disruptions
            showAll: false // Show all disruptions
        }
    }

    componentDidMount() {

        //charge tout les traveaux actuel
        travauxDAO.getTravaux().then((data) => {

            if (!data.results){
                this.setState({
                    listProb: [],
                    moreResults: false// Update based on fetched results
                });
            }else{
                this.setState({
                    listProb: data.results,
                    moreResults: data.results.length > 3 // Update based on fetched results
                });
            }
            
        });
    }

    toggleShowAll = () => {
        this.setState(prevState => ({ showAll: !prevState.showAll }));
    }

    //génère les composent de Traveau
    renderLineBoxOpenable() {
        const { listProb, showAll } = this.state;
        let displayList = showAll ? listProb : listProb.slice(0, 3);

        return (
            displayList.map((prob,index)=>{
                return(
                    <LineBoxOpenable
                        key={index}
                        lineStop={prob.intitule}
                        lineDescription={"From " + prob.date_debut + " at " + prob.heure_debut + " to " + prob.date_fin + " at " +prob.heure_fin}
                        lineText={prob.resume}
                        lineLine={prob.listes_arrets}
                    />
                )
            })
        )
    }

    render() {
        const { listProb, moreResults, showAll } = this.state;
        
        return (
            <section id="disruptions">
                <SectionTitle title="Disruptions" subtitle="Check out the latest disruptions in the public transport network"/>
                <div className="section-line-boxes">
                    {listProb.length === 0 ? (
                        <p>No disruptions to display</p>
                    ) : (
                        <>
                            {this.renderLineBoxOpenable()}
                            {moreResults && (
                                <button id="showall-btn" onClick={this.toggleShowAll}>
                                    {showAll ? "Close" : "Show all"}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </section>
        )
    }
}

export default Disruptions;
