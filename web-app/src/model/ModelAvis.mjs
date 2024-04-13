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
export default class ModelAvis {
    // Propriétés de l'interface
    nomLigne;
    avis;
    /**
     * @constructor
     * @param {any} obj - Objet
     *
     * @throws {Error} - Lève une erreur si l'objet ne contient pas les propriétés requises
     */
    constructor(obj) {
        if ('nomLigne' in obj && 'avis' in obj) {
            if (typeof obj.nomLigne !== "string" || !Array.isArray(obj.avis)){
                throw new Error("Object attributes are not array")
            }
            this.nomLigne = obj.nomLigne;
            this.avis = obj.avis;
        }
        else {
            // error
            throw new Error('Invalid object type');
        }
    }

    //retourne la moyenne des avis et null si il n'y a pas d'avos
    moyenne(){

        if (this.avis.length === 0){
            return null
        }

        let moy = 0
        this.avis.forEach(av => {
            moy += av.note
        });
        return moy / this.avis.length
    }

    //retourner la moyenne des avis à chaque heurs de la journer de "date".
    //si il n'y a pas d'avis à une heure alors la moyenne vos null
    moyenneOftheHoures(date){
        if (!(date instanceof Date)){
            throw Error("date is not a Date")
        }
        let moyHoure = new Array(24) //24 houre
        for (let pas = 0; pas < 24; pas++){
            moyHoure[pas] = {sum : 0, nbvalue : 0}
        }


        this.avis.forEach(av => {
            const avieDate = new Date(av.date)
            if (avieDate.getDate() === date.getDate()){
                moyHoure[avieDate.getHours()].sum += av.note
                moyHoure[avieDate.getHours()].nbvalue++
            }
        });

        //divisiton pour obtenire la moyenne
        const moyresult = moyHoure.map(moy =>{
            if (moy.nbvalue === 0){
                moy.sum = null
            }else{
                moy.sum /= moy.nbvalue
            }
            return moy.sum
        })
        return moyresult

    }

    //calcule la moyenne de la moyenne a chaque heurs pour la journer de (date) pour chaqu'une des lignes indiqué (lignes)
    static moyenneOftheHouresofManyList(date,lignes) {

        lignes= lignes.map(ligne =>{
            return ligne.moyenneOftheHoures(date)
        })

        let moyHoure = new Array(24) //24 houre
        for (let pas = 0; pas < 24; pas++){
            moyHoure[pas] = {sum : 0, nbvalue : 0}
        }

        moyHoure = moyHoure.map((houre, index) => {
            lignes.forEach(ligne => {
                if (ligne[index] !== null){
                    houre.sum += ligne[index]
                    houre.nbvalue ++
                }
            })

            return houre
        })
        //divisiton pour obtenire la moyenne
        const moyresult =  moyHoure.map(moy =>{
            if (moy.nbvalue !== 0){
                moy.sum /= moy.nbvalue
            }
            
            return moy.sum
        })


        return moyresult
    }

}
