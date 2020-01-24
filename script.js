// World's Hardest Game, 2019 - 2020

// Details for the screen and its size - Changing these will not help you win
const X_MIN = 0;
const X_MAX = 1200;
const Y_MIN = 0;
const Y_MAX = 500;

// Controls the height and width of an obstacle... smaller obstacles might be easier to avoid
const DEF_OBSTACLE_SIZE = 80;

// Global variables for the HTML5 canvas - Removing these will likely break the game
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
var up = false;
var down = false;
var right = false;
var left = false;

// 2D point within bounds of screen
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.checkPoint();
    }

    checkPoint() {
        if (this.x < X_MIN || this.x > X_MAX) {
            alert("x-coordinate " + this.x + " is out of range, xMin = " + X_MIN + " and xMax = " + X_MAX);
        }
        if (this.y < Y_MIN || this.y > Y_MAX) {
            alert("y-coordinate " + this.y + " is out of range, yMin = " + Y_MIN + " and yMax = " + Y_MAX);
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

// Useful constants
var topLeftOriginPoint = new Point(X_MIN, Y_MIN);
var defaultEndPoint = new Point(X_MAX, Y_MAX);

// Reads the keyboard for keystrokes - changing these will break thet game
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

// Still reading keystrokes
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
    
    canvas = document.getElementById("board");
    canvas.width = X_MAX;
    canvas.height = Y_MAX;
    context = canvas.getContext("2d");
    
    intervalId = null; 

    document.getElementById('level-select').addEventListener('change', (e) => {
        stopGame();
        clearCanvas();
        let playInnerHtml = "<i class='material-icons float-left'>play_arrow</i>&nbsp;Play";
        document.getElementById("playRestartButton").innerHTML = playInnerHtml;
    });
}

function stopGame() {
    if (intervalId != null) {
        clearInterval(intervalId);
    }
    intervalId = null;
}

function startGame() {
    stopGame();
    
    var ohioStateLogoUrl = "./assets/OhioStateLogo.jpg";
    var michiganLogoUrl = "./assets/MichiganLogo.png";
    var goalImageUrl = "./assets/Goal.png"

    player = new Player(ohioStateLogoUrl, 80, 80, 2, new Point(10, 10));
    goal = new Objective(goalImageUrl, 75, 100, new Point(1090, 210));

    var levelDropdown = document.getElementById("level-select");
    level = levelDropdown.options[levelDropdown.selectedIndex].value;

    if(level == 1)
    {
        course = [];
        
        let currentPointOne = new Point(100, 0);
        let currentPointTwo = new Point(300, 420);
        let currentPointThree = new Point(600, 0);
        let currentPointFour = new Point(900, 0);
        let currentPointFive = new Point(500, 50);

        obstacles = [
            // startPoint, endPoint, currentPoint
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, currentPointOne, 0, .17),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, currentPointTwo, 0, .15),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, currentPointThree, 0, .13),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, currentPointFour, 0, .12),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, currentPointFive, 0, .11)
        ];
    }
    else if(level == 2)
    {
        course = [];

        obstacles = [
            new Obstacle(michiganLogoUrl, 80, 80, new Point(100, 0), new Point(1200, 500), new Point(100, 0), .1, .2),
            new Obstacle(michiganLogoUrl, 80, 80, new Point(300, 0), new Point(1200, 500), new Point(300, 0), .1, .2),
            new Obstacle(michiganLogoUrl, 80, 80, new Point(500, 0), new Point(1200, 500), new Point(500, 0), .1, .2),
            new Obstacle(michiganLogoUrl, 80, 80, new Point(700, 0), new Point(1200, 500), new Point(700, 0), .1, .2),
            new Obstacle(michiganLogoUrl, 80, 80, new Point(500, 0), new Point(1200, 500), new Point(500, 0), .1, .2),
            new Obstacle(michiganLogoUrl, 80, 80, new Point(0, 400), new Point(1200, 500), new Point(1000, 400), .5, 0),
            new Obstacle(michiganLogoUrl, 80, 80, new Point(0, 300), new Point(1200, 500), new Point(1000, 300), .5, 0),
            new Obstacle(michiganLogoUrl, 80, 80, new Point(0, 200), new Point(1200, 500), new Point(1000, 200), .5, 0),

        ];
    }
    else if(level == 3)
    {
        course = [];

        obstacles = [
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(0, 120), 1, 0),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(0, 320), 1, 0),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(100, 0), 0, .75),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(300, 0), 0, .8),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(500, 0), 0, .85),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(700, 0), 0, .9),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(900, 0), 0, .95),
            new Obstacle(michiganLogoUrl, DEF_OBSTACLE_SIZE, DEF_OBSTACLE_SIZE, topLeftOriginPoint, defaultEndPoint, new Point(1100, 0), 0, 1),
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

// Game obstacle
class Obstacle {
    // Obstacle is stationary if optional speed parameters are omitted
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

class Player {
    constructor(imageSrc, imageWidth, imageHeight, speed, startPoint) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.speed = speed;
        this.currentPoint = startPoint;
    }

    moveRight() {
        if (this.currentPoint.x  + player.speed <= X_MAX - this.image.width)
        {
            this.currentPoint.addX(player.speed);
        }
    }

    moveLeft() {
        if (this.currentPoint.x - player.speed >= X_MIN)
        {
            this.currentPoint.subtractX(player.speed);
        }
    }

    moveUp() {
        if (this.currentPoint.y - player.speed >= Y_MIN)
        {
            this.currentPoint.subtractY(player.speed);
        }
    }

    moveDown() {
        if (this.currentPoint.y + player.speed <= Y_MAX - this.image.height)
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

    var points = [
        new Point(player.currentPoint.x, player.currentPoint.y), 
        new Point(player.currentPoint.x + player.image.width, player.currentPoint.y),
        new Point(player.currentPoint.x, player.currentPoint.y + player.image.height),
        new Point(player.currentPoint.x + player.image.width, player.currentPoint.y + player.image.height)
    ]

    for(var i = 0; i < 4; i++){
        var point = points[i];
        if(objectiveLeft < point.x && point.x < objectiveRight && objectiveTop < point.y && point.y < objectiveBottom)
        {
            stopGame();
            clearCanvas();
            context.font = "72px Arial";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("TOUCHDOWN!", canvas.width / 2, canvas.height / 2);    
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
                context.fillText("You got tackled!", canvas.width / 2, canvas.height / 2);   
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
    context.drawImage(image, point.x, point.y, image.width, image.height);
}

