import React from "react";

function Footer(){
    return (
        <footer>
            <div id="footer-content">
                <a href="#" className="icon active">
                    <img src="./assets/home_icon.png" alt="Home Icon"/>
                    <span>Home</span>
                </a>
                <a href="#" className="icon">
                    <img id="search-icon" src="./assets/search_icon.png" alt="Search Icon"/>
                    <span>Search</span>
                </a>
                <button id="report-button">
                    <img src="./assets/report_icon.png" alt="Report Icon"/>
                </button>
                <a href="#" className="icon">
                    <img src="./assets/account_icon.png" alt="Account Icon"/>
                    <span>Account</span>
                </a>
                <a href="https://gitlab.univ-nantes.fr/pub/but/but2/sae4.real.01_developpement_d_une_application_complexe/groupe01/eq_01_01_chevreux-arthur_leport-clovis_gromard-alexys_jouault-lancelot_martel-floran" className="icon" target="_blank">
                    <img src="./assets/github_icon.png" alt="GitHub Icon"/>
                    <span>Github</span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;