
import swaggerAutogen from 'swagger-autogen';
const options = {openapi: '3.0.0'};
const swagger = swaggerAutogen(options);

import dotenv from 'dotenv'
import e from 'express';
dotenv.config()

const serverPort = process.env.PORT || 8081
const APIPATH = '/naolibre' 

const outputFile = './swagger.json';
const endpointsFiles = ['./api/routes/route.mjs'];

const config = {
    openapi: '3.0.0',
    info: {
        title: 'User / Avis API',
        version: '1.0.0',
        description: "Documentation de l'API de NaoLibre"
    },
    servers: [
        {
            url: 'http://localhost:' + serverPort + APIPATH
        }
    ],
    tags: [
        { name: 'User', description: 'Operations en rapport avec les utilisateurs' },
        { name: 'Avis', description: 'Operations en rapport avec les avis' }
    ],
    components: {
        schemas: {
            UserModel: {
                _id: {
                    type: 'string'
                },
                email: {
                    type: 'string',
                    example: 'example@example.example'
                },
                password: {
                    type: 'string',
                    nullable: true,
                    example: 'password'
                },
                point: {
                    type: 'integer',
                    example: 0
                },
                favori: {
                    type: 'array',
                    items: {
                        type: 'string',
                        example: 'Cardo'
                    }
                }
            }
,            
            AvisModel: {
                    iduser: {
                        type: 'string',
                        nullable: true
                    },
                    note: {
                        type: 'integer',
                        enum: [1, 2, 3],
                        example: 1
                    },
                    date: {
                        type: 'string',
                        example: '2021-06-01 12:00:00 GMT+0200'
                    },
                    dayweek: {
                        type: 'string',
                        enum: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
                    }
                
            },
          LigneModel: {
                nomLigne: {
                    type: 'string',
                    example: 'c6'
                },
                avis: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/AvisModel'
                    }
                }
            
        }
        
        }
      }};

      swagger(outputFile, endpointsFiles, config);
