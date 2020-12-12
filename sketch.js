var monkey , monkey_running
var banana ,bananaImage, Ob, obstacleImage
var FoodGroup, obGroup
var score = 0;
var Bn = 0;
var Ground;
var game = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);

  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("Run",monkey_running);
  monkey.scale = 0.12;
  
  
  Ground= createSprite(200,390,400,10);
  Ground.shapeColor = ("Brown");
  //Ground.debug = true;
  
  FoodGroup = new Group();
  obGroup = new Group();
}

function draw() {
  background("white");
  //console.log(score);
  if(game === 1){
    monkey.velocityY = monkey.velocityY + 0.5;
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("space") && monkey.collide(Ground)){
      monkey.velocityY = -10;
    }
    
    if(FoodGroup.collide(monkey)){
      FoodGroup.destroyEach();
      Bn = Bn + 1;
    }
  }
  monkey.collide(Ground);
  if(obGroup.collide(monkey)){
    game = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    //obGroup.destroyEach();
    //FoodGroup.destroyEach();
    obGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obGroup.setVelocityXEach(0);
    obGroup.setVelocityYEach(0);
    FoodGroup.setVelocityXEach(0);
  }
  
  createObs();
  createBnn();
  drawSprites();
  
  text("Bananas collected : " + Bn,80,80);
  text("Score : " + score,80,100);
}
function createObs(){
  if(game === 1){
    if(frameCount%300 === 0){
      Ob = createSprite(350,355,50,50);
      Ob.addImage(obstacleImage);
      Ob.velocityX = -10;
      Ob.scale = 0.15;
      //Ob.debug = true;
      Ob.setCollider("rectangle",0,0,350,350,0);
      Ob.collide(Ground);
      
      obGroup.add(Ob);
    }
  }
  
}
function createBnn(){
  if(game === 1){
    if(frameCount%80 === 0){
      banana = createSprite(350,random(120,200),50,50);
      banana.addImage(bananaImage);
      banana.velocityX = -8;
      banana.scale = 0.25;
      
      FoodGroup.add(banana);
    }
  }
  
}

