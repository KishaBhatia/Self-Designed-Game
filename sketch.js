var canvas;
var background_img;
var game;
var obstacles,obstacle_img//,obstaclesGroup;
var player,player_img;
//var wow,wow_img;
var ground,ground1,ground2,ground3;
var coins,coin_img,coinsGroup;
var count=0;
var obstacles=[];
//var points,points_img;
var flag;

function preload(){
  background_img=loadImage("Sent/Assets/Images/bg.png");
  obstacle_img=loadImage("finalImages/pipes.png");
  player_img=loadImage("finalImages/player.png");
  player1_img=loadImage("Sent/Assets/Images/diePerson.png");
  coin_img=loadImage("finalImages/coin.png")
  //wow_img=loadImage("finalImages/wow.png");
  //points_img=loadImage("finalImages/10points.png");

  sound1=loadSound("sounds/coin.wav");
  sound2=loadSound("sounds/jump.wav");
}

function setup() {
  canvas=createCanvas(displayWidth-20,displayHeight/2);
  game=new Game();

  coinsGroup=new Group();
  
  obstacles.push(createSprite(860,310,70,60));
  obstacles.push(createSprite(1250,300,70,90));
  obstacles.push(createSprite(1560,290,70,110));
  obstacles.push(createSprite(1980,290,70,110));
  obstacles.push(createSprite(6080,310,70,60));
  obstacles.push(createSprite(6690,310,70,60));
 
  player=createSprite(-55,270);
  player.addImage("mario",player_img);
  player.scale=0.2;
  player.setCollider("rectangle",0,0,500,530);

  for(var i=0;i<obstacles.length;i++){
    obstacles[i].setCollider("rectangle",0,0,obstacles[i].width-100,obstacles[i].height-100);
    obstacles[i].visible=false  
  }

  for(var j=0;j<displayWidth*5;j=j+200){
    coins=createSprite(j,random(200,300),30,100);
    coins.addImage("coins",coin_img);
    coins.scale=0.8;
    coinsGroup.add(coins);
    coins.setCollider("rectangle",0,0,coins.width,coins.height);
  }  

  ground=createSprite(displayWidth,displayHeight/2-20,displayWidth*3-300,40);
  ground1=createSprite(displayWidth*2+720,displayHeight/2-20,580,40);
  ground1.shapeColor="red";
  ground2=createSprite(displayWidth*4.3,displayHeight/2-20,displayWidth*2.4,40);
  ground2.shapeColor="blue";
  ground3=createSprite(displayWidth*7,displayHeight/2-20,displayWidth*1.5,40);
  ground3.shapeColor="green";
  //ground.visible=false;
  //ground.addImage("ground",track_img);
  //ground.scale=2;
  ground.setCollider("rectangle",0,0,ground.width,ground.height-30);
  ground1.setCollider("rectangle",0,0,ground1.width,ground1.height-30);
  ground2.setCollider("rectangle",0,0,ground2.width,ground2.height-30);
  ground3.setCollider("rectangle",0,0,ground3.width,ground3.height-30);
 
  flag=createSprite(7410,210,5,220);
  flag.setCollider("rectangle",0,0,10,230);
  
}

function draw() {
  background(107,141,255);
  game.play();

  camera.position.x=player.x+300;

  player.collide(ground);
  player.collide(ground1);
  player.collide(ground2);
  player.collide(ground3);
  player.collide(obstacles);

  if(mouseIsPressed){
    console.log(mouseX,mouseY);
  }
  if(player.isTouching(coinsGroup)){
    //sound1.play();
    count=count+10;
    //console.log(count);
  }
  if(keyDown(RIGHT_ARROW)){
    player.velocityX=10;
  }
  if(keyWentUp(RIGHT_ARROW)){
    player.velocityX=0;
  }
  if(keyIsDown(32)){
    player.velocityY=-7;
    //sound2.play();
  }
  player.velocityY=player.velocityY+0.5;
 
  for(var k=0;k<coinsGroup.length;k++){
    if(player.isTouching(coinsGroup.get(k))){
      coinsGroup.get(k).destroy();
    }
  }
  
  if(player.isTouching(flag)){
    text("You Won!!",camera.position.x,100);
    player.velocityX=0;
    player.velocityY=0;
  };

  textSize(30);
  textFont("Comic Sans MS");
  fill("blue");
  text("Score:"+count,camera.position.x,50);

  drawSprites();
}

