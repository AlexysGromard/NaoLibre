import {baseURLTan} from "./constantes.js";

/**
 * @module arretDAO
 * This module provides a function to get a bus stop
 */
const arretDAO = {
    /**
     * Get the bus stop at the given latitude and longitude
     * @param {number} lat - The latitude of the bus stop
     * @param {number} long - The longitude of the bus stop
     * @returns {Promise} - The promise to get the bus stop
     */
    getRoutePos : async(lat,long) => {
        try {
            const suffix = `/arret/${lat}/${long}`
            const res = await fetch(baseURLTan+suffix)
            return await res.json()
        } catch (e) {
            //console.error(e)
            return []
        }
    },

    /**
     * Get the waiting time at the given bus stop
     * @param {number} codeArret - The code of the bus stop
     * @returns {Promise} - The promise to get the waiting time
     * @throws {Error} - The error when the request fails
     */
    getTempsAttente : async(codeArret) => {
        try {
            const suffix = `/tempsattente/${codeArret}`
            const res = await fetch(baseURLTan+suffix)
            return await res.json()
        } catch (e) {
            //console.error(e)
            return []
        }
    },

    /**
     * Get all the bus stops
     * @returns {Promise} - The promise to get all the bus stops
     * @throws {Error} - The error when the request fails
     */
    getArret : async() => {
        try {
            const suffix = `/arrets`
            const res = await fetch(baseURLTan+suffix)
            return await res.json()
        } catch (e) {
            //console.error(e)
            return []
        }
    }
}

export default arretDAO