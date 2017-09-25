export class Profile {
    lastName: string;
    firstName: string;
    email : string;
    password : string;
    userId?: string;

    constructor(lastName: string, firstName: string, email : string, password : string, userId?: string) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.userId = userId;
    }

}