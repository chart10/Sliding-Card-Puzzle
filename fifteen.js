/** Project 2: Aryan Asalkhou, Alex Diaz, Christian Hart, Jamie Kouttu */

"use strict";
/** Tile Placement Array represents the location of each tile on the board
 * VERY IMPORTANT: The array INDEX is the tile!
 * VERY IMPORTANT: The VALUE is the location on the board 
 * @global tilePlacement - represents the location of each tile
 * @global {boolean} shuffling - tracks whether tiles are being shuffled
 * @global {boolean} moving - tracks whether some tile's movement is currently being animated
 * @global userMoves - tracks number of moves made by user
*/
let tilePlacement = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let shuffling = false;
let moving = false;
let userMoves = 0;

/**
 * A function that returns the legal moves for a given tile location
 * [ UP, DOWN, RIGHT, LEFT ], 0 = Cannot Move, 1 = Can move
 */
function movement(location){
    //Movement Array represents legal moves for each tile location
    //[ UP, DOWN, RIGHT, LEFT ], 0 = Cannot Move, 1 = Can move
    const movement = [
        [0, 1, 1, 0], //position 0: down, right
        [0, 1, 1, 1], //position 1: down, right, left
        [0, 1, 1, 1], //position 2: down, right, left
        [0, 1, 0, 1], //position 3: down, left
        [1, 1, 1, 0], //position 4: up, down, right
        [1, 1, 1, 1], //position 5: up, down, right, left
        [1, 1, 1, 1], //position 6: up, down, right, left
        [1, 1, 0, 1], //position 7: up, down, left
        [1, 1, 1, 0], //position 8: up, down, right
        [1, 1, 1, 1], //position 9: up, down, right, left
        [1, 1, 1, 1], //position 10: up, down, right, left
        [1, 1, 0, 1], //position 11: up, down, left
        [1, 0, 1, 0], //position 12: up, right
        [1, 0, 1, 1], //position 13: up, right, left
        [1, 0, 1, 1], //position 14: up, right, left
        [1, 0, 0, 1]  //position 15: up, left
    ];

    return movement[location];
}

document.getElementById('moves').innerHTML = 'Moves: ' + 0;

addListeners();

/**
 * This function adds listeners to the HTML items that require them
 */
function addListeners(){
    // Add Event Listeners to each Tile on the board
    var tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("click", moveTile);
    });

    var shuffleButton = document.querySelector('#shuffle');
    shuffleButton.addEventListener('click', shufflePieces);
}

/**
 * This function allows the user to change the background image displayed on the tiles of the game
 */
function changeBackGround(){
    var class_name = document.getElementById("characters").value;
    var tiles = document.querySelectorAll(".tile");

    tiles.forEach(tile => { //remove current background
        tile.classList.remove("fireballMario", "tanookiMario", "toad", "waluigi");
    });

    tiles.forEach(tile => { //add new one
        tile.classList.add(class_name);
    });
}

/**
 * On page load, this function chooses a random background image for the tiles
 */
function randBackGround() {
    let backgroundImage = ['fireballmario','tanookiMario','toad','waluigi'];
    var num = Math.floor(Math.random() * 4);
    var class_name = backgroundImage[num];
    var tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.classList.add(class_name);
    });
}

randBackGround();

findMoveablePieces();

/**
 * This function discovers which tiles can move into an adjacent empty tile and adds the correcponding class to them
 */
function findMoveablePieces(){
    // Determine which Tiles can be moved
    // Start by removing all .moveablePiece classes from all Tiles
    var clear = document.querySelectorAll(".moveablePiece");
    for(var i = 0; i < clear.length; i++){
        var tile = clear[i];
        tile.classList.remove("moveablePiece");
    }

    // Next locate all adjacent Tiles to the Empty tile
    var emptyTile = tilePlacement[15];
    var adjacent = movement(emptyTile);
    var adjacentTileIndex;
    var adjacentTile;

    if(adjacent[0] == 1){ // Tile UP from Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile - 4);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
    }

    if(adjacent[1] == 1){ // Tile DOWN from Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile + 4);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
    }

    if(adjacent[2] == 1){ // Tile RIGHT of Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile + 1);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
    }

    if(adjacent[3] == 1){ // Tile LEFT of Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile - 1);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
    }
}

/**
 * This function discovers where the tile should function and then calls the move function
 */
