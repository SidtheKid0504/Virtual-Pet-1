//Create variables here
var dogImg, happyDogImg, dog;
var database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/Dog.png")
  happyDogImg = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 400, 50, 50);
  dog.scale = 0.25;
  dog.addImage(dogImg);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  database.ref('/').update({
    Food:x
  })
}

function draw() {  
  background(46, 139, 87)
  drawSprites();
  textSize(25);
  fill(245, 245, 255);
  text("Press the Up_Arrow Key to Feed Walter", 25, 50);
  text("Food Stock: " + foodS, 150, 250);


  if (keyWentDown(UP_ARROW)) {
    foodS--;
    writeStock(foodS);
    dog.addImage(happyDogImg);
    
  }


  
}



