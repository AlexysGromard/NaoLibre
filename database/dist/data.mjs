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
                                "required": ["_id", "name", "email", "password", "point", "favori"],
                                "type": "object",
                                "properties": {
                                    "_id": {
                                        "bsonType": "objectId",
                                        "description": "must be a string and is required"
                                    },
                                    "name": {
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
                                    },
                                    "favori": {
                                        "bsonType": "array",
                                        "description": "this attribute represente the favori ligne of users",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    "name": "Avis",
                    "validator": { "validator": { "$jsonSchema": {
                                "required": ["nomLigne", "avis"],
                                "type": "object",
                                "properties": {
                                    "nomLigne": {
                                        "bsonType": "string",
                                        "description": "must be a string and is required"
                                    },
                                    "avis": {
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
                                                    "bsonType": "string",
                                                    "description": "must be a date and is required"
                                                },
                                                "dayweek": {
                                                    "bsonType": "string",
                                                    "description": "must be a string and is required"
                                                }
                                            },
                                            "required": ["iduser", "note", "date", "dayweek"]
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
        "name": "Jacqueline Hoareau",
        "email": "Hoareau@laposte.net",
        "password": "123456",
        "point": 0,
        "favori": []
    },
    {
        "_id": 1,
        "name": "Suzanne Camus",
        "email": "Camus.Suzanne",
        "password": "azerty",
        "point": 0,
        "favori": []
    },
    {
        "_id": 2,
        "name": "Michèle Fleury",
        "email": "Michè@exemple.com",
        "password": "motdepasse",
        "point": 0,
        "favori": []
    },
    {
        "_id": 3,
        "name": "Georges René",
        "email": "Georges.René@exemple.com",
        "password": "12345678",
        "point": 0,
        "favori": []
    },
    {
        "_id": 4,
        "name": "Théodore Munoz",
        "email": "Munoz.Thé@gmail.com",
        "password": "123456789",
        "point": 0,
        "favori": []
    },
    {
        "_id": 5,
        "name": "lol",
        "email": "lol@lol.lol",
        "password": "lol",
        "point": 0,
        "favori": []
    },
    {
        "_id": 6,
        "name": "Henriette Launay",
        "email": "Launay.Henriette@exemple.com",
        "password": "0000",
        "point": 0,
        "favori": []
    },
    {
        "_id": 7,
        "name": "Roland Bonneau",
        "email": "Bonneau@laposte.net",
        "password": "1999!test@2021",
        "point": 0,
        "favori": []
    },
    {
        "_id": 8,
        "name": "Sabine Lemaire-Simon",
        "email": "Sabine.LemaireSimon@outlook.com",
        "password": "jourbon",
        "point": 0,
        "favori": []
    },
    {
        "_id": 9,
        "name": "Aimée Godard",
        "email": "aimé.Godard@gmail.com",
        "password": "j'aime le vin",
        "point": 0,
        "favori": []
    }
];
export const data_avis = [
    {
        nomLigne: "C6",
        avis: [
            {
                iduser: 7,
                note: 3,
                date: (new Date(2024, 3, 26, 17, 21, 0)).toISOString(),
                dayweek: "Tuesday"
            }
        ]
    }
];
