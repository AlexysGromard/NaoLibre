"use strict";
//IMPORTS

import {ObjectId} from 'mongoose';
import userDAO from '../../api/repositories/userDAO.mjs';
import UserModel from '../../api/model/UserModel.mjs';



import {mongoose} from 'mongoose';
import {expect, use} from 'chai';

// TESTS
// Test de la classe UserDAO
describe('Test DAO User', function() {


    /**
     * @async
     * @description Avant tous les tests
     */
    before(async ()=>{
        await mongoose.connection.close()
        const {MongoMemoryServer}  = await import('mongodb-memory-server')
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri)
    })

    /**
     * @async
     * @description Après chaque test on supprime tous les utilisateurs
     */
    beforeEach(async ()=>{
        await userDAO.removeAll()
    })

    /**
     * @async
     * @description Après tous les tests on ferme la connexion
     * */
    after(async ()=>{
        await mongoose.connection.close()
    })








    // Test de la méthode findAll
    it('Test de la méthode findAll vide', async function() {


        const users = await userDAO.findAll();
        expect(users).to.be.an('array');

        // la liste est vide
        expect(users).to.be.empty;
    });

    it('findAll non vide', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });


        await userDAO.add(user);

        const users = await userDAO.findAll();


        expect(users).to.be.an('array');

        // la liste n'est pas vide
        expect(users).to.not.be.empty;

        //la liste a un element
        expect(users).to.have.lengthOf(1);

        // l'element est bien un UserModel
        expect(users[0]).to.be.an.instanceOf(UserModel);

        // password is null
        expect(users[0].password).to.be.null;

        // Suppression de l'utilisateur
        

    });
        

    it('findAll plusieurs utilisateurs', async function() {
        

        // Ajout de plusieurs utilisateurs
        const user1 = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        const user2 = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test2",
            email: "test2@test.test",
            password: "test2",
            point: 0,
            favori: []
        });

        await userDAO.add(user1);
        await userDAO.add(user2);

        const users = await userDAO.findAll();

        expect(users).to.be.an('array');

        // la liste comportent 2 elements
        expect(users).to.have.lengthOf(2);

        // les elements sont bien des UserModel
        expect(users[0]).to.be.an.instanceOf(UserModel);
        expect(users[1]).to.be.an.instanceOf(UserModel);

        

        // password is null
        expect(users[0].password).to.be.null;
        expect(users[1].password).to.be.null;
    });

    // Test de la méthode exist
    it('Test de la méthode exist', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []

        });

        await userDAO.add(user);

        // L'utilisateur existe
        let exist = await userDAO.exist(user.email);
        expect(exist).to.be.true;

    });

    it('exist non existant', async function() {
        

        // L'utilisateur n'existe pas
        let exist = await userDAO.exist("test");
        expect(exist).to.be.false;

    });

    it('exist null', async function() {
        

        // L'utilisateur n'existe pas
        let exist = await userDAO.exist(null);
        expect(exist).to.be.false;

    });

    it('exist parametre int ', async function() {
        

        // creation d'une erreur du au parametre int
        expect(await userDAO.exist(5)).to.be.false;
        
    });

    // Test de la méthode findByEmailAndPassword

    it('findByEmailAndPassword parametre null', async function() {
        
        // creation d'une erreur du au parametre null

    try {
        await userDAO.findByEmailAndPassword(null, null);
    } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('Email or password is null');
    }

    try {
        await userDAO.findByEmailAndPassword("test", null);
    } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('Email or password is null');
    }

    try {
        await userDAO.findByEmailAndPassword(null, "test");
    } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('Email or password is null');
    }

    });


    it('findByEmailAndPassword parametre incorrect', async function() {



        try {
            await userDAO.findByEmailAndPassword(5, 5);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }


        try {
            await userDAO.findByEmailAndPassword("test", 5);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }

        try {
            await userDAO.findByEmailAndPassword(5, "test");
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }
    });

    it('findByEmailAndPassword existant', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        await userDAO.add(user);

        // L'utilisateur existe
        const resUser = await userDAO.findByEmailAndPassword("test@test.test", "test");


        expect(resUser).to.be.an.instanceOf(UserModel);

        // password is null
        expect(resUser.password).to.be.null;

        

    });





    it('findByEmailAndPassword non existant', async function() {
        

        // L'utilisateur n'existe pas
        let user = await userDAO.findByEmailAndPassword("test@test.test", "test");
        expect(user).to.be.null;

    });


    it('findByEmailAndPassword password incorrect', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        await userDAO.add(user);

        // L'utilisateur existe
        let res = await userDAO.findByEmailAndPassword("test@test.test", "ko");
        expect(res).to.be.null;

        

    });



    // Test de la méthode add
    it('add parametre', async function() {
        

        try {
            // creation d'une erreur du au parametre null
            await userDAO.add(null);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Not a valid user');
        }


    });

    it('add parametre incorrect', async function() {
        
        try {
            // creation d'une erreur du au parametre incorrect
            await userDAO.add(5);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Not a valid user');
        }

    });

    it('add password null', async function() {

        // creation d'une erreur du au password null
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: null,
            point: 0,
            favori: []
        });

        try {
            await userDAO.add(user);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('User password is null');
        }

    });

    it('add un User', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        await userDAO.add(user);

        // L'utilisateur existe
        let exist = await userDAO.exist("test@test.test");
        expect(exist).to.be.true;

    });


    it('add un User deja existant', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        await userDAO.add(user);

        // Ajouter un utilisateur deja existant

        const user2 = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        try {
            await userDAO.add(user2);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('User already exists');
        }

        

    });

    // Test de la méthode removeUser
    it('removeUser parametre null', async function() {
        

        // creation d'une erreur du au parametre null

        try {
            await userDAO.removeUser(null,null);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Parametre is null');
        }

        try {
            await userDAO.removeUser("test",null);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Parametre is null');
        }

        try {
            await userDAO.removeUser(null,"test");
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Parametre is null');
        }

        
    });

    it('removeUser parametre incorrect', async function() {
        

        // creation d'une erreur du au parametre incorrect

        try {
            await userDAO.removeUser("test", 5);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }



        try {
            await userDAO.removeUser(5, 5);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }



        try {
            await userDAO.removeUser(5, "test");
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }

    });


    it('removeUser non existant', async function() {
        

        // L'utilisateur n'existe pas
        let user = await userDAO.removeUser("test@test.test", "test");
        expect(user).to.be.false;

    });

    it('removeUser existant', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });
        const password = user.password;

        await userDAO.add(user);

        // L'utilisateur existe
        let res = await userDAO.removeUser(user.email, password);

        expect(res).to.be.true;

    });



    // Test de la méthode update
    it('update parametre', async function() {

        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });
        

        // creation d'une erreur du au parametre null
        try {
            await userDAO.update(null, null, null);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Not a valid user');
        }

        try {
            await userDAO.update(null, "test", user);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Parametre is null');
        }


        try {
            await userDAO.update("test", null, user);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Parametre is null');
        }

        try {
            await userDAO.update("test", "test", null);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Not a valid user');
        }



    });

    it('update parametre incorrect', async function() {
        

        // creation d'une erreur du au parametre incorrect
        
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        try {
            await userDAO.update(5, 5, user);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }

        try {
            await userDAO.update("test", 5, user);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Email or password is not a string');
        }

        try {
            await userDAO.update("test", "test", 5);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Not a valid user');
        }

    });

    it('update non existant', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        // L'utilisateur n'existe pas
        try {
            await userDAO.update(user.email, user.password, user);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('User not found');
        }

    });




    it('update existant', async function() {
        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        const originalPassword = user.password; // Enregistrer le mot de passe original

        await userDAO.add(new UserModel({...user}));

        // Mettre à jour les détails de l'utilisateur
        user.name = "test2";
        user.point = 100;
        user.favori = ["test"];

        // L'utilisateur update
        await userDAO.update(user.email, originalPassword, new UserModel({...user})); // Utiliser le mot de passe original

        

        // Vérifier si les détails de l'utilisateur ont été mis à jour correctement
        let res = await userDAO.findByEmailAndPassword(user.email, originalPassword);

        
        expect(res).to.be.an.instanceOf(UserModel);
        expect(res.name).to.equal("test2");
        expect(res.password).to.be.null;
        expect(res.point).to.equal(100);
        expect(res.favori).to.have.lengthOf(1);
        expect(res.favori[0]).to.equal("test");
    });



    it('update password null', async function() {
        

        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });

        await userDAO.add(user);

        const password = user.password;

        user.password = null;

        // L'utilisateur update
        try {
            await userDAO.update(user.email, password, user);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Parametre is null');
        }



        
    });


    it('update avec ID différent', async function() {
        // Ajout d'un utilisateur
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(), // ID initial
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });
    
        const password = user.password;
        await userDAO.add(new UserModel({...user}));
    
        // Créer un nouvel utilisateur avec un nouvel ID
        const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(), // Nouvel ID différent
            name: "test",
            email: "test@test.test",
            password: "test",
            point: 0,
            favori: []
        });
    
        // Tentative de mise à jour avec un ID différent
        try{
            await userDAO.update(user.email, password, new UserModel({...newUser}));
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal("You can't change the id");
        }
    });
    

});






























