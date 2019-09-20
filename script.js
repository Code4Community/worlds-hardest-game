// World's Hardest Game, 2019

let player = new Player();

let xMin = 0, xMax = 800; 
let yMin = 0, yMax = 600;

// Creates a 2D Point within the bounds of the screen
function Point (xCoor, yCoor) {

    if (xCoor >= xMin && xCoor <= xMax) {
        this.x = xCoor;
    } 
    else {
        console.log("x-coordinate " + xCoor + " is out of range; xMin = " + xMin + " and xMax = " + xMax);
        return;
    }

    if (yCoor >= yMin && yCoor <= yMax) {
        this.y = yCoor;
    } 
    else {
        console.log("y-coordinate " + yCoor + " is out of range; yMin = " + yMin + " and yMax = " + yMax);
        return;
    }
}

var context;
var obstacles = [];

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("board");
    canvas.width = this.xMax;
    canvas.height = this.yMax;
    context = canvas.getContext("2d");
}, false);

function Obstacle(image, width, height, speed, startPixel, endPixel)
{
    this.image = image;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.startPixel = startPixel;
    this.endPixel = endPixel;
}
<<<<<<< HEAD

function updateObstaclePosition(obstacles)
{
    for(var i = 0; obstacles.length; i++)
    {
        
    }
}

=======
>>>>>>> 732546630c22c3ea42cfc1eb5a06c63e6203463b
