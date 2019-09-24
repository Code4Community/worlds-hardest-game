// World's Hardest Game, 2019

// The user-controlled entity that performs actions in the game
//let player = new Player();

// Global variables for the Canvas
var context;
var canvas;
var obstacles = [];
var oldTimeStamp = 0.0;

// Details for the screen and its size
let xMin = 0, xMax = 800; 
let yMin = 0, yMax = 600;

// Runs on Document Load, initializes full programs
document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("board");
    canvas.width = xMax;
    canvas.height = yMax;
    context = canvas.getContext("2d");

    var img = new Image(20, 20);
    img.src = "https://scontent-sea1-1.cdninstagram.com/vp/e92b43bf1d1c01d0a298e3937733c06c/5DD9D0C6/t51.2885-19/s150x150/52486763_624841137975557_4315053367689740288_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com";
    var startPoint = new Point(10, 10);
    var endPoint = new Point(500, 500);
    var ob1 = new Obstacle(img, 2, startPoint, endPoint);
    obstacles.push(ob1);
    window.requestAnimationFrame(gameLoop);
}, false);

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
function Obstacle(image, speed, startPoint, endPoint)
{
    //the this.image is an image object
    this.image = image;
    this.speed = speed;
    // All of these are Point's
    this.startPoint = startPoint;
    this.currentPoint = new Point(0, 0);
    this.endPoint = endPoint;
}

function gameLoop(timeStamp)
{
    var timePassed = timeStamp - oldTimeStamp;
    oldTimeStamp = timeStamp;

    updateObstaclePositions(timePassed);
    
    window.requestAnimationFrame(gameLoop);
}

function updateObstaclePositions(timePassed)
{
    for(var i = 0; i < obstacles.length; i++)
    {
        //calculate future position of the obstacle
        obstacles[i].currentPoint.x += obstacles[i].speed * timePassed;
        obstacles[i].currentPoint.y += obstacles[i].speed * timePassed;
        if(obstacles[i].currentPoint.x > obstacles[i].startPoint.x){}
        //draw the obstacle
        drawImage(obstacles[i].image, obstacles[i].currentPoint);
    }
}

function drawImage(image, point)
{
    //clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    //draw the image at the point
    context.drawImage(image, point.x, point.y);
}
