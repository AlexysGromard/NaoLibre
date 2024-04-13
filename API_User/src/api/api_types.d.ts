// Definition des types de données utilisées dans l'API
import { equal } from 'assert';
import { boolean } from 'webidl-conversions';

import { Types } from 'mongoose';

export interface UserInterface {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string | null;
    point: number;
    favori: string[];
}


export interface AvisInterface {
    iduser: Types.ObjectId | null ;
    note: number;
    date: string;
    dayweek: String;
}


export interface LigneInterface{
    nomLigne: string;
    avis: AvisInterface[];
}


declare module 'mongoose'{
interface Types{
    ObjectId :{
        equals(objectId: Types.ObjectId): boolean;
    }

}
}