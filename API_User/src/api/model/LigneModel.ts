import { AvisInterface, LigneInterface } from "../api_types";
import AvisModel from "./AvisModel";

// MODELS



/**
 * @class LigneModel
 * 
 * @description Définit un modèle de ligne
 * 
 * @implements LigneInterface
 * 
 * @throws {Error} - Lève une erreur si l'objet ne contient pas les propriétés requises
 */
export default class LigneModel implements LigneInterface {
    // Propriétés de l'interface
    nomLigne: string;
    avis: AvisInterface[];

    /**
     * @constructor
     * @param {LigneInterface} obj - Objet de type LigneInterface
     * 
     * @throws {Error} - Lève une erreur si l'objet a une erreur de type
     * @throws {Error} - Lève une erreur si l'objet avis n'est pas un tableau d'instances de AvisModel
     * @throws {Error} - Lève une erreur si l'objet ne contient pas les propriétés requises
     */
    constructor(obj) {
        // Vérification de la présence des propriétés
        if ('nomLigne' in obj && 'avis' in obj && Object.keys(obj).length === 2) {

            // Vérification du type des propriétés
            if (!(typeof obj.nomLigne === 'string' && Array.isArray(obj.avis))) {
                throw new Error('Error type');
            }

            const allAvisModels = obj.avis.every(avis => avis instanceof AvisModel);
            if (!allAvisModels) {
                throw new Error('Tous les éléments de "avis" doivent être des instances de AvisModel.');
            }
            
            // Affectation des propriétés  
            this.nomLigne = obj.nomLigne;
            this.avis = obj.avis;
        } else {
            // error
            throw new Error('Invalid object type');
        }
    }
}