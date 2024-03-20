import React from "react";

/**
 * LineBox component
 * @param {string} lineName - The name of the line
 * @param {string} lineStop - The stop of the line
 * @param {string} lineDescription - The description of the line
 * @param {string} lineTextOrLink - The text or link of the line (can be multiline)
 * @param {boolean} interactive - If the box is interactive or not
 */
class LineBox extends React.Component {
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
        const isInteractive = this.props.interactive === true;
        const lineTextOrLink = isInteractive ? this.props.lineTextOrLink.split('\n') : this.props.lineTextOrLink;

        // Get the isOpen state
        const isOpen = this.state.isOpen;

        return (
            <div className={`line-box ${isInteractive ? 'interactive' : ''}`}>
                <div className="line-box-header">
                    <span className="line-name">{this.props.lineName}</span>
                    <div className="line-description-box">
                        {isInteractive && <span className="line-stop">{this.props.lineStop}</span> }
                        {!isInteractive && <a href={lineTextOrLink} className="line-stop">{this.props.lineStop}</a> }
                        <span className="line-disruptions">{this.props.lineDescription}</span>
                    </div>
                    {isInteractive && <img className={`down-arrow ${isOpen ? 'open' : ''}`} src="./assets/down-arrow.png" alt="Down arrow" onClick={this.onClick}/>}
                </div>
                {isInteractive && (
                    <div className={`content ${isOpen ? 'open' : ''}`}>
                        {lineTextOrLink.map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default LineBox;
