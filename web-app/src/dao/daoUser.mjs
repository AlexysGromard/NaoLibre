import {baseURLUser} from "./constantes.js";

/**
 * @module userDAO
 * This module provides functions to manage users
 */
const userDAO = {
    /**
     * Get all the users
     * @returns {Promise} - The promise to get all the users
     * @throws {Error} - The error when the request fails
     */
    getUsers : async() => {
        try{
            const suffix = 'user'
            const res = await fetch(baseURLUser + suffix)
            return await res.json()
        } catch (e) {
            //console.error(e)
            return []
        }
    },

    /**
     * Get the user with the given email and password
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @returns {Promise} - The promise to get the user
     * @throws {Error} - The error when the request fails
     */
    findUser : async (email,password) => {
        try{
            const suffix = `user/${email}/${password}`
            const res = await fetch(baseURLUser+suffix)
            if (res.status >= 400 && res.status < 500 ){
                return {message : "Utilisateur non trouve", ok : false, user : null}
            }
            const json = await res.json()
            return {message : "Utilisateur trouvé", ok : true, user : json}
        } catch (e) {
            //console.error(e)
            return {message : "le serveur à un problem", ok : false, user : null}
        }
    },

    /**
     * Add a user with the given name, email and password
     * @param {string} name - The name of the user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @returns {Promise} - The promise to add the user
     * @throws {Error} - The error when the request fails
     */
    addUser : async(name,email,password) => {
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password:password })
            };
            const suffix = `user`
            const res = await fetch(baseURLUser+suffix,requestOptions)
            const json = await res.json()
            if (res.status >=  200 && res.status < 300){
                return {messageErreur : null, ok: true}
            }else{
                return {messageErreur : json.message, ok: false}
            }
        } catch (e) {
            //console.error(e)
            return {messageErreur : e, ok: false}
        }
    },

    /**
     * Modify a user with the given name, oldEmail, oldpassword, newEmail, newPassword and favori
     * @param {string} name - The name of the user
     * @param {string} oldEmail - The old email of the user
     * @param {string} oldpassword - The old password of the user
     * @param {string} newEmail - The new email of the user
     * @param {string} newPassword - The new password of the user
     * @param {Array} favori - The favorites of the user
     * @returns {Promise} - The promise to modify the user
     * @throws {Error} - The error when the request fails
     */
    modifyUser : async(name,oldEmail, oldpassword, newEmail, newPassword, favori = null) => {
        try{
            //vérification parammetre
            if (favori == null){
                const {message,ok,user} = await userDAO.findUser(oldEmail,oldpassword)
                favori = user.favori
            }

            //création de la requette
            const newUser = { name: name, email: newEmail, password:newPassword, favori:favori }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...newUser})
            };
            const suffix = `user/${oldEmail}/${oldpassword}`

            //featch
            const res = await fetch(baseURLUser+suffix,requestOptions)
            const json = await res.json()
            if (res.status ===  200){
                return {messageErreur : null, ok: true}
            }else{
                return {messageErreur : json.message, ok: false}
            }
        } catch (e) {
            //console.error(e)
            return {messageErreur : e, ok: false}
        }
    },

    /**
     * Delete a user with the given email and password
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @returns {Promise} - The promise to delete the user
     * @throws {Error} - The error when the request fails
     */
    deleteUser : async(email,password) => {
        try{
            const suffix = `user/${email}/${password}`
            const res = await fetch(baseURLUser+suffix,{method:'DELETE'})
            return await res.json()    
        } catch (e) {
            //console.error(e)
            return []
        }
    },

    /**
     * Add a favorite line to the user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @param {string} line - The favorite line
     * @returns {Promise} - The promise to add the favorite line
     * @throws {Error} - The error when the request fails
     */
    addFavorie : async(email,password,line) => {
        try{
            const  {message,ok,user} = await userDAO.findUser(email,password)
            user.favori.push(line)
            await userDAO.modifyUser(user.name,email,password,email,password,user.favori)    
        } catch (e) {
            //console.error(e)
            return []
        }
    },

    /**
     * Delete a favorite line to the user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @param {string} line - The favorite line
     * @returns {Promise} - The promise to delete the favorite line
     * @throws {Error} - The error when the request fails
     */
    delFavorie : async(email,password,line) => {
        try{
            const  {message,ok,user} = await userDAO.findUser(email,password)
            const newFav = user.favori.filter(item => item !== line)
            await userDAO.modifyUser(user.name,email,password,email,password,newFav)    
        } catch (e) {
            //console.error(e)
            return []
        }
    }
}

export default userDAO