


export interface Adress {
    rue: string;
    code_postal: number;
    ville: string;
  }
  
export interface Personne {
    _id: number;
    first_name: string;
    last_name: string;
    email: string;
    adress: Adress;
    password: string | null;
  }
  

