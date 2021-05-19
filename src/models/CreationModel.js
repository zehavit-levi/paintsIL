import Parse from 'parse';
import ColorType from './ColorType';
import UserModel from './UserModel';
export default class CreationModel {
    constructor(result) {
        this.id = result.id;
        this.createdAt = JSON.stringify(result.createdAt);
        this.name = result.get("name");
        this.img = result.get("img").url();
        if (result.get("additionalImg1")) this.additionalImg1 = result.get("additionalImg1").url();
        if (result.get("additionalImg2")) this.additionalImg2 = result.get("additionalImg2").url();
        this.price = result.get("price");
        if (result.get("creationDate") !== undefined) this.creationDate = result.get("creationDate");
        this.width = result.get("width");
        this.height = result.get("height");
        if (result.get("density") !== undefined) this.density = result.get("density");
        if (result.get("this.story") !== undefined) this.story = result.get("story");
        this.colorsTypes = result.get("colorsTypes");
        this.creatorId = result.get("creatorId");
        this.saved = result.get("saved");
        this.watched = result.get("watched");
    }

    async setSaved() {
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        // here you put the objectId that you want to update
        query.get(this.id).then((object) => {
            object.set('saved', this.saved + 1);
            object.save().then((response) => {
                console.log('Updated ', response);
            }, (error) => {
                console.error('Error while updating ', error);
            });
        });
    }

    async setWatched() {
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        // here you put the objectId that you want to update
        query.get(this.id).then((object) => {
            object.set('watched', this.watched + 1);
            object.save().then((response) => {
                console.log('Updated ', response);
            }, (error) => {
                console.error('Error while updating ', error);
            });
        });
    }
    static async getPaint(index){
        const Paint = Parse.Object.extend('Paint');
        const query = new Parse.Query(Paint);
        query.equalTo("objectId", index);
        const parsePaints = await query.find();
        const paints = parsePaints.map(parsePaint => new CreationModel(parsePaint));
        return paints[0];
    }
    async getCreator(){
        const User = Parse.Object.extend('User');
        const query = new Parse.Query(User);
        query.equalTo("objectId", this.creatorId);
        const parseUsers = await query.find();
        const creators = parseUsers.map(parseUser =>  new UserModel(parseUser));
        console.log(creators[0]);
        return creators[0];
    }

    async getColorsTypes(){
        const colorType = Parse.Object.extend('colorType');
        const query = new Parse.Query(colorType);
        console.log(this.colorsTypes);
        // let types = [];
        // for(let i=0; i< Object.values(this.colorsTypes).length; i++){
        //     query.equalTo("objectId",Object.values(this.colorsTypes)[i]);
        //     const parseColorsTypes = await query.find();
        // }
        query.containedIn("objectId",Object.values(this.colorsTypes));
        const parseColorsTypes = await query.find();
        const types = parseColorsTypes.map(type => new ColorType(type));
        return types;
    }

}