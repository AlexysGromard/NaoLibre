"use strict"
import fetch from 'node-fetch';
import {HttpsProxyAgent} from 'https-proxy-agent';

async function requestLigne()  {
    const proxy = process.env.https_proxy
    let agent = null
    if (proxy != undefined) {
        console.log(`Le proxy est ${proxy}`)
        agent = new HttpsProxyAgent(proxy);
    } else {
        //pour pouvoir consulter un site avec un certificat invalide
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        console.log("Pas de proxy trouvé")
    }
    const urlBase1 = "https://data.nantesmetropole.fr//api/explore/v2.1/catalog/datasets/244400404_tan-circuits/records?select=route_short_name&limit=-1"

    let response = agent != null ? await fetch(urlBase1, {agent: agent}) : await fetch(urlBase1)
    let json = await response.json()
    return json
}

class Ligne{

    constructor(json) {
        this.lignes = []
            // A resoudre json.results.forEach((element)=> this.lignes.append(element.route_short_name))
        this.dateMiseAJour = Date.now() + 1
    }
    async getLignes() {
        if (Date.now() > this.dateMiseAJour) {
            this.lignes = []
            this.lignes = await requestLigne().results.forEach((element)=> this.lignes.add(element.route_short_name))
        }
        return this.lignes
    }
}

async function createLines() {
    const ligne = new Ligne(await requestLigne())
    console.log(ligne.getLignes())
}
createLines()
//https://www.google.fr/maps/dir/Moutonnerie,+44000+Nantes/47.21869109,+-1.53771487/47.21780375,+-1.54267391/@47.2191656,-1.5389669,16.64z/data=!4m16!4m15!1m5!1m1!1s0x4805eec3eb9afe2f:0x53dbad2e4a3f9a0!2m2!1d-1.5331562!2d47.2196211!1m3!2m2!1d-1.5377149!2d47.2186911!1m3!2m2!1d-1.5426739!2d47.2178038!3e2?entry=ttu
//https://www.google.fr/maps/dir/47.25316939,+-1.5301602/47.25316939,+-1.5301602/47.24892458,+-1.52244622/47.24892458,+-1.52244622/47.24892458,+-1.52244622/47.24892458,+-1.52244622/47.24340102,+-1.51794774/47.24340102,+-1.51794774/47.24340102,+-1.51794774/47.24340102,+-1.51794774/47.23815293,+-1.51598259/47.23815293,+-1.51598259/47.23815293,+-1.51598259/47.2321111,+-1.51620851/47.2321111,+-1.51620851/47.22680291,+-1.51873485/47.22680291,+-1.51873485/47.22423423,+-1.52013619/47.22423423,+-1.52013619/47.22423423,+-1.52013619/47.22101603,+-1.52479552/47.22101603,+-1.52479552/47.22101603,+-1.52479552/47.22101603,+-1.52479552/47.21955608,+-1.53341505/47.21955608,+-1.53341505/47.21955608,+-1.53341505/47.21869109,+-1.53771487/47.21869109,+-1.53771487/47.21780375,+-1.54267391/47.21780375,+-1.54267391/47.21620187,+-1.54744873/47.21620187,+-1.54744873/47.21620187,+-1.54744873/47.21449215,+-1.55274419/47.21449215,+-1.55274419/47.21449215,+-1.55274419/47.21449215,+-1.55274419/47.21337472,+-1.55649624/47.21337472,+-1.55649624/47.21337472,+-1.55649624/47.21337472,+-1.55649624/47.2110535,+-1.5612179/47.2110535,+-1.5612179/47.2110535,+-1.5612179/47.2110535,+-1.5612179/47.20884925,+-1.5677981/47.20884925,+-1.5677981/47.20884925,+-1.5677981/47.2070398,+-1.57334929/47.2070398,+-1.57334929/47.2070398,+-1.57334929/47.20764712,+-1.58198473/47.20764712,+-1.58198473/47.20764712,+-1.58198473/47.20939483,+-1.58885365/47.20939483,+-1.58885365/47.20939483,+-1.58885365/47.20961029,+-1.59574262/47.20961029,+-1.59574262/47.20961029,+-1.59574262/47.20961029,+-1.59574262/47.20674389,+-1.60055442/47.20674389,+-1.60055442/47.20674389,+-1.60055442/47.20487459,+-1.60517484/47.20487459,+-1.60517484/47.20678303,+-1.60994139/47.20678303,+-1.60994139/47.20889862,+-1.61128702/47.20889862,+-1.61128702/47.20889862,+-1.61128702/47.21186391,+-1.60886215/47.21186391,+-1.60886215/47.21186391,+-1.60886215/47.21476597,+-1.60828303/47.21476597,+-1.60828303/47.21476597,+-1.60828303/47.21772527,+-1.61392135/47.21772527,+-1.61392135/47.21772527,+-1.61392135/47.2191117,+-1.62076603/47.2191117,+-1.62076603/47.22065473,+-1.62828372/47.22065473,+-1.62828372/47.22148411,+-1.6329725/47.22148411,+-1.6329725/@47.22210178,+-1.63857119/data=!4m16!4m15!1m5!1m1!1s0x4805eec3eb9afe2f:0x53dbad2e4a3f9a0!2m2!1d-1.5331562!2d47.2196211!1m3!2m2!1d-1.5377149!2d47.2186911!1m3!2m2!1d-1.5426739!2d47.2178038!3e2?entry=ttu

//https://www.google.fr/maps/dir/47.22203468,+-1.63790515/47.22141243,+-1.63243835/47.22141243,+-1.63243835/47.22040335,+-1.62773627/47.22040335,+-1.62773627/47.21895013,+-1.62022527/47.21895013,+-1.62022527/47.21756366,+-1.61338063/47.21756366,+-1.61338063/47.21756366,+-1.61338063/47.21442014,+-1.60786096/47.21442014,+-1.60786096/47.21442014,+-1.60786096/47.21149099,+-1.6092312/47.21149099,+-1.6092312/47.21149099,+-1.6092312/47.20852569,+-1.61165603/47.20852569,+-1.61165603/47.20852569,+-1.61165603/47.20661689,+-1.60953263/47.20661689,+-1.60953263/47.20470843,+-1.6047661/47.20470843,+-1.6047661/47.20712579,+-1.59992166/47.20712579,+-1.59992166/47.20712579,+-1.59992166/47.20962828,+-1.59521524/47.20962828,+-1.59521524/47.20962828,+-1.59521524/47.20962828,+-1.59521524/47.20922862,+-1.58844494/47.20922862,+-1.58844494/47.20922862,+-1.58844494/47.20748089,+-1.58157605/47.20748089,+-1.58157605/47.20748089,+-1.58157605/47.20705322,+-1.57295377/@47.20705322,+-1.57295377/data=!4m16!4m15!1m5!1m1!1s0x4805eec3eb9afe2f:0x53dbad2e4a3f9a0!2m2!1d-1.5331562!2d47.2196211!1m3!2m2!1d-1.5377149!2d47.2186911!1m3!2m2!1d-1.5426739!2d47.2178038!3e2?entry=ttu
