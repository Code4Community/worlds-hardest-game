// World's Hardest Game, 2019

// The user-controlled entity that performs actions in the game
//let player = new Player();

var alek = "https://scontent-sea1-1.cdninstagram.com/vp/e92b43bf1d1c01d0a298e3937733c06c/5DD9D0C6/t51.2885-19/s150x150/52486763_624841137975557_4315053367689740288_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com";

//Obstacle Array
var obstacleData = [
    //image URL, imageWidth, imageHeight, speedX, speedY, topLimitX, bottomLimitX, topLimitY, bottomLimitY, currentX, currentY
    [alek, 20, 20, 0, .2, 0, 1200, 10, 500, 150,  10],
    [alek, 20, 20, 0, .2, 0, 1200, 10, 500, 700,  10]
]

// Global variables for the Canvas
var context;
var canvas;
var obstacles = [];
var oldTimeStamp = 0.0;

// Details for the screen and its size
let xMin = 0, xMax = 1200; 
let yMin = 0, yMax = 500;

// Runs on Document Load, initializes full programs
document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("board");
    canvas.width = xMax;
    canvas.height = yMax;
    context = canvas.getContext("2d");
    parseObstacles();
    console.log(obstacles);
    window.requestAnimationFrame(gameLoop);
}, false); // Do we need this optional boolean parameter?

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
    constructor(image, speedX, speedY, startPoint, endPoint, currentPoint) {
        //the this.image is an image object
        this.image = image;
        this.speedX = speedX;
        this.speedY = speedY;
        // All of these are Point's
        this.startPoint = startPoint;
        this.currentPoint = currentPoint;
        this.endPoint = endPoint;
    }
}

function parseObstacles()
{
    //image URL, imageWidth, imageHeight, speedX, speedY, topLimitX, bottomLimitX, topLimitY, bottomLimitY, currentX, currentY
    for(var i = 0; i < obstacleData.length; i++)
    {
        var img = new Image(obstacleData[i][1], obstacleData[i][2]);
        img.src = obstacleData[i][0];

        var startPoint = new Point(obstacleData[i][5], obstacleData[i][7]);
        var endPoint = new Point(obstacleData[i][6] - img.width, obstacleData[i][8] - img.height);
        var currentPoint = new Point(obstacleData[i][9], obstacleData[i][10]);

        var ob1 = new Obstacle(img, obstacleData[i][3], obstacleData[i][4], startPoint, endPoint, currentPoint);
        
        obstacles.push(ob1);
    }
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
    context.clearRect(0, 0, canvas.width, canvas.height);
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
        drawImage(obstacles[i].image, obstacles[i].currentPoint);
    }
}

function drawImage(image, point)
{
    //draw the image at the point
    context.drawImage(image, point.x, point.y);
}