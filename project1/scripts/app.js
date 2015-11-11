$('document').ready(function(){
  console.log('window loaded');

  ///////////// Preload & Prep /////////////

  // Images
  var imgRoach = new Image();
  imgRoach.class = 'imgRoach';

  imgRoach.src = 'assets/roachRight.png';
  console.log(imgRoach);

  /////////////// Global Variables /////////////

  // get canvas element selector and get context
  var canvas = document.getElementById('gameCanvas');
  var ctx = canvas.getContext('2d');

  // some gobals
  var canvasWidth = 600; // from CSS file ...make this adjustable in future?
  var canvasHeight = 500; // from CSS file ...make this adjustable in future?
  var numRoaches = 5;
  var maxRoachSpeed = 5;
  var roaches = [];

  // Constructors
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
      ctx.clearRect(this.xPosOld, this.yPosOld, 175, 175);
    }
    this.render = function() {
      ctx.drawImage(imgRoach, this.xPos, this.yPos);

    this.changeVelocity = function() {
      // Future feature in new version
      // make roaches respond to mouse proximity
      }

    };
  }

  // Initialize objects & call construtors
  for (var i=0; i<numRoaches; i++) {
    console.log('creating Roach ' + i);
    var x = parseInt((Math.random() * 50 ) + (canvasWidth / 2 - 50));
    var y = parseInt((Math.random() * 50 ) + (canvasHeight / 2 - 50));
    var xVel = parseInt(Math.random() * maxRoachSpeed);
    var yVel = parseInt(Math.random() * maxRoachSpeed);
    roaches[i] = new roach(x, y, xVel, yVel);
  }

  // Helper Functions
  function renderGame() {
    for (var i=0; i<roaches.length) {
      roaches[i].moveIt();
      roaches[i].clear();
      roaches[i].render();
    }
    // alert();
  }

  // set game rendering in motion
  timeoutID = window.setInterval(renderGame, 50);

}); // close $('document').ready()
