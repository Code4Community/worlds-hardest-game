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
    obstacleData = [
        // Format for each entry is as follows: 
        // image URL, speedX, speedY, topLimitX, bottomLimitX, topLimitY, bottomLimitY, currentX, currentY
        [aleksFace,   0,      0.2,    0,         1200,         10,        500,          150,      10],
        [aleksFace,   0,      0.2,    0,         1200,         10,        500,          700,      10]
    ];
    obstacles = [];
    oldTimeStamp = 0.0;
    xMin = 0;
    xMax = 1200; 
    yMin = 0;
    yMax = 500;
    
    canvas = document.getElementById("board");
    canvas.width = xMax;
    canvas.height = yMax;
    context = canvas.getContext("2d");

    // Constructs obstacles from array of obstacle data
    parseObstacles(obstacleData);

    // Debugging statements
    console.log("Parsed obstacles after setUpGame(): ");
    console.log(obstacles);

    // window.requestAnimationFrame runs and then runs the function you pass to it
    // Since gameLoop calls window.requestAnimationFrame(gameLoop) it will run forever
    animationFrameId = window.requestAnimationFrame(gameLoop);
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

// Takes an array of obstacles data
//     Format for each obstacle data entry is as follows: 
//     image URL, speedX, speedY, topLimitX, bottomLimitX, topLimitY, bottomLimitY, currentX, currentY
// Constructs an Obstacle object from this
// Pushes this object to the array of obstacles used in the canvas
function parseObstacles(obstacleData)
{
    //image URL, imageWidth, imageHeight, speedX, speedY, topLimitX, bottomLimitX, topLimitY, bottomLimitY, currentX, currentY
    for(var i = 0; i < obstacleData.length; i++)
    {
        // Creates an image object with size and imageUrl
        var img = new Image(20, 20);
        img.src = obstacleData[i][0];

        // Constructs points for obstacle location and limits
        var startPoint = new Point(obstacleData[i][3], obstacleData[i][5]);
        var endPoint = new Point(obstacleData[i][4], obstacleData[i][6]);
        var currentPoint = new Point(obstacleData[i][7], obstacleData[i][8]);

        // Constructs the obstacle object from data created above
        var currentObstacle = new Obstacle(img, obstacleData[i][1], obstacleData[i][2], startPoint, endPoint, currentPoint);
        
        // Pushes new obstacle to array
        obstacles.push(currentObstacle);
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

        drawCourseEdge();
    }
}

// Draws an Image object on the canvas at the given Point (another object)
function drawImage(image, point)
{
    // Draw the image at the point
    context.drawImage(image, point.x, point.y);
}

function drawCourseEdge() {
    var board = document.getElementById("board");
    var context = board.getContext("2d");
    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, 150, 75);
}