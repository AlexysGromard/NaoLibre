//IMPORTS
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt, { compare } from 'bcrypt';
//.mjs
import UserModel from '../model/UserModel';
import crypter from '../tools/cryptage';


// TYPAGE
import { UserInterface } from '../api_types';




//CONNEXION A LA BASE DE DONNEES

// Définissez votre schéma Mongoose
const schemaUser: Schema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    point: { type: Number, required: true },
    favori: { type: Array, required: true }
}, { versionKey: false });

// Créez votre modèle Mongoose à partir du schéma en spécifiant le nom de la collection
const MongoUser = mongoose.model('Users', schemaUser, 'Users');





//DAO   

/**
 * @object userDAO
 * 
 * @description l'objet est un DAO pour les utilisateurs
 * 
 * @method findAll
 * @method removeAll
 * @method findByEmailAndPassword
 * @method add
 * @method removeByLogin
 * @method update
 * 
 */
const userDAO = {


    /**
     * @async 
     * @description Renvoie un tableau d'utilisateurs
     * 
     * @returns {Promise<UserModel[]>}
     */
    findAll: async () => {
        const data = await MongoUser.find({});
        const users = data.map((user: Document) => new UserModel(user));
        //console.log('taille : ', Object.keys(user[0]).length, ' obj : ', user); //probleme de taille affiche 3 au lieux de 6 pourtant il y a bien 6 attributs
        // Supprimer les mots de passe
        users.forEach((user: UserModel) => {
            user.password = null;
        });
        return users;
    },

    /**
     * @async
     * @description Supprime tous les utilisateurs
     */
    removeAll : async () => {
        await MongoUser.deleteMany()
    },



    /**
     * @async
     * @description check si un utilisateur existe
     * 
     * @param {string} email  
     * 
     * @returns {Promise<boolean>}
     */
    async exist(email :string) : Promise<boolean> {
        // Recherche de l'utilisateur dans la base de données
        const user = await MongoUser.findOne({ email: email });
    
        // Vérifier si l'utilisateur existe
        if (user) {
            return true; // L'utilisateur existe
        } else {
            return false; // L'utilisateur n'existe pas
        }
    },
        

    /**
     * @async
     * @description Renvoie un utilisateur connu par son login ou null
     * 
     * @param {string} email 
     * @param {string} password
     * 
     * @returns {Promise<UserModel>}
     */
    findByEmailAndPassword: async (email :string,password :string)=> {
        // Vérifier les paramètres
        if (email === null || password === null) {
            throw new Error("Email or password is null");
        }

        if (!(typeof email === 'string') || !(typeof password === 'string')) {
            throw new Error("Email or password is not a string");
        }

        // Récupérer l'utilisateur
        const data = await MongoUser.findOne({email:email})
        if (data === null) return null // Si l'utilisateur n'existe pas

        // Créer un objet UserModel
        const user = new UserModel(data)
        if (user.password === null) return null // Si l'utilisateur n'a pas de mot de passe


        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return null; // Si le mot de passe n'est pas valide

        // Supprimer le mot de passe
        user.password = null;
        return user
    },


    /**
     * @async
     * @description Ajout un utilisateur si il est valide et n'existe pas
     * 
     * @param {UserModel} user 
     */
    async add(user : UserModel) : Promise<void>{
            // Valider l'utilisateur
            if (!(user instanceof UserModel)) {
                throw new Error("Not a valid user");
            }

            if (user.password === null) throw new Error("User password is null");

            // Vérifier si l'utilisateur existe déjà
            if (await userDAO.exist(user.email)) {
                throw new Error("User already exists");
            }

            // Crypter le mot de passe
            user.password = await crypter(user.password);

            const newUser = new MongoUser(user);
            await newUser.save();
    },


    /**
     * @async
     * @description Supprime un utilisateur connu par son email
     * 
     * @param {string} email 
     * @param {string} password
     * 
     * @returns {Promise<boolean>}
     */
    removeUser: async (email :string, password : string) => {
        
                // Vérifier si l'utilisateur existe
            if (email === null || password === null)
                throw new Error("Parametre is null");

            if (!(typeof email === 'string') || !(typeof password === 'string'))
                throw new Error("Email or password is not a string");

            // Vérifier si l'utilisateur existe
            if ( await userDAO.findByEmailAndPassword(email, password) == null){
                return false
            }
            await MongoUser.deleteOne({ email: email}); // Supprimer l'utilisateur
    
            // Vérifier si l'utilisateur a été supprimé
            if ( await userDAO.findByEmailAndPassword(email, password) === null){
                return true
            }
            
            return false
    },



    /** 
     * @async
     * @description Modifie un utilisateur
     * 
     * @param {string} email
     * @param {string} password
     * @param {UserModel} user 
     * 
     * @returns {Promise<void>}
     */
    update: async (email : string, password : string, user :UserModel) => {
        // Vérifier les paramètres
        if (!(user instanceof UserModel))
            throw new Error("Not a valid user");
        if (user.password === null || email === null || password === null ) throw new Error("Parametre is null");

        if (!(typeof email === 'string') || !(typeof password === 'string'))
        throw new Error("Email or password is not a string");

        // Vérifier si l'utilisateur existe
        const existingUser = await userDAO.findByEmailAndPassword(email, password); 

        // Vérifier si l'utilisateur existe
        if (existingUser === null) {
            throw new Error("User not found");
        }
        if (!existingUser._id.equals(user._id)){
            throw new Error("You can't change the id")
        }

        // Crypter le mot de passe
        user.password = await crypter(user.password);

        const data = await MongoUser.updateOne({ email: existingUser.email }, user);





        
        // Verify if the user has been modified
        if (data.modifiedCount === 0) {
            throw new Error("User not found");
        } 
    }

}
export default userDAO


