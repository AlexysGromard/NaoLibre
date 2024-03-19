// DATA
export const data_mongodb = {
    "name": "mongodb",
    "host": "127.0.0.1",
    "port": "27017",
    "username": "",
    "password": "",
    "database": [
        {
            "name": "NaoLibre",
            "collections": [
                {
                    "name": "Users",
                    "validator": { "validator": { "$jsonSchema": {
                                "required": ["_id", "first_name", "last_name", "email", "password"],
                                "type": "object",
                                "properties": {
                                    "_id": {
                                        "bsonType": "objectId",
                                        "description": "must be a string and is required"
                                    },
                                    "first_name": {
                                        "bsonType": "string",
                                        "description": "must be a string and is required"
                                    },
                                    "last_name": {
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
                                    },
                                    "point": {
                                        "bsonType": "int",
                                        "description": "this attribute represente the point partisipation of users"
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    "name": "Avis",
                    "validator": { "validator": { "$jsonSchema": {
                                "required": ["nomLigne", "direction", "Avis"],
                                "type": "object",
                                "properties": {
                                    "nomLigne": {
                                        "bsonType": "string",
                                        "description": "must be a string and is required"
                                    },
                                    "direction": {
                                        "bsonType": "string",
                                        "description": "must be a string and is required"
                                    },
                                    "Avis": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "iduser": {
                                                    "bsonType": "objectId",
                                                    "description": "must be a string and is required"
                                                },
                                                "note": {
                                                    "bsonType": "int",
                                                    "description": "must be a string and is required"
                                                },
                                                "date": {
                                                    "bsonType": "date",
                                                    "description": "must be a date and is required"
                                                },
                                                "dayofweek": {
                                                    "bsonType": "string",
                                                    "description": "must be a string and is required"
                                                },
                                                "heure": {
                                                    "bsonType": "int",
                                                    "description": "must be a int and is required"
                                                }
                                            },
                                            "required": ["iduser", "note", "date", "dayweek", "heure"]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "name": "NaoLibreAPI",
            "collections": []
        }
    ]
};
export const data_personnes = [
    {
        "_id": 0,
        "first_name": "Jacqueline",
        "last_name": "Hoareau",
        "email": "Hoareau@laposte.net",
        "adress": {
            "rue": "9 Chem. de la Pelletterie",
            "code_postal": 44000,
            "ville": "Nantes"
        },
        "password": "123456",
        "point": 0
    },
    {
        "_id": 1,
        "first_name": "Suzanne",
        "last_name": "Camus",
        "email": "Camus.Suzanne",
        "adress": {
            "rue": "53 Rue du Douet Garnier",
            "code_postal": 44000,
            "ville": "Nantes"
        },
        "password": "azerty",
        "point": 0
    },
    {
        "_id": 2,
        "first_name": "Michèle",
        "last_name": "Fleury",
        "email": "Michè@exemple.com",
        "adress": {
            "rue": "36 Bd Gaston Serpette",
            "code_postal": 44000,
            "ville": "Nantes"
        },
        "password": "motdepasse",
        "point": 0
    },
    {
        "_id": 3,
        "first_name": "Georges",
        "last_name": "René",
        "email": "Georges.René@exemple.com",
        "adress": {
            "rue": "1 Rue de Joyeuse",
            "code_postal": 76000,
            "ville": "Rouen"
        },
        "password": "12345678",
        "point": 0
    },
    {
        "_id": 4,
        "first_name": "Théodore",
        "last_name": "Munoz",
        "email": "Munoz.Thé@gmail.com",
        "adress": {
            "rue": "24 Rue du Petit Pont",
            "code_postal": 45000,
            "ville": "Orleans"
        },
        "password": "123456789",
        "point": 0
    },
    {
        "_id": 5,
        "first_name": "lol",
        "last_name": "lol",
        "email": "lol.lol@lol.lol",
        "adress": {
            "rue": "21 Rue René Thomas",
            "code_postal": 38000,
            "ville": "Grenoble"
        },
        "password": "lol",
        "point": 0
    },
    {
        "_id": 6,
        "first_name": "Henriette",
        "last_name": "Launay",
        "email": "Launay.Henriette@exemple.com",
        "adress": {
            "rue": "14 Imp. de Flandre",
            "code_postal": 76000,
            "ville": "Rouen"
        },
        "password": "0000",
        "point": 0
    },
    {
        "_id": 7,
        "first_name": "Roland",
        "last_name": "Bonneau",
        "email": "Bonneau@laposte.net",
        "adress": {
            "rue": "198 Rue des Postes",
            "code_postal": 59000,
            "ville": "Lille"
        },
        "password": "1999!test@2021",
        "point": 0
    },
    {
        "_id": 8,
        "first_name": "Sabine",
        "last_name": "Lemaire-Simon",
        "email": "Sabine.LemaireSimon@outlook.com",
        "adress": {
            "rue": "46 Rue Ferrandière",
            "code_postal": 69000,
            "ville": "Lyon"
        },
        "password": "jourbon",
        "point": 0
    },
    {
        "_id": 9,
        "first_name": "Aimée",
        "last_name": "Godard",
        "email": "aimé.Godard@gmail.com",
        "adress": {
            "rue": "6 Rue de Lurbe",
            "code_postal": 33000,
            "ville": "Bordeaux"
        },
        "password": "j'aime le vin",
        "point": 0
    }
];
