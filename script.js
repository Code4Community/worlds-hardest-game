// World's Hardest Game, 2019

let player = new Player();

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

