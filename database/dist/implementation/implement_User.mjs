// IMPORTS
import bcrypt from 'bcrypt';
import { MongoClient, ObjectId } from 'mongodb';
import chalk from 'chalk';
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
console.log(chalk.blue.underline.bold.italic.underline(`------------------Début du programme------------------`));
try {
    // Connexion à la base de données
    console.log(chalk.blue.underline.bold.italic.underline(` Connexion à la base de données `));
    const url = `${data.name}://${data.host}:${data.port}`;
    const client = await MongoClient.connect(url);
    const db = client.db(data.database[0].name);
    // Crypter les mots de passe
    console.log(chalk.blue.underline.bold.italic.underline(` Cryptage des mots de passe `));
    personnes = await crypterMotsDePasse(personnes);
    console.log(personnes); // Afficher les personnes avec les mots de passe cryptés
    // Insérer les personnes dans la collection Users
    console.log(chalk.blue.underline.bold.italic(` Insertion `));
    const collection = db.collection(data.database[0].collections[0].name);
    const personnesAvecObjectId = personnes.map((personne) => ({
        ...personne,
        _id: new ObjectId(personne._id)
    })); // transformer les _id en ObjectId et la liste des personnes en documents MongoDB
    const result = await collection.insertMany(personnesAvecObjectId);
    console.log(result); // Afficher le résultat de l'insertion
    console.log(chalk.green('Les données ont été insérées avec succès'));
    // Fermer la connexion
    client.close();
}
catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
}
console.log(chalk.blue.underline.bold.italic.underline(`------------------Fin du programme------------------`));
