import mongoose from 'mongoose';
// MODELS
/**
 * @class AvisModel
 *
 * @description Définit un modèle d'avis
 */
export default class AvisModel {
    // Propriétés de l'interface
    iduser;
    note;
    date;
    dayweek;
    /**
     * @constructor
     * @param {AvisInterface} obj - Objet de type AvisInterface
     *
     * @throws {Error} - Lève une erreur si l'objet a une erreur de type
     * @throws {Error} - Lève une erreur si la note n'est pas entre 1 et 3
     * @throws {Error} - Lève une erreur si le jour de la semaine n'est pas entre lundi et dimanche
     * @throws {Error} - Lève une erreur si l'objet ne contient pas les propriétés requises
     */
    constructor(obj) {
        // Vérification de la présence des propriétés
        if ('iduser' in obj && 'note' in obj && 'date' in obj && 'dayweek' in obj){
            // Vérification du type des propriétés
            if (!(obj.iduser instanceof mongoose.Types.ObjectId && Number.isInteger(obj.note) && typeof obj.date == "string" && typeof obj.dayweek === 'string')) {
                throw new Error('Error type');
            }
            // Vérification des valeurs des propriétés
            if (!(obj.note <= 3 && obj.note >= 1)) {
                throw new Error('note can juste be between 1 and 3');
            }
            // Vérification des valeurs des propriétés
            if (!["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].includes(obj.dayweek)) {
                throw new Error('dayweek can juste be between Monday and Sunday');
            }
            // Affectation des propriétés
            this.iduser = obj.iduser;
            this.note = obj.note;
            this.date = obj.date;
            this.dayweek = obj.dayweek;
        }
        else {
            // error
            throw new Error('Invalid object type');
        }
    }
}
