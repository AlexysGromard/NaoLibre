import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer button component
 * This component is a button in the footer
 * @param {object} props.location - The location object
 * @param {string} props.nextLocation - The next location
 * @param {string} props.imgsrc - The image source
 * @param {string} props.imgalt - The image alt
 * @param {string} props.text - The text
 */
class FooterButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        // Get arguments from props
        const { id, location, nextLocation ,imgsrc,imgalt, text} = this.props;

        return (
            <Link id={id} to={nextLocation} className={location.pathname === nextLocation ? "icon active" : "icon"}>
                <img src={imgsrc} alt={imgalt} {...text === "Search" ? {id: "search-icon"} : {}}/>
                <span>{text}</span>
            </Link>
        )
    }
}

export default FooterButton;