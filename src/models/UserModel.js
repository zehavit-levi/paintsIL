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

    }

    static activeUser = null;

    static async login(email, pwd) {
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }

    async getPaints() {
        console.log(UserModel.activeUser.id);
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        if(UserModel.activeUser.isCreator){
        query.equalTo("creatorId", UserModel.activeUser.id);
        }
        const parsePaints = await query.find();
        const paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
        
        return paints;
    }
}