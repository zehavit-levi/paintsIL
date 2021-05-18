export default class ColorType{
    constructor(parseColor){
        this.id = parseColor.id;
        this.img = parseColor.get("img").url();;
        this.name = parseColor.get("name");
    }
}