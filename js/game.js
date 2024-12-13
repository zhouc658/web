let backgroundInitial;
let backgroundDodge;
let backgroundFinal;
let collectItem;
let monkeyImg;
let monkImg;
let goldStick;
let demon;
let sword;
let mountainImg;
let scroll;
let game;
let x=50;
let y=400;
let safe; // Character safety status
let wall1, wall2, wall3;
let wukong;
let monk;
let mountain;
let yesButton;
let sceneState = "initial"; // Track the current scene
let moveSpeed = 5; // Speed at which the characters move
let goldenStickPieces = []; 
let piecesCollected = 0; // Track # of golden stick pieces collected
let balls = []; // Array for purple balls
let purpleTriangle; // Purple triangle for throwing squares
let purpleSquares = []; // Array for thrown purple squares
let hugeGreenCircle; // Huge green circle for winning

// Control variables for movement
let movingRight = false; // Track if moving right
let movingLeft = false; // Track if moving left

function preload(){
  monkeyImg = loadImage('monkey.png'); //upload img
  monkImg=loadImage('monk.png');
  mountainImg=loadImage('mountain.png');
  scroll= loadImage('scroll.PNG');
  demon=loadImage('demon.png');
  sword=loadImage('sword.png');
  goldStick=loadImage('goldStick.png');
  game=loadImage('IMG_5166-1.PNG');
  collectItem = loadImage('bowl.png');
  backgroundInitial = loadImage('Screen Shot 2024-11-15 at 3.52.51 PM.png');
  backgroundDodge=loadImage('IMG_5167 (1).PNG');
  backgroundFinal=loadImage('Screen Shot 2024-11-15 at 3.48.38 PM.png');
}
function setup() {
  createCanvas(600, 600);
  safe = true;
  sceneState = "initial"; // Start with the initial scene

  // Initialize characters and mountain
  wukong = new WuKong(); 
  monk = new Monk();
  mountain = new Mountain();
  
  // Create button
  yesButton = createButton("Yes");
  yesButton.position(770, 600);
  yesButton.mousePressed(startJourney); 

  // Create golden stick pieces
  goldenStickPieces = [];
  for (let i = 0; i < 7; i++) {
    goldenStickPieces.push(new GoldenStickPiece());
  }

  purpleTriangle = new PurpleTriangle();
}

function draw() {
  background(200);

 switch (sceneState) {
    case "initial":
      image(backgroundInitial, 0, 0, width, height);
      initialScene(); //calling the functions for each scene
      break;
    case "guideMonk":
     image(backgroundInitial, 0, 0, width, height);
      guideMonkScene();
      break;
    case "freeWukong":
     freeWukongScene();
     break;
    case "dodgeBalls":
     image (backgroundDodge,0,0, width,height);
     dodgeBallsScene();
     break;
    case "gameOver":
      gameOverScene(); // Keep this for any game-over logic you want
      break;
    case "victory":
      victoryScene(); // Call the new victory scene
      break;
    case "ninjaGameplay": // Add this case for the new ninja gameplay
     ninjaGameplayScene(); // Call the new ninja gameplay function
    break;
    case "final": // Add this case for the new ninja gameplay
    finalScene(); // Call the new ninja gameplay function
    break;
  }

  // Move characters if keys are pressed
  if (sceneState === "freeWukong") {
      handleWukongMovement();
    }

  //new scene
  if (sceneState === "dodgeBalls") {
     handleDodgeBallsMovement();
}  if (sceneState === "ninjaGameplay") {
    handleNinjaMovement();
  }
  // If all pieces collected, display the huge green circle
  if (piecesCollected >= 7 && !hugeGreenCircle) {
    hugeGreenCircle = new HugeGreenCircle(); // Create the huge green circle
}
}
function initialScene() {
  mountain.display(); //display them 
  wukong.display();
  monk.display(); 
  fill(250); //display text
  textSize(20);
  textAlign(CENTER);
  text("WuKong has been under the mountain for 500 years, ", 300,40);
  text("the Buddha punished him for his havoc in heaven",  300, 60);
  text("He was told by Avalokitesvara that a monk, Tan SanZang,", 300, 80);
  text("is the only one who can save him", 300,100);
  text("Guide the monk to the top of the mountain,",300,120);
  text("touch the talisman to free WuKong.", 300,140);

  fill(250); //display text
  textSize(15);
  textAlign(CENTER);
  text("Tang SanZang:", 165,460);
  text("Will you go on a journey with me?", 160,480)
  
  yesButton.show(); //display the buttons 
  // noButton.show();
}

function startJourney() {
  sceneState = "guideMonk"; //change scene so after yes button click, then player can guide the monk 
  yesButton.hide();
  // noButton.hide();
}

// function endGame() {
//   sceneState = "gameOver"; // same idea as the one above 
//   yesButton.hide();
//   noButton.hide();
// }

function guideMonkScene() {
  mountain.display(); //display them 
  monk.display();
  wukong.display();
  
  if (monk.reachedScroll) { //if this is true then go to next scene
    sceneState = "freeWukong";
  }
}

function freeWukongScene() {
  image(backgroundInitial, 0, 0, width, height);
  mountain.visible = false; // Hide the mountain

  // Display WuKong and Monk
  wukong.display();
  monk.display();

  // Display instructions
  fill(255);
  textSize(20);
  text("Use RIGHT key to move WuKong and Monk to next scene.", 300,100);
  text("You will battle a demon,don't get hit in the head/body by the swords,", 300,150);
  text("collect WuKong's weapon to defeat the demon.", 300, 200);
}
function dodgeBallsScene() { 
  wukong.display();
  monk.display();

  // Update and display purple squares
  for (let square of purpleSquares) {
    square.move();
    square.display();
    if (square.hits(wukong)) {
      sceneState = "gameOver"; // End game if WuKong gets hit
    }
  }

  // Create new purple square at random intervals
  if (frameCount % 60 === 0) { // Every second at 60 fps
    if (purpleSquares.length < 5) { // Limit to 5 on screen
      purpleSquares.push(new PurpleSquare(purpleTriangle.x, purpleTriangle.y));
    }
  }

  // Check for collection of golden stick pieces
  for (let piece of goldenStickPieces) {
    piece.display();
    if (piece.isCollected(wukong)) {
      piecesCollected++;
      goldenStickPieces = goldenStickPieces.filter(p => p !== piece); // Remove collected piece
    }
  }

  // Check if the purple triangle is not visible and end the game
  if (!purpleTriangle.visible) {
    sceneState = "victory"; // Transition to victory scene
  }

  // Check victory condition
  if (piecesCollected >= 7 && hugeGreenCircle) {
    hugeGreenCircle.update(); // Move down
    hugeGreenCircle.display(); // Display huge green circle
  } else if (piecesCollected >= 7) {
    hugeGreenCircle = new HugeGreenCircle(); // Create the huge green circle
  }

  // Display the purple triangle
  purpleTriangle.display();
}
function finalScene() {
  image(backgroundFinal, 0, 0, width, height);
  fill(0, 255, 0);
  textSize(24);
  text("Congratulations on your journey!", width / 2, height / 2 + 40);
}
function victoryScene() {
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Congratulations, You defeated the demon!", width / 2, height / 2);
 
  if (keyIsPressed) { // Press space to continue
    sceneState = "ninjaGameplay";  // You could set this to the next scene or reset game
  }
}

function gameOverScene() {
  fill(255, 0, 0);
  textSize(48);
  textAlign(CENTER);
  text("Game Over", width / 2, height / 2);
  textSize(24);
  text("Press 'R' to restart", width / 2, height / 2 + 40);
}

function handleWukongMovement(){
  if (movingRight) {
      wukong.x += moveSpeed; // Move WuKong to the right
      monk.x += moveSpeed; // Move Monk to the right
    }
    
    // Check if off-screen
    if (wukong.x > width || monk.x < 0) {
      sceneState = "dodgeBalls"; // Move to next scene
    }
}
function handleDodgeBallsMovement(){
  wukong.x += wukong.vx; //controlling WuKong's movement freely on the screen (L and R)
    wukong.y += wukong.vy;//UP and DOWN 

    // Constrain WuKong's movement within the canvas
    wukong.x = constrain(wukong.x, 0, width - 80); //constrain(value (that you want to limit), min, max), wukong.x the current horizontal position on the screen
    wukong.y = constrain(wukong.y, 0, height - 80); //same idea 
  
  }
function ninjaGameplayScene() {
   console.log(safe);  // this is a check to see if hitting wall true= safe (not in contact)

  image(game, 0, 0, width, height);
  fill(255);
  textSize(18);
  text('Avoid walls and collect the bowl to offer to Buddha to get the great scrolls', 300, 120);

  image(monkeyImg, x, y, 80, 120);  //send ninja to the screen x, y, width, height
  image(collectItem, 500, 400, 60, 60); //send the collection item to screen
  
   // Keyboard controls for character movement
  handleNinjaMovement();
  
  // Define and check walls
  defineAndCheckWalls();
  
  // Check if the player collects the numchucks
  checkNumchuckCollection();
}
function handleNinjaMovement() {
  if (keyIsDown(RIGHT_ARROW) && x < width - 80) {
    x += 6;
  }
  if (keyIsDown(LEFT_ARROW) && x > 0) {
    x -= 6;
  }
  if (keyIsDown(UP_ARROW) && y > 0) {
    y -= 6;
  }
  if (keyIsDown(DOWN_ARROW) && y < height - 120) {
    y += 6;
  }
}
function defineAndCheckWalls() {
  // Define walls
  wall1 = image(mountainImg, 100,80, 170,700); //rect(150, 150, 20, 470); //wall1
  wall2 = image(mountainImg, 250,250, 150,650);//rect(300, 300, 20, 360); //wall2
  wall3 = image(mountainImg, 350,140, 150,650);//rect(400, 200, 20, 410); //wall3

  // Check for collisions
 if ((x > 100 && x <170 && y > 60) || // wall1
      (x > 250 && x <320 && y > 200) ||
      (x > 350 && x <420 && y > 90)) { // wall3
    safe = false;
   resetWuKongPosition();  // Reset WuKong's position
  } else {
    safe = true;  // Safe, not touching any walls
  }
}
function checkNumchuckCollection() {
  let d = int(dist(x, y, 500, 400));
  
  if (d < 40) {
    text('You win!', 200, 300);
    sceneState = "final";  // Go to victory scene
  }
}

function resetWuKongPosition() {
  // Reset WuKong to the starting position
  x = 50;  // Reset the x position of WuKong to starting point
  y = 400; // Reset the y position of WuKong to starting point
}
function resetGame() {
  wukong.x = 325; // Reset WuKong's position
  wukong.y = 460; // Reset WuKong's position
  wukong.vx = 0; // Reset velocity
  wukong.vy = 0; // Reset velocity
  piecesCollected = 0; // Reset collected pieces
  goldenStickPieces = []; // Clear pieces and recreate them so that it would make sure to only have 7 of them
  for (let i = 0; i < 7; i++) {
    goldenStickPieces.push(new GoldenStickPiece());
  }
  sceneState = "dodgeBalls"; // Restart the game
}

function keyPressed() {
  if (sceneState === "gameOver" && key === 'r') {
    resetGame();  // Restart the game when 'r' is pressed
  }
  // Control for scene transitions and actions
  if (sceneState === "freeWukong") {
    if (keyCode === RIGHT_ARROW) {
      movingRight = true;
    } else if (keyCode === LEFT_ARROW) {
      movingLeft = true;
    }
  }

  if (sceneState === "dodgeBalls") {
    if (keyCode === RIGHT_ARROW) {
      wukong.vx = moveSpeed;
    } else if (keyCode === LEFT_ARROW) {
      wukong.vx = -moveSpeed;
    } else if (keyCode === UP_ARROW) {
      wukong.vy = -moveSpeed;
    } else if (keyCode === DOWN_ARROW) {
      wukong.vy = moveSpeed;
    }
  }
}

function keyReleased() {
  if (sceneState === "freeWukong") {
    if (keyCode === RIGHT_ARROW) {
      movingRight = false; // Stop moving right
    } else if (keyCode === LEFT_ARROW) {
      movingLeft = false; // Stop moving left
    }
  }

  if (sceneState === "dodgeBalls") {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      wukong.vx = 0; // Stop horizontal movement
    }
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
      wukong.vy = 0; // Stop vertical movement
    }
  }
}

function mousePressed() {
  if (sceneState === "guideMonk") {
    // Check if the mouse is over the monk
    if (mouseX > monk.x && mouseX < monk.x + 50 && mouseY > monk.y && mouseY < monk.y + 50) {
      monk.isDragging = true; // Start dragging the monk
      monk.offsetX = mouseX - monk.x; // Store offset for horizontal movement
      monk.offsetY = mouseY - monk.y; // Store offset for vertical movement
    }
  }
}

function mouseReleased() {
  if (sceneState === "guideMonk") {
    monk.isDragging = false; // Stop dragging the monk
    
    // Check if monk is touching the scroll
    if (
      monk.x < 430 && // monk's right edge
      monk.x + 50 > 380 && // monk's left edge
      monk.y < 350 + 20 && // monk's bottom edge (scroll)
      monk.y + 50 > 350 // monk's top edge
    ) {
      monk.reachedScroll = true;
      monk.y = 450; // Reset position to original
    }
  }
}

function mouseDragged() {
  if (sceneState === "guideMonk" && monk.isDragging) {
    // Update monk's position based on mouse position and offset
    monk.x = mouseX - monk.offsetX;
    monk.y = mouseY - monk.offsetY;
    // Constrain to keep within canvas bounds
    monk.x = constrain(monk.x, 0, width - 50);
    monk.y = constrain(monk.y, 0, height - 50);
  }
}
