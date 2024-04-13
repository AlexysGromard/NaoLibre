import {baseURLTan} from "./constantes.js";

/**
 * @module ligneDAO
 * This module provides a function to get all the bus lines
 */
const ligneDAO = {
    /**
     * Get all the bus lines
     * @returns {Promise} - The promise to get all the bus lines
     * @throws {Error} - The error when the request fails
     */
    getLignes : async () => {
        try{
            const suffix = `/lignes`
            const res = await fetch(baseURLTan+suffix)
            return await res.json()    
        } catch (e) {
            //console.error(e)
            return []
        }
    }
}

export default ligneDAO