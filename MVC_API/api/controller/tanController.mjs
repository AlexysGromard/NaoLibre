"use strict"
import tanDAO from '../dao/tanDAO.mjs'

const tanController = {
    // findAll: async () => await userDAO.findAll(),
    // findByLogin : async (login)=> {
    //     const user = await userDAO.findByLogin(login)
    //     return user
    // },
    // add : async (user) => await userDAO.add(user),
    getTravaux : async (ligne) => await tanDAO.getTravaux(ligne),
    getCloseArret : async (pos) => await tanDAO.getCloseArret(pos)
    // remove : async (login) => await userDAO.removeByLogin(login),
    // update: async (user) => await userDAO.update(user)
}
export default tanController
