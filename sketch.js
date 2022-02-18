// Mohr Multi-Arcs
// By Oliver N Blake

let cream;
let black;
let sw;
let f = 0.0;
let mSize;
let arcPoints1 = [];
let arcPoints2 = [];
let arcPoints3 = [];
let arcPoints4 = [];
let arcSize1 = [];
let arcSize2 = [];
let arcSize3 = [];
let arcSize4 = [];
let gap;
let numMohr;
let sizeVar;
let xMohrs, yMohrs;
let xSpc, ySpc;
let xOff, yOff;
let rotateSpeed = [];
let angles = [];

function setup() {
  createCanvas(500, 500);
  
  cream = color(255, 253, 208);
  black = color(0);
  sw = 0.8;
  mSize = 30;
  gap = 0.08;
  sizeVar = 2;
  xMohrs = 10;
  yMohrs = 10;
  numMohr = xMohrs * yMohrs;
  
  xSpc = width/xMohrs;
  ySpc = height/yMohrs;
  xOff = xSpc/2;
  yOff = ySpc/2;
  
  for (let i = 0; i < numMohr; i++) {
    // Arc Points
    arcPoints1[i] = random(HALF_PI);
    arcPoints2[i] = random(HALF_PI, PI);
    arcPoints3[i] = random(PI, PI + HALF_PI);
    arcPoints4[i] = random(PI + HALF_PI, TWO_PI);
    // Arc Sizes
    arcSize1[i] = random(mSize - mSize/sizeVar, mSize + mSize/sizeVar);
    arcSize2[i] = random(mSize - mSize/sizeVar, mSize + mSize/sizeVar);
    arcSize3[i] = random(mSize - mSize/sizeVar, mSize + mSize/sizeVar);
    arcSize4[i] = random(mSize - mSize/sizeVar, mSize + mSize/sizeVar);
    rotateSpeed[i] = random(-2, 2);
    angles[i] = 0;
  }
}

function draw() {
  background(cream);  // Set background to cream
  
  // Set Stroke colour and weight
  stroke(black);
  strokeWeight(sw);
  
  // Draw Mohr Arcs
  for (let x = 0; x < xMohrs; x++) {
    for (let y = 0; y < yMohrs; y++) {
      push();
      let locX = xOff + x*xSpc;
      let locY = yOff + y*ySpc;
      translate(locX, locY);
      let mohrNum = x * xMohrs + y;
      rotate(radians(angles[mohrNum]));
      drawMohrArc(x * xMohrs + y);
      pop();
    }
  }
  
  // Update Arrays;
  updateArrays();
  
  // Increment f
  f += 0.02;
  
}

function drawMohrArc(mNum) {
  noFill();
  let numArcs = 3;
  let arc2 = 0.875;
  let arc3 = 0.75;
  
  // Draw first quadrant
  for (let i = 0; i < numArcs; i++) {  
    arc(0, 0, arcSize1[mNum], arcSize1[mNum], arcPoints1[mNum] + gap, arcPoints2[mNum] - gap);
    arc(0, 0, arcSize1[mNum] * arc2, arcSize1[mNum] * arc2, arcPoints1[mNum] + gap, arcPoints2[mNum] - gap);
    arc(0, 0, arcSize1[mNum] * arc3, arcSize1[mNum] * arc3, arcPoints1[mNum] + gap, arcPoints2[mNum] - gap);
  }
  
  // Draw second quadrant
  for (let i = 0; i < numArcs; i++) {  
    arc(0, 0, arcSize2[mNum], arcSize2[mNum], arcPoints2[mNum] + gap, arcPoints3[0] - gap);
    arc(0, 0, arcSize2[mNum] * arc2, arcSize2[mNum] * arc2, arcPoints2[mNum] + gap, arcPoints3[mNum] - gap);
    arc(0, 0, arcSize2[mNum] * arc3, arcSize2[mNum] * arc3, arcPoints2[mNum] + gap, arcPoints3[mNum] - gap);
  }
  
  // Draw third quadrant
  for (let i = 0; i < numArcs; i++) {  
    arc(0, 0, arcSize3[mNum], arcSize3[mNum], arcPoints3[mNum] + gap, arcPoints4[mNum] - gap);
    arc(0, 0, arcSize3[mNum] * arc2, arcSize3[mNum] * arc2, arcPoints3[mNum] + gap, arcPoints4[mNum] - gap);
    arc(0, 0, arcSize3[mNum] * arc3, arcSize3[mNum] * arc3, arcPoints3[mNum] + gap, arcPoints4[mNum] - gap);
  }
  
  // Draw forth quadrant
  for (let i = 0; i < numArcs; i++) {  
    arc(0, 0, arcSize4[mNum], arcSize4[mNum], arcPoints4[mNum] + gap, arcPoints1[mNum] - gap);
    arc(0, 0, arcSize4[mNum] * arc2, arcSize4[mNum] * arc2, arcPoints4[mNum] + gap, arcPoints1[mNum] - gap);
    arc(0, 0, arcSize4[mNum] * arc3, arcSize4[mNum] * arc3, arcPoints4[mNum] + gap, arcPoints1[mNum] - gap);
  }
  

}

function updateArrays() {
  for (let i = 0; i < numMohr; i++) {
    arcPoints1[i] = map(noise(f + 10), 0, 1, 0, HALF_PI);
    arcPoints2[i] = map(noise(f + 20), 0, 1, HALF_PI, PI);
    arcPoints3[i] = map(noise(f + 30), 0, 1, PI, PI + HALF_PI);
    arcPoints4[i] = map(noise(f + 10), 0, 1, PI + HALF_PI, TWO_PI);
    angles[i] += rotateSpeed[i];
  }
}