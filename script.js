// World's Hardest Game, 2019

// The user-controlled entity that performs actions in the game
let player = new Player();

// Global variables for the Canvas
var context;
var obstacles = [];

// Details for the screen and its size
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


// Constructor for an Obstacle
function Obstacle(image, width, height, speed, startPoint, endPoint)
{
    this.image = image;
    this.width = width;
    this.height = height;
    this.speed = speed;
    // Both of these are Point's
    this.startPoint = startPoint;
    this.endPoint = endPoint;
}

// Runs on Document Load, initializes full programs
document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("board");
    canvas.width = this.xMax;
    canvas.height = this.yMax;
    context = canvas.getContext("2d");
}, false);

function updateObstaclePosition(obstacles)
{
    for(var i = 0; obstacles.length; i++)
    {
        
    }
}