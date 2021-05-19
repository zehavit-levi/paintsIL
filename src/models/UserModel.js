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
    static paints = [];

    static async login(email, pwd) {
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }

    async getPaints(props) {
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        if(props){
            UserModel.paints =[];
            if(props.parseUserIds !== undefined){
            for(let i=0 ;i < props.parseUserIds.length;i++){
                console.log(props.parseUserIds[i]);
               query.equalTo("creatorId",props.parseUserIds[i])
               const parsePaints = await query.find();
               const paintsTemp = parsePaints.map(parsePaint => new CreationModel(parsePaint));
               UserModel.paints = UserModel.paints.concat(paintsTemp);
            }}
            return UserModel.paints;
        }
        
        if (UserModel.activeUser.isCreator) {
            query.equalTo("creatorId", UserModel.activeUser.id);
            const parsePaints = await query.find();
            UserModel.paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
            return UserModel.paints;
        }
        const parsePaints = await query.find();
        console.log(parsePaints.length);

        //const paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
        
            const parsePaintRandom = [];
            for(let i=0;(parsePaints.length > 20 && i<20) || i<4;i++){
                const parseRandom = parsePaints[parsePaints.length * Math.random() | 0];
                parsePaintRandom === [] || !parsePaintRandom.includes(parseRandom)  ? parsePaintRandom.push(parseRandom) : i--;
            }
            UserModel.paints = parsePaintRandom.map(parsePaint => new CreationModel(parsePaint));
            return UserModel.paints;
    }

    async getSavedPaints() {
        console.log(UserModel.activeUser);
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        query.containedIn("objectId", UserModel.activeUser.savedPaints)
        const parsePaints = await query.find();
        const savedPaints = parsePaints.map(parsePaint => new CreationModel(parsePaint));

        return savedPaints;
    }

    async setSavedPaints(paintId){
        const User = Parse.Object.extend('User');
        const query = new Parse.Query(User);
        query.get(this.id).then((object) => {
            const arr= Object.values(this.savedPaints);
            console.log(arr);
            object.set('savedPaints',arr.concat(paintId) );
            object.save().then((response) => {
              console.log('Updated ', response);
            }, (error) => {
              console.error('Error while updating ', error);
            });
          });
    }
    async setWatchedPaints(paintId){
        const User = Parse.Object.extend('User');
        const query = new Parse.Query(User);
        query.get(this.id).then((object) => {
            const arr = Object.values(this.watchedPaints);
            console.log(arr);
            object.set('watchedPaints',arr.concat(paintId) );
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
            UserModel.paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
            return UserModel.paints;
        }
        else if(filterBy === "userName" && filterText){
            const User = Parse.Object.extend('User');
            const query = new Parse.Query(User);
            query.contains("userName", filterText);
            const parseUsers = await query.find();
            const parseUserIds = parseUsers.map(parseUser => parseUser.id);
            UserModel.paints = this.getPaints(parseUserIds);
            return UserModel.paints;
        }
        return UserModel.paints;
    }
}