import { ObjectId } from 'mongodb';



  
export interface Personne {
    _id: number;
    name: string;
    email: string;
    password: string | null;
    point: number;
    favori: string[];
  }
 
export interface AvisInterface {
    iduser: ObjectId | number;
    note: number;
    date: string;
    dayweek: string;
}

export interface LigneInterface {
    nomLigne: string;
    avis: AvisInterface[];
}