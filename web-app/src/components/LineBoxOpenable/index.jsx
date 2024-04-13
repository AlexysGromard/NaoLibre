import React from "react";
import "./style.css";

/**
 * LineBoxOpenable component
 * This component is the openable version of the LineBox component
 * @param {string} lineName - The name of the line
 * @param {string} lineStop - The stop of the line
 * @param {string} lineDescription - The description of the line
 * @param {string} lineText - The text of the line (can be multiline)
 */
class LineBoxOpenable extends React.Component {
    constructor(props) {
        super(props);
        // Init state isOpen to false
        this.state = {
            isOpen: false
        };
        // Bind the onClick method to the current instance
        this.onClick = this.onClick.bind(this);
    }

    /**
     * Toggle the content opening state
     */
    onClick() {
        // Change the state of isOpen
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    /**
     * Render the component
     */
    render() {
        const lineText = this.props.lineText.split('\n');

        // Get the isOpen state
        const isOpen = this.state.isOpen;

        return (
            <div onClick={this.onClick} className={`line-box interactive`}>
                <div className="line-box-header">
                    <span className="line-name"><img src={"./assets/travaux-routiers.png"}/></span>
                    <div className="line-description-box">
                        <span className="line-stop">{this.props.lineStop}</span>
                        <span className="line-disruptions">{this.props.lineDescription}</span>
                    </div>
                    <img className={`down-arrow ${isOpen ? 'open' : ''}`} src="/assets/down-arrow.png" alt="Down arrow"/>
                </div>
                <div className={`content ${isOpen ? 'open' : ''}`}>
                    {lineText.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }
}

export default LineBoxOpenable;
