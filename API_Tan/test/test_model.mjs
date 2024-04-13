"use strict"
import * as chai from "chai";
import Bus from "../api/model/BusModel.mjs";
import Arret from "../api/model/ArretModel.mjs";
import Ligne from "../api/model/LigneModel.mjs";
import Pos from "../api/model/PositionModel.mjs";

let assert = chai.assert;
let should = chai.should();
let expect = chai.expect;



describe("Test du model Arret", function () {
    it("should create an Arret object with all properties", function () {
      const codelieu = "AR-001";
      const libelle = "Arrêt Mairie";
      const distance = 100;
      const ligne = "Ligne 1";
      const nom = "nom1";
      const arret = new Arret(codelieu,nom, libelle, distance, ligne);
  
      expect(arret).to.have.property("codelieu", codelieu);
      expect(arret).to.have.property("libelle", libelle);
      expect(arret).to.have.property("nom", nom);
      expect(arret).to.have.property("distance", distance);
      expect(arret).to.have.property("ligne", ligne);
    });
  
    it("should create an Arret object with optional distance set to null", function () {
      const codelieu = "AR-002";

  
      const arret = new Arret(codelieu);
  
      expect(arret).to.have.property("codelieu", codelieu);
      expect(arret).to.have.property("libelle", null);
      expect(arret).to.have.property("distance", null); // Expect distance to be null
      expect(arret).to.have.property("ligne", null);
      expect(arret).to.have.property("nom", null);
    });
  
    // Add more tests for other functionalities of the Arret model (e.g., validation)
  });


  describe("Test du model Bus", function () {
    it("should create a Bus object with all properties", function () {
      const ligne = "Ligne 3";
      const terminus = "Gare Centrale";
      const temps = 25;
      const sens = "Aller";
      const codeArret = "AR-003";
  
      const bus = new Bus(ligne, terminus, temps, sens, codeArret);
  
      expect(bus).to.have.property("ligne", ligne);
      expect(bus).to.have.property("terminus", terminus);
      expect(bus).to.have.property("temps", temps);
      expect(bus).to.have.property("sens", sens);
      expect(bus).to.have.property("codeArret", codeArret);
    });
  
  
    // Add more tests for other functionalities of the Bus model (e.g., validation)
  });

  describe("Test de la classe Ligne", function () {
    it("should return the same instance of Ligne", function () {
      const ligne1 = Ligne.getInstance();
      const ligne2 = Ligne.getInstance();
  
      expect(ligne1).to.be.equal(ligne2);
    });
  });

  describe("Test de la méthode init de Ligne", function () {
    it("should initialize lignes and dateMiseAJour", async function () {
      const initialDate = Ligne.dateMiseAJour;
      await Ligne.init();
  
      expect(Ligne.lignes).to.be.an("array").and.not.empty;
      expect(Ligne.dateMiseAJour).to.be.a("date").and.to.be.greaterThan(initialDate);
    });
  });

  describe("Test de la méthode getLignes", function () {
    it("should return an array of line names", async function () {
      const lignes = await Ligne.getLignes();
  
      expect(lignes).to.be.an("array").and.not.empty;
      lignes.forEach((ligne) => expect(ligne).to.be.a("string"));
    });  });
  
  
    describe("Test de la classe Pos", function () {
        it("should create a Pos object with valid coordinates", function () {
          const latitude = 47.218371;
          const longitude = -1.557789;
      
          const pos = new Pos(latitude, longitude);
      
          expect(pos.latitude).to.equal(latitude);
          expect(pos.longitude).to.equal(longitude);
        });
      
       
      });
      