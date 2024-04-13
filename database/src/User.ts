


class User {

    public _id: number| null;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string | null;



    constructor(id: number | null, first_name: string, last_name: string, email: string, password: string | null) {
        this._id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;

    }

    
    /* GETTERS AND SETTERS */
    get id(): number {
        if (this._id == null) {
            throw new Error('Cannot get the id');
        }
        return this._id;
    }

    set id(id: number) {
        throw new Error('Cannot change the id');
    }

    get firstName(): string {
        return this.first_name;
    }

    set firstName(first_name: string) {
        this.first_name = first_name;
    }

    get lastName(): string {
        return this.last_name;
    }

    set lastName(last_name: string) {
        this.last_name = last_name;
    }

    get emailUser(): string {
        return this.email;
    }

    set emailUser(email: string) {
        if (email == null) {
            throw new Error('Cannot set the email to null');
        }
        this.email = email;
    }

    get passwordUser(): string {
        if (this.password != null) {
            return this.password;
        }
        throw new Error('Cannot get the password');
    }

    set passwordUser(password: string) {
        this.password = password;
    }


    /* METHODS */

}



export default User;