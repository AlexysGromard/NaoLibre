import React from "react";
import SectionTitle from "../../components/SectionTitle";
import "./style.css";
import arretDAO from "../../dao/daoArret.mjs";
import avisDao from "../../dao/daoAvis.mjs";

/**
 * Transport component
 * This component is used to display the transport information
 * @param {Object} props The properties of the component (Line, direction, stop)
 */
class Transport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line:null,
            stop:null,
            loading:false,
            attendance : 0 // null: novalue, 0: loading, 1: low, 2: medium, 3: high
        };
    }
    componentDidMount() {
        // Get the arguments
        const { argument } = this.props;
        // decodeURIComponent the argument
        const [lineAttend, direction, stop] = argument.map(decodeURIComponent);
        arretDAO.getTempsAttente(stop).then((line)=>{
            const data = line.filter((l)=>l.ligne === lineAttend && l.terminus === direction)

            if (data.length === 0){
                document.location.href = "/transport/"+stop
            }

            this.setState({line: data[0],
                            stop: stop,
                            loading:true})
            })

        avisDao.getAvisByLine(lineAttend).then((avis) => {
            this.setState({attendance : avis.moyenne()})
        })
    }

    /**
     * Add favorite
     * This function is used to add the current transport to the favorites (or remove)
     */
    renderTime() {
        if (this.state.line.temps === "proche")
            return "0"
        return this.state.line.temps.slice(0,-2)
    }
    render() {

        if(this.state.loading) {
            return (
                <section id="transport">
                    <div id="waiting-time">
                        <div id="waiting-time-header">
                            <SectionTitle title={this.state.stop}
                                          subtitle={'Ligne ' + this.state.line.ligne + ' vers ' + this.state.line.terminus}/>
                        </div>
                        <div id="waiting-time-content">
                            <div className="circle-information">
                                <span id="circle-title">{this.renderTime()}</span>
                                <span id="circle-subtitle">Minutes left</span>
                            </div>
                        </div>
                    </div>
                    <div id="attendance">
                        <SectionTitle title='Attendance of the next bus' subtitle='According to current passengers'/>
                        <div className="circle-information">
                            <img
                                id="attendance-icon"
                                src={this.state.attendance === 1 ? '/assets/notmany_icon.png' :
                                    this.state.attendance === 2 ? '/assets/moderate_icon.png' :
                                    this.state.attendance === 3 ? '/assets/report_icon.png' :
                                    this.state.attendance === 0 ? '/assets/loading_icon.png' :
                                            '/assets/closerepport_icon.png'}
                                alt="attendance icon"
                            />
                        </div>
                        <span id="attendance-value">
                                {this.state.attendance === 1 ? 'Not many' :
                                    this.state.attendance === 2 ? 'Moderate' :
                                        this.state.attendance === 3 ? 'High' :
                                            this.state.attendance === 0 ? 'Loading' :
                                                'Unknow'}
                        </span>
                        <span id="attendance-description">Attendance may vary depending on stops</span>
                    </div>
                </section>
            );
        }
    }
}

export default Transport;