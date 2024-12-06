function setup() {
    createCanvas(400, 400);
     background(125,125,255);
  }
  
  function draw() {
    push();
    translate(200,200);
    rotate(PI/4);
    fill(255,192,203);
    rect(-80,-80,150,150);
    pop();
    
    push();
    translate(200,200);
    fill(255,215,0); //ring body
    circle(0, 0, 100);
    fill(255,192,203); //ring inside
    circle(0, 0, 84);
    pop();
    fill(255,255,255);
    circle(200, 140, 40);
  }