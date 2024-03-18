import {mongoose} from 'mongoose';
import User from "../model/userModel.mjs";

const schema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true}
})
const MongoUser = new mongoose.model('userCollection',schema)

const userDAO = {
    //Renvoie un tableau d'utilisateurs
    findAll :async ()=> {
        const data = await MongoUser.find({})
        return data.map((user)=>new User(user))},
    //supprime tous les utilisateurs
    removeAll : async () => {
        await MongoUser.deleteMany()
    },
    //Renvoie un utilisateur connu par son login ou null
    findByLogin: async (login)=> {
        //TODO
    },
    //Ajout un utilisateur si il est valide et n'existe pas
    //sinon "User already exists" ou "Not a valid user"
    add: async (user)=> {
        //TODO
    },
    //supprime un utilisateur connu par son login
    //renvoie true si la suppression fonction false sinon
    removeByLogin: async (login) => {
        //TODO
    },
    //modifie un utilisateur
    //renvoie l'utilisateur modifié ou null
    update:async(user) => {
        //TODO
    }
}
export default userDAO
