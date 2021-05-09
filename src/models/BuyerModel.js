export default class BuyerModel {
    #pwd;
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fName = parseUser.get("fName");
        this.lName = parseUser.get("lName");
        this.email = parseUser.get("email");
        this.occupation = parseUser.get("occupation");
        this.#pwd = parseUser.get("pwd");
        this.type = "buyer";
    }

    login(email, pwd) {
        return email.toLowerCase() === this.email.toLowerCase() && pwd === this.#pwd;
    }
}