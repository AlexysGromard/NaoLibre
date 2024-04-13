"use strict";

//IMPORTS
import { expect,assert,should } from 'chai'

import AvisModel from '../../api/model/AvisModel.mjs';
import mongoose from 'mongoose';

//TESTS
// Test de la classe AvisModel
describe("Test Model AvisModel", function() {
    
        // Objet
        it('Objet AvisModel avec les bonnes proprieté',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 2,
                date: new Date().toString(),
                dayweek: "Monday"
            }
    
            const avisModel = new AvisModel(avis);
            expect(avisModel).to.have.property('iduser',avis.iduser);
            expect(avisModel).to.have.property('note',avis.note);
            expect(avisModel).to.have.property('date',avis.date);
            expect(avisModel).to.have.property('dayweek',avis.dayweek);
        });

        it('Objet AvisModel sans iduser',function(){
            const avis = {
                note: 3,
                date: new Date().toString(),
                dayweek: "Monday"
            }
    
            expect(() => new AvisModel(avis)).to.throw('Invalid object type');
        });

        it('Objet AvisModel sans note',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                date: new Date().toString(),
                dayweek: "Monday"
            }
    
            expect(() => new AvisModel(avis)).to.throw('Invalid object type');
        });

        it('Objet AvisModel sans date',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                dayweek: 1
            }
    
            expect(() => new AvisModel(avis)).to.throw('Invalid object type');
        });

        it('Objet AvisModel sans dayweek',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString()
            }
    
            expect(() => new AvisModel(avis)).to.throw('Invalid object type');
        });

        it('Objet AvisModel sans iduser, note, date et dayweek',function(){
            const avis = {
            }
    
            expect(() => new AvisModel(avis)).to.throw('Invalid object type');
        });

        // Type
        it('Objet AvisModel avec iduser de type new mongoose.Types.ObjectId()',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString(),
                dayweek: "Monday"
            }
    
            const avisModel = new AvisModel(avis);
            expect(avisModel.iduser).to.be.an.instanceof(mongoose.Types.ObjectId);
        });


        

        it('devrait avoir une note de type entier', function () {
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString(),
                dayweek: "Monday"
            }
    
            const avisModel = new AvisModel(avis);
    
            // Vérifier que la note est un entier
            expect(Number.isInteger(avisModel.note)).to.be.true;
        });


        it('Objet AvisModel avec date de type date',function(){
            const avis = {  
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const avisModel = new AvisModel(avis);
            expect(avisModel.date).to.be.a('string');
        });

        it('Objet AvisModel avec dayweek de type string',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const avisModel = new AvisModel(avis);
            expect(avisModel.dayweek).to.be.a('string');

        });

        it('Objet AvisModel avec iduser de type number',function(){
            const avis = {
                iduser: 45612,
                note: 3,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const createAvis = () => new AvisModel(avis);
            expect(createAvis).to.throw();
        });

        it('Objet AvisModel avec note de type string KO',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: "3",
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const createAvis = () => new AvisModel(avis);
            expect(createAvis).to.throw();
        });


         it('Objet AvisModel avec note de type number sans etre un int KO',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3.5,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const createAvis = () => new AvisModel(avis);
            expect(createAvis).to.throw();
        });

        it('Objet AvisModel avec date de type string KO',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: 6554,
                dayweek: "Monday"
            }

            const createAvis = () => new AvisModel(avis);
            expect(createAvis).to.throw();
        });

        it('Objet AvisModel avec dayweek de type number KO',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString(),
                dayweek: 1
            }

            const createAvis = () => new AvisModel(avis);
            expect(createAvis).to.throw();
        });




        // RANGE

        it('Objet AvisModel avec note de type intcentre 1 a 3',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 1,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const avis1 = {
                iduser: new mongoose.Types.ObjectId(),
                note: 2,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const avis2 = { 
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString(),
                dayweek: "Monday"
            }


            const avisModel = new AvisModel(avis);
            const avisModel1 = new AvisModel(avis1);
            const avisModel2 = new AvisModel(avis2);

            expect(avisModel.note).to.be.at.least(1).and.to.be.at.most(3);
            expect(avisModel1.note).to.be.at.least(1).and.to.be.at.most(3);
            expect(avisModel2.note).to.be.at.least(1).and.to.be.at.most(3);

        });

        it('Objet AvisModel avec note de type intcentre 1 a 3',function(){
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 0,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const avis1 = {
                iduser: new mongoose.Types.ObjectId(),
                note: 4,
                date: new Date().toString(),
                dayweek: "Monday"
            }

            const createAvis = () => new AvisModel(avis);
            const createAvis1 = () => new AvisModel(avis1);

            expect(createAvis).to.throw();
            expect(createAvis1).to.throw();

        });

        it('devrait avoir dayweek représentant un jour de la semaine', function () {
            const joursSemaine = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            joursSemaine.forEach(jour => {
                const avis = {
                    iduser: new mongoose.Types.ObjectId(),
                    note: 3,
                    date: new Date().toString(),
                    dayweek: jour
                };
    
                const avisModel = new AvisModel(avis);
    
                expect(joursSemaine.includes(avisModel.dayweek)).to.be.true;
            });
        });

        it('devrait lever une erreur si dayweek ne représente pas un jour de la semaine', function () {
            const avis = {
                iduser: new mongoose.Types.ObjectId(),
                note: 3,
                date: new Date().toString(),
                dayweek: 'jourInvalid' // Jour de la semaine invalide
            };
    

            const createAvis = () => new AvisModel(avis);
    
            expect(createAvis).to.throw();
        });

    });