var context;
var obstacles = [];

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("board");
    canvas.width = 800;
    canvas.height = 600;
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

function updateObstaclePosition(obstacles)
{
    for(var i = 0; obstacles.length; i++)
    {
        
    }
}

