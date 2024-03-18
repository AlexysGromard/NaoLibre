"use strict"
import fetch from 'node-fetch';
import {HttpsProxyAgent} from 'https-proxy-agent';
const proxy = process.env.https_proxy
let agent = null
if (proxy != undefined) {
    console.log(`Le proxy est ${proxy}`)
    agent = new HttpsProxyAgent(proxy);
}

async function recupArretPos(pos) {
    const url = 'https://open.tan.fr/ewp/arrets.json/' + pos.lat + '/' + pos.long 
    const reponse = agent!=null ? await fetch(url,{agent : agent}) : await fetch(url)
    const json1 = await reponse.json()
    return json1 //JSON.stringify(json1,null,2) //Affiche toutes les données du json
}
let pos = {lat : '47,21661', long : '-1,556754'}
const res = await recupArretPos(pos)
console.log(res)