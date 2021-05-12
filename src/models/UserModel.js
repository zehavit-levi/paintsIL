import Parse from 'parse';
import CreationModel from './CreationModel';
export default class UserModel {
    #parseUser
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fName = parseUser.get("fName");
        this.lName = parseUser.get("lName");
        this.email = parseUser.get("email");
        this.phone = parseUser.get("phone");
        this.colorTypes = parseUser.get("colorsTypes");
        this.trends = parseUser.get("trends");
        this.privateOrders = parseUser.get("privateOrders");
        this.userName = parseUser.get("userName");
        this.site = parseUser.get("site");
        this.story = parseUser.get("story");
        this.occupation = parseUser.get("occupation");
        this.isCreator = parseUser.get("isCreator");
        this.savedPaints = parseUser.get("savedPaints");
        this.watchedPaints = parseUser.get("watchedPaints");

    }

    static activeUser = null;
    static paints = null;

    static async login(email, pwd) {
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }

    async getPaints() {
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        if (UserModel.activeUser.isCreator) {
            query.equalTo("creatorId", UserModel.activeUser.id);
        }
        const parsePaints = await query.find();
        UserModel.paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
        return UserModel.paints;
    }

    async getSavedPaints() {
        console.log(UserModel.activeUser);
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        query.containedIn("objectId", UserModel.activeUser.savedPaints)
        const parsePaints = await query.find();
        UserModel.paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));

        return UserModel.paints;
    }

    async getFilterdPaints(filterText,filterBy){
        console.log("filterText:", filterText, "filterBy", filterBy);
        if(filterBy === "creationName"){
            return UserModel.paints.filter((paint,index) => paint.name === filterText);
        }
        else if(filterBy !== "creationName" && filterText){
            const User = Parse.Object.extend('User');
            const query = new Parse.Query(User);
            query.fullText(filterBy, filterText);
            const parseUser = await query.find();
            const results = UserModel.paints.filter(paint => paint.creatorId === parseUser.id);
            return results;
        }
        return UserModel.paints;
    }
}