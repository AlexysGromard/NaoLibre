//IMPORTS
import mongoose, { Schema, Document } from 'mongoose';
//.mjs
import AvisModel from '../model/AvisModel';
import LigneModel from '../model/LigneModel';

// TYPAGE
import { LigneInterface, AvisInterface } from '../api_types';
import { Condition } from 'mongoose';



//CONNEXION A LA BASE DE DONNEES

// Définissez votre schéma Mongoose
const avisSchema = new Schema({
    iduser: { type: Schema.Types.ObjectId, required: true },
    note: { type: Number, required: true },
    date: { type: Date, required: true },
    dayweek: { type: String, required: true }
});

const schemaLigne = new Schema({
    nomLigne: { type: String, required: true },
    avis: [avisSchema] // Utilisation du sous-schema pour définir la structure des éléments de l'array "avis"
}, { versionKey: false });
// Créez votre modèle Mongoose à partir du schéma en spécifiant le nom de la collection
const MongoAvis = mongoose.model('Avis', schemaLigne, 'Avis');

//DAO

/**
 * @object avisDAO
 * 
 * @description l'objet est un DAO pour les avis
 * 
 * @method findAll
 * @method removeAll
 * @method findByEmailAndPassword
 * @method add
 * @method removeByLogin
 * @method update
 * 
 */
const avisDAO = {


    /**
     * @async 
     * @description Renvoie un tableau de LigneModel
     * 
     * @returns {Promise<LigneModel[]>}
     */
    findAll: async () => {
        const data = await MongoAvis.find({},{_id:0});
        // change les avis en AvisModel puis mes sous forme de LigneModel
        const lignes = data.map((ligne) => {
            let avisObject = ligne.avis.map( (avi) =>{
                return new AvisModel(avi)
            })
            return new LigneModel({nomLigne : ligne.nomLigne, avis : avisObject})
        });
        return lignes;
    },

    /**
     * @async
     * @description Supprime tous les avis
     * 
     * @returns {Promise<void>}
     */
    removeAll: async () => {
        await MongoAvis.deleteMany({});
    },

    /**
     * @async
     * @description Renvoie un objet LigneModel ou null si la ligne n'existe pas
     * 
     * @param {string} nameligne - Nom de la ligne
     * 
     * @returns {Promise<LigneModel> | null}
     * 
     * @throws {Error} - Lève une erreur si le nom de la ligne est null
     * @throws {Error} - Lève une erreur si le nom de la ligne n'est pas en string
     * */
    findByLigne: async (nameligne : String) => {
        
        // Vérifier les paramètres

        if (!nameligne || nameligne === null) {
            throw new Error("nomligne is null");
        }


        if (typeof nameligne != "string"){
            throw new Error("The nomligne is not a string");
        }

        let ligne = await MongoAvis.findOne({ nomLigne: nameligne });

        if (ligne === null) {
            return null;
        }
        else {
            // Mets sous forme de LigneModel
            let avisObject = ligne.avis.map((avi) => {
                return new AvisModel(avi);
            });
            return new LigneModel({ nomLigne: ligne.nomLigne, avis: avisObject });
        }
        
    },

    /**
     * @async
     * @description Ajoute un avis à une ligne
     * 
     * @param {AvisModel} nouvelAvis - Avis à ajouter
     * @param {string} nomligne - Nom de la ligne
     * 
     * @returns {Promise<LigneModel>}
     * 
     * @throws {Error} - Lève une erreur si l'avis est null
     * @throws {Error} - Lève une erreur si le nom de la ligne est null
     * @throws {Error} - Lève une erreur si l'avis n'est pas une instance de AvisModel
     * @throws {Error} - Lève une erreur si l'utilisateur à déjà voter sur cette ligne il y a moins d'1h
     * @throws {Error} - Lève une erreur si la ligne n'a pas été crée
     * */
    addAvis : async (nouvelAvis : AvisModel, nomligne :string) => {

        // Vérifier les paramètres
        if (!nouvelAvis && nouvelAvis === null) {
            throw new Error("Avis is null");
        }

        if (nomligne === null) {
            throw new Error("Ligne is null");
        }

        // Vérifier si Avis est une instance de AvisModel
        if (nouvelAvis instanceof AvisModel === false) {
            throw new Error("Avis is not an instance of AvisModel");
        }

        //Vérifie que l'utilisateur n'a pas déja voter pour la même ligne à 1h d'interval
        let ligneVoted = await avisDAO.findByLigne(nomligne)
        if (ligneVoted != null){

            //prend sont dernier vote
            let lastvote  = await MongoAvis.aggregate([
                {
                    $match : {
                        nomLigne : nomligne,
                    }
                },
                {
                    $unwind : '$avis'
                },
                {
                    $match : {
                        "avis.iduser" : nouvelAvis.iduser,
                    }
                },
                { 
                    $addFields: { date: { $toDate: "$avis.date" } } 
                },
                {
                    $sort : { date : 1 } 
                },
                { $limit: 1 },
                { $addFields: {
                      iduser: "$avis.iduser",
                      note: '$avis.note',
                      date: '$avis.date',
                      dayWeek: '$avis.dayweek',
                      }
                    },
               
                {$project: {
                    _id:0,
                    iduser: 1,
                    note : 1,
                    date : 1,
                    dayWeek : 1,
                }}
                ])
            
            let lastvoteoftheUser
            if (lastvote.length == 0){
                lastvoteoftheUser = null
            }else{
                lastvoteoftheUser = lastvote[0]
            }

            //vérifie si il date de moins d'une heure
            if (lastvoteoftheUser != null ){
                const msdiff = (new Date(nouvelAvis.date as string).getTime() - new Date(lastvoteoftheUser.date).getTime())
                console.log("time",(msdiff /(1000 * 60 * 60)))
                if ((msdiff /(1000 * 60 * 60)) < 1){
                    throw new Error("The user has already voted for this line less than an hour ago")
                }
            }
        }else{
            //si la ligne n'existe pas la user n'as donc pas déjà voter dessus
            //on crée donc la ligne pour mettre le vote de l'utilisateur
            await avisDAO.addLigne(new LigneModel({ nomLigne: nomligne, avis: [] }))}
        
        // ajouter l'avis
        const result = await MongoAvis.findOneAndUpdate(
            { nomLigne: nomligne },
            { $push: { avis: nouvelAvis } },
            { new: true }
        );

        //get la nouvelle ligne
        const newligne = await avisDAO.findByLigne(nomligne)
        if (newligne == null) {
            throw new Error("The line has not been added");
        }

        return newligne;
    },

    /**
     * @async
     * @description Ajoute une ligne
     * 
     * @param {LigneModel} ligne - Ligne à ajouter
     * 
     * @returns {Promise<void>}
     * 
     * @throws {Error} - Lève une erreur si la ligne existe déjà
     */
    addLigne: async(ligne : LigneModel) => {

        // Vérifier les paramètres
        if(!(ligne instanceof LigneModel)){
            throw new Error("ligne is not an instance of LigneModel")
        }


        if (await avisDAO.findByLigne(ligne.nomLigne) != null){
            throw new Error("The line already exists")
        }

        const newLigne = new MongoAvis(ligne)
        await newLigne.save()

    }

};


export default avisDAO