function moveTile(){

    // Determine whether the selected Tile can be moved
    // First check if Tile has the .moveablePiece class
    if(this.classList.contains("moveablePiece")){ 
        if(moving == true && shuffling == false){ 
        //if Tile still animating, do not move new tile
            return;
        }

        var tileID = this.id.substring(4); //gets tile ID number
        var ID = parseInt(tileID); //parses as integer
        var placement = tilePlacement[ID-1];
        var legalMoves = movement(placement);
        var tilestyle = window.getComputedStyle(this);

        // Next check where Empty is and move Tile towards Empty
        if(legalMoves[0] == 1){ 
            // If Empty is UP, call moveUp()
            if(placement-4 == tilePlacement[15]){
                move(this, ID, "up", tilestyle.getPropertyValue("top"));
            }
        }
        if(legalMoves[1] == 1){ 
            // If Empty is DOWN, call moveDown()
            if(placement+4 == tilePlacement[15]){
                move(this, ID, "down", tilestyle.getPropertyValue("top"));
            }
        }
        if(legalMoves[2] == 1){ 
            // If Empty is RIGHT, call moveRight()
            if(placement+1 == tilePlacement[15]){
                move(this, ID, "right", tilestyle.getPropertyValue("left"));
            }
        }
        if(legalMoves[3] == 1){ 
            // If Empty is LEFT, call moveLeft()
            if(placement-1 == tilePlacement[15]){
                move(this, ID, "left", tilestyle.getPropertyValue("left"));
            }
        }
        checkWin();
        findMoveablePieces();
    }
}

/**
 * This function moves a tile in the correct direction
 * @param tile - the HTML object of the tile moved
 * @param id - the id number of the tile (the number in its ID name)
 * @param direction - the direction the tile is moving
 * @param currentPosition - the current position of the tile
 */
function move(tile, id, direction, currentPosition){
    var position = parseInt(currentPosition);
    var newPosition = parseInt(currentPosition);
    if(direction == "left" || direction == "up"){
        newPosition = newPosition - 100;
    }
    else{
        newPosition = newPosition + 100;
    }

    if(shuffling == false){
        animateMove(tile, direction, position, newPosition);
    }
    else{
        if(direction == "up" || direction == "down"){
            tile.style.top = newPosition + "px";
        }
        else{
            tile.style.left = newPosition + "px";
        }
    }

    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

/**
 * This function animates the movement of the tile
 * @param tile - the HTML object of the tile moved
 * @param id - the id number of the tile (the number in its ID name)
 * @param direction - the direction the tile is moving
 * @param currentPosition - the current position of the tile
 * @param newPosition - the target position of the tile
 */
function animateMove(tile, direction, currentPosition, newPosition){
    moving = true;

    var shuffleButton = document.querySelector('#shuffle');
    shuffleButton.disabled = true;

    var sign; //stores whether the position of the tile needs to be added to or subtracted from to get to the target position
    if(direction == "left" || direction == "up"){
        sign = -1;
    }
    else{
        sign = 1;
    }

    var position = currentPosition;
    var animate = setInterval(animate, 1);

    /**
     * This function actually modifies the style of the tile to animate its movement
     */
    function animate(){
        if(position == newPosition){
            moving = false;
            shuffleButton.disabled = false;
            clearInterval(animate);
        }
        else{
            if(direction == "up" || direction == "down"){
                position = position + sign;
                tile.style.top = position + "px";
            }
            else{
                position = position + sign;
                tile.style.left = position + "px";
            }
        }
    }
}

/**
 * This function shuffles the tiles
 */
function shufflePieces() {
    shuffling = true;
    // move pieces randomly for a predetermined number of moves
    const numberOfMoves = 500
    
    
    for (let i = 0; i <= numberOfMoves; i++) {
        //Execute one of the possible moves based on a random value
        // create an array of all moveable pieces
        let moveablePieces = document.querySelectorAll(".moveablePiece");
        const randomValue = Math.floor(Math.random() * moveablePieces.length)
        // move a random item from the list of moveablePieces
        moveTile.call(moveablePieces[randomValue])
    }
    // Clear Moves Counter
    userMoves = 0
    document.getElementById('moves').innerHTML = 'Moves: ' + userMoves
    shuffling = false;
}

/**
 * This function checks for a win state
 */
function checkWin(){
    if(shuffling){
        return;
    }

    for(var i = 0; i < 16; i++){
        if(tilePlacement[i] != i){ //if a tile is not in the correct position, return
            return;
        }
    }
    //if all tile placements correct, show win notif
    setTimeout(() => {  document.getElementById("winning").src = "./static/win.png"; }, 100); //placeholder win notif, timeout so tile location has time to update
}

/**
 * This function removes the win notification
 */
function closeMe(){

   		x=document.getElementById("winning");
   		x.src = "";

	}

/**
 * This function resets the board to the original state
 */
function reset(){ //resets the game board

    tilePlacement = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; //reset tile position in array

    var tiles = document.querySelectorAll(".tile");

    //reset tile position to original position (position when page is first loaded)
    tiles.forEach(tile => {
        tile.style.left = "";
        tile.style.top = "";
    });

    //update moves counter
    userMoves = 0;
    document.getElementById('moves').innerHTML = 'Moves: ' + userMoves;

    //close win notif
    closeMe();

    //find moveable tiles
    findMoveablePieces();
}