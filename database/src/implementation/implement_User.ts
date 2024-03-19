// IMPORTS
import bcrypt from 'bcrypt';
import { MongoClient, ObjectId } from 'mongodb';
import {data_mongodb, data_personnes }from '../data';


// TYPES ET INTERFACES
import { Personne } from '../d_types';


// CONSTANTES ET VARIABLES
const personnes = data_personnes;
const data = data_mongodb; 




// FONTIONS


/**
 * @description Crypter les mots de passe des personnes
 * 
 * @param personnes : Personne[]
 */
async function crypterMotsDePasse(personnes: Personne[]): Promise<void> {
  const saltRounds: number = 10; // Niveau de complexité du hachage

  // Parcourir toutes les personnes
  for (const personne of personnes) {
    // Générer un sel pour le hachage
    const salt: string = await bcrypt.genSalt(saltRounds);
    let motDePasseCrypte: string | null = null;

    // Crypter le mot de passe avec le sel
    if (personne.password !== null) {
      motDePasseCrypte = await bcrypt.hash(personne.password, salt);
    } else {
      motDePasseCrypte = null;
    }

    // Mettre à jour le mot de passe dans l'objet personne
    personne.password = motDePasseCrypte;
  }

  console.log(personnes); // Afficher les personnes avec les mots de passe cryptés
}










// PROGRAMME PRINCIPAL



// connexion à la base de données
// url de connexion à la base de données ex : 'mongodb://localhost:27017'
const url = `${data.name}://${data.host}:${data.port}`;

try {
  const client = await MongoClient.connect(url);
  const db = client.db(data.database[0].name);
  const collection = db.collection(data.database[0].collections[0].name);

  // Convert _id property to ObjectId type
  const documents = personnes.map(personne => ({
    ...personne,
    _id: new ObjectId(personne._id)
  }));

  // Crypter les mots de passe
  crypterMotsDePasse(personnes);

  // Insérer les données dans la collection
  const result = await collection.insertMany(documents);
  console.log(`${result.insertedCount} documents insérés avec succès`);

  // Fermer la connexion
  client.close();
} catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
}
