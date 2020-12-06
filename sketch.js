var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.1;
  ground = createSprite(900,180,3000,20);
  ground.x = ground.width /2;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  score = 0
}


function draw() {
    background(180);
    text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
monkey.changeAnimation("running", monkey_running)
ground.velocityX = -(4 + 3* score/100)
score = score + Math.round(frameRate()/60);

}
if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  spawnObstacle();
  spawnFood();
  
  monkey.collide(ground);
  
  
  if(obstacleGroup.isTouching(monkey)){

 gameState = END;
    
    }
  
  
   else if (gameState === END) {
ground.velocityX = 0;
monkey.velocityY = 0
obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
}
  
    drawSprites();

}

function spawnObstacle(){
  if (frameCount % 300 === 0){
     var obstacle = createSprite(600,165,10,40);  
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
    obstacle.velocityX = -(6 + score/100);
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);

   } 
  }
  
  function spawnFood(){
    if (frameCount % 80 === 0){
      var food = createSprite(600,120,40,10);
      food.y = Math.round(random(80,120));
      food.addImage(bananaImage);
      food.velocityX = -3;
      food.scale = 0.1;
      if (monkey.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
        score = score+25;
         }
      
      FoodGroup.add(food);
    }
  }
  







