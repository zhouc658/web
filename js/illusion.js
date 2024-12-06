let angle=3;
let r=0;
function setup() {
  createCanvas(600, 600);
  noFill();

}

function draw() {
  background(220);
  stroke(191,64,191); //the color of background square lines
  for (let i = 0; i < 60; i++) {
       strokeWeight(3); //thickness of the rectangle lines
    rectMode(CENTER); //always centered as square grows larger
    rect(300,300, i*10,i*10); // increases by 10 for both width and height
     
  }
  push(); 
  strokeWeight(1.5);
  translate(mouseX, mouseY);
  rotate(r); //rotate based on the value r
  
  if(mouseIsPressed){
    r = r + 300; //when mouse is pressed, r will increase by 300 to have the purple square rotate slower
  }else if(keyIsPressed){

 angle=random(0,20);
}
  stroke(255,255,0); //color for purple for the square
  for (let i = 0; i < 80; i ++) {
    rectMode(CENTER); //always centered
    rect(0,0, i*10,i*10); // starts at 0, since the mouse position is the new origin b/c of the translate(mouseX,mouseY); used from before
    rotate(radians(angle)); //Converts an angle measured in degrees to its value in radians, rotates by 3 to create spiral effect
  }
  pop();

}