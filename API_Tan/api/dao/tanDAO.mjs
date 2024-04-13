import Pos from "../model/PositionModel.mjs";
import Ligne from "../model/LigneModel.mjs";
import Arret from "../model/ArretModel.mjs";
import Bus from "../model/BusModel.mjs";
import results from "../jsons_api/244400404_tan-arrets.json" assert { type: 'json' };


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
    // recupere le temps avant le prochain bus pour chaque ligne et sens a un arret
    GetTimeAtArret: async (codeArret) => {
        const urlmerge = 'https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-arrets/records?where=stop_name%3D\"'+codeArret+'\"&limit=20'
        const reponseMerge = agent!=null ? await fetch(urlmerge,{agent : agent}) : await fetch(urlmerge)
        const jsonMerge = await reponseMerge.json()
        if (jsonMerge.results.length != 0) {
            
            codeArret = jsonMerge.results[0].stop_id.replace(/[0-9]/g, "")
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
        }
        
        return []
        
    },
    GetLignes: async () => {
        let lignes = await Ligne.getLignes()
        return lignes
    },
    GetAllArrets: async () => {
        /// recuperer tous les arrets avec  https://data.nantesmetropole.fr/explore/dataset/244400404_tan-arrets/table/

        const listeArrets = [];
        for (const element of results) {
            
            if (!/[0-9]/.test(element.stop_id)) {
                
                const arret = new Arret(
                    element.stop_id,
                    element.stop_name,
                  );
                 
                    listeArrets.push(arret);
                  
                  
            }
            
          }
       
        return listeArrets

    },
    getCloseArret: async (pos) => {
        // ex : http://localhost:8080/tan/arret/47,21661/-1,556754
        
        if (!(pos instanceof Pos)) {
            throw new Error('Le paramêtre n\' est pas un objet position Pos')
        }

       
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
        const url = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_info-trafic-tan-temps-reel/records?limit=-1"
        let response = agent!=null ? await fetch(url, {agent: agent}):await fetch(url)
        let json = await response.json()
        
        // si on met la ligne -1 cela retourne tous les travaux
        if (ligne == -1) {
            return json
        }

        let travauxFiltres = json.results.filter((travail) => {


            if (travail.listes_arrets === null){
                return false
            }
            
            let listesArrets = JSON.parse(travail.listes_arrets);
            console.log("a",listesArrets.LISTE_ARRETS)
            if (listesArrets.LISTE_ARRETS === null){
                return false
            }else if (listesArrets.LISTE_ARRETS.length === undefined && listesArrets.LISTE_ARRETS.LIGNE === ligne){
                return true
            }else{
                let find = false
                for (let i = 0; i < listesArrets.LISTE_ARRETS.length && find === false; i++) {
                    if (listesArrets.LISTE_ARRETS[i].LIGNE === ligne) {
                        console.log("ok")
                        find = true
                    }
                }
                return find
            }

        });
        
        // Retourne les travaux filtrés
        return travauxFiltres;
    },

}
export default tanDAO
