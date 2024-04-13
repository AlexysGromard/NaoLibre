import React, { useState } from "react";
import "./style.css";
import {ReactSearchAutocomplete} from "react-search-autocomplete";

/**
 * SearchBar component
 * This component is the search bar of the website
 */
class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            suggestions:[]
        }
    }

    handleOnSearch = (string, results) => {
        //console.log(string, results);
    };

    handleOnHover = (result) => {
        //console.log(result);
    };

    

    handleOnFocus = () => {
        //console.log("Focused");
    };

    handleOnClear = () => {
        //console.log("Cleared");
    };

    render() {
        return (
            <div id="searchbar-content">
                <ReactSearchAutocomplete
                    id="search-input"
                    items={this.props.elements}
                    maxResults={5}
                    fuseOptions={{keys : ["nom"]}}
                    resultStringKeyName="nom"
                    onSearch={this.handleOnSearch}
                    onHover={this.handleOnHover}
                    onSelect={this.props.onItemClick}
                    onFocus={this.handleOnFocus}
                    onClear={this.handleOnClear}
                    placeholder={this.props.placeholder}//"Bus stop"
                    showIcon={true}
                    styling={{backgroundColor: "var(--white)", borderRadius: "10px"}}
                    className="search-bar"
                />
            </div>
            );
    }
}

export default SearchBar;
