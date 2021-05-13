import Parse from 'parse';
import UserModel from './UserModel';
export default class CreationModel {
    constructor(result) {
        this.id = result.id;
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
                // You can use the "get" method to get the value of an attribute
                // Ex: response.get("<ATTRIBUTE_NAME>")
                if (typeof document !== 'undefined') console.log(`Updated : ${JSON.stringify(response)}`);
                console.log('Updated ', response);
            }, (error) => {
                if (typeof document !== 'undefined') console.log(`Error while updating : ${JSON.stringify(error)}`);
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
                // You can use the "get" method to get the value of an attribute
                // Ex: response.get("<ATTRIBUTE_NAME>")
                if (typeof document !== 'undefined') console.log(`Updated : ${JSON.stringify(response)}`);
                console.log('Updated ', response);
            }, (error) => {
                if (typeof document !== 'undefined') console.log(`Error while updating : ${JSON.stringify(error)}`);
                console.error('Error while updating ', error);
            });
        });
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


}