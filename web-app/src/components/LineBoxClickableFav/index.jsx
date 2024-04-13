import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import userDAO from "../../dao/daoUser.mjs";

/**
 * LineBoxClickable component
 * This component is the clickable version of the LineBox component
 * @param {string} lineName - The name of the line
 * @param {string} lineStop - The name of the stop
 * @param {string} lineDescription - The description of the line
 * @param {string} lineLink - The link to the line
 */
class LineBoxClickableFav extends React.Component {
    constructor() {
        super();
        this.state = {
            isFavour:true
        }
    }
    render() {
        return (
            <Link to={this.props.lineLink} className={`line-box-fav interactive`}>

                    <span className="line-name-fav">
                        {this.props.lineStop}</span>
                    <div className="line-description-box">
                        <span className="line-stop"></span>
                        <img
                             src={this.props.lineName}
                             alt="favorite icon"/>
                    </div>
            </Link>
        );
    }
}

export default LineBoxClickableFav;
