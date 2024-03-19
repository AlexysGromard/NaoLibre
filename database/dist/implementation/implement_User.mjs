// IMPORTS
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import { data_mongodb, data_personnes } from '../data.mjs';
// CONSTANTES ET VARIABLES
let personnes = data_personnes;
const data = data_mongodb;
// FONTIONS
/**
 * @description Crypter les mots de passe des personnes
 *
 * @param personnes : Personne[]
 */
async function crypterMotsDePasse(personnes) {
    const saltRounds = 10; // Niveau de complexité du hachage
    // Parcourir toutes les personnes
    for (const personne of personnes) {
        // Générer un sel pour le hachage
        const salt = await bcrypt.genSalt(saltRounds);
        let motDePasseCrypte = null;
        // Crypter le mot de passe avec le sel
        if (personne.password !== null) {
            motDePasseCrypte = await bcrypt.hash(personne.password, salt);
        }
        else {
            motDePasseCrypte = null;
        }
        // Mettre à jour le mot de passe dans l'objet personne
        personne.password = motDePasseCrypte;
    }
    return personnes;
}
// PROGRAMME PRINCIPAL
// connexion à la base de données
// url de connexion à la base de données ex : 'mongodb://localhost:27017'
const url = `${data.name}://${data.host}:${data.port}`;
try {
    const client = await MongoClient.connect(url);
    const db = client.db(data.database[0].name);
    // Crypter les mots de passe
    personnes = await crypterMotsDePasse(personnes);
    console.log(personnes); // Afficher les personnes avec les mots de passe cryptés
    // Fermer la connexion
    client.close();
}
catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
}
