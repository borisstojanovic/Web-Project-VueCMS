export default class User {
    constructor(firstName, lastName, email, password, type, status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.type = type;
        this.status = status;
    }
}