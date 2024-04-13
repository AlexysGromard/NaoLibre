import {baseURLUser} from "./constantes.js";
import ModelAvis from "../model/ModelAvis.mjs";

/**
 * @module avisDao
 * This module provides a function to get all the reviews from users
 */
const avisDao = {
    /**
     * Get all the reviews from users
     * @returns {Promise} - The promise to get all the reviews
     * @throws {Error} - The error when the request fails
     */
    getAllAvis : async() => {
        try{
            const suffix = "avis"
            const res = await fetch(baseURLUser + suffix)
            const jsonresults = await res.json()
            const avis = jsonresults.map((element) => {
                return new ModelAvis(element)
            })
            return avis
        } catch (e) {
            //console.error(e)
            return []
        }
    },

    /**
     * Get the reviews from users for a specific line
     * @param {string} line - The line of the bus
     * @returns {Promise} - The promise to get the reviews
     * @throws {Error} - The error when the request fails
     */
    getAvisByLine : async(line) => {
        try{
            const suffix = "avis/"+line
            const res = await fetch(baseURLUser + suffix)
            if (res.status === 401){
                return new ModelAvis({nomLigne : line, avis : []})
            }
            const jsonresults = await res.json()        
            return new ModelAvis(jsonresults)    
        } catch (e) {
            //console.error(e)
            return null
        }
    },

    /**
     * Add a review from a user
     * @param {string} line - The line of the bus
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @param {number} note - The note of the review
     * @returns {Promise} - The promise to add the review
     * @throws {Error} - The error when the request fails
     */
    addAvis : async(line,email,password,note) => {
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note: note })
            };
            const suffix = "avis/"+line+"/"+email+"/"+password

            const res = await fetch(baseURLUser+suffix,requestOptions)
            const status = res.status
            const json = await res.json()
            if (status >= 400 && status < 500){
                return {message : json.message, ok: false}
            }
            return {message : null, ok: true}
        } catch (e) {
            //console.error("Erreur",e)
            return {message : "The API is not responding", ok: false}
        }
    }
}

export default avisDao