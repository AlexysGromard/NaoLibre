"use strict";

// IMPORTS
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
//.mjs
import userDAO from "../repositories/userDAO"; 
import avisDAO from "../repositories/avisDAO"; 
import UserModel  from '../model/UserModel';

import crypter from '../tools/cryptage';
import AvisModel from '../model/AvisModel';


//list des jours de la semaine (de dimanche à samedi)
const daysofweek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

// ROUTES
const router = express.Router();


/**
 * @route /user
 * @description Route pour les utilisateurs
 * 
 * @method GET - Récupérer tous les utilisateurs
 * @method POST  - Ajouter un utilisateur
 */
router
    .route('/user')


        // GET /user  - Récupérer tous les utilisateurs
        .get(async (req: Request, res: Response) =>{
            /*
                #swagger.tags = ['User']
                #swagger.summary = 'Recuperer tous les utilisateurs'

                #swagger.description = 'Endpoint pour recuperer tous les utilisateurs'

                #swagger.responses[200] = {
                    description: 'Liste des utilisateurs',
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/UserModel"
                                }
                            }
                        }
                    }
                }
            */

            const users = await userDAO.findAll();
            res.status(200).send(users);
        })


        // POST /user - Ajouter un utilisateur
        .post(async (req: Request, res: Response) =>{
        /*
            #swagger.tags = ['User']
            #swagger.summary = 'Ajouter un utilisateur'
            #swagger.description = 'Endpoint pour ajouter un utilisateur'

            #swagger.parameters['User'] = {
                in: 'body',
                description: 'Informations de l\'utilisateur',
                required: true,
                schema: {
                    "type": "object",
                    "properties": {
                        "name": {
                            "example": "test"
                        },
                        "email": {
                            "example": "example@example.example"
                        },
                        "password": {
                            "example": "example"
                        }
                    }
                }
            }

            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: 'string',
                                    example: 'example'
                                },
                                email: {
                                    type: 'string',
                                    example: 'example@example.com'
                                },
                                password: {
                                    type: 'string',
                                    example: 'example'
                                }
                            }
                        }  
                    }
                }
            }

            #swagger.responses[201] = {
                description: 'Utilisateur ajouté avec succès',
                content: {
                    "application/json": {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Utilisateur ajouté avec succès'
                                }
                            }
                        }
                    }
                }
            }

            #swagger.responses[400] = {
                description: 'Erreur lancée par l\'API',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    description: 'L\'utilisateur existe déjà /OU/ Email or password is null /OU/ Autre erreur'
                                }
                            }                                
                        }
                    }
                }
            }


        */

            try {
    
                //const userExist = await userDAO.findByEmailAndPassword(req.body.email, req.body.password);
                const userExist = await userDAO.exist(req.body.email);
                if (userExist) {
                    res.status(400).send({ message: 'L\'utilisateur existe déjà' });
                    return;
                }
    
                // Générer un nouvel identifiant
                req.body._id = new mongoose.Types.ObjectId();
    
                //inisialisation de point et favori
                req.body.point = 0;
                req.body.favori = [];
    
                
                const userData = new UserModel(req.body); // Créer un nouvel utilisateur
                if (userData.email === null || userData.password === null) {
                    res.status(400).send({ message : "Email or password is null"});
                    return;
                }
    
                // Ajouter l'utilisateur et envoyer une réponse
                await userDAO.add(userData);
    
                const userResult = await userDAO.findByEmailAndPassword(req.body.email,req.body.password)
                res.status(201).send({ message: 'Utilisateur ajouté avec succès',user : {...userResult} });
            }
            catch (error) {
                const errorMessage = (error as Error).message;
                res.status(400).send({ message: errorMessage });
            }
        });

        
/**
 * @route /user/:email/:password
 * @description Route pour un utilisateur
 * 
 * @method GET - Récupérer un utilisateur par son email et mot de passe
 * @method PUT - Mettre à jour un utilisateur
 * @method DELETE - Supprimer un utilisateur par son email et mot de passe
 * 
 */
router
    .route('/user/:email/:password')


    // GET /user/:email/:password - Récupérer un utilisateur par son email et mot de passe
    .get(async (req: Request, res: Response) =>{
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Recuperer un utilisateur'
    #swagger.description = 'Endpoint pour recuperer un utilisateur par son email et mot de passe'

    #swagger.parameters['email'] = { description: 'Email de l\'utilisateur', type: 'string' }
    #swagger.parameters['password'] = { description: 'Mot de passe de l\'utilisateur', type: 'string' }

    #swagger.responses[200] = {
        description: 'Utilisateur trouvé',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UserModel"
                }
            }
        }
    }

    #swagger.responses[404] = {
        description: 'Utilisateur non trouvé',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            description: 'Utilisateur non trouvé'
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: 'Autre erreur',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }
    */
        try {
            console.log("GET /user/:email/:password")
            const email = req.params.email;
            const password = req.params.password;
            const user = await userDAO.findByEmailAndPassword(email, password);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            res.status(400).send({ message: (error as Error).message });
        }
    })


    // PUT /user/:email/:password - Mettre à jour un utilisateur
    .put(async (req: Request, res: Response)=> {
    /*
       #swagger.tags = ['User']
        #swagger.summary = 'Mettre à jour un utilisateur'
        #swagger.description = 'Endpoint pour mettre à jour un utilisateur'

        #swagger.parameters['email'] = { description: 'Email de l\'utilisateur', type: 'string' }
        #swagger.parameters['password'] = { description: 'Mot de passe de l\'utilisateur', type: 'string' }

        #swagger.parameters['User'] = {
            in: 'body',
            description: 'Informations de l\'utilisateur',
            required: true,
            schema: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        example: "John"
                    },
                    email: {
                        type: "string",
                        example: "john@example.com"
                    },
                    password: {
                        type: "string",
                        example: "password"
                    }
                }
            }
        }

        #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: 'string',
                            example: 'example'
                        },
                        email: {
                            type: 'string',
                            example: 'example@example.example'
                        },
                        password: {
                            type: 'string',
                            example: 'example'
                        },
                        favori: {
                            type: 'array',
                            items: {
                                type: 'string',
                                example: 'Cardo'
                            }
                        }
                        
                    }
                }  
            }
        }
    } 

        #swagger.responses[200] = {
            description: 'Utilisateur mis à jour avec succès',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                 description: 'Utilisateur mis à jour avec succès'
                            }
                        }                                
                    }
                }
            }
        }
        #swagger.responses[402] = {
            description: 'the curent email or password are not correct /OU/ there is not email or password',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                description: 'there is not email or password'
                            }
                        }                                
                    }
                }
            }
        }

        #swagger.responses[400] = {
            description: 'Autre erreur',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }                                
                    }
                }
            }
        }

    */
        try {
            console.log("Put /user/:email/:password")
            // Récupérer les paramètres de la requête
            const email = req.params.email;
            const password = req.params.password;

            const curentUser = await userDAO.findByEmailAndPassword(email,password)
            if (curentUser == null){
                res.status(402).send({ message : "the curent email or password are not correct"})
                return;
            }

            //vérification des information du nouveau user
            if (!req.body.password && req.body.password == null || !req.body.email || req.body.email == null){
                res.status(402).send({ message : "there is not email or password"})
                return;
            }
            //set les valeurs statique sur le nouveau user
            req.body._id = curentUser._id
            req.body.point = curentUser.point
            
            // Mettre à jour l'utilisateur
            const updatedUserData = new UserModel(req.body);

            // Update le user
            await userDAO.update(email,password,updatedUserData);

            const userResult = await userDAO.findByEmailAndPassword(req.body.email,req.body.password)

            res.status(200).send({ message: 'Utilisateur mis à jour avec succès', user : {...userResult} } );
        } catch (error) {
            res.status(400).send({ message: (error as Error).message });
        }
    })


    // DELETE /user/:email/:password - Supprimer un utilisateur par son email et mot de passe
    .delete(async (req: Request, res: Response)=> {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Supprimer un utilisateur'
    #swagger.description = 'Endpoint pour supprimer un utilisateur'

    #swagger.parameters['email'] = { description: 'Email de l\'utilisateur', type: 'string' }
    #swagger.parameters['password'] = { description: 'Mot de passe de l\'utilisateur', type: 'string' }

    #swagger.responses[200] = {
        description: 'Utilisateur supprimé avec succès',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Utilisateur supprimé avec succès'
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: 'l\'utilisateur n\'a pas pu être supprimé',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'l\'utilisateur n\'a pas pu être supprimé /OU/ Error'
                        }
                    }
                }
            }
        }
    }

    */


        try {
            console.log("DELETE /user/:email/:password");
            // Récupérer les paramètres de la requête
            const email = req.params.email;
            const password = req.params.password;
            // Supprimer l'utilisateur
            var ok = await userDAO.removeUser(email, password);
            
            if (ok){
                res.status(200).send({ message: 'L\'utilisateur supprimé avec succès' });
            }
            else{
                res.status(400).send({ message: 'l\'utilisateur n\'a pas put être suprimer' });
            }
        } catch (error) {
            res.status(400).send({ message: (error as Error).message });
        }
    });


/**
 * @route /avis
 * @description Route pour les avis
 * 
 * @method GET - Récupérer tous les avis
 * @method POST - Ajouter un avis
 * 
 */
router.route('/avis')

    // GET /avis - Récupérer tous les avis
    .get(async (req: Request, res: Response) =>{
    /*
    #swagger.tags = ['Avis']
    #swagger.summary = 'Recuperer tous les avis'
    #swagger.description = 'Endpoint pour recuperer tous les avis'

    #swagger.responses[200] = {
        description: 'Liste des avis',
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: {
                        $ref: "#/components/schemas/LigneModel"
                    }
                }
            }
        }
    }
    */
        const lignes = await avisDAO.findAll()
        res.status(200).send(lignes);
    });





/**
 * @route /avis/:nomLigne
 * @description Route pour un avis
 * 
 * @method GET - Récupérer un avis par le nom de la ligne et la direction
 * @method POST - Ajouter un avis
 * @method DELETE - Supprimer un avis par le nom de la ligne et la direction
 */
router.route('/avis/:nomLigne')

    // GET /avis/:nomLigne - Récupérer un avis par le nom de la ligne et la direction
    .get(async (req, res) => {
    /*
        #swagger.tags = ['Avis']
        #swagger.summary = 'Recuperer un avis'
        #swagger.description = 'Endpoint pour recuperer un avis par le nom de la ligne'

        #swagger.parameters['nomLigne'] = { description: 'Nom de la ligne', type: 'string' }

        #swagger.responses[200] = {
            description: 'Avis trouvé',
            content: {
                "application/json": {
                    schema: { 
                        $ref: "#/components/schemas/LigneModel"
                    }
                }
            }
        }

        #swagger.responses[401] = {
            description: 'Cette ligne n\'a pas d\'avis',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                
                                description: 'Cette ligne n\'a pas d\'avis'
                            }
                        }                                
                    }
                }
            }
        }
    */
        console.log("GET /avis/:nomLigne");
        let ligne = await avisDAO.findByLigne(req.params.nomLigne);

        if (ligne == null) {
            res.status(401).send({ message : "This Ligne dosent have Avis"});
        }
        else {
            
            ///anonimisation des users
            ligne.avis.forEach((avi) => {
                const avis: any = avi;
                avis.iduser = null;
            });
            res.status(200).send(ligne);
        }
        
    })

/**
 * @route /avis
 * @description ajouteavis
 *
 * @method POST - Ajouter un avis
 *
 */
router.route('/avis/:nomLigne/:email/:password')
    // POST /avis/:nomLigne - Ajouter un avis
    .post(async (req: Request, res: Response) =>{
    /*
        #swagger.tags = ['Avis']
        #swagger.summary = 'Ajouter un avis'
        #swagger.description = 'Endpoint pour ajouter un avis'

        #swagger.parameters['nomLigne'] = { description: 'Nom de la ligne', type: 'string' }

        #swagger.parameters['Avis'] = {
            in: 'body',
            description: 'Informations de l\'avis',
            required: true,
            schema: {
                type: "object",
                properties: {
                    note: {
                        type: "integer",
                        example: 1
                    }
                }
            }
        }

        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            note: {
                                type: "integer",
                                example: 1
                            }
                        }
                    }  
                }
            }
        } 

        #swagger.responses[201] = {
            description: 'Avis ajouté avec succès',
            content: {
                "application/json": {
                    schema: { 
                        $ref: "#/components/schemas/AvisModel"
                    }
                }
            }
        }

               #swagger.responses[400] = {
            description: 'Erreur lancer par l\'API',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                
                                description: 'Avis is null /OU/ Ligne or email or password are null /OU/ email or password are not correct /OU/ the note is not correct /OU/ Error'
                            }
                        }     
                    }
                }
            }
        }
     



    */
        try {
            console.log("POST /avis/:nomLigne");
            if (req.body === null) {
                res.status(400).send({ message : "Avis is null"});
            }
    
            if (req.params.nomLigne === null || req.params.email === null || req.params.password === null) {
                res.status(400).send({ message : "Ligne or email or password are null"});
            }
            
            // vérification si le user est correcte
            const userWhoVoting = await userDAO.findByEmailAndPassword(req.params.email,req.params.password)
            if (userWhoVoting == null){
                res.status(400).send({ message : "email or password are not correct"})
                return;
            }
    
            if (!req.body.note || !Number.isInteger(req.body.note) || !(req.body.note <= 3 && req.body.note >= 1)){
                res.status(400).send({ message : "the note is not correct"})
            }
    
            req.body.iduser = userWhoVoting._id
            let dateOftheDay = new Date()
            req.body.date = dateOftheDay.toString()
            req.body.dayweek = daysofweek[dateOftheDay.getDay()]
            console.log("TYPE :: ",req.body)
            console.log(typeof req.body.date)
            const newAvis = new AvisModel(req.body);
            await avisDAO.addAvis(newAvis , req.params.nomLigne);
    
            //ajouter 1 point
            userWhoVoting.point +=1
            userWhoVoting.password = req.params.password
            await userDAO.update(req.params.email,req.params.password, userWhoVoting)
    
            res.status(201).send(await avisDAO.findByLigne(req.params.nomLigne));
        } catch (error) {
            res.status(400).send({ message: (error as Error).message });
        }
    });

export default router;
