export default class CreationModel {
    constructor(result) {
        this.id = result.id;
        this.name = result.get("name");
        this.img = result.get("img").url();
        if(result.get("additionalImg1") !== undefined) this.additionalImg1 = result.get("additionalImg1").url();
        if(result.get("additionalImg2") !== undefined) this.additionalImg2 = result.get("additionalImg2").url();
        this.price = result.get("price");
        if(result.get("creationDate") !== undefined) this.creationDate = result.get("creationDate");
        this.width = result.get("width");
        this.height = result.get("height");
        if(result.get("density") !== undefined) this.density =  result.get("density");
        if(result.get("this.story") !== undefined) this.story = result.get("story");
        this.colorsTypes = result.get("colorsTypes");
        this.creatorId = result.get("creatorId");
        this.saved = result.get("saved");
        this.watched = result.get("watched");
    }


}