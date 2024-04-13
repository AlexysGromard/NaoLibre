"use strict"
import * as chai from "chai";
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
import Bus from "../api/model/BusModel.mjs";
import Pos from "../api/model/PositionModel.mjs";
import {mongoose} from 'mongoose';
/*
await mongoose.connection.close()
const {MongoMemoryServer}  = await import('mongodb-memory-server')
const mongoServer = await MongoMemoryServer.create();
const uri = mongoServer.getUri();
await mongoose.connect(uri)
*/

//import User from "../api/model/tanModel.mjs";
import tanDAO from "../api/dao/tanDAO.mjs";

describe("tanDAO", function () {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri)
    })

   
    it("Getlignes", async ()=> {
        let lignes = await tanDAO.GetLignes()
        
        expect(lignes).to.be.an("array").that.is.of.length(108)
    })

    it("GetAllArrets", async ()=> {
        let lignes = await tanDAO.GetAllArrets()
        
        expect(lignes).to.be.an("array").that.is.of.length(1126)
    })
    
    // on ne peut pas tester une ligne qui marche car il se pourrait qu'il n'y ai pas de travaux donc le test n passera pas toujours
    it("GetTravauxWrongLine", async ()=> {
        try {
            await tanDAO.getTravaux(1245484)
        } catch (e) {expect(e).to.be.equal("pas de travaux à cet arret")}
        
    })

    it("GetTimeAtArretGoodLine", async ()=> {
        const arrets = await tanDAO.GetTimeAtArret("Orvault Grand Val")
        expect(arrets[0]).to.be.an.instanceOf(Bus);  
    })
    it("GetTimeAtArretGoodLine2", async ()=> {
        const arrets = await tanDAO.GetTimeAtArret("Gare de Pont Rousseau")
        expect(arrets[0]).to.be.an.instanceOf(Bus);  
    })
    it("GetTimeAtArretWrongLine", async ()=> {
       
        try {
            await tanDAO.GetTimeAtArret("Gare du Adazdasq")
        } catch (e) {expect(e).to.be.equal("mauvais nom d\'arret")}
         
    })


    it("GetCloseArretWrongPos", async ()=> {
        try {
            const pos = new Pos(80,6)
            await tanDAO.getCloseArret(pos)
        } catch (e) {expect(e).to.be.equal("coordonnées mauvaises")}
    })
    it("GetCloseArretGoodLine", async ()=> {
        
        const pos = new Pos(47.21661,-1.556754)
        const arret = await tanDAO.getCloseArret(pos)
        expect(arret).to.be.an("array").that.is.of.length(10)
        
    })

    // On ne peut pas tester un qui marche car le test ne passera pas tout le temps vu que les travaux changent tous les jours

    // it("findAll two user", async ()=> {
    //     const user1 = new User({login: "JoJo",password: "1234"})
    //     const user2 = new User({login: "Raoul",password: "1234"})
    //     await userDAO.add(user1)
    //     await userDAO.add(user2)
    //     const users = await userDAO.findAll()
    //     expect(users).to.have.deep.members([user1, user2])
    // })


    // it("Add and reject with bad data ", async ()=> {
    //     const user = {jj:12}
    //     try {
    //         await userDAO.add(user)
    //     } catch (e) {expect(e).to.be.equal("Not a valid user")}

    // })

    // it("Add valid user", async ()=> {
    //     const user = new User({login: "JoJo",password: "1234"})
    //     const userFromBd  =  await userDAO.add(user)
    //     expect(userFromBd).to.be.deep.equal(user)
    // })
    // it("Add existing login", async ()=> {
    //     try {
    //         const user = new User({login: "JoJo", password: "1234"})
    //         await userDAO.add(user)
    //         await userDAO.add(user)
    //     }catch (e) {expect(e).to.be.equal("User already exists")}
    // })
    // it("Remove existing login", async ()=> {
    //         const user = new User({login: "JoJo", password: "1234"})
    //         await userDAO.add(user)
    //         expect(await userDAO.removeByLogin(user.login)).to.be.equal(true)
    // })
    // it("Remove unexisting login", async ()=> {
    //     expect(await userDAO.removeByLogin("XXX")).to.be.equal(false)
    // })
    // it("Update unexisting login", async ()=> {
    //     const user = new User({login: "JoJo", password: "1234"})

    //     expect(await userDAO.update(user)).to.be.null
    // })
    // it("Update existing login", async ()=> {
    //     const user = new User({login: "JoJo", password: "1234"})
    //     await userDAO.add(user)
    //     user.password="4321"
    //     expect(await userDAO.update(user)).to.be.deep.equal(user)
    // })
})


