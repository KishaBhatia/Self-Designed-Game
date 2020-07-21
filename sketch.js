var canvas;
var track_img;
var game;
var obstacles,obstacle_img,obstaclesGroup;
var player,player_img;
var ground;
var coins,coin_img,coinsGroup;
var count=0;

function preload(){
  track_img=loadImage("finalImages/ground.png");
  obstacle_img=loadImage("finalImages/pipes.png");
  player_img=loadImage("finalImages/player.png");
  coin_img=loadImage("finalImages/coin.png")
}

function setup() {
  canvas=createCanvas(displayWidth-20,displayHeight-20);
  game=new Game();

  obstaclesGroup=new Group();
  coinsGroup=new Group();

  for(var i=0;i<displayWidth*5;i=i+300){
    obstacles=createSprite(i,360,30,100);
    obstacles.addImage("pipes",obstacle_img);
    obstacles.scale=0.5;
    obstaclesGroup.add(obstacles);
    obstacles.setCollider("rectangle",0,0,obstacles.width-100,obstacles.height-100);
  }

  for(var j=0;j<displayWidth*5;j=j+200){
    coins=createSprite(j,random(200,300),30,100);
    coins.addImage("coins",coin_img);
    coins.scale=0.8;
    coinsGroup.add(coins);
    //coins.setCollider("rectangle",0,0,coins.width,coins.height);
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
  player.collide(obstaclesGroup)
  
  if(player.isTouching(coinsGroup)){
    //playSound("coin.wav");
    count=count+10;
    //console.log(count);
  }
  if(keyIsDown(RIGHT_ARROW)){
    player.x=player.x+5;
  }
  if(keyIsDown(LEFT_ARROW)){
    player.x=player.x-5;
  }
  if(keyIsDown(32)){
    player.velocityY=-7;
    //playSound("jump.wav");
  }
  player.velocityY=player.velocityY+0.5;
 
  for(var k=0;k<coinsGroup.length;k++){
    if(player.isTouching(coinsGroup.get(k))){
      coinsGroup.get(k).destroy;
    }
  }

  textSize(30);
  textFont("Comic Sans MS");
  text("Score:"+count,displayWidth-200,displayHeight/2-300);

  drawSprites();
}

