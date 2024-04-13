"use strict"
import express from 'express'
import tanController from '../controller/tanController.mjs'
import Pos from "../model/PositionModel.mjs";
const router = express.Router()

router
    .route('/travaux/:ligne')
        .get(async (req, res) =>{
            // #swagger.summary = 'travaux'
            // #swagger.description = 'Donne les travaux sûr une ligne donner si la ligne == -1 alors on donne tout les traveaux'
            const travaux = await tanController.getTravaux(req.params.ligne)
            if (travaux.length === 0) {
                return res.status(404).send({message : 'pas de travaux à cet arret'})
            }
            return res.status(200).send(travaux)
        })
router
    .route('/arret/:lat/:long')
        .get(async (req, res) =>{
            // #swagger.summary = 'arret au cordonner'
            // #swagger.description = 'Donner les arrêts proches de cette coordonnée GPS'
            const position = new Pos(req.params.lat, req.params.long)
            const liste_arret = await tanController.getCloseArret(position)
            
            if (liste_arret.length == 0) {
                return res.status(404).send({message : 'coordonnées mauvaises'})
            }
            return res.status(200).send(await tanController.getCloseArret(position))})
router
    .route('/lignes')
        .get(async (req, res) =>{
            // #swagger.summary = 'Tout les lignes'
            // #swagger.description = 'donne le nom de tout les lignes'
            res.status(200).send(await tanController.GetLignes())})
router
    .route('/arrets')
        .get(async (req, res) =>{
            // #swagger.summary = 'Tout les lignes'
            // #swagger.description = 'donne le nom de tout les arrêts'
            res.status(200).send(await tanController.GetAllArrets())}) 
router
    .route('/tempsattente/:CodeArret')
        .get(async (req, res) =>{
            // #swagger.summary = 'temps d attentes d'un arrête'
            // #swagger.description = 'Donne le temps d'attente des différentes lignes à cette arrêt.'
            const liste = await tanController.GetTimeAtArret(req.params.CodeArret)
         
            if (liste.length == 0) {
                return res.status(404).send({message : 'mauvais nom d\'arret'})
            }
            res.status(200).send(liste)})


export default router

