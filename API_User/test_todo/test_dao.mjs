"use strict"
import * as chai from "chai";
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

import {mongoose} from 'mongoose';
/*
await mongoose.connection.close()
const {MongoMemoryServer}  = await import('mongodb-memory-server')
const mongoServer = await MongoMemoryServer.create();
const uri = mongoServer.getUri();
await mongoose.connect(uri)
*/

import userDAO from "../api/dao/userDAO.mjs";
import User from "../api/model/userModel.mjs";

describe("UserDAO", function () {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri)
    })

    beforeEach(async ()=>{
        await userDAO.removeAll()
    })

    it("findAll empty", async ()=> {

        const users = await userDAO.findAll()
        expect(users).to.be.an("array").that.is.empty
    })

    it("findAll one user", async ()=> {
        const user1 = new User({login: "JoJo",password: "1234"})
        await userDAO.add(user1)
        const users = await userDAO.findAll()
        expect(users).to.have.deep.members([user1])
    })

    it("findAll two user", async ()=> {
        const user1 = new User({login: "JoJo",password: "1234"})
        const user2 = new User({login: "Raoul",password: "1234"})
        await userDAO.add(user1)
        await userDAO.add(user2)
        const users = await userDAO.findAll()
        expect(users).to.have.deep.members([user1, user2])
    })


    it("Add and reject with bad data ", async ()=> {
        const user = {jj:12}
        try {
            await userDAO.add(user)
        } catch (e) {expect(e).to.be.equal("Not a valid user")}

    })

    it("Add valid user", async ()=> {
        const user = new User({login: "JoJo",password: "1234"})
        const userFromBd  =  await userDAO.add(user)
        expect(userFromBd).to.be.deep.equal(user)
    })
    it("Add existing login", async ()=> {
        try {
            const user = new User({login: "JoJo", password: "1234"})
            await userDAO.add(user)
            await userDAO.add(user)
        }catch (e) {expect(e).to.be.equal("User already exists")}
    })
    it("Remove existing login", async ()=> {
            const user = new User({login: "JoJo", password: "1234"})
            await userDAO.add(user)
            expect(await userDAO.removeByLogin(user.login)).to.be.equal(true)
    })
    it("Remove unexisting login", async ()=> {
        expect(await userDAO.removeByLogin("XXX")).to.be.equal(false)
    })
    it("Update unexisting login", async ()=> {
        const user = new User({login: "JoJo", password: "1234"})

        expect(await userDAO.update(user)).to.be.null
    })
    it("Update existing login", async ()=> {
        const user = new User({login: "JoJo", password: "1234"})
        await userDAO.add(user)
        user.password="4321"
        expect(await userDAO.update(user)).to.be.deep.equal(user)
    })
})


