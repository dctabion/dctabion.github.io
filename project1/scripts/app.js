$('document').ready(function(){
  console.log('window loaded');

  ///////////// Preload Resources: images & sounds /////////////

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
      ctx.clearRect(this.xPosOld, this.yPosOld, 175, 175);
    }
    this.render = function() {
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
    this.killRoaches = function() {
      console.log('kill roaches')


    };
  }

  ////////////////  Helper Functions /////////////////

  // move and draw all the roaches
  function renderGame() {
    console.log('rendering');
    for (var i=0; i<roaches.length; i++) {
      roaches[i].moveIt();
    }
    for (var i=0; i<roaches.length; i++) {
      roaches[i].clear();
    }
    for (var i=0; i<roaches.length; i++) {
      roaches[i].render();
    }
  }

  /////// MAIN CONTROL CODE ///////////////////
  /////////////////////////////////////////////

  ///////// Initialize objects & call construtors //////////

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

  // Create player
  var player1 = new player();

  // listen for player attempting to kill roaches with mouse click
  canvas.addEventListener('click', function(event) {
    console.log('click');
  });
  // ctx.addEventListener('click', player1.killRoaches(event) );

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
