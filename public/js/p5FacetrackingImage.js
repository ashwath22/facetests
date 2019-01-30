var webcam;

//var faces;  // not needed if we're just drawing to a single face
var faceVertices;
var faceRotation;
var faceDataReceived = false;
var faceTrackingStatus = false;

var canvasWidth = 640;
var canvasHeight = 480;

// IMAGE VARIABLE
var smiley;
var toggle = 1;
var mouthWidth;
var eyeDist;
var smileFactor;

// function to set up the canvas that will draw the webcam's input
var webcamCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);

    // set up the webcam HTML5 video element and make it hidden on the page
    webcam = p.createCapture('VIDEO');
    webcam.size(canvasWidth, canvasHeight);
    webcam.hide();
    webcam.volume(0);
  };

  p.draw = function() {
    p.image(webcam, 0, 0, canvasWidth, canvasHeight);
  };
}

// function to set up the canvas that will draw whatever layers we want to place on top of the webcam's input
var drawingCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);
    p.imageMode(p.CENTER);
    img = p.loadImage("../images/upside-down.png")
  };

  p.draw = function() {
    // clear the canvas drawing buffer each frame (can easily be turned off)
    p.clear();
    // set the canvas background to transparent (otherwise you won't see the webcam's input)
    p.background(0, 0, 0, 0);
    // set the
    p.fill(0, 0, 0, 0);
    p.strokeWeight(2);
    p.stroke(255, 0, 0);

    document.body.onkeyup = function(e){
      if(e.keyCode == 32){
        console.log("Space pressed!");
        toggle *= -1;
      }
    }

    // only draw if you've received data from the facetracking library
    if (faceDataReceived == true && faceTrackingStatus == true && toggle == -1) {
        // p.image(img, faceVertices[58]/2, faceVertices[59]/2);
        p.stroke(255,255,255);
        for(var i=0; i<135; i += 2){
          if (i == 32 || i == 70 || i == 94 /*|| i == 17 || i == 36 || i == 42*/){  
            console.log("skipping")
            continue;
          } else {
              // Calculate smile!
              mouthWidth = p.dist(faceVertices[96]/2, faceVertices[97]/2, faceVertices[108]/2, faceVertices[109]/2);
              eyeDist = p.dist(faceVertices[78]/2, faceVertices[79]/2, faceVertices[84]/2, faceVertices[85]/2);
              smileFactor = mouthWidth/eyeDist;
              console.log("Smile factor: " + smileFactor);
              if (smileFactor > 1.55)
              {
                p.line(faceVertices[i]/2, faceVertices[i+1]/2, faceVertices[i+2]/2, faceVertices[i+3]/2);
              }
            } 
      }
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

  // ** FOR MULTI-FACE TRACKING
  // for(var i = 0; i < faces.length; i++) {
  //   var face = faces[i];
  //   faceVertices = face.vertices;
  // }
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
