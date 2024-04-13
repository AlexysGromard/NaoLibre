import bcrypt from 'bcrypt';
import crypter from '../../api/tools/cryptage.mjs'; 
import {expect,should,assert} from "chai";

describe('crypter function', () => {
    it('devrait crypter un password', async () => {
        const password = 'password123';
        const hashedPassword = await crypter(password);

        // Vérifie que le mot de passe crypté n'est pas null
        expect(hashedPassword).to.not.be.null;

        // Vérifie que le mot de passe crypté est un hash valide
        const isMatch = await bcrypt.compare(password, hashedPassword);
        expect(isMatch).to.be.true;
    });

    it('crypter parametre null', async () => {
        // Utilisation d'une fonction de hachage incorrecte pour provoquer une erreur
        try {
            await crypter(null);
        } catch (error) {
            // Vérifie que l'erreur est bien celle attendue
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Erreur lors du cryptage du mot de passe');
        }
    });

    
    it('crypter parametre ko', async () => {
        // Utilisation d'une fonction de hachage incorrecte pour provoquer une erreur


        // Vérifie que l'appel à la fonction crypter lance une erreur
        try {
            await crypter(5);
        } catch (error) {
            // Vérifie que l'erreur est bien celle attendue
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Erreur lors du cryptage du mot de passe');
        }
    });
});
