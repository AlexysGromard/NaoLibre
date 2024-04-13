"use strict";

//IMPORTS
import { expect,assert,should } from 'chai'

import LigneModel from '../../api/model/LigneModel.mjs';
import AvisModel from '../../api/model/AvisModel.mjs';

import mongoose from 'mongoose';


// TESTS
// Test de la classe LigneModel

describe("Test Model LigneModel", function() {

    // Objet
    it('Objet LigneModel avec les bonnes proprieté',function(){
        const ligne = {
            nomLigne: "test",
            avis:[]
        }

        const ligneModel = new LigneModel(ligne);
        expect(ligneModel).to.have.property('nomLigne',ligne.nomLigne);
        expect(ligneModel).to.have.property('avis',ligne.avis);
    });


    it('Objet LigneModel sans nomLigne',function(){
        const ligne = {
            avis:[]
        }

        expect(() => new LigneModel(ligne)).to.throw('Invalid object type');
    });

    it('Objet LigneModel sans avis',function(){
        const ligne = {
            nomLigne: "test"
        }

        expect(() => new LigneModel(ligne)).to.throw('Invalid object type');
    });

    it('Objet LigneModel sans nomLigne et avis',function(){
        const ligne = {
        }

        expect(() => new LigneModel(ligne)).to.throw('Invalid object type');
    });

    it('Objet LigneModel avec des proprietés en plus',function(){
        const ligne = {
            nomLigne: "test",
            avis:[],
            erreur: null
        }

        expect(() => new LigneModel(ligne)).to.throw('Invalid object type');
    });


    // Type

    it('Objet LigneModel avec nomLigne de type string',function(){
        const ligne = {
            nomLigne: "test",
            avis:[]
        }

        const ligneModel = new LigneModel(ligne);
        expect(ligneModel.nomLigne).to.be.a('string');
    });


    it('Objet LigneModel avec avis de type array',function(){
        const ligne = {
            nomLigne: "test",
            avis:[]
        }

        const ligneModel = new LigneModel(ligne);
        expect(ligneModel.avis).to.be.a('array');
    });


    it('Objet LigneModel avec nomLigne de type number  KO',function(){
        const ligne = {
            nomLigne: 55,
            avis:[]
        }

        const createLigne = () => new LigneModel(ligne);
        expect(createLigne).to.throw();
    });

    it('Objet LigneModel avec avis de type string KO',function(){
        const ligne = {
            nomLigne: "test",
            avis:"test"
        }

        const createLigne = () => new LigneModel(ligne);
        expect(createLigne).to.throw();
    });


    it('Objet LigneModel avec un liste de avis de type array d AvisModel',function(){
        const ligne = {
            nomLigne: "test",
            avis:[
                new AvisModel({
                    iduser: new mongoose.Types.ObjectId(),
                    note: 3,
                    date: new Date().toString(),
                    dayweek: "Monday"
                }),
                new AvisModel({
                    iduser: new mongoose.Types.ObjectId(),
                    note: 3,
                    date: new Date().toString(),
                    dayweek: "Monday"
                })
            ]

        }


        const ligneModel = new LigneModel(ligne);

        ligneModel.avis.forEach(avis => {
            expect(avis).to.be.an.instanceof(AvisModel);
        });


        
    });

    it('Objet LigneModel avec un liste de avis de type array quelconque KO',function(){
        const ligne = {
            nomLigne: "test",
            avis:[
                false,
                true
            ]

        }

        const createLigne = () => new LigneModel(ligne);
        expect(createLigne).to.throw();
    });


});
