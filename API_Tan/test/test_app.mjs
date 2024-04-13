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
describe("GET /tan", function () {

    after(async ()=>{
        await mongoose.connection.close()
    })
    it("GET /travaux/FakeLine", async ()=> {
        const response = await requestWithSupertest.get("/tan/travaux/256544515454");
        expect(response.status).to.eql(404)

    });
    it("GET /arret/FakePos", async ()=> {
        const response = await requestWithSupertest.get("/tan/arret/1545454545/51201212121");
        expect(response.status).to.eql(404)

    });
    it("GET /arret/GoodPos", async ()=> {
        const response = await requestWithSupertest.get("/tan/arret/47,21661/-1,556754");
        expect(response.status).to.eql(200)

    });

    it("GET /lignes", async ()=> {
        const response = await requestWithSupertest.get("/tan/lignes");
        expect(response.status).to.eql(200)

    });

    it("GET /tempsattente/GoodArret", async ()=> {
        const response = await requestWithSupertest.get("/tan/tempsattente/Orvault Grand Val");
        expect(response.status).to.eql(200)

    });

    it("GET /tempsattente/BadArret", async ()=> {
        const response = await requestWithSupertest.get("/tan/tempsattente/Orvault Grand sdsqdVal");
        expect(response.status).to.eql(404)

    });
});

