"use strict";

// IMPORTS
import { expect,assert,should } from 'chai'

import UserModel from '../../api/model/UserModel.mjs';
import mongoose from 'mongoose';

// TESTS
// Test de la classe UserModel
describe("Test du modèle UserModel", function () {

    // objet
    it("créer un objet Utilisateur avec toutes les propriétés", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            point: 100,
            favori: []
        };


        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur).to.have.property("_id", donneesUtilisateur._id);
        expect(utilisateur).to.have.property("name", donneesUtilisateur.name);
        expect(utilisateur).to.have.property("email", donneesUtilisateur.email);
        expect(utilisateur).to.have.property("password", donneesUtilisateur.password);
        expect(utilisateur).to.have.property("point", donneesUtilisateur.point);
        expect(utilisateur).to.have.property("favori",donneesUtilisateur.favori);
    });


    it("créer un objet Utilisateur avec des propriétése en plus", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            point: 100,
            favori: [],
            erreur: null
        };
        expect(() => new UserModel(obj)).to.throw(Error);
    });


    it("créer un objet Utilisateur sans _id", function () {
        const donneesUtilisateur = {
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };

        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });

    it("créer un objet Utilisateur sans name", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };

        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });

    it("créer un objet Utilisateur sans email", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            password: "password123",
            point: 100,
            favori: []
        };

        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    }   );

    it("créer un objet Utilisateur sans password", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            point: 100,
            favori: []
        };

        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    }   );

    it("créer un objet Utilisateur sans point", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            favori: []
        };

        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    }   );

    it("créer un objet Utilisateur sans favori", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100
        };

        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();

    }   );

    it("créer un objet Utilisateur sans rien", function () {

        const createUtilisateur = () => new UserModel();
        expect(createUtilisateur).to.throw();
    }
    );

    it("créer un objet Utilisateur avec des propriétés en plus", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: [],
            erreur: null
        };

        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();

    }); 




    //TYPE

    it("type id ObjectId", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };
        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur._id).to.be.an.instanceof(mongoose.Types.ObjectId);
    });

    it("type name string", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };

        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur.name).to.be.a('string');
    });

    it("type email string", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };

        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur.email).to.be.a('string');
    });

    it("type password string", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };

        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur.password).to.be.a('string');
    });

    it("type password null", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: null,
            point: 100,
            favori: []
        };

        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur.password).to.be.a('null');
    });


    it("type point int", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };

        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur.point).to.be.a('number');
    });

    it("type favori array", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };

        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur.favori).to.be.a('array');

    });

    it("type favori array 2", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: ["test"]
        };

        const utilisateur = new UserModel(donneesUtilisateur);
        expect(utilisateur.favori).to.be.a('array');

    });



    it("probleme de type id", function () {
        const donneesUtilisateur = {
            _id: 55,
            name: "John Doe",
            email: "test@test.test",
            password: "password123",
            point: 100,
            favori: []
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });


    it("probleme de type name", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: 55,
            email: "john@example.com",
            password: null,
            point: 100,
            favori: []
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });

    it("probleme de type mail", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: 55,
            password: null,
            point: 100,
            favori: []
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });



    it("probleme de type password", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: 55,
            point: 100,
            favori: []
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });


    it("probleme de type point", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: null,
            point: "100",
            favori: []
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });

    it("probleme de type point2 (float)", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: null,
            point: 100.5,
            favori: []
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });

    it("probleme de type favori", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: null,
            point: "100",
            favori: true
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });


    it("probleme de type favori 2", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: null,
            point: "100",
            favori: [true]
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });


    //RANGE


    it("point superieur ou egale a 0", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: null,
            point: 0,
            favori: []
        };

        const donneesUtilisateur1 = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: null,
            point: 100,
            favori: []
        };


        const utilisateur = new UserModel(donneesUtilisateur);
        const utilisateur1 = new UserModel(donneesUtilisateur1);
    
        expect(utilisateur.point).to.be.at.least(0);
        expect(utilisateur1.point).to.be.at.least(0);
    });



    it("point negatif", function () {
        const donneesUtilisateur = {
            _id: new mongoose.Types.ObjectId(),
            name: "55",
            email: "55",
            password: null,
            point: -1,
            favori: []
        };
        const createUtilisateur = () => new UserModel(donneesUtilisateur);
        expect(createUtilisateur).to.throw();
    });   

    // it("point supérieur au max int", () => {
    //     const donneesUtilisateur = {
    //         _id: new mongoose.Types.ObjectId(),
    //         name: "John Doe",
    //         email: "john@example.com",
    //         password: null,
    //         point: Number.MAX_SAFE_INTEGER + 1,
    //         favori: []
    //     };

    //     const createUtilisateur = () => new UserModel(donneesUtilisateur);


    //     expect(createUtilisateur).to.throw();
    // });
    // //Test



});   