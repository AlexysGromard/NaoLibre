import React from "react";
import "./style.css";

/**
 * Header component
 * This component is the header of the website
 */
function Header(){
    return (
        <header>
            <div id="header-content">
                <div id="title-section">
                    <h1 id="website-title">NaoLibre</h1>
                    <img id="website-logo" src="/assets/header_logo.png" alt="NaoLibre logo"/>
                </div>
            </div>
        </header>
    );
}

export default Header;