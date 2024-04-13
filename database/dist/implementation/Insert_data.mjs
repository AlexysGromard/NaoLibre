// IMPORTS
import bcrypt from 'bcrypt';
import { MongoClient, ObjectId } from 'mongodb';
import chalk from 'chalk';
import { data_mongodb, data_personnes, data_avis } from '../data.mjs';
// CONSTANTES ET VARIABLES
let personnes = data_personnes;
const data = data_mongodb;
// Définition du style personnalisé pour la couleur orange
const orange = chalk.keyword('orange');
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
    console.log(chalk.grey.bold(` Connexion à la base de données `));
    const url = `${data.name}://${data.host}:${data.port}`;
    const client = await MongoClient.connect(url);
    const db = client.db(data.database[0].name);
    try {
        console.log(chalk.blue.underline.bold.italic(` Insertion `));
        // Crypter les mots de passe
        console.log(chalk.blue.underline.bold.italic.underline(` Cryptage des mots de passe `));
        personnes = await crypterMotsDePasse(personnes);
        console.log(chalk.grey.bold(`Data Users`));
        console.log(personnes); // Afficher les personnes avec les mots de passe cryptés
        // Insérer les personnes dans la collection Users
        console.log(chalk.grey.bold(` Insertion des Users dans la collection Users`));
        const collection_users = db.collection(data.database[0].collections[0].name);
        // Transformer les personnes en documents MongoDB
        const personnesAvecObjectId = personnes.map((personne) => ({
            ...personne,
            _id: new ObjectId(), // Générer un nouvel identifiant
        })); // transformer les _id en ObjectId et la liste des personnes en documents MongoDB
        const result_users = await collection_users.insertMany(personnesAvecObjectId);
        console.log(result_users); // Afficher le résultat de l'insertion
        console.log(chalk.green('Les données Users ont été insérées avec succès'));
        //AVIS
        // Insérer les personnes dans la collection Users
        console.log(chalk.grey.bold(` Insertion  des Avis dans la collection Avis`));
        const collection_avis = db.collection(data_mongodb.database[0].collections[1].name);
        console.log(chalk.grey.bold(`Data Avis`));
        console.log(data_avis);
        data_avis.forEach((LigneDirectionAvis) => {
            LigneDirectionAvis.avis.forEach((avis) => {
                // Récupérer l'id de l'utilisateur
                const user = personnesAvecObjectId.find((personne) => personne.email === "lol@lol.lol");
                if (user) {
                    avis.iduser = user._id;
                }
                else {
                    console.error("Utilisateur non trouvé pour l'email 'lol@lol.lol'");
                }
            });
        });
        // transformer les _id en ObjectId et la liste des personnes en documents MongoDB
        const result_avis = await collection_avis.insertMany(data_avis);
        console.log(result_avis); // Afficher le résultat de l'insertion
        console.log(chalk.green('Les données Avis ont été insérées avec succès'));
        // Fermer la connexion
        client.close();
    }
    catch (error) {
        console.log(chalk.red('Erreur lors de l\'insertion des données dans les collections'));
        console.log(orange('Vérifiez que la base de données et les collections existent'));
        console.log(orange('Vérifiez que les données à insérer sont correctes'));
        console.log(orange.bold('Vérifiez que les données à insérer respectent les contraintes de validation'));
        console.log(orange.bold('Verifier si la des données on été inséré dans une des collections pour connaitre l endroit de l erreur'));
        console.log(orange.bold('Vérifiez que la base de données et les collections existent déjà'));
        console.error('Erreur lors de l\'insertion des données :', error);
    }
}
catch (error) {
    console.log(chalk.red('Erreur lors de la connexion à la base de données'));
    console.log(orange('Vérifiez que le serveur MongoDB est bien démarré'));
    console.log(orange('Vérifiez que les paramètres de connexion à la base de données sont corrects'));
    console.error('Erreur lors de la connexion à la base de données :', error);
}
console.log(chalk.blue.underline.bold.italic.underline(`------------------Fin du programme------------------`));
