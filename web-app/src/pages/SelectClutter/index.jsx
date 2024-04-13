import React from "react";
import ligneDAO from "../../dao/daoLigne.mjs";
import userDAO from "../../dao/daoUser.mjs";
import avisDao from "../../dao/daoAvis.mjs";
import SearchBar from "../../components/SearchBar";
import SectionTitle from "../../components/SectionTitle";

import "./style.css"

class SelectClutter extends React.Component {


    constructor(props){
        super(props)

        const { argument } = this.props;
        // decodeURIComponent the argument
        const clutter = decodeURIComponent(argument);

        //vérification clutter
        if (!["1","2","3"].includes(clutter)){
            window.location.href = "/"
        }

        this.clutter = parseInt(clutter)

        this.state = { lignes : [], showButton : false, message : null}
        this.ligneSelected = null 

        this.onItemClick = this.onItemClick.bind(this)
        this.onButtonClick = this.onButtonClick.bind(this)

    }

    componentDidMount(){

        //charge les lignes
        ligneDAO.getLignes().then( (newlignes) => {

            const mapLignes = newlignes.map((ligne,index) => {
                return { id: index, nom: ligne };
            });
            this.setState({lignes : mapLignes})

        })
    }

    //quand une lignes est choisie on afficher le bouton "send"
    onItemClick(item){
        this.ligneSelected = item.nom
        this.setState({showButton : true})
    }

    //envois l'avis à l'api user
    async onButtonClick(){
        const ligne = this.ligneSelected
        if (ligne != null){
            const value = this.clutter;
            const email = sessionStorage.getItem("email");
            const password = sessionStorage.getItem("password");

            //vérifie la connection
            if (!email){
                window.location.href = "/login"
                return;
            }

            const {ok} = await userDAO.findUser(email,password)

            //Si user non trouver
            if (!ok){
                //déconnecter
                sessionStorage.clear()
                document.location.href = "/login"
                return;
            }

            //ajoute l'avis
            const res = await avisDao.addAvis(ligne, email, password, value);
            if (res.ok){
                console.log("ici")
                document.location.href = "/"
            }else{
                this.setState({message : res.message})
            }
        }
        
    }

    render(){

        let divbutton = null
        if (this.state.showButton){

            let clutterText
            switch(this.clutter) {
                case 1:
                    clutterText = "not many"
                    break;
                  case 2:
                    clutterText = "moderate"
                    break;
                case 3:
                    clutterText = "full"
                    break;
                default:
                    clutterText = ""
                  
              }
            
            let ligneText = this.ligneSelected

            divbutton = <div className="send-box">
                            <span className="section-title">do you mean the clutter of {ligneText} is "{clutterText}" </span>
                            <button className='button fill' onClick={this.onButtonClick}>send</button> 
                        </div>
        }

        let infospan = this.state.message === null ? null : <span className="erreur-text">{this.state.message}</span>   


        return(
            <div className="voting-page">
                <SectionTitle title="Note" subtitle="which line do you want to note ?"/>

                <SearchBar placeholder="Line" elements={this.state.lignes} onItemClick={this.onItemClick}/>
                {infospan}

                {divbutton}
            </div>
        )
    }

}

export default SelectClutter