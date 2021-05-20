import Parse from 'parse';
import CreationModel from './CreationModel';
export default class UserModel {
    #parseUser
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fName = parseUser.get("fName");
        this.lName = parseUser.get("lName");
        this.email = parseUser.get("email2");
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
    static paints = [];

    static async login(email, pwd) {
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }

    async getPaints(parseUserIds) {
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        console.log(parseUserIds);
        if(parseUserIds){
            let paintsTmp =[];
            if(parseUserIds !== undefined){
            query.containedIn("creatorId",parseUserIds);
            const parsePaints = await query.find();
            paintsTmp = parsePaints.map(parsePaint => new CreationModel(parsePaint));
            }
            return paintsTmp;
        }
        
        if (this.isCreator) {
            query.equalTo("creatorId", this.id);
            const parsePaints = await query.find();
            this.paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
            return this.paints;
        }
        const parsePaints = await query.find();
        console.log(parsePaints.length);
        
            const parsePaintRandom = [];
            for(let i=0;(parsePaints.length >= 10 && i<10) || i<4;i++){
                const parseRandom = parsePaints[parsePaints.length * Math.random() | 0];
                parsePaintRandom === [] || !parsePaintRandom.includes(parseRandom)  ? parsePaintRandom.push(parseRandom) : i--;
            }
            this.paints = parsePaintRandom.map(parsePaint => new CreationModel(parsePaint));
            return this.paints;
    }

    async getSavedPaints() {
        console.log(UserModel.activeUser);
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        query.containedIn("objectId", this.savedPaints)
        const parsePaints = await query.find();
        const savedPaints = parsePaints.map(parsePaint => new CreationModel(parsePaint));

        return savedPaints;
    }

    async setSavedPaints(paintId){
        this.savedPaints = this.savedPaints.concat(paintId);
        const User = Parse.Object.extend('User');
        const query = new Parse.Query(User);
        query.get(this.id).then((object) => {
            object.set('savedPaints',Object.values(this.savedPaints) );
            object.save().then((response) => {
              console.log('Updated ', response);
            }, (error) => {
              console.error('Error while updating ', error);
            });
          });
    }
    async removeSavedPaint(paintId){
        const tmp = Object.values(this.savedPaints).filter(paint => paint !== paintId);
        this.savedPaints = tmp;
        const User = Parse.Object.extend('User');
        const query = new Parse.Query(User);
        query.get(this.id).then((object) => {
            object.set('savedPaints',Object.values(this.savedPaints) );
            object.save().then((response) => {
              console.log('Updated ', response);
            }, (error) => {
              console.error('Error while updating ', error);
            });
          });
    }
    async setWatchedPaints(paintId){
        this.watchedPaints = this.watchedPaints.concat(paintId);
        const User = Parse.Object.extend('User');
        const query = new Parse.Query(User);
        query.get(this.id).then((object) => {
            object.set('watchedPaints',Object.values(this.watchedPaints)); 
            object.save().then((response) => {
              console.log('Updated ', response);
            }, (error) => {
              console.error('Error while updating ', error);
            });
          });
    }
    async getFilterdPaints(filterText,filterBy){
        console.log("filterText:", filterText, "filterBy", filterBy);
        if(filterBy === "creationName"){
            const Paint = Parse.Object.extend('Paint');
            const query = new Parse.Query(Paint);
            query.contains("name", filterText);
            const parsePaints = await query.find();
            this.paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
            return this.paints;
        }
        else if(filterBy === "userName" && filterText){
            const User = Parse.Object.extend('User');
            const query = new Parse.Query(User);
            query.contains("userName", filterText);
            const parseUsers = await query.find();
            const parseUserIds = parseUsers.map(parseUser => parseUser.id);
            this.paints = this.getPaints(parseUserIds);
            return this.paints;
        }
        return UserModel.paints;
    }
}