//use random(), mouseX and mouseY, mousePressed() or keyPressed()
let bgColor;
let eyeColor;
let r;
let g;
let b;
let lineColor;
function setup() {
  createCanvas(400, 400);
  eyeColor = color( 0, 0, 0);
}

function draw() {

  bgColor = color(255,0,0);
  background(bgColor);
  let headSize = map(mouseX, 0, 600, 150, 700);
  let eyeSize = map(mouseY, 0, height, 25, 90);
  let body = mouseX/2 + 300;
  
  //head
  push();
  noStroke();
  fill(r,g,b);
  ellipseMode(CENTER);
  ellipse(200, 200, headSize, headSize/1.3);
  pop();

  //eyes
  push();
  noStroke()
  fill(eyeColor);
  circle(width / 2 - headSize / 4, height / 2 - headSize / 40, eyeSize);
  circle(width / 2 + headSize / 4, height / 2 - headSize / 40, eyeSize);
  pop();
  
  //line in between eyes
  push();
  stroke(eyeColor);
  strokeWeight(4);
  line(width / 2 - headSize / 4, height / 2 - headSize / 40,width / 2 + headSize / 4, height / 2 - headSize / 40);
  pop();
  
  //body
  push();
  noStroke();
  fill(r,g,b);
  ellipse(200,405, body,310);
  //arc(width/2, height, body, 310, -200, 0);
  pop();
}
  function mousePressed() {//to change bodycolor

     r = random(255);
     g = random(255);
     b = random(255);

  }
function keyPressed() {
  // Change background color based on key pressed
  eyeColor = color(random(255), random(255), random(255));
  
}