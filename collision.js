// Makes a point class so new points can be declared with x and y properties 
function Point(x, y) 
{
  this.x = x;
  this.y = y;
}

// Used to determine if the the player shape has touched an obstacle
function isPlayerTouchingObstacle(player, obstacle)
{
    let defaultPlayerCoordinates = 
    {
        topLeft: new Point(player.x - (player.width / 2), player.y - (player.height / 2)), // Top-Left Point
        topRight: new Point(player.x + (player.width / 2), player.y - (player.height / 2)), // Top-Right Point
        bottomLeft: new Point(player.x - (player.width / 2), player.y + (player.height / 2)), // Bottom-Left Point
        bottomRight: new Point(player.x + (player.width / 2), player.y + (player.height / 2))  // Bottom-Right Point
    }

    //***We will likely need a different collision detection system for different obstacle types (squares, circles, etc.)
    let obstacleMinX = obstacle[0];
    let obstacleMaxX = obstacle[0] + obstacle[2];
    let obstacleMinY = obstacle[1];
    let obstacleMaxY = obstacle[1] + obstacle[3];

    let isPlayerTouchingObstacle = false;

    if (defaultPlayerCoordinates.topLeft.x >= obstacleMinX && defaultPlayerCoordinates.topLeft.x <= obstacleMaxX && defaultPlayerCoordinates.topLeft.y >= obstacleMinY && defaultPlayerCoordinates.topLeft.y <= obstacleMaxY ||
        defaultPlayerCoordinates.topRight.x >= obstacleMinX && defaultPlayerCoordinates.topRight.x <= obstacleMaxX && defaultPlayerCoordinates.topRight.y >= obstacleMinY && defaultPlayerCoordinates.topRight.y <= obstacleMaxY ||
        defaultPlayerCoordinates.bottomLeft.x >= obstacleMinX && defaultPlayerCoordinates.bottomLeft.x <= obstacleMaxX && defaultPlayerCoordinates.bottomLeft.y >= obstacleMinY && defaultPlayerCoordinates.bottomLeft.y <= obstacleMaxY ||
        defaultPlayerCoordinates.bottomRight.x >= obstacleMinX && defaultPlayerCoordinates.bottomRight.x <= obstacleMaxX && defaultPlayerCoordinates.bottomRight.y >= obstacleMinY && defaultPlayerCoordinates.bottomRight.y <= obstacleMaxY)
    {
        isPlayerTouchingObstacle = true;
    }

    return isPlayerTouchingObstacle;        
}

//!!! Under Construction !!!
// Used to check if player is within bounds
// This checks if any point is off a rectangle, not that any point is inside a rectangle like isCarTouchingRectangle
// Because our course is only rectangles and not defined by the walls, this needs to be much more complex :P 
function isPlayerOffPath(player)
{
    // Each corner is defined as a "Point" - Has x and y properties / data fields 
    let defaultPlayerCoordinates = 
    {
        topLeft: new Point(player.x - (player.width / 2), player.y - (player.height / 2)), // Top-Left Point
        topRight: new Point(player.x + (player.width / 2), player.y - (player.height / 2)), // Top-Right Point
        bottomLeft: new Point(player.x - (player.width / 2), player.y + (player.height / 2)), // Bottom-Left Point
        bottomRight: new Point(player.x + (player.width / 2), player.y + (player.height / 2))  // Bottom-Right Point
    }
    let areAllPointsInsideARectangle = true;
    // If any of the points are "not in a rectangle" then the player is "off path" and this entire method returns false 
    if (!isPointInsideARectangle(defaultPlayerCoordinates.topLeft)) { areAllPointsInsideARectangle = false; }    
    else if (!isPointInsideARectangle(defaultPlayerCoordinates.topRight)) { areAllPointsInsideARectangle = false; }
    else if (!isPointInsideARectangle(defaultPlayerCoordinates.bottomLeft)) { areAllPointsInsideARectangle = false; }
    else if (!isPointInsideARectangle(defaultPlayerCoordinates.bottomRight)) { areAllPointsInsideARectangle = false; }
    // If you're wondering why this is negated, the boolean value here is the opposite of what we're trying to return as part of the method
    // If they're "all inside a rectangle", it's on the path. Therefore, this function should return that it's "not off the path", or, on the path.  
    return !areAllPointsInsideARectangle;
}

// Does exactly what it says - Functions should be as self-documenting as possible w/o needing comments 
function isPointInsideARectangle(point)
{
    let isPointInsideARectangle = false;
    // Iterates through each rectangle on the course 
    for (let i = 0; i < obstacles.length; i++)
    {
        // Determining the bounds for the rectangle 
        let obstacleMinX = obstacles[i][0];
        let obstacleMaxX = obstacles[i][0] + obstalces[i][2];
        let obstacleMinY = obstacles[i][1];
        let obstacleMaxY = obstacles[i][1] + obstalces[i][3];
        if (point.x >= obstacleMinX && point.x <= obstacleMaxX && point.y >= obstacleMinY && point.y <= obstacleMaxY)
        {
            isPointInsideARectangle = true;
            break;
        }
    }
    return isPointInsideARectangle;
}
