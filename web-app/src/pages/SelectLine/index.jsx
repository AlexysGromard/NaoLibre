import React from "react";
import SectionTitle from "../../components/SectionTitle";
import LineBoxClickable from "../../components/LineBoxClickable";
import arretDAO from "../../dao/daoArret.mjs";
import userDAO from "../../dao/daoUser.mjs";

import "./style.css";

class SelectLine extends React.Component {
    constructor(props) {
        super(props);


        const { argument } = this.props;

        // decodeURIComponent the argument
        const stop = decodeURIComponent(argument);

        this.state = {
            isFavorite:false,
            listLine: [],
            stop:stop,
            exist:null
        }
    }

    componentDidMount() {

        //vérifier si l'arrêt existe
        arretDAO.getTempsAttente(this.state.stop).then((data) => {
            if (!data.message) {
                this.setState({listLine: data, exist: true})

            }
            else{
                this.setState({exist: false})
                return;
            }

            //regarde si l'utilisateur l'a en favorie
            const email = sessionStorage.getItem("email")
            const password = sessionStorage.getItem("password")
            if (email) {
                userDAO.findUser(email, password).then(({user}) => {
                    let f = user.favori.filter((l) => l === this.state.stop).length
                    this.setState({
                        isFavorite: f > 0,
                    })
                })
            }
        })
    }

    //ajouter le stop en favoris ou le retire si il l'est
    addFavorite = async () => {

        //vérifie que le user est connecter
        const email = sessionStorage.getItem("email")
        const password = sessionStorage.getItem("password")
        if (!email || !password) {
            sessionStorage.clear()
            window.location.href = "/login"
        }

        //vérifie si le user existe toujours
        const { ok ,user} = await userDAO.findUser(email, password)
        if (!ok){
            sessionStorage.clear()
            window.location.href = "/login"
        }

        //get le favorie
        let favor = false
        user.favori.forEach((fav)=>{if(fav === this.state.stop){favor = true}})

        // si trouver
        if (favor){
            userDAO.delFavorie(email,password, this.state.stop)
                .then((r) =>{
                    this.setState({
                        isFavorite: !this.state.isFavorite,
                    })
                })
        }
        else {
            userDAO.addFavorie(email, password,this.state.stop)
                .then((r) =>
                    this.setState({
                        isFavorite: !this.state.isFavorite,
                    })
                )
        }
    }


    //génere les bouton pour selection la lignes et le terminus
    renderLineBox(stop) {
        return this.state.listLine.map((line,index) => (
                <LineBoxClickable
                    key={index}
                    lineName={line.ligne}
                    lineStop={stop}
                    lineDescription={"To "+line.terminus}
                    lineLink={`/transport/${line.ligne}/${line.terminus}/${stop}`}
                />
            )
        )
    }




    render() {
            let divfav = <div className="section-line-boxes" id="favorites"> {this.renderLineBox(this.state.stop)} </div>
            let subtext
            if (this.state.exist === true){
                subtext = "What line are you waiting for?"
            }
            else if (this.state.exist === false) {
                subtext = "This stop doesn't exist"
            }
            else {
                subtext = "This stop loading"
            }

            
            return(
                <div>
                    <div className = "top-select-line">
                        <SectionTitle title={this.state.stop} subtitle={subtext}/>
                        <img className ="star" onClick={this.addFavorite}
                            src={!this.state.isFavorite ? '/assets/favorite_icon.png' : '/assets/favorite_filled.png'}
                            alt="favorite icon"/>
                    </div>
                    {divfav}
                </div>
            )
            
    }
}

export default SelectLine;
