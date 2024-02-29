"use strict"
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
const url = "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_info-trafic-tan-temps-reel/records?limit=20"
async function getTravaux(ligne) {
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
}

console.log(await getTravaux(91))