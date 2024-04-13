"use strict";


//IMPORTS
import userDAO from '../../api/repositories/userDAO.mjs';
import avisDAO from "../../api/repositories/avisDAO.mjs";

import AvisModel from '../../api/model/AvisModel.mjs';
import LigneModel from '../../api/model/LigneModel.mjs';
import UserModel from '../../api/model/UserModel.mjs';


import mongoose,{Types} from 'mongoose';
import {expect, use} from 'chai';
import exp from 'constants';

// CONSTANTES & VARIABLES

const user = new UserModel({
    _id : new Types.ObjectId(),
    name : "test",
    email : "test@test.test",
    password : "test",
    point : 0,
    favori : []
})

const user1 = new UserModel({
    _id : new Types.ObjectId(),
    name : "test1",
    email : "test@test.test",
    password : "test",
    point : 0,
    favori : []
})

const user2 = new UserModel({
    _id : new Types.ObjectId(),
    name : "test2",
    email : "test2@test.test",
    password : "test",
    point : 0,
    favori : []
})

const user3 = new UserModel({
    _id : new Types.ObjectId(),
    name : "test3",
    email : "test3@test.test",
    password : "test",
    point : 0,
    favori : []
})

const user4 = new UserModel({
    _id : new Types.ObjectId(),
    name : "test4",
    email : "test4@test.test",
    password : "test",
    point : 0,
    favori : []
})

const user5 = new UserModel({
    _id : new Types.ObjectId(),
    name : "test5",
    email : "test5@test.test",
    password : "test",
    point : 0,
    favori : []
})


// Constantes
const USERS = [user, user1, user2, user3, user4, user5];
const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


//TESTS 
// test de la classe AvisDAO
describe ("Test de la classe AvisDAO",  function() {

    /**
     * @async
     * @description Avant les tests et on ajoute les utilisateurs
     */
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri)
        await avisDAO.removeAll()

        USERS.forEach(async (user) => {
            await userDAO.add(user)
        })
    })

    /**
     * @async
     * @description Après chaque test on supprime tous les utilisateurs
     */
    beforeEach(async ()=>{
        await avisDAO.removeAll()
    })

    /**
     * @async
     * @description Après tous les tests on ferme la connexion
     * */
    after(async ()=>{
        await mongoose.connection.close()
    })

    //findAll
    it("findAll vide", async function(){
        const avis = await userDAO.findAll()
        expect(avis).to.be.an('array')
        expect(avis).to.have.lengthOf(0)

    })


    it("findAll avec un avis", async function(){

        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })

        const newligne1 = new LigneModel({
            nomLigne : "test1",
            avis : []
        })

        const newligne2 = new LigneModel({
            nomLigne : "test2",
            avis : []
        })

    await avisDAO.addLigne(newligne)
    await avisDAO.addLigne(newligne1)
    await avisDAO.addLigne(newligne2)

    const newAvis = new AvisModel({
        iduser : USERS[0]._id,
        note : 3,
        date : new Date().toString(),
        dayweek : DAY[new Date().getDay()]
    })

    const newAvis1 = new AvisModel({
        iduser : USERS[1]._id,
        note : 3,
        date : new Date().toString(),
        dayweek : DAY[new Date().getDay()]
    })

    const newAvis2 = new AvisModel({
        iduser : USERS[2]._id,
        note : 3,
        date : new Date().toString(),
        dayweek : DAY[new Date().getDay()]
    })

    const newAvis3 = new AvisModel({
        iduser : USERS[3]._id,
        note : 3,
        date : new Date().toString(),
        dayweek : DAY[new Date().getDay()]
    })

    await avisDAO.addAvis(newAvis, "test")
    await avisDAO.addAvis(newAvis1, "test")
    await avisDAO.addAvis(newAvis2, "test")
    await avisDAO.addAvis(newAvis3, "test1")

    const avis = await avisDAO.findAll()
    expect(avis).to.be.an('array')
    expect(avis).to.have.lengthOf(3)
    expect(avis[0].nomLigne).to.equal("test")
    expect(avis[0].avis).to.have.lengthOf(3)
    expect(avis[1].nomLigne).to.equal("test1")
    expect(avis[1].avis).to.have.lengthOf(1)
    expect(avis[2].nomLigne).to.equal("test2")
    expect(avis[2].avis).to.have.lengthOf(0)


    });

    // findByLigne
    it("findByLigne vide", async function(){
        const avis = await avisDAO.findByLigne("test")
        expect(avis).to.be.null
    })

    it("findByLigne avec un avis", async function(){
        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })
        await avisDAO.addLigne(newligne)

        const addavis = new AvisModel({
            iduser : USERS[0]._id,
            note : 3,
            date : new Date().toString(),
            dayweek : DAY[new Date().getDay()]
        })



        await avisDAO.addAvis(addavis, "test")
        const avis = await avisDAO.findByLigne("test")
        
        expect(avis).to.be.an.instanceOf(LigneModel)
        expect(avis.nomLigne).to.equal("test")
        expect(avis.avis).to.have.lengthOf(1)
        expect(avis.avis[0]).to.be.an.instanceOf(AvisModel)
        expect(avis.avis[0].iduser).to.deep.equal(USERS[0]._id)
        
    })

    it("findByLigne avec plusieurs avis", async function(){

                const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })
        await avisDAO.addLigne(newligne)

        const addavis = new AvisModel({
            iduser : USERS[0]._id,
            note : 3,
            date : new Date().toString(),
            dayweek : DAY[new Date().getDay()]
        })

        const addavis1 = new AvisModel({
            iduser : USERS[1]._id,
            note : 3,
            date : new Date().toString(),
            dayweek : DAY[new Date().getDay()]
        })
        await avisDAO.addAvis(addavis, "test")
        await avisDAO.addAvis(addavis1, "test")

        const avis = await avisDAO.findByLigne("test")

        expect(avis).to.be.an.instanceOf(LigneModel)
        expect(avis.nomLigne).to.equal("test")
        expect(avis.avis).to.have.lengthOf(2)
        avis.avis.forEach((avi) => {
            expect(avi).to.be.an.instanceOf(AvisModel)
            expect(avi.iduser).to.be.an.instanceOf(Types.ObjectId)
        })
        expect(avis.avis[0].iduser).to.deep.equal(USERS[0]._id)
        expect(avis.avis[1].iduser).to.deep.equal(USERS[1]._id)
    })

    it("findByLigne parametre null", async function(){
        try {
            await avisDAO.findByLigne(null)
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal("nomligne is null")
        }
    })

    it("findByLigne parametre ko", async function(){
        try {
            await avisDAO.findByLigne(3)
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal("The nomligne is not a string")
        }

    })

    //addAvis
    it("addAvis avec un avis", async function(){
        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })
        await avisDAO.addLigne(newligne)

        const avisClient = new AvisModel({
            iduser : USERS[0]._id,
            note : 3,
            date : new Date().toString(),
            dayweek : DAY[new Date().getDay()]
        })

        const avis = await avisDAO.addAvis(avisClient, "test")

        expect(avis).to.be.an.instanceOf(LigneModel)
        expect(avis.nomLigne).to.equal("test")
        expect(avis.avis).to.have.lengthOf(1)
        expect(avis.avis[0]).to.be.an.instanceOf(AvisModel)
        expect(avis.avis[0].iduser).to.deep.equal(USERS[0]._id)
        expect(avis.avis[0].note).to.equal(3)

    })

    it("addAvis avec plusieurs avis", async function(){
        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })
        await avisDAO.addLigne(newligne)

        const avisClient = new AvisModel({
            iduser : USERS[0]._id,
            note : 3,
            date : new Date().toString(),
            dayweek : DAY[new Date().getDay()]
        })

        const avisClient1 = new AvisModel({
            iduser : USERS[1]._id,
            note : 3,
            date : new Date().toString(),
            dayweek : DAY[new Date().getDay()]
        })

        await avisDAO.addAvis(avisClient, "test")
        const avis = await avisDAO.addAvis(avisClient1, "test")

        expect(avis).to.be.an.instanceOf(LigneModel)
        expect(avis.nomLigne).to.equal("test")
        expect(avis.avis).to.have.lengthOf(2)
        avis.avis.forEach((avi) => {
            expect(avi).to.be.an.instanceOf(AvisModel)
            expect(avi.iduser).to.be.an.instanceOf(Types.ObjectId)
        })
        expect(avis.avis[0].iduser).to.deep.equal(USERS[0]._id)
        expect(avis.avis[1].iduser).to.deep.equal(USERS[1]._id)
    });


    it("addAvis avec ligne inexistante", async function(){

        const newAvis = new AvisModel({
            iduser : USERS[0]._id,
            note : 3,
            date : new Date().toString(),
            dayweek : DAY[new Date().getDay()]
        })

        const res =  await avisDAO.addAvis(newAvis, "test")

        expect(res).to.be.an.instanceOf(LigneModel)
        expect(res.nomLigne).to.equal("test")
        expect(res.avis).to.have.lengthOf(1)
        expect(res.avis[0]).to.be.an.instanceOf(AvisModel)
        expect(res.avis[0].iduser).to.deep.equal(USERS[0]._id)

    })


    it('addAvis deux avis meme utilisateur, meme arret', async function(){
        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })

        await avisDAO.addLigne(newligne)

        const newAvis = new AvisModel({
            iduser : USERS[0]._id,
            note : 3,
            date : new Date().toISOString(),
            dayweek : DAY[new Date().getDay()]
        })


        const newAvis1 = new AvisModel({
            iduser : USERS[0]._id,
            note : 3,
            date : new Date().toISOString(),
            dayweek : DAY[new Date().getDay()]
        })

        await avisDAO.addAvis(newAvis, "test")
        await avisDAO.findByLigne("test")
        try {
            await avisDAO.addAvis(newAvis1, "test")
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal("l'utilisateur à déjà voter sur cette ligne il y a moins d'1h")
        }
    })

    it("addAvis avec parametre avis null", async function(){
        try {
            await avisDAO.addAvis(null, "test")
        } catch (error) {
            expect(error).to.be.an('error')
            expect(error.message).to.equal("Avis is null")
        }

    })

    it("addAvis avec parametre avis non instance de AvisModel", async function(){

        try {

            await avisDAO.addAvis(USERS[0], "test")
        } catch (error) {
            expect(error).to.be.an('error')
            expect(error.message).to.equal("Avis is not an instance of AvisModel")
        }

    })

    it("addAvis parametre ligne null", async function(){

        try {
            const newAvis = new AvisModel({
                iduser : USERS[0]._id,
                note : 3,
                date : new Date().toString(),
                dayweek : DAY[new Date().getDay()]
            })
            await avisDAO.addAvis(newAvis, null)
        } catch (error) {
            expect(error).to.be.an('error')
            expect(error.message).to.equal("Ligne is null")
        }

    })

    it("addAvis parametre ligne ko", async function(){

        try {
            const newAvis = new AvisModel({
                iduser : USERS[0]._id,
                note : 3,
                date : new Date().toString(),
                dayweek : DAY[new Date().getDay()]
            })
            await avisDAO.addAvis(newAvis, 5)
        } catch (error) {
            expect(error).to.be.an('error')
            expect(error.message).to.equal("The nomligne is not a string")
        }

    })
    //addLigne
    it("addLigne avec une ligne", async function(){
        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })
        await avisDAO.addLigne(newligne)
        const result = await avisDAO.findByLigne("test")
        expect(result).to.be.an.instanceOf(LigneModel)
        expect(result).to.deep.equal(newligne)
    })

    it("addLigne avec plusieurs lignes", async function(){
        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })

        const newligne1 = new LigneModel({
            nomLigne : "test1",
            avis : []
        })
        await avisDAO.addLigne(newligne)
        await avisDAO.addLigne(newligne1)

        const result = await avisDAO.findAll()
        expect(result).to.have.lengthOf(2)
        result.forEach((ligne) => {
            expect(ligne).to.be.an.instanceOf(LigneModel)
        })
        expect(result[0]).to.deep.equal(newligne)
        expect(result[1]).to.deep.equal(newligne1)
        
    })

    it("addLigne avec ligne deja existante", async function(){

        const newligne = new LigneModel({
            nomLigne : "test",
            avis : []
        })
        await avisDAO.addLigne(newligne)

        const newligne1 = new LigneModel({
            nomLigne : "test",
            avis : []
        })

        try {
            await avisDAO.addLigne(newligne1)
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal("la ligne existe déjà")
        }
    })

    it("addLigne avec ligne null", async function(){
        try {
            await avisDAO.addLigne(null)
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal("ligne is not an instance of LigneModel")
        }
    })

    it("addLigne parametre ligne ko", async function(){
        try {
            await avisDAO.addLigne("5")
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal("ligne is not an instance of LigneModel")
        }
    })

    
});