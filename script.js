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
    
    level = 1;

    intervalId = null; 

    up = false;
    down = false;
    right = false;
    left = false;
}

function setLevel(newLevel) {
    stopGame();
    level = newLevel;
}

function stopGame() {
    if (intervalId != null) {
        clearInterval(intervalId);
    }
    intervalId = null;
}

function startGame() {
    stopGame();
    
    var andrewFace = "https://greenecounty.alumni.osu.edu/wp-content/uploads/sites/25/2018/06/Andrew-Haberlandt.jpg";
    var aleksFace = "https://scontent-sea1-1.cdninstagram.com/vp/e92b43bf1d1c01d0a298e3937733c06c/5DD9D0C6/t51.2885-19/s150x150/52486763_624841137975557_4315053367689740288_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com";

    player = new Player(andrewFace, 100, 100, 3, 10, 10);

    if(level === 1)
    {
        course = [
            //width, length, x, y, color
            new Rectangle(50, 50, 100, 100, "blue")
        ];

        obstacles = [
            //image URL, image widht, image height, speed X, speed Y, start X, start Y, end X, end Y, current X, current Y
            new Obstacle(aleksFace, 100, 100, 0, .25, 10, 10, 1100, 500, 11, 11),
            new Obstacle(aleksFace, 100, 100, .2, .25, 10, 10, 1100, 500, 11, 11)
        ];
    }

    intervalId = setInterval(updateGameState, updateInterval);
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
        this.checkPoint();
    }

    subtractY(subtractFromY) {
        this.y -= subtractFromY;
        this.checkPoint();
    }

    addX(addToX) {
        this.x += addToX;
        this.checkPoint();
    }

    addY(addToY) {
        this.y += addToY;
        this.checkPoint();
    }
}

// Game obstacle
class Obstacle {
    constructor(imageSrc, imageWidth, imageHeight, speedX, speedY, startPointX, startPointY, endPointX, endPointY, currentPointX, currentPointY) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.speedX = speedX;
        this.speedY = speedY;
        this.startPoint = new Point(startPointX, startPointY);
        this.currentPoint = new Point(currentPointX, currentPointY);
        this.endPoint = new Point(endPointX - (this.image.width), endPointY - (this.image.height));
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
        if (playerOnCourse(this.currentPoint.x + player.speed, this.currentPoint.y))
        {
            this.currentPoint.addX(player.speed);
        }
    }

    moveLeft() {
        if (playerOnCourse(this.currentPoint.x - player.speed, this.currentPoint.y))
        {
            this.currentPoint.subtractX(player.speed);
        }
    }

    moveUp() {
        if (playerOnCourse(this.currentPoint.x, this.currentPoint.y - player.speed))
        {
            this.currentPoint.subtractY(player.speed);
        }
    }

    moveDown() {
        if (playerOnCourse(this.currentPoint.x, this.currentPoint.y + player.speed))
        {
            this.currentPoint.addY(player.speed);
        }
    }
}

function playerOnCourse(x, y)
{
    //make sure the player does not collide with course here
    var onCourse = false;
   
    if(y > 0 && x > 0 && y < yMax + player.image.height && x < xMax + player.image.width)
    {
        onCourse = true;
    }

    return onCourse;
}

function updateGameState() {
    moveAndDrawObstacles();
    moveAndDrawPlayer();
    drawCourse()
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

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draws an image object on the canvas at the given point
function drawImage(image, point) {
    // Draw the image at the point
    context.drawImage(image, point.x, point.y, image.width, image.height);
}

