var webcam;

//var faces;  // not needed if we're just drawing to a single face
var faceVertices;
var faceRotation;
var faceDataReceived = false;
var faceTrackingStatus = false;

var canvasWidth = 640;
var canvasHeight = 480;

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

// SOUND VARIABLES
// The midi notes of a scale
var notes = [ 60, 62, 64, 65, 67, 69, 71];
var osc;
var audioEnabled = false;
var faceXRotationIntPrevious;
var faceXRotationInt;

// A function to play a note
function playNote(note, duration, p) {
    osc.freq(p.midiToFreq(note));
    // Fade it in
    osc.fade(0.5,0.2);

    //If we sest a duration, fade it out
    if (duration) {
        setTimeout(function() {
        osc.fade(0,0.2);
        }, duration-50);
    }
}

// function to set up the canvas that will draw whatever layers we want to place on top of the webcam's input
var drawingCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);
    p.noStroke();

    // A triangle oscillator
    osc = new p5.TriOsc();
    // Start silent
    osc.start();
    osc.amp(0);
  };

  p.draw = function() {
    // clear the canvas drawing buffer each frame (can easily be turned off)
    p.clear();
    // set the canvas background to transparent (otherwise you won't see the webcam's input)
    p.background(0, 0, 0, 0);

    // only draw if you've received data from the facetracking library
    if (faceDataReceived == true && faceTrackingStatus == true) {
        p.fill(255, 0, 0);
        p.ellipse(30, 30, 10);
        // only play sounds if we've clicked the screen 
        if (audioEnabled == true) {
            // map your face rotation to an integer between 0 and 6
            faceXRotationInt = p.int(p.map(faceRotation[1], -0.4, 0.4, 0, 6));
            
            // check to see if this integer is different from the previous frame
            if (faceXRotationInt != faceXRotationIntPrevious) {
                playNote(notes[faceXRotationInt], 500, p);
            }

            // set the rotation comparisons equal to one another
            faceXRotationIntPrevious = faceXRotationInt;
        }
    }
  };

  // you need to manually enable audio context in order to get Chrome to 
  // play audio
  p.mousePressed = function() {
      if (audioEnabled == false) {
        p.getAudioContext().resume();
        audioEnabled = true;
      }
  }
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
