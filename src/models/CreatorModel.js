export default class CreatorModel {
    #pwd;
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fName = parseUser.get("fName");
        this.lName = parseUser.get("lName");
        this.email = parseUser.get("email");
        this.#pwd = parseUser.get("pwd");
        this.phone = parseUser.get("phone");
        this.colorTypes = parseUser.get("colorsTypes");
        this.trends = parseUser.get("trends");
        this.privateOrders = parseUser.get("privateOrders");
        this.userName = parseUser.get("userName");
        this.site = parseUser.get("site");
        this.story = parseUser.get("story");
        this.type = "creator";

    }

    login(email, pwd) {
        return email.toLowerCase() === this.email.toLowerCase() && pwd === this.#pwd;
    }
}