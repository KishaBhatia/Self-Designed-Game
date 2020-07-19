var canvas;
var track_img;
var game;
var obstacles,obstacle_img,obstaclesGroup;
var player,player_img;
var ground;

function preload(){
  track_img=loadImage("finalImages/ground.png");
  obstacle_img=loadImage("finalImages/pipes.png");
  player_img=loadImage("finalImages/player.png");
}

function setup() {
  canvas=createCanvas(displayWidth-20,displayHeight-20);
  game=new Game();

  obstaclesGroup=new Group();

  for(var i=0;i<displayWidth*5;i=i+300){
    obstacles=createSprite(i,360,30,100);
    obstacles.addImage("pipes",obstacle_img);
    obstacles.scale=0.5;
    obstaclesGroup.add(obstacles);
    obstacles.setCollider("rectangle",0,0,obstacles.width-100,obstacles.height-100);
  }

  ground=createSprite(displayWidth-20,displayHeight/2+80);
  ground.addImage("ground",track_img);
  ground.scale=2;
  ground.setCollider("rectangle",0,0,ground.width,ground.height-30);

  player=createSprite(50,370);
  player.addImage("mario",player_img);
  player.scale=0.2;
  
}

function draw() {
  background(255);
  game.play();

  player.collide(ground);
  player.collide(obstaclesGroup);

  if(keyIsDown(RIGHT_ARROW)){
    player.x=player.x+5;
  }
  if(keyIsDown(LEFT_ARROW)){
    player.x=player.x-5;
  }
  if(keyIsDown(32)){
    player.velocityY=-7;
  }
  player.velocityY=player.velocityY+0.5;
  /*if(keyIsDown(DOWN_ARROW)){
    player.y=player.y+5;
  }*/
  drawSprites();
}