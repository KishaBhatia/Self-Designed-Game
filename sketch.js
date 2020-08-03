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
  //sound1=loadSound("sounds/coin.wav");
  //sound2=loadSound("sounds/jump.wav");
  //sound3=loadSound("sounds/bump.wav");
  //sound4=loadSound("sounds/win.wav");
  //sound5=loadSound("sounds/die.wav");
} 

function setup() {
  //creating canvas and object in game class
  canvas=createCanvas(windowWidth,windowHeight); 
  bg=createSprite(width*2-300,height/2+10); 
  bg.addImage("bg",background_img); 
  bg.scale=2;
  //game=new Game();

  //creating a group for the coins
  coinsGroup=new Group();
  
  //creating obstacle objects in the array
  obstacles.push(createSprite(width-1490,height/2+150,70,70));
  obstacles.push(createSprite(width-1170,height/2+135,70,100));
  obstacles.push(createSprite(width-910,height/2+120,70,130));
  obstacles.push(createSprite(width-550,height/2+120,70,130));
  obstacles.push(createSprite(width+2840,height/2+150,70,70));
  obstacles.push(createSprite(width+3350,height/2+150,70,70));

  //creating block objects in the array
  blocks.push(createSprite(5010,310,120,60));
  blocks.push(createSprite(5030,270,70,30));
  blocks.push(createSprite(5050,250,30,30));
  blocks.push(createSprite(4937,325,30,30));

  blocks.push(createSprite(5210,310,120,60));
  blocks.push(createSprite(5190,270,80,30));
  blocks.push(createSprite(5170,240,30,30));
  blocks.push(createSprite(5280,325,30,30));

  blocks.push(createSprite(5560,330,190,33));
  blocks.push(createSprite(5575,300,150,33));
  blocks.push(createSprite(5600,270,110,33));
  blocks.push(createSprite(5610,240,80,33));

  blocks.push(createSprite(5810,330,165,33));
  blocks.push(createSprite(5790,300,110,33));
  blocks.push(createSprite(5770,270,75,33));
  blocks.push(createSprite(5750,240,35,33)); 

  blocks.push(createSprite(6930,315,310,55));
  blocks.push(createSprite(6960,260,240,55));
  blocks.push(createSprite(7000,205,170,55));
  blocks.push(createSprite(7040,150,80,55));

  blocks.push(createSprite(6755,325,35,33)); 
  blocks.push(createSprite(6830,270,35,30));  
  blocks.push(createSprite(6900,222,35,33)); 
  blocks.push(createSprite(6980,167,35,33)); 
  
  blocks.push(createSprite(7410,325,35,33)); 
  
  //creating enemy sprites
  enemy=createSprite(1000,320,40,40);
  enemy.addImage("enemy",enemy_img);
  enemy.scale=0.09;
  enemy.setCollider("rectangle",0,0,enemy.width-100,enemy.height-100);

  enemy1=createSprite(2450,320,40,40);
  enemy1.addImage("enemy",enemy_img);
  enemy1.scale=0.09;
  enemy1.setCollider("rectangle",0,0,enemy.width-100,enemy.height-100);

  enemy2=createSprite(4950,300,40,40);
  enemy2.addImage("enemy",enemy_img);
  enemy2.scale=0.09;
  enemy2.setCollider("rectangle",0,0,enemy.width-100,enemy.height-100);

  //creating mario
  player=createSprite(width-2200,270);
  player.addImage("mario",player_img);
  player.scale=0.2;
  player.setCollider("rectangle",0,0,500,530);

  //setting a collider for obstacles and blocks
  for(var i=0;i<obstacles.length;i++){
    obstacles[i].setCollider("rectangle",0,0,obstacles[i].width-100,obstacles[i].height-100);
    //obstacles[i].visible=false  
  }
  for(var a=0;a<blocks.length;a++){
    blocks[a].setCollider("rectangle",0,0,blocks[a].width-50,blocks[a].height-30);
    //blocks[a].visible=false  
  }

  //coin objects in group
  for(var j=0;j<width*5;j=j+200){
    coins=createSprite(j,random(200,300),30,100);
    coins.addImage("coins",coin_img);
    coins.scale=0.8;
    coinsGroup.add(coins);
    coins.setCollider("rectangle",0,0,coins.width,coins.height);
  }  

  //ground sprites
  ground=createSprite(width-1200,height/2+210,width*2.5-100,50);
  ground1=createSprite(width+1080,height/2+210,width/2,50);
  ground2=createSprite(width*4.3,height/2-20,width*2.4,40);
  ground3=createSprite(width*6.6,height/2-20,width*2,40);

  ground1.shapeColor="red";
  ground2.shapeColor="blue";
  ground3.shapeColor="green";

  //ground.visible=false;
  ground1.visible=false;
  /*ground2.visible=false;
  ground3.visible=false;*/

  ground.setCollider("rectangle",0,0,ground.width,ground.height-30);
  ground1.setCollider("rectangle",0,0,ground1.width,ground1.height-30);
  ground2.setCollider("rectangle",0,0,ground2.width,ground2.height-30);
  ground3.setCollider("rectangle",0,0,ground3.width,ground3.height-30);
 
  //flag sprite
  flag=createSprite(7410,210,5,220);
  flag.setCollider("rectangle",0,0,flag.width,flag.height);
  
}

function draw() {
  //setting background colour same as that of image
  background(107,141,255);
  //game.play();

  //setting camera position
  camera.position.x=player.x+300;

  //colliding player with ground,blocks
  player.collide(ground);
  player.collide(ground1);
  player.collide(ground2);
  player.collide(ground3);
  player.collide(blocks);

  //playing sound when player collides with obstacles
  if(player.collide(obstacles)){
    //sound3.play();
  };
  //playing sound and increasing score when player collects coin
  if(player.isTouching(coinsGroup)){
    //sound1.play();
    count=count+10;
  }
  
  //use right arrow key to move
  if(keyDown(RIGHT_ARROW)){
    player.velocityX=10;
  }
  if(keyWentUp(RIGHT_ARROW)){
    player.velocityX=0;
  }
  //use space key to jump
  if(keyIsDown(32)){
    player.velocityY=-7;
    //sound2.play();
  }

  if(mouseIsPressed){
    console.log(mouseX,mouseY);
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
 /* if(player.isTouching(flag)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Won!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    //sound4.play();
  };

  //player loses the game
  if(player.isTouching(enemy)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    //sound5.play();
  }

  //player loses the game
  if(player.isTouching(enemy1)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    //sound5.play();
  }

  //player loses the game
  if(player.isTouching(enemy2)){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    //sound5.play();
  }

  if(player.y>height/2-20){
    textSize(60);
    textFont("Comic Sans MS");
    fill("purple");
    text("You Lost!!",camera.position.x-100,150);
    player.velocityX=0;
    player.velocityY=0;
    //sound5.play();
  }*/
   
  //displaying score
  textSize(30);
  textFont("Comic Sans MS");
  fill("black");
  text("Score:"+count,camera.position.x+300,50);

  //drawing the sprites
  drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
