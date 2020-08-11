//canvas variable
var canvas;
//variable for background img
var background_img;
//object in game class
var game;
//variables for the obstacles(pipes)
var obstacles,obstacle_img;
//variables for the mario and the img
var player,player_img;
//variables for the grounds
var ground,ground1,ground2,ground3;
//variables for the coins
var coins,coin_img,coinsGroup;
//variable for the score
var count=0;
//obstacles and blocks array
var obstacles=[];
var blocks=[];
//variable flag
var flag;
//variables for enemies
var enemy_img;
var enemy,enemy1,enemy2;
//variable for background sprite
var bg;


function preload(){
  //loading images
  background_img=loadImage("images/bg.png");
  obstacle_img=loadImage("images/pipes.png");
  player_img=loadImage("images/player.png");
  coin_img=loadImage("images/coin.png");
  enemy_img=loadImage("images/enemy1.png")

  //loading sounds
  sound1=loadSound("sounds/coin.wav");
  sound2=loadSound("sounds/jump.wav");
  sound3=loadSound("sounds/bump.wav");
  sound4=loadSound("sounds/win.wav");
  sound5=loadSound("sounds/die.wav");
} 

function setup() {
  //creating canvas and object in game class
  canvas=createCanvas(displayWidth,displayHeight); 
  bg=createSprite(displayWidth*2-300,displayHeight/2+10); 
  bg.addImage("bg",background_img); 
  bg.scale=2;

  //creating a group for the coins
  coinsGroup=new Group();
  
  //creating obstacle objects in the array
  obstacles.push(createSprite(displayWidth-1750,displayHeight/2+150,70,70));
  obstacles.push(createSprite(displayWidth-1410,displayHeight/2+135,70,100));
  obstacles.push(createSprite(displayWidth-1160,displayHeight/2+120,70,130));
  obstacles.push(createSprite(displayWidth-800,displayHeight/2+120,70,130));
  obstacles.push(createSprite(displayWidth+2580,displayHeight/2+150,70,70));
  obstacles.push(createSprite(displayWidth+3100,displayHeight/2+150,70,70));

  //creating block objects in the array
  blocks.push(createSprite(displayWidth*2+675,displayHeight/2+155,100,60));
  blocks.push(createSprite(displayWidth*2+610,displayHeight/2+170,30,30));
  blocks.push(createSprite(displayWidth*2+690,displayHeight/2+110,60,40));
  blocks.push(createSprite(displayWidth*2+710,displayHeight/2+70,30,30));

  blocks.push(createSprite(displayWidth*2.8+20,displayHeight/2+150,100,60));
  blocks.push(createSprite(displayWidth*2.9-20,displayHeight/2+170,30,30));
  blocks.push(createSprite(displayWidth*2.8,displayHeight/2+100,60,40));
  blocks.push(createSprite(displayWidth*2.8-10,displayHeight/2+70,30,30));

  blocks.push(createSprite(displayWidth*3.1,displayHeight/2+170,150,33));
  blocks.push(createSprite(displayWidth*3.15-50,displayHeight/2+140,130,33));
  blocks.push(createSprite(displayWidth*3.2-70,displayHeight/2+100,100,33));
  blocks.push(createSprite(displayWidth*3.2-60,displayHeight/2+70,70,33));

  blocks.push(createSprite(displayWidth*3.3,displayHeight/2+170,130,33));
  blocks.push(createSprite(displayWidth*3.4-120,displayHeight/2+135,100,33));
  blocks.push(createSprite(displayWidth*3.4-130,displayHeight/2+100.,60,33));
  blocks.push(createSprite(displayWidth*3.3-40,displayHeight/2+70,33,33)); 

  blocks.push(createSprite(displayWidth*3.5+720,displayHeight/2+150,250,55));
  blocks.push(createSprite(displayWidth*3.5+760,displayHeight/2+90,200,55));
  blocks.push(createSprite(displayWidth*3.5+790,displayHeight/2+30,130,70));
  blocks.push(createSprite(displayWidth*3.5+800,displayHeight/2-10,100,55));

  blocks.push(createSprite(displayWidth*3.5+580,displayHeight/2+170,35,33)); 
  blocks.push(createSprite(displayWidth*3.5+645,displayHeight/2+105,35,30));  
  blocks.push(createSprite(displayWidth*3.5+710,displayHeight/2+40,35,33)); 
  blocks.push(createSprite(displayWidth*3.5+815,displayHeight/2-55,70,33)); 
  
  blocks.push(createSprite(displayWidth*4.6,displayHeight/2+170,35,33)); 
  
  //creating enemy sprites
  enemy=createSprite(displayWidth-20,displayHeight/2+100,40,40);
  enemy.addImage("enemy",enemy_img);
  enemy.scale=0.09;
  //enemy.setCollider("rectangle",0,0,enemy.displayWidth-100,enemy.displayHeight-100);

  enemy1=createSprite(2450,320,40,40);
  enemy1.addImage("enemy",enemy_img);
  enemy1.scale=0.09;
  //enemy1.setCollider("rectangle",0,0,enemy.displayWidth-100,enemy.displayHeight-100);

  enemy2=createSprite(4950,300,40,40);
  enemy2.addImage("enemy",enemy_img);
  enemy2.scale=0.09;
  //enemy2.setCollider("rectangle",0,0,enemy.displayWidth-100,enemy.displayHeight-100);

  //creating mario
  player=createSprite(displayWidth-2200,270);
  player.addImage("mario",player_img);
  player.scale=0.2;
  //player.setCollider("rectangle",0,0,500,530);

  //setting a collider for obstacles and blocks
  for(var i=0;i<obstacles.length;i++){
    //obstacles[i].setCollider("rectangle",0,0,obstacles[i].displayWidth-100,obstacles[i].displayHeight-100);
    obstacles[i].visible=false  
  }
  for(var a=0;a<blocks.length;a++){
    //blocks[a].setCollider("rectangle",0,0,blocks[a].displayWidth-50,blocks[a].displayHeight-30);
    blocks[a].visible=false  
  }

  //coin objects in group
  for(var j=0;j<displayWidth*5;j=j+200){
    coins=createSprite(j,random(200,300),30,100);
    coins.addImage("coins",coin_img);
    coins.scale=0.8;
    coinsGroup.add(coins);
    //coins.setCollider("rectangle",0,0,coins.displayWidth,coins.displayHeight);
  }  

  //ground sprites
  ground=createSprite(displayWidth-1200,displayHeight/2+210,displayWidth*2.5,50);
  ground1=createSprite(displayWidth+1200,displayHeight/2+210,displayWidth*1.5+500,50);
  ground2=createSprite(displayWidth*4,displayHeight/2+210,displayWidth*1.5,50);

  ground1.shapeColor="red";
  ground2.shapeColor="blue";

  ground.visible=false;
  ground1.visible=false;
  ground2.visible=false;

  /*ground.setCollider("rectangle",0,0,ground.displayWidth,ground.displayHeight-30);
  ground1.setCollider("rectangle",0,0,ground1.displayWidth,ground1.displayHeight-30);
  ground2.setCollider("rectangle",0,0,ground2.displayWidth,ground2.displayHeight-30);*/

  //flag sprite
  flag=createSprite(displayWidth*4.6,displayHeight/2+10,5,300);
  //flag.setCollider("rectangle",0,0,flag.displayWidth,flag.displayHeight);

}

function draw() {
  //setting background colour same as that of image
  background(107,141,255);

  //setting camera position
  camera.position.x=player.x+300;

  //colliding player with ground,blocks
  player.collide(ground);
  player.collide(ground1);
  player.collide(ground2);
  player.collide(blocks);

  //playing sound when player collides with obstacles
  if(player.collide(obstacles)){
    sound3.play();
  };
  //playing sound and increasing score when player collects coin
  if(player.isTouching(coinsGroup)){
    sound1.play();
    count=count+10;
  }
  
  //use right arrow key to move
  if(keyDown(RIGHT_ARROW)){
    player.velocityX=100;
  }
  if(keyWentUp(RIGHT_ARROW)){
    player.velocityX=0;
  }
  //use space key to jump
  if(keyIsDown(32)){
    player.velocityY=-7;
    sound2.play();
  }

  //adding gravity to player
  player.velocityY=player.velocityY+0.5;
 
  //destroying coins once player collects them
  for(var k=0;k<coinsGroup.length;k++){
    if(player.isTouching(coinsGroup.get(k))){
      coinsGroup.get(k).destroy();
    }
  }
  
  //player wins the game
  if(player.isTouching(flag)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Won!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    sound4.play();
  };

  //player loses the game
  if(player.isTouching(enemy)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    sound5.play();
  }

  //player loses the game
  if(player.isTouching(enemy1)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    sound5.play();
  }

  //player loses the game
  if(player.isTouching(enemy2)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    sound5.play();
  }

  if(player.y>displayHeight/2-20){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    sound5.play();
  }
   
  //displaying score
  textSize(30);
  textFont("Comic Sans MS");
  fill("black");
  text("Score:"+count,camera.position.x+300,50);

  //drawing the sprites
  drawSprites();
}