"use strict"
import fetch from 'node-fetch';
import {HttpsProxyAgent} from 'https-proxy-agent';

export default class Ligne{

    /**
     * Crée l'instance si elle n'existe pas
     * @returns {Ligne}
     */
    constructor() {
        if (!Ligne.instance){
            this.init()
            Ligne.instance = this
        }
        return Ligne.instance
    }

    /**
     * Initialise l'instance de la classe
     * @returns {Promise<void>}
     */
    async init() {
        const json = await this.#requestLigne()
        this.lignes = []
        json.results.forEach((element) => this.lignes.push(element.route_short_name))
        this.dateMiseAJour = new Date()
        this.dateMiseAJour.setDate(this.dateMiseAJour.getDate() + 1)
    }

    /**
     * Renvoie le nom de toutes les lignes sous forme d'un tableau
     * @returns {Promise<[]>}
     */
    async getLignes() {
        if (new Date() < this.dateMiseAJour) { //Vérfie si la date de mise à jour est atteinte
            await this.init()
        }
        
        return this.lignes
    }

    /**
     * Récupère toutes les lignes de l'api
     * @returns {Promise<unknown>}
     */
    async #requestLigne()  {
        const proxy = process.env.https_proxy
        let agent = null
        if (proxy != undefined) {
            agent = new HttpsProxyAgent(proxy);
        } else {
            //pour pouvoir consulter un site avec un certificat invalide
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        const urlBase1 = "https://data.nantesmetropole.fr//api/explore/v2.1/catalog/datasets/244400404_tan-circuits/records?select=route_short_name&limit=-1"

        let response = agent != null ? await fetch(urlBase1, {agent: agent}) : await fetch(urlBase1)
        let json = await response.json()
        return json
    }
}

