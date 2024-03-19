import {mongoose} from 'mongoose';
import Pos from "../model/PositionModel.mjs";
import Ligne from "../model/LigneModel.mjs";
import Arret from "../model/ArretModel.mjs";
import Bus from "../model/BusModel.mjs";
const schema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true}
})
const MongoUser = new mongoose.model('userCollection',schema)

import fetch from 'node-fetch';
import {HttpsProxyAgent} from 'https-proxy-agent';
const proxy = process.env.https_proxy
let agent = null
if (proxy != undefined) {
    console.log(`Le proxy est ${proxy}`)
    agent =  new HttpsProxyAgent(proxy);
}
else {
    //pour pouvoir consulter un site avec un certificat invalide
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.log("Pas de proxy trouvé")
}


const tanDAO = {
    //Renvoie un tableau d'utilisateurs
    findAll :async ()=> {
        const data = await MongoUser.find({})
        return data.map((user)=>new User(user))},
    //supprime tous les utilisateurs
    removeAll : async () => {
        await MongoUser.deleteMany()
    },
    //Renvoie un utilisateur connu par son login ou null
    findByLogin: async (login)=> {
        //TODO
    },
    //Ajout un utilisateur si il est valide et n'existe pas
    //sinon "User already exists" ou "Not a valid user"
    add: async (user)=> {
        //TODO
    },
    //supprime un utilisateur connu par son login
    //renvoie true si la suppression fonction false sinon
    removeByLogin: async (login) => {
        //TODO
    },
    // recupere le temps avant le prochain bus pour chaque ligne et sens a un arret
    GetTimeAtArret: async (codeArret) => {

        const url = 'https://open.tan.fr/ewp/tempsattente.json/' + codeArret
        const reponse = agent!=null ? await fetch(url,{agent : agent}) : await fetch(url)
        const json1 = await reponse.json()

        const listeBus = [];
        for (const element of json1) {
            const bus = new Bus(
              element.ligne.numLigne,
              element.terminus,
              element.temps,
              element.sens,
              element.arret.codeArret,
            );
            listeBus.push(bus);
          }
        return listeBus
    },
    GetLignes: async () => {
        const lignes = await new Ligne()
        return await lignes.getLignes()
    },
    getCloseArret: async (pos) => {

        if (!(pos instanceof Pos)) {
            throw new Error('Le paramêtre n\' est pas un objet position Pos')
        }

        console.log( pos.latitude)
        const url = 'https://open.tan.fr/ewp/arrets.json/' + pos.latitude + '/' + pos.longitude
        const reponse = agent!=null ? await fetch(url,{agent : agent}) : await fetch(url)
        const json1 = await reponse.json()
    
        const listeArrets = [];
        for (const element of json1) {
            const arret = new Arret(
              element.codelieu,
              element.libelle,
              element.distance,
              element.ligne,
            );
            listeArrets.push(arret);
          }
        return listeArrets
    },
    //recupere les travaux pour une ligne
    //renvoie une liste de travaux
    getTravaux: async (ligne) => {
        if (!(ligne.isInteger())) {
            throw new Error('La ligne doit être un Int')
        }
        const url = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_info-trafic-tan-temps-reel/records?limit=-1"
        let response = agent!=null ? await fetch(url, {agent: agent}):await fetch(url)
        let json = await response.json()
     
        let travauxFiltres = json.results.filter((travail) => {
            let listesArrets = JSON.parse(travail.listes_arrets);
            
            if (listesArrets.LISTE_ARRETS.length==undefined) {
                if (listesArrets.LISTE_ARRETS.LIGNE == ligne) {
                    return travail
                }
            }
            else {
                for (let i = 0; i < listesArrets.LISTE_ARRETS.length; i++) {
                    if (listesArrets.LISTE_ARRETS[i].LIGNE == ligne) {
                        return travail
                    }
                }
            }
        });
        
        // Retourne les travaux filtrés
        return travauxFiltres;
    },
    //modifie un utilisateur
    //renvoie l'utilisateur modifié ou null
    update:async(user) => {
        //TODO
    }
}
export default tanDAO
