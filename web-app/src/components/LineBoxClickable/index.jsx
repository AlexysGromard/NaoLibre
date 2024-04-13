import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

/**
 * LineBoxClickable component
 * This component is the clickable version of the LineBox component
 * @param {string} lineName - The name of the line
 * @param {string} lineStop - The name of the stop
 * @param {string} lineDescription - The description of the line
 * @param {string} lineLink - The link to the line
 */
class LineBoxClickable extends React.Component {
    render() {
        return (
            <Link to={this.props.lineLink} className={`line-box interactive`}>
                <div className="line-box-header">
                    <span className="line-name">{this.props.lineName}</span>
                    <div className="line-description-box">
                        <span className="line-stop">{this.props.lineStop}</span>
                        <span className="line-disruptions">{this.props.lineDescription}</span>
                    </div>
                </div>
            </Link>
        );
    }
}

export default LineBoxClickable;
