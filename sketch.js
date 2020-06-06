var trex, trexRunning, trexCollided
var ground,groundImage,invisibleGround
var cloudImage
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obsatcle6
var ObstacleGroup
var CloudGroup
var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver,gameOverimg
var restart,restartimg
var jump

function preload() {
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png"); 
  trexCollided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverimg = loadImage("gameOver.png");
  
  restartimg = loadImage("restart.png");
  
  jump = loadSound("jump.mp3");
}  
  
function setup() {
  createCanvas(800, 200);
  trex = createSprite(50,180,20,20);
  trex.addAnimation("trex",trexRunning)
  trex.addAnimation("collided",trexCollided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,10);
  ground.addImage("ground",groundImage);
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudGroup = new Group();
  ObstacleGroup = new Group();
  
  gameOver = createSprite(400,75,20,20);
  gameOver.addImage("gameOver",gameOverimg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  restart = createSprite(400,100,20,20);
  restart.addImage("restart",restartimg);
  restart.visible = false;
  restart.scale = 0.5;
}

function draw() {
  background(180);
  
  trex.collide(invisibleGround);
  
  if (gameState === PLAY)
  {
  spawnClouds();
  
  spawnObstacles();

  
  if (keyDown ("space") && trex.y > 155) {
    trex.velocityY = -10;
    jump.play();
  }  
  
  trex.velocityY = trex.velocityY + 0.5;
  
  ground.velocityX = -6;
  
  if (ground.x < 0) {
    ground.x = 200; 
  }
  
  if (World.frameCount % 2 === 0){
    score = score + 1;
  }
    
  if (ObstacleGroup.isTouching(trex))
  {
    gameState = END;
    trex.changeAnimation("collided",trexCollided);
  }
    
  }
  
  else if(gameState === END)
  {
    trex.velocityY = 0;
    ground.velocityX = 0;
    ObstacleGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    CloudGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
  }
  drawSprites();
  
  text ("Score : " + score, 700, 50);
}

function spawnClouds(){
  if (World.frameCount % 60 === 0) {
    var Cloud = createSprite(800,100,20,20); 
    Cloud.addImage ("cloud",cloudImage);
    Cloud.velocityX = -6;
    Cloud.scale = 0.75;
    //Cloud.fill
    CloudGroup.add(Cloud);
  }
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(800,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
    }
      ObstacleGroup.add(obstacle);    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
  }
}