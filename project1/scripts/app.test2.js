///////////// Preload Resources: images & sounds /////////////

// Images
var imgRoach = new Image();
imgRoach.src = 'assets/roachRight.png';

var imgSplat = new Image();
imgSplat.src = 'assets/splat.png';

var imgHand = new Image();
imgHand.src = 'assets/hand.png';

/////////////// Global Variables /////////////

// get canvas element selector and get context
var canvas;
var ctx;

// some gobals
var canvasWidth = 600; // from CSS file ...make this adjustable in future?
var canvasHeight = 500; // from CSS file ...make this adjustable in future?

var roaches = [];
var numRoaches = 5;
var maxRoachSpeed = 5;
var minRoachSpeed = 1;
var startRadius = 25;

var timeoutId;

//////////////// Constructors ////////////////

// Make new roach
function roach(xPos, yPos, xVel, yVel) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xPosOld = xPos;
  this.yPosOld = yPos;
  this.xVel = xVel;
  this.yVel = yVel;
  this.moveIt = function() {
    // save old position & update position
    this.xPosOld = this.xPos;
    this.xPos = this.xPos + this.xVel;
    this.yPosOld = this.yPos;
    this.yPos = this.yPos + this.yVel;
  };
  this.clear = function() {
    ctx.clearRect(this.xPosOld, this.yPosOld, 40, 40);
  }
  this.render = function() {
//      ctx.fillRect(this.xPos, this.yPos, 40, 40);
    ctx.drawImage(imgRoach, this.xPos, this.yPos);
  };
  this.changeVelocity = function() {
    // Future feature in new version
    // make roaches respond to mouse proximity
    }
}

// Make new player
function player() {
  this.kills = 0;
  this.name = "Dood";
  this.currentX;
  this.currentY;
  this.oldX;
  this.oldY;
  this.self = this;

  this.mouseMove = function(event) {
    console.log('mouse Move:' + self + self.currentX + ", " + self.currentY);
    ctx.clearRect(self.oldX, self.oldY, 40, 40);
    self.currentX = event.pageX - canvas.offsetLeft;
    self.currentY = event.pageY - canvas.offsetTop;
    // save old position so we can clear it before changing this.x & y
    self.oldX = self.currentX;
    self.oldY = self.currentY;
    console.log(self.currentX + ", " + self.currentY);
  };
  this.render = function() {
    console.log('render:' + self + self.currentX + ", " + self.currentY);
    ctx.drawImage(imgHand, self.currentX, self.currentY );
  };
  this.killRoaches = function(event) {
    console.log('killRoaches: ' + self + self.currentX + ", " + self.currentY);
    var xKill = event.pageX - canvas.offsetLeft;
    var yKill = event.pageY - canvas.offsetTop;
    console.log('trying to kill roaches');
    console.log(event.pageX + ", " + event.pageY + "  " +
      xKill + ', ' + yKill);
    ctx.drawImage(imgSplat, xKill, yKill );

    // check for kills on each roach
    for (i=0; i<roaches.length; i++) {
    }
  };
}

////////////////  Helper Functions /////////////////

// move and draw all the roaches
function renderGame() {
  // console.log('rendering Game');

  for (var i=0; i<roaches.length; i++) {
    roaches[i].moveIt();
  }
  for (var i=0; i<roaches.length; i++) {
    roaches[i].clear();
  }
  for (var i=0; i<roaches.length; i++) {
    roaches[i].render();
  }
  currentPlayer.render();
}

///////// Initialize objects & call construtors //////////

// Create player
var currentPlayer = new player();

// Create the roaches with initial random positions & velcities
for (var i=0; i<numRoaches; i++) {
  console.log('creating Roach ' + i);
  // choose random position within 50px of center
  var x = Math.floor(
    Math.random() * (  ((canvasWidth/2 + startRadius)+1) - (canvasWidth/2 - startRadius)  )
    + (canvasWidth/2 - startRadius)
  );
  var y = Math.floor(
    Math.random() * (  ((canvasHeight/2 + startRadius)+1) - (canvasHeight/2 - startRadius)  )
    + (canvasHeight/2 - startRadius)
  );

  // choose random velocity from +/-maxRoachSpeed
  var xVel = Math.floor(
    Math.random() * ((maxRoachSpeed+1) - minRoachSpeed) + minRoachSpeed
    - maxRoachSpeed/2
  );
  var yVel = Math.floor(
    Math.random() * ((maxRoachSpeed+1) - minRoachSpeed) + minRoachSpeed
    - maxRoachSpeed/2
  );
  roaches[i] = new roach(x, y, xVel, yVel);
}

////////////////////// window.onload //////////////////////////

$('document').ready(function(){
  console.log('window loaded');

  canvas = document.getElementById('gameCanvas');
  // canvas = document.getElementById('gameCanvas').style.cursor = "none";
  ctx = canvas.getContext('2d');
  /////// MAIN CONTROL CODE ///////////////////
  /////////////////////////////////////////////

  // listen for player events
  canvas.addEventListener('click', currentPlayer.killRoaches);
  canvas.addEventListener('mousemove', currentPlayer.mouseMove);

  // listen for ESC to stop the program
  $( "html" ).keydown(function( event ) {
    // ESC - stop the roach!
    if (event.keyCode == 27) {
      clearInterval(timeoutId);
    }
    console.log('event.keyCode: ' + event.keyCode);
  });

  // set game rendering in motion
  timeoutId = window.setInterval(renderGame, 50);
  //  renderGame();

}); // close $('document').ready()
