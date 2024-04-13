import React from "react";
import FooterButton from "../FooterButton";
import "./style.css";

/**
 * Footer component
 * This component is the footer of the application
 * @param {object} props.location - The location object
 */
class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    /**
     * Toggle the signaling component
     */
    rerportButtonOnClick = () => {
        document.getElementById("signaling-component").classList.toggle("active");
        document.getElementById("report-button-img").src = document.getElementById("signaling-component").classList.contains("active") ? "/assets/closerepport_icon.png" : "/assets/report_icon.png";
    }

    /**
     * Render the component
     */
    render() {
        const { location } = this.props;

        return (
            <footer>
                <div id="signaling-component">
                    <div id="signaling-component-content">
                        <div id="signaling-component-title">
                            <span id="">How busy is it ?</span>
                        </div>
                        <div id="signaling-component-buttons">
                            <div className="signaling-component-button-container">
                                <a className="signaling-component-button" href="/notice/1"><img src="/assets/notmany_icon.png" alt=""/></a>
                                <span>Not many</span>
                            </div>
                            <div className="signaling-component-button-container">
                                <a className="signaling-component-button" href="/notice/2"><img src="/assets/moderate_icon.png" alt=""/></a>
                                <span>Moderate</span>
                            </div>
                            <div className="signaling-component-button-container">
                                <a className="signaling-component-button" href="/notice/3"><img src="/assets/full_icon.png" alt=""/></a>
                                <span>Full</span>
                            </div>
                        </div>
                    </div>
                </div>
                <nav id="footer-content">
                    <FooterButton id="home-btn" location={location} nextLocation="/" imgsrc="/assets/home_icon.png" imgalt="Home Icon" text="Home"/>
                    <FooterButton id="search-btn" location={location} nextLocation="/search" imgsrc="/assets/search_icon.png" imgalt="Search Icon" text="Search"/>
                    <button id="report-button" onClick={this.rerportButtonOnClick}>
                        <img id="report-button-img" src="/assets/report_icon.png" alt="Report Icon"/>
                    </button>
                    <FooterButton id="account-btn" location={location} nextLocation="/dashboard" imgsrc="/assets/account_icon.png" imgalt="Account Icon" text="Account"/>
                    <FooterButton id="github-btn" location={location} nextLocation="https://gitlab.univ-nantes.fr/pub/but/but2/sae4.real.01_developpement_d_une_application_complexe/groupe01/eq_01_01_chevreux-arthur_leport-clovis_gromard-alexys_jouault-lancelot_martel-floran" imgsrc="/assets/github_icon.png" imgalt="GitHub Icon" text="GitHub"/>
                </nav>
            </footer>
        );
    }
}

export default Footer;