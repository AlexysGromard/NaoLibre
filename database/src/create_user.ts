import User from './User';
import * as bcrypt from 'bcrypt';
//.database

const user1 :User = new User(null ,'John', 'Doe', 'John.Doe@gmail.com', 'password');
const user2 :User = new User(null ,'lea', 'Doe', 'Doe.lea@xxxxx.xxx', 'EFZM');
const user3 :User = new User(null ,'patricia', 'Doe', 'patricai@outlook.coml', 'password');
const user4 :User = new User(null ,'michael', 'bou', 'michael.bou@outlook.com', 'zfqiugl');
const user5 :User = new User(null ,'veronique', 'pasquier', 'pasquier@laposte.net','123456789');
const user6 :User = new User(null ,'paul', 'Poiret', 'paul.poiret@renaux.fr', 'jaimelespommes');
const user7 :User = new User(null ,'louis', 'Poiret', 'louis.po@frans.fr', 'jaimelespoires');
const user8 :User = new User(null ,'lol', 'lol', 'lol.lol@lol.fr', 'lol');


const users = [user1,user2,user3,user4,user5,user6,user7,user8];






// Fonction pour hacher un mot de passe avec bcrypt
const hashPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 256; // Le nombre de tours de hachage (ajustez selon vos besoins)
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error :any) {
        throw new Error('Erreur lors du hachage du mot de passe : ' + error.message);
    }
};

// Créez vos utilisateurs avec des mots de passe hachés
const createUserWithHashedPassword = async (userData: User): Promise<User> => {
    const hashedPassword = await hashPassword(userData.password || ''); // Ensure userData.password is not null
    return new User(null, userData.firstName, userData.lastName, userData.email, hashedPassword);
};

const usersCrypter: User[] = [];

// Maintenant, vos utilisateurs ont des mots de passe hachés
console.log(users);


for (const user of users) {
    const userWithHashedPassword = await createUserWithHashedPassword(user);
    usersCrypter.push(userWithHashedPassword);
    console.log(user.email);
    console.log(user.password);
}








