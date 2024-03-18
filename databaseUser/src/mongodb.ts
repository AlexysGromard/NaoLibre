
// IMPORTS
import { MongoClient } from 'mongodb';
import chalk from 'chalk';



// DATA

const data = {
  "name" : "mongodb",
  "host" : "127.0.0.1",
  "port" : "27017",
  "username" : "",
  "password" : "",

  "database" : [
      {
          "name" : "NaoLibre",
          "collections" : [
              {
                  "name" : "Users",
                  "validator" :
                      {"validator":
                              {"$jsonSchema":{
                                  "required": [ "_id","first-name", "last-name","email", "password" ],
                                  "type": "object",
                                  "properties": {
                                      "_id": {
                                          "bsonType": "objectId",
                                          "description": "must be a string and is required"
                                      },
                                      "first-name": {
                                          "bsonType": "string",
                                          "description": "must be a string and is required"
                                      },
                                      "last-name": {
                                          "bsonType": "string",
                                          "description": "must be a string and is required"
                                      },
                                      "email": {
                                          "bsonType": "string",
                                          "description": "the email is required and must be a string"
                                      },
                                      "password": {
                                          "bsonType": "string",
                                          "description": "the password is required and must be a string"
                                      }
                                  }
                              }
                          }
                      }
              },

              
              {
                  "name" : "Avis",
                  "validator" :
                      {"validator":
                              {"$jsonSchema":{
                                  "required": [ "_id","note", "line","direction", "date", "dayweek","iduser" ],
                                  "type": "object",
                                  "properties": {
                                      "_id": {
                                          "bsonType": "objectId",
                                          "description": "must be a string and is required"
                                      },
                                      "note": {
                                          "bsonType": "int",
                                          "description": "must be a string and is required"
                                      },
                                      "line": {
                                          "bsonType": "string",
                                          "description": "must be a string and is required"
                                      },
                                      "direction": {
                                          "bsonType": "string",
                                          "description": "must be a string and is required"
                                      },
                                      "date": {
                                          "bsonType": "date",
                                          "description": "must be a string and is required"
                                      },
                                      "dayweek": {
                                          "bsonType": "string",
                                          "description": "must be a string and is required"
                                      },
                                      "iduser": {
                                          "bsonType": "objectId",
                                          "description": "must be a string and is required"
                                      }
                                  }
                              }
                          }
                      }
              }
          ]
      },
      {
          "name" : "NaoLibreAPI",
          "collections" : []
      }
  ]

}




// MAIN

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
