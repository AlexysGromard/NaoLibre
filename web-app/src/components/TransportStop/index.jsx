import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

/**
 * @name TransportStop
 * @description This component is a clickable box that shows the name of the stop
 * @param {string} stopName The name of the stop
 * @param {string} stopDescription The description of the stop
 * @param {string} stopLink The link to the stop
 */
class TransportStop extends React.Component {
    render() {
        return (
            <Link to={this.props.stopLink} className={`stop-box interactive`}>
                <div className="stop-box-header">
                    <span className="stop-icon"><img src="./assets/stop_icon.png" alt="Stop icon" /></span>
                    <div className="stop-description-box">
                        <span className="stop-stop">{this.props.stopName}</span>
                        <span className="stop-disruptions">{this.props.stopDescription}</span>
                    </div>
                </div>
            </Link>
        );
    }
}

export default TransportStop;