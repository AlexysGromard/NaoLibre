// IMPORTS
import bcrypt from 'bcrypt';
// FUNCTIONS
/**
 * @async
 * @description Crypte un mot de passe
 * 
 * @param {string} password - Mot de passe à crypter
 * 
 * @returns {Promise<string>} - Mot de passe crypté
 * 
 * @throws {Error} - Lève une erreur si une erreur survient lors du cryptage
 * */
export default async function crypter(password) {
    try {
        // Générer un sel (salt)
        const salt = bcrypt.genSaltSync(10);
        // Hasher le mot de passe avec le sel
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        // Gérer les erreurs
        throw new Error('Erreur lors du cryptage du mot de passe');
    }
}
