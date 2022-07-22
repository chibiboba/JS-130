function Pet(name, image) {
  this.name = name;
  this.image = image;
}
console.log(catImage);
console.log(Image);
let Image;
var catImage;
var pudding;

Pet.prototype.walk = function () {
  console.log(`${this.name} is walking.`);
};

Image = class {
  constructor(file) {
    this.file = file;
  }
};

catImage = new Image("cat.png");
pudding = new Pet("Pudding", catImage);