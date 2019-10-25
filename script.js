// World's Hardest Game, 2019

// The user-controlled entity that performs actions in the game
//let player = new Player();

var aleksFace;

//Obstacle Array
var obstacleData;

// Global variables for the Canvas
var context;
var canvas;
var obstacles;
var oldTimeStamp;

// Details for the screen and its size
var xMin;
var xMax; 
var yMin;
var yMax;

var animationFrameId = null;

// Set up function
function setUpGame() {
    // Since the gameLoop will run forever, we need to stop it before restarting it here
    if (animationFrameId != null) {
        window.cancelAnimationFrame(animationFrameId);
    }

    aleksFace = "https://scontent-sea1-1.cdninstagram.com/vp/e92b43bf1d1c01d0a298e3937733c06c/5DD9D0C6/t51.2885-19/s150x150/52486763_624841137975557_4315053367689740288_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com";

    obstacles = [
        //image URL, image widht, image height, speed X, speed Y, start X, start Y, end X, end Y
        new Obstacle(aleksFace, 20, 20, 6, 6, 10, 10, 1100, 400, 11, 11)
    ];

    xMin = 0;
    xMax = 1200; 
    yMin = 0;
    yMax = 500;
    
    canvas = document.getElementById("board");
    canvas.width = xMax;
    canvas.height = yMax;
    context = canvas.getContext("2d");

}

// Creates a 2D Point within the bounds of the screen
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        if (x < xMin || x > xMax) {
            alert("x-coordinate " + x + " is out of range, xMin = " + xMin + " and xMax = " + xMax);
        }
        if (y < yMin || y > yMax) {
            alert("y-coordinate " + y + " is out of range, yMin = " + yMin + " and yMax = " + yMax);
        }
    }
}

// Constructor for an Obstacle
class Obstacle {
    constructor(image, imageWidth, imageHeight, speedX, speedY, startPointX, startPointY, endPointX, endPointY, currentPointX, currentPointY) {
        //the this.image is an image object
        this.image = image;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.speedX = speedX;
        this.speedY = speedY;
        this.startPoint = new Point(startPointX, startPointY);
        this.currentPoint = new Point(currentPointX, currentPointY);
        this.endPoint = new Point(endPointX - imageWidth, endPointY - imageHeight);
    }
}

function gameLoop(timeStamp)
{
    var timePassed = timeStamp - oldTimeStamp;
    oldTimeStamp = timeStamp;
    updateObstaclePositions(timePassed);

    // See comments above in setUpGame for a quick explanation of .requestAnimationFrame() 
    // since gameLoop is a function, and since .requestAnimationFrame calls the function passed into it, 
    //  gameLoop is a recursive function implemented across two functions
    animationFrameId = window.requestAnimationFrame(gameLoop);
}

function updateObstaclePositions(timePassed)
{
    clearCanvas();
    for(var i = 0; i < obstacles.length; i++)
    {
        //calculate future position of the obstacle
        obstacles[i].currentPoint.x += obstacles[i].speedX * timePassed;
        obstacles[i].currentPoint.y += obstacles[i].speedY * timePassed;
        if(obstacles[i].currentPoint.x < obstacles[i].startPoint.x || obstacles[i].currentPoint.x > obstacles[i].endPoint.x)
        {
            obstacles[i].speedX *= -1;
        }

        if(obstacles[i].currentPoint.y < obstacles[i].startPoint.y || obstacles[i].currentPoint.y > obstacles[i].endPoint.y)
        {
            obstacles[i].speedY *= -1;
        }
        //draw the obstacle
        drawObstacle(obstacles[i].image, obstacles[i].currentPoint);
    }
}

function clearCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draws an Image object on the canvas at the given Point (another object)
function drawObstacle(image, point)
{
    // Draw the image at the point
    context.drawImage(image, point.x, point.y);
}