import React from "react";
import SectionTitle from "../../components/SectionTitle";
import userDAO from "../../dao/daoUser.mjs";
import LineBoxClickableFav from "../../components/LineBoxClickableFav";

/**
 * Favorites component
 * Represents the Favorites section with the user's favorite lines
 */
class Favorites extends React.Component{
    constructor() {
        super();
        this.state = {
            favori : []
        }

        this.renderLineBox = this.renderLineBox.bind(this)
    }
    componentDidMount() {
        if (sessionStorage.getItem("email")) {
            userDAO
                .findUser(sessionStorage.getItem("email"), sessionStorage.getItem("password"))
                .then(({ok,user})=>{
                    if (ok){
                        this.setState({favori : user.favori})
                    }else{
                        sessionStorage.clear()
                    }                    
                })
        }
    }
    renderLineBox() {

        // Display the favorite lines
        return this.state.favori.map((fav,index) => (
                <LineBoxClickableFav
                    key={index}
                    lineName="/assets/favorite_filled.png"
                    lineStop={fav}
                    lineLink={`/transport/${fav}`}
                />
        ))

    }
    render() {
        return (
            <section id="favorites">
                <SectionTitle title="Your favorites" subtitle="You can add lines to favorites"/>
                <div className="section-line-boxes">
                    {this.renderLineBox()}
                </div>
            </section>
        )
        
    }

}

export default Favorites;