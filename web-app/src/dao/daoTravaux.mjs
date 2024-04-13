import {baseURLTan} from "./constantes.js";

/**
 * @module travauxDAO
 * This module provides a function to get all the works on the bus lines
 */
const travauxDAO = {
    /**
     * Get all the works on the bus lines
     * @returns {Promise} - The promise to get all the works
     * @throws {Error} - The error when the request fails
     */
    getTravaux : async () => {
        try{
            const suffix = 'travaux/-1'
            const res = await fetch(baseURLTan+suffix)
            return await res.json()    
        } catch (e) {
            //console.error(e)
            return []
        }
    },

    /**
     * Get the works on the bus lines
     * @param {string} ligne - The line of the bus
     * @returns {Promise} - The promise to get the works
     * @throws {Error} - The error when the request fails
     */
    findTravaux : async (ligne) => {
        try{
            const suffix = `travaux/${ligne}`
            const res = await fetch(baseURLTan+suffix)
            return await res.json()    
        } catch (e) {
            //console.error(e)
            return []
        }
    }
}

export default travauxDAO



