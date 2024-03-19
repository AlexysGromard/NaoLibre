"use strict"
import express from 'express'
import tanController from '../controller/tanController.mjs'
import Pos from "../model/PositionModel.mjs";
const router = express.Router()

router
    .route('/travaux/:ligne')
        .get(async (req, res) =>{
            // #swagger.summary = 'un résumé'
            // #swagger.description = 'une description'
            
            res.status(200).send(await tanController.getTravaux(req.params.ligne))})
router
    .route('/arret/:lat/:long')
        .get(async (req, res) =>{
            // #swagger.summary = 'un résumé'
            // #swagger.description = 'une description'
            const position = new Pos(req.params.lat, req.params.long)
            res.status(200).send(await tanController.getCloseArret(position))})
router
    .route('/user/:login')
    .get(async (req, res) =>{
        res.status(200).send({message: 'todo'})
    })
    .delete(async (req,res)=> {
        res.status(200).send({message: 'todo'})
    })

export default router

