// World's Hardest Game, 2019

// Details for the screen and its size
var xMin;
var xMax;
var yMin;
var yMax;

// Global variables for the HTML5 canvas
var canvas;
var context;
var player;
var obstacles;
var level;
var course;
var goal;

// Information for setInterval() and clearInterval()
var intervalId;
const updateInterval = 10; // interval in milliseconds

// Movement booleans for keyboard input from user
var up;
var down;
var right;
var left;

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code === "ArrowUp") {
        up = true;
    } else if (e.code === "ArrowDown") {
        down = true;
    } else if (e.code === "ArrowRight") {
        right = true;
    } else if (e.code === "ArrowLeft") {
        left = true;
    }
});

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.code === "ArrowUp") {
        up = false;
    } else if (e.code === "ArrowDown") {
        down = false;
    } else if (e.code === "ArrowRight") {
        right = false;
    } else if (e.code === "ArrowLeft") {
        left = false;
    }
});

function loadGame() {
    xMin = 0;
    xMax = 1200;
    yMin = 0;
    yMax = 500;
    
    canvas = document.getElementById("board");
    canvas.width = xMax;
    canvas.height = yMax;
    context = canvas.getContext("2d");
    
    intervalId = null; 

    up = false;
    down = false;
    right = false;
    left = false;
}

function stopGame() {
    if (intervalId != null) {
        clearInterval(intervalId);
    }
    intervalId = null;
}

function startGame() {
    stopGame();
    
    var ohioStateLogoUrl = "./assets/OhioStateLogo.png";
    var michiganLogoUrl = "./assets/MichiganLogo.png";
    var goalImageUrl = "./assets/Goal.png"

    player = new Player(ohioStateLogoUrl, 60, 80, 3, 10, 10);
    goal = new Objective(goalImageUrl, 75, 100, new Point(1090, 210));

    var levelDropdown = document.getElementById("level-select");
    level = levelDropdown.options[levelDropdown.selectedIndex].value;

    if(level == 1)
    {
        course = [];

        let topLeftOriginPoint = new Point(0, 0);
        let defaultEndPoint = new Point(1200, 500);
        let currentPointOne = new Point(100, 0);
        let currentPointTwo = new Point(300, 420);
        let currentPointThree = new Point(600, 0);
        let currentPointFour = new Point(900, 0);
        let currentPointFive = new Point(1100, 0);

        obstacles = [
            // startPoint, endPoint, currentPoint
            new Obstacle(michiganLogoUrl, 80, 80, topLeftOriginPoint, defaultEndPoint, currentPointOne, 0, .25),
            new Obstacle(michiganLogoUrl, 80, 80, topLeftOriginPoint, defaultEndPoint, currentPointTwo, 0, -.25),
            new Obstacle(michiganLogoUrl, 80, 80, topLeftOriginPoint, defaultEndPoint, currentPointThree, .1, .2),
            new Obstacle(michiganLogoUrl, 80, 80, topLeftOriginPoint, defaultEndPoint, currentPointFour, -.1, .2),
            new Obstacle(michiganLogoUrl, 80, 80, topLeftOriginPoint, defaultEndPoint, currentPointFive)
        ];
    }
    else if(level == 2)
    {
        course = [];

        obstacles = [
            new Obstacle(michiganLogoUrl, 80, 80, 0, .25, 0, 0, 1200, 500, 100, 0)
        ];
    }
    else {
        console.log("No level selected. ");
    }

    let restartInnerHtml = "<i class='material-icons float-left'>replay</i>Restart";

    document.getElementById("playRestartButton").innerHTML = restartInnerHtml;

    intervalId = setInterval(updateGameState, updateInterval);
}

class Objective {
    constructor(image, width, height, point)
    {
        this.image = new Image(width, height)
        this.image.src = image;
        this.point = point;
    }
}

// 2D point within bounds of screen
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.checkPoint();
    }

    checkPoint() {
        if (this.x < xMin || this.x > xMax) {
            alert("x-coordinate " + this.x + " is out of range, xMin = " + xMin + " and xMax = " + xMax);
        }
        if (this.y < yMin || this.y > yMax) {
            alert("y-coordinate " + this.y + " is out of range, yMin = " + yMin + " and yMax = " + yMax);
        }
    }
    
    subtractX(subtractFromX) {
        this.x -= subtractFromX;
    }

    subtractY(subtractFromY) {
        this.y -= subtractFromY;
    }

    addX(addToX) {
        this.x += addToX;
    }

    addY(addToY) {
        this.y += addToY;
    }
}

// Game obstacle
class Obstacle {
    constructor(imageSrc, imageWidth, imageHeight, startPoint, endPoint, currentPoint, speedX = 0.0, speedY = 0.0) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.startPoint = startPoint;
        this.currentPoint = currentPoint;
        this.endPoint = new Point(endPoint.x - (this.image.width), endPoint.y - (this.image.height));
        this.speedX = speedX;
        this.speedY = speedY;
    }
}

