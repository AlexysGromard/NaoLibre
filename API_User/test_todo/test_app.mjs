"use strict"
import * as chai from "chai";
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;
import supertest from "supertest"
import server from "../server.mjs";
import {mongoose} from "mongoose";
const requestWithSupertest = supertest(server)

//Utilise l'environnement du serveur (TEST, DEV, PROD)
describe("GET /airports", function () {
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri)
    })

    after(async ()=>{
        await mongoose.connection.close()
    })
    it("GET /user", async ()=> {
        const response = await requestWithSupertest.get("/api/v0/user");
        expect(response.status).to.eql(200)

    });

    it("GET /user/XXX not found", async  ()=> {
        const response = await requestWithSupertest.get("/api/v0/user/XXX");
        expect(response.status).to.eql(404)
        expect(response.body).to.be.deep.equal({ message: 'user not found' })

    });

    it("POST /user add a valid user", async  ()=> {
        const response = await requestWithSupertest.post("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login: 'JoJo', password: 'pass'})
        expect(response.status).to.eql(201)
        expect(response.body).to.be.deep.equal({login: 'JoJo', password: 'pass'})
    });

    it("POST /user add a invalid user wrong attribut", async  ()=> {
        const response = await requestWithSupertest.post("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login2: 'JoJo', password: 'pass'})
        expect(response.status).to.eql(400)
        expect(response.body).to.be.deep.equal({message: "not added"})
    });

    it("POST /user add a invalid user missing attribut on existing login", async  ()=> {
        const response = await requestWithSupertest.post("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login: 'JoJo'})
        expect(response.status).to.eql(400)
        expect(response.body).to.be.deep.equal({message: "not added"})
    });

    it("POST /user an existing user", async  ()=> {
        const response = await requestWithSupertest.post("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login: 'JoJo', password : '4321'})
        expect(response.status).to.eql(400)
        expect(response.body).to.be.deep.equal({message: "not added"})
    });

    it("DELETE /user an existing user", async  ()=> {
        const response = await requestWithSupertest.delete("/api/v0/user/JoJo")

        expect(response.status).to.eql(200)
        expect(response.body).to.be.deep.equal({message: "user deleted"})
    });

    it("DELETE /user an unexisting user", async  ()=> {
        const response = await requestWithSupertest.delete("/api/v0/user/XXXX")

        expect(response.status).to.eql(400)
        expect(response.body).to.be.deep.equal({message: "user not deleted"})
    });

    it("GET /user find an existing user", async  ()=> {
        await requestWithSupertest.delete("/api/v0/user/JoJo")
        await requestWithSupertest.post("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login: 'JoJo', password : '4321'})
        const response = await requestWithSupertest.get("/api/v0/user/JoJo")
        expect(response.status).to.eql(200)
        expect(response.body).to.be.deep.equal({login: 'JoJo', password : '4321'})
    });

    it("PUT /user update an existing user with correct parameters", async  ()=> {
        const response = await requestWithSupertest.put("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login: 'JoJo', password : '1234'})

        expect(response.status).to.eql(200)
        expect(response.body).to.be.deep.equal({login: 'JoJo', password : '1234'})
    });

    it("PUT /user update an existing user with missing parameters", async  ()=> {
        const response = await requestWithSupertest.put("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login: 'JoJo'})

        expect(response.status).to.eql(400)
        expect(response.body).to.be.deep.equal({ message: 'invalid paramters'})
    });

    it("PUT /user update an unexisting user with correct parameters", async  ()=> {
        const response = await requestWithSupertest.put("/api/v0/user")
            .set('Content-type', 'application/json')
            .send({login: 'JoJoX', password: '1234'})

        expect(response.status).to.eql(400)
        expect(response.body).to.be.deep.equal({ message: 'not updated'})
    });
});

