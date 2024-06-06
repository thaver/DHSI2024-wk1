// Tracery example by Allison Parrish
// But we'll also create a box to hold our lines as they move
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100, 105, 50); //
}

function draw() {
  // This overlay will always take us back to black - try changing it
  // The alpha of 3 controls the speed of the fade - try raising and lowering it
  // This moves the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
  background(70, 105, 10, 50); // Set overlay to lime green
}

// This draws the word with each mouse click
function mouseClicked() {
  var grammar = tracery.createGrammar(grammarSource); // set up tracery library
  grammar.addModifiers(tracery.baseEngModifiers); // set up English grammar properly (capitals and a/an)

  // Create three new particles
  for (let i = 0; i < 5.2; i++) {
    var output = grammar.flatten("#origin#"); // create sentence from grammar source
    let p = new Particle(mouseX, mouseY, output);
    particles.push(p);
  }
}
// grammarSource is generated using:
// http://tracery.io/
// See the tutorial here: http://www.crystalcodepalace.com/traceryTut.html
var grammarSource = {
  "origin": ["#line1#\n#line2#\n#line3#"],
  "line1": ["In the quiet of the #place#, I find #feeling#", "Beneath the #object#, I breathe in peace", "Amidst the #nature#, my worries cease"],
  "line2": ["The #sound# of #thing# soothes my mind", "Soft #object# and #object# calm my soul", "Gentle #action# brings serenity"],
  "line3": ["Here, in this #place#, I am whole", "In this moment, I am free", "In stillness, I find tranquility"],
  "place": ["disappearing swimming pool ladder", "forest", "meadow", "playing the sims", "mountains"],
  "feeling": ["peace", "calm", "serenity", "solace", "stillness"],
  "object": ["breeze", "shade", "light", "fog", "dew"],
  "nature": ["trees", "flowers", "waves", "birds", "leaves"],
  "sound": ["whisper", "burn", "rustle", "murmur", "hum"],
  "thing": ["wind", "water", "leaves", "birds", "waves"],
  "action": ["breathing", "yoga on a green towel", "sitting", "walking", "listening to harsh noise"]
};

class Particle {
  constructor(x, y, text) {
    // This sets the x value to mouse position
    this.x = x;
    // This keeps the y at mouse position
    this.y = y;
    // This sets the range of x movement - try limiting it to + or -
    this.vx = random(-1, 1);
    // This sets the range of y movement - try limiting it to + or -
    this.vy = random(-1, 1);
    // This sets the text size to be consistent
    this.size = random(15, 20);
    // This sets the current line to the particle
    this.text = text;
  }

  finished() {
    // Change this to 255 if you reverse the fade
    return (this.width < 0 || this.width > windowWidth);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    noStroke();
    textSize(this.size);
    // Try any web safe font
    textFont("Courier");
    // This centers the text on the click
    textAlign(CENTER, CENTER);
    // This sets the fill to a static color - can you make it random?
    // You can also add the outline
    stroke(0); // Thin black outline
    strokeWeight(1); // Thin stroke weight
    // This sets the fill color to dark green
    fill(0, 100, 0); 

    // Draw the text multiple times for a blur effect
    for (let i = 0; i < 10; i++) {
      let offsetX = random(-1, 1);
      let offsetY = random(-1, 1);
      text(this.text, this.x + offsetX, this.y + offsetY);
    }

    // Draw the main text
    fill(0, 100, 0);
    text(this.text, this.x, this.y);
  }
}
