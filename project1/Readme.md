#ROACH RAGE
*A web-based game by Double-Haul Productions*
Smash roaches before they get away.  Smash more than your friends and you win big!

##TECHNOLOGIES USED
HTML, CSS, javascript, jquery

##APPROACH TAKEN
###First Concerns
My first concern was that of scope and can be summarized here:

```javascript```
if ( (myProject < buildingRomeInADay ) && (mYProject > sucks) ) {
  peaceOfMind();
}
```
I spent time building a "toolkit" for myself by exploring different examples and libraries.  This was so I had awareness of things that I could draw from.  I checked out canvas, easel.js, and other technologies. Some time was spent just looking for examples of what you can do with CSS & jQuery.  

I erred on the cautious side and chose not to take on too much.  For example simply used canvas to move static images rather than trying to incorporate spritesheets and easel.js.  

###Process
I pulled a JimboJones and just started implementing what I was most curious about: creating roaches and rending the animation on the canvas.  After some big time killing issues including problems with 'this'( suggestion: read article Jim sent out regarding 'this'), I found myself on the second to last evening with just a sketch in my mind of how to do the rest of the project.  That night I fleshed out a design, wrote some pseudo-code did some wireframing and prayed that my design was going to work.  

On the day the project was due, the first few hours proved to be incredibly productive. I scaffolded out the design and it worked!  From here it was "divide and conquor".  I prioritized features to implement and had a prioritized log of issues and worked through things on at at time. 

###Rendering The Animation Frames
The web app uses the HTML5 canvas feature to render the game.  Objects are created with coordinates for each item to be drawn.  They are drawn in "layers" so certain objects are always seen "on top".  The layers are drawn in the following order: smashed roaches, live roaches, mouse (player) icon/cursor.  This is set to render on a repeating interval.

###Game Logic
The core design is in this github repository in the file "/stuff/pseudo.code"

The game is initialized by creating an array of player objects.
The game loops through each player object to allow the player to play one round. An array of roach objects is created with random starting coordinates near the center of the canvas.  The render function is kicked off on a repeating interval.  Listeners monitor mouse movement and clicks.  When a player clicks in the proximity of a roach, the roach is removed from the array of roaches.  Roaches are removed from the array if they "escape" to outside the border of the canvas.  When all roaches are gone, the render interval timer is cleared and this process continues until all payers have played.


##INSTALLATION INSTRUCTIONS
Install files on a webserver or install files directly on a computer with a browser.
The game is installed and playable from these links:
http://gambler-polarity-27158.bitballoon.com/
http://dctabion.github.io/project1 (sound does't work here)


##UNSOLVED ISSUES
* Need a delay at the beginning of a player's turn so they can get ready to kill roaches
* sound doesn't work on version at github server
* sound doesn't play all the time
* Some roaches don't move
* Score summary at end of game has poor formatting.
* Make .png files transparent to improve rendering and remove the "rectangles" around images.
* Occasionally there is an error at the end of a player's round.  This doesn't cause

A more complete log of unsolved issues is contained in the github repository in the file "stuff/issues&featureTracking".


##FUTURE FEATURES
Some of the main features which might be added include:
* improve layout
* give roaches "intelligence" to allow them to respond to proximity of mouse position
* Within one player's round, allow a new wave(s) of roaches to be generated.
* show indication of impending new wave of roaches
* allow player to plant up to x number of roach bombs which are more effective than simple mouse clicking
* more sounds for various aspects of the game

A more complete list of future features is contained in the github repository in the file "stuff/issues&featureTracking".
