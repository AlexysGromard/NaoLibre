// IMPORTS
import { UserInterface } from '../api_types';
import mongoose,{ Document } from 'mongoose';
import { Types } from 'mongoose';


// MODELS
 
// Définition de la classe UserModel en TypeScript
/**
 * @class UserModel
 * 
 * @description Définit un modèle d'utilisateur
 * 
 * @implements UserInterface
 * 
 * @throws {Error} - Lève une erreur si l'objet ne contient pas les propriétés requises
 */
export default class UserModel implements UserInterface {
    // Propriétés de l'interface
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string | null;
    point: number;
    favori: string[];

    /**
     * @constructor
     *
     * @param {Document<any, any, any> | UserInterface} obj - Objet de type Document<any, any, any> ou UserInterface
     *
     * @throws {Error} - Lève une erreur si l'objet a une erreur de type
     * @throws {Error} - Lève une erreur si le point est négatif
     * @throws {Error} - Lève une erreur si l'objet ne contient pas les propriétés requises
     */
    constructor(obj) {
        // Vérification de la présence des propriétés
        if ('_id' in obj &&
            'name' in obj &&
            'email' in obj &&
            'password' in obj &&
            'point' in obj &&
            'favori' in obj &&
            Object.keys(obj).length <= 6) {


            // Vérification du type des propriétés
            if (!(obj._id instanceof mongoose.Types.ObjectId &&
                typeof obj.name === 'string' &&
                typeof obj.email === 'string' &&
                (typeof obj.password === 'string' || obj.password === null) &&
                Number.isInteger(obj.point) &&
                Array.isArray(obj.favori))) {
                throw new Error('Error type');
            }


            // Vérification des valeurs des propriétés
            if (obj.point < 0) {
                throw new Error('point can juste be positive');
            }
            this._id = obj._id;
            this.name = obj.name;
            this.email = obj.email;
            this.password = obj.password;
            this.point = obj.point;
            this.favori = obj.favori;
        
        } else {
            // error
            throw new Error('Invalid object type');
        }
    }
}
