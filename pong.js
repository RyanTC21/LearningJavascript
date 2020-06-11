// global
var balls = [];
var points = 0;
var p;

// runs once
function setup() {
  createCanvas(800, 400);
  for (var i = 0; i < 2; i++) {
    balls[i] = new ball();
  }
}
// define the ball
function ball() {
  this.x = width / 2;
  this.y = height / 2;
  this.xspeed = Math.round(Math.random() * 8);
  this.yspeed = Math.round(Math.random() * 8);
  this.update = function() {
    if (this.x < 0 || this.x > width) {
      this.xspeed *= -1;
    } else if (this.x > 780) {
      points++;
      console.log(points);
      this.x = width / 2;
      this.y = height / 2;
      this.xspeed = Math.round(Math.random() * 8);
      this.yspeed = Math.round(Math.random() * 8);
    }
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1;
    }
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }



// show function of ball
  this.show = function() {
    push();
    fill(255, 153, 0);
    ellipse(this.x, this.y, 8, 8);
    p = createVector(this.x, this.y);
    pop();
  }

// figures out if ball location matches up to paddle location
  this.hits = function(pos) {
    //takes the y direction of the ball and applies new y dir and speed based on what part of paddle it hits.
    if (pos.x == 770) {
      if (pos.y >= mouseY && pos.y <= mouseY + 40) {
        if (this.yspeed > 0) {
          if (pos.y >= mouseY && pos.y <= mouseY + 20) {
            this.yspeed *= -1.02;
            this.xspeed *= -1.02;
          } else if (pos.y > mouseY + 20 && pos.y <= mouseY + 40) {
            this.yspeed *= 1.02;
            this.xspeed *= -1.02;
          }
        } else if (this.yspeed < 0) {
          if (pos.y >= mouseY && pos.y <= mouseY + 20) {
            this.yspeed *= 1.02;
            this.xspeed *= -1.02;
          } else if (pos.y > mouseY + 20 && pos.y <= mouseY + 40) {
            this.xspeed *= -1.02
            this.yspeed *= -1.02
          }
        }
      }

    } else {
      return false;
    }
  }
}
// runs on loop
function draw() {
  background(60);
  for (var i = 0; i < 1; i++) {
    balls[i].update();
    balls[i].show();
    balls[i].hits(p);
  }
  // paddle (could be improved by making paddle an object and not having to hard code in the paddle height into all the 'hits' code.)
  rect(770, mouseY, 10, 40);
}