class Rectangle{
    constructor(width, height, x, y, color)
    {
        this.width = width;
        this.height = height;
        this.position = new Point(x, y);
        this.color = color;
    }
}

class Player {
    constructor(imageSrc, imageWidth, imageHeight, speed, pointX, pointY) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.speed = speed;
        this.currentPoint = new Point(pointX, pointY);
    }

    moveRight() {
        if (this.currentPoint.x  + player.speed <= xMax - this.image.width)
        {
            this.currentPoint.addX(player.speed);
        }
    }

    moveLeft() {
        if (this.currentPoint.x - player.speed >= xMin)
        {
            this.currentPoint.subtractX(player.speed);
        }
    }

    moveUp() {
        if (this.currentPoint.y - player.speed >= yMin)
        {
            this.currentPoint.subtractY(player.speed);
        }
    }

    moveDown() {
        if (this.currentPoint.y + player.speed <= yMax - this.image.height)
        {
            this.currentPoint.addY(player.speed);
        }
    }
}

function updateGameState() {
    moveAndDrawObstacles();
    moveAndDrawPlayer();
    drawCourse();
    drawObjective();
    atObjective();
    hitObstacle();
}

function atObjective() {
    var objectiveLeft = goal.point.x;
    var objectiveRight = goal.point.x + goal.image.width;
    var objectiveTop = goal.point.y;
    var objectiveBottom = goal.point.y + goal.image.height;

    var points = [new Point(player.currentPoint.x, player.currentPoint.y), 
        new Point(player.currentPoint.x + player.image.width, player.currentPoint.y),
        new Point(player.currentPoint.x, player.currentPoint.y + player.image.height),
        new Point(player.currentPoint.x + player.image.width, player.currentPoint.y + player.image.height)]

    for(var i = 0; i < 4; i++){
        var point = points[i];
        if(objectiveLeft < point.x && point.x < objectiveRight && objectiveTop < point.y && point.y < objectiveBottom)
        {
            stopGame();
            clearCanvas();
            context.font = "72px Arial";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("You Win!", canvas.width / 2, canvas.height / 2);    
        }
    }
}

function hitObstacle() {
    for(var n = 0; n < obstacles.length; n++) {
        var obstacle = obstacles[n];
        var obstacleLeft = obstacle.currentPoint.x;
        var obstacleRight = obstacle.currentPoint.x + goal.image.width;
        var obstacleTop = obstacle.currentPoint.y;
        var obstacleBottom = obstacle.currentPoint.y + goal.image.height;

        var points = [new Point(player.currentPoint.x, player.currentPoint.y), 
            new Point(player.currentPoint.x + player.image.width, player.currentPoint.y),
            new Point(player.currentPoint.x, player.currentPoint.y + player.image.height),
            new Point(player.currentPoint.x + player.image.width, player.currentPoint.y + player.image.height)]

        for(var i = 0; i < 4; i++){
            var point = points[i];
            if(obstacleLeft < point.x && point.x < obstacleRight && obstacleTop < point.y && point.y < obstacleBottom)
            {
                stopGame();
                clearCanvas();
                context.font = "72px Arial";
                context.fillStyle = "blue";
                context.textAlign = "center";
                context.fillText("You Lose :(", canvas.width / 2, canvas.height / 2);   
            }
        }
    }
}

function moveAndDrawPlayer() {
    if (up) {
        player.moveUp();
    }
    if (down) {
        player.moveDown();
    }
    if (left) {
        player.moveLeft();
    }
    if (right) {
        player.moveRight();
    }
    drawImage(player.image, player.currentPoint);
}

function moveAndDrawObstacles() {
    clearCanvas();
    for (var i = 0; i < obstacles.length; i++)
    {
        //calculate future position of the obstacle
        obstacles[i].currentPoint.addX(obstacles[i].speedX * updateInterval);
        obstacles[i].currentPoint.addY(obstacles[i].speedY * updateInterval);
        
        if (obstacles[i].currentPoint.x < obstacles[i].startPoint.x || obstacles[i].currentPoint.x > obstacles[i].endPoint.x || obstacles[i].currentPoint.y < obstacles[i].startPoint.y || obstacles[i].currentPoint.y > obstacles[i].endPoint.y){
            obstacles[i].speedX *= -1;
            obstacles[i].speedY *= -1;
        }

        //draw the obstacle
        drawImage(obstacles[i].image, obstacles[i].currentPoint);
    }
}

function drawCourse()
{
    for(var i = 0; i < course.length; i++)
    {
        var rect = course[i];
        context.fillStyle = rect.color;
        context.fillRect(rect.position.x, rect.position.y, rect.width, rect.height);
    }
}

function drawObjective()
{
    drawImage(goal.image, goal.point);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draws an image object on the canvas at the given point
function drawImage(image, point) {

    //console.log("image.width = " + image.width);
    //console.log("image.height = " + image.height);

    // Draw the image at the point
    context.drawImage(image, point.x, point.y, image.width, image.height);
}

