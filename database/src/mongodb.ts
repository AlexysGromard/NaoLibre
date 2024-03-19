
// IMPORTS
import { MongoClient } from 'mongodb';
import chalk from 'chalk';


import { data_mongodb } from './data';

const data = data_mongodb;

// PROGRAMME PRINCIPAL

console.log(chalk.blue.underline.bold.italic.underline(`------------------Début du programme------------------`));
// connexion à la base de données

console.log(chalk.blue.underline.bold.italic.underline(`------------------Connexion à la base de données------------------`));
console.log(`Name: ${data.name}`);
console.log(`Host: ${data.host}`);
console.log(`Port: ${data.port}`);
try {
  const url = `${data.name}://${data.host}:${data.port}`;

  const client =new MongoClient(url); 

  // Connect to the database
  try {
    await client.connect();
    console.log(chalk.green('The connection on MongoDB is established'));
    
  } catch (error) {
    console.error(chalk.red('Error while trying to connect to MongoDB'));
    console.error(error);
  }

  console.log(chalk.blue.underline.bold.italic.underline(`------------------Création de la base de données et de ses collections------------------`));
  // Create the database
  for (let db  of data.database) {
    let dbName = db.name;
    let collections :any = db.collections;
    try {

      // Create the database
      await client.db(dbName)
  
      console.log(chalk.green(`The database ${dbName} is created`));
  
      // Create the collections
      for (let collection of collections) {
          // Create the collections
          try {
            await client.db(dbName).createCollection(collection.name, collection.validator);
            console.log(`La collection ${collection.name} est créée`);
          } catch (error) {
            console.error(chalk.red(`Erreur lors de la tentative de création de la collection ${collection.name}`));
            console.error(error);
          }
        }
  
    } catch (error) {
      console.error(chalk.red(`Error while trying to create the database ${dbName}`));
      console.error(error);
    }


  }

  // Disconnect from the database
  console.log(chalk.blue.underline.bold.italic.underline(`------------------Déconnexion de la base de données------------------`));
  try {
    await client.close();
    console.log(chalk.green('The connection on MongoDB is closed'));
  } catch (error) {
    console.error(chalk.red('Error while trying to close the connection to MongoDB'));
    console.error(error);
  }




} catch (error) {
  console.error(chalk.red('Error while trying to connect to MongoDB'));
  console.error(error);
}



console.log(chalk.blue.underline.bold.italic.underline(`------------------Fin du programme------------------`));
