export default class CreationModel {
    constructor({name,images, price, creationDate, dimentions, story, colorTypes}) {
        this.name = name;
        this.images = images;
        this.img = images[0];
        if(images.length > 1){
            this.additionalImg1 = images[1];
        }
        if(images.length > 2){
            this.additionalImg2 = images[2];
        }
        this.price = price;
        this.creationDate = creationDate;
        this.width = dimentions[0];
        this.height = dimentions[1];
        if(dimentions.length > 2){
            this.density = dimentions[2];
        }
        this.story = story;
        this.colorTypes = colorTypes;
    }
}