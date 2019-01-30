var webcam;

//var faces;  // not needed if we're just drawing to a single face
var faceVertices;
var faceRotation;
var faceDataReceived = false;
var faceTrackingStatus = false;

var canvasWidth = 640;
var canvasHeight = 480;

var font;
var fontsize = 40

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = loadFont('../assets/Yikes.ttf');
}

// function to set up the canvas that will draw the webcam's input
var webcamCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);

    // set up the webcam HTML5 video element and make it hidden on the page
    webcam = p.createCapture('VIDEO');
    webcam.volume(0);
    webcam.size(canvasWidth, canvasHeight);
    webcam.hide();
  };

  p.draw = function() {
    p.image(webcam, 0, 0, canvasWidth, canvasHeight);
  };
}

// GAME VARIABLES
var rad = 60; // Width of the shape
var xpos, ypos; // Starting position of shape

var xspeed = 2.8; // Speed of the shape
var yspeed = 2.2; // Speed of the shape

var xdirection = 1; // Left or Right
var ydirection = 1; // Top to Bottom

var youLost = false;
var sensitivity = 20;

// function to set up the canvas that will draw whatever layers we want to place on top of the webcam's input
var drawingCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);
    p.noStroke();
    xpos = canvasWidth / 2;
    ypos = canvasHeight / 2;
    font = p.loadFont('../assets/Yikes.ttf');
    p.textFont(font);
    p.textSize(fontsize);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function() {
    // clear the canvas drawing buffer each frame (can easily be turned off)
    p.clear();
    // set the canvas background to transparent (otherwise you won't see the webcam's input)
    p.background(0, 0, 0, 0);
    // set the fill color and stroke for drawing shapes
    
    if (faceDataReceived == true && faceTrackingStatus == true) {
        p.fill(255, 0, 0);
        p.ellipse(30, 30, 10);

        // Update the position of the ball
        xpos = xpos - (faceRotation[1] * sensitivity);
        ypos = ypos + (faceRotation[0] * sensitivity);

        // Test to see if the ball exceeds the boundaries of the screen
        // If it does, end the game
        if (xpos > canvasWidth - rad/2 || xpos < rad/2) {
            youLost = true;
        }
        if (ypos > canvasHeight - rad/2 || ypos < rad/2) {
            youLost = true;
        }
    }

    // Draw a message if you lost, otherwise draw the ball
    if (youLost == false) {
      p.fill(0, 0, 255);
      p.ellipse(xpos, ypos, rad, rad);
    } else {
        p.fill(255, 0, 255);
        p.text("YOU LOST", canvasWidth/2, canvasHeight/2);
    }
    
    

  };
}

var p5Webcam = new p5(webcamCanvas, 'canvasContainer');
var p5Drawing = new p5(drawingCanvas, 'canvasContainer');

function sendFaceDataToP5(faces) {
  if (faceDataReceived == false) {
    faceDataReceived = true;
  }

  faceVertices = faces[0].vertices;
  faceRotation = [faces[0].rotationX, faces[0].rotationY, faces[0].rotationZ];
}

function sendFaceTrackingStatusToP5(trackingStatus) {
  faceTrackingStatus = trackingStatus;
}

function setupCanvas(p) {
  let canvas = p.createCanvas(canvasWidth, canvasHeight);

  // find the div element that contains our canvases and set the p5 canvas to have its position
  // if we don't do this, the canvas will default draw to our window's (0, 0) position,
  // overwriting other elements on the page
  var canvasContainerElement = p.selectAll('.canvasContainerClass');
  let containerElementPositionX = canvasContainerElement[0].elt.offsetLeft;
  let containerElementPositionY = canvasContainerElement[0].elt.offsetTop;
  canvas.position(containerElementPositionX, containerElementPositionY);
}
