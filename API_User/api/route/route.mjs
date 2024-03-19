"use strict"
import express from 'express'
import userController from '../controller/userController.mjs'
import userDAO from "../dao/userDAO.mjs";
const router = express.Router()

router
    .route('/user')
        .get(async (req, res) =>{
            // #swagger.summary = 'un résumé'
            // #swagger.description = 'une description'
            res.status(200).send(await userController.findAll())})
        .post(async (req, res) =>{
            res.status(200).send({message: 'todo'})
        })
        .put(async (req, res)=> {
            res.status(200).send({message: 'todo'})
        })
router
    .route('/user/:login')
    .get(async (req, res) =>{
        res.status(200).send({message: 'todo'})
    })
    .delete(async (req,res)=> {
        res.status(200).send({message: 'todo'})
    })

export default router

