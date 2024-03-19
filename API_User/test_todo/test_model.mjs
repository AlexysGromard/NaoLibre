"use strict"
import * as chai from "chai";
import User from '../api/model/userModel.mjs'
let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;

describe("Test du model User", function () {
    it("create", async ()=> {
       const user = new User({login: "JoJo", password: "1234"})
        expect(user).to.have.property('login','JoJo')
        expect(user).to.have.property('password','1234')
        expect(user).to.have.all.keys('login','password')});
});
