// Project 2: Aryan Asalkhou, Alex Diaz, Christian Hart, Jamie Kouttu
// This is Aryan's change.

// Tile Placement Array represents the location of each tile on the board
// VERY IMPORTANT: The array INDEX is the tile!
// VERY IMPORTANT: The VALUE is the location on the board
let tilePlacement = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let shuffling = false;
let moving = false;

// Movement Array represents legal moves for each tile location
// [ UP, DOWN, RIGHT, LEFT ], 0 = Cannot Move, 1 = Can move
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

// Variable for counting the user's moves for this game
let userMoves = 0;
document.getElementById('moves').innerHTML = 'Moves: ' + userMoves

// Add Event Listeners to each Tile on the board
let tiles = document.querySelectorAll(".tile");
//console.log(tiles);
tiles.forEach(tile => {
    //console.log(tile.id);
    tile.addEventListener("click", moveTile);
});

//The background image of the main div and each of the block divs is replaced

function changeBackGround(){
    var class_name= document.getElementById("characters").value
    var tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.style.backgroundImage = "url('static/" + class_name + ".jpg')";
    });
}

/*
() {
    var class_name = document.getElementById("characters").value;
    for (var i = 1; i < tilePlacement.length; i++) {
        if (tilePlacement[i] == "") {
            document.getElementById("wrapper").innerHTML += "";
        } else {
            var id_name = tilePlacement[i];
            document.getElementById("wrapper").innerHTML += '<div class="tile '+ class_name +'" id="tile' + tilePlacement[i] + '">' +tilePlacement[i]+ '</div>';
        }
    }
}
function changeBackGround(){
    var className=document.getElementById("characters").value;
    
    tiles.forEach(title =>{ 
        tile.style.backgroundImage="url('"+className+"')"
    });
}
*/
// Determine which Tiles can be moved upon loading the page
findMoveablePieces();

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
    var adjacent = movement[emptyTile];
    var adjacentTileIndex;
    var adjacentTile;

    if(adjacent[0] == 1){ // Tile UP from Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile - 4);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
        //console.log(adjacentTile);
    }

    if(adjacent[1] == 1){ // Tile DOWN from Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile + 4);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
        //console.log(adjacentTile);
    }

    if(adjacent[2] == 1){ // Tile RIGHT of Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile + 1);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
        //console.log(adjacentTile);
    }

    if(adjacent[3] == 1){ // Tile LEFT of Empty is .moveablePiece
        adjacentTileIndex = tilePlacement.indexOf(emptyTile - 1);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablePiece");
        //console.log(adjacentTile);
    }
}

function moveTile(){
    //console.log(this);

    // Determine whether the selected Tile can be moved
    // First check if Tile has the .moveablePiece class
    if(this.classList.contains("moveablePiece")){ 
        if(moving == true && shuffling == false){ 
        //if Tile still animating, do not move new tile
            return;
        }

        var tileID = this.id.substring(4); //gets tile ID number
        console.log(tileID);
        var ID = parseInt(tileID); //parses as integer
        var placement = tilePlacement[ID-1];
        var tilestyle = window.getComputedStyle(this);
        //console.log(placement);
        //console.log(movement[placement]);

        // Next check where Empty is and move Tile towards Empty
        if(movement[placement][0] == 1){ 
            // If Empty is UP, call moveUp()
            if(placement-4 == tilePlacement[15]){
                moveUp(this, ID, tilestyle.getPropertyValue("top"));
                console.log("up");
            }
        }
        if(movement[placement][1] == 1){ 
            // If Empty is DOWN, call moveDown()
            if(placement+4 == tilePlacement[15]){
                moveDown(this, ID, tilestyle.getPropertyValue("top"));
                console.log("down");
            }
        }
        if(movement[placement][2] == 1){ 
            // If Empty is RIGHT, call moveRight()
            if(placement+1 == tilePlacement[15]){
                moveRight(this, ID, tilestyle.getPropertyValue("left"));
                console.log("right");
            }
        }
        if(movement[placement][3] == 1){ 
            // If Empty is LEFT, call moveLeft()
            if(placement-1 == tilePlacement[15]){
                moveLeft(this, ID, tilestyle.getPropertyValue("left"));
                console.log("left");
            }
        }
        checkWin();
        findMoveablePieces();
    }
}
// TODO: Lots of duplicate lines. Try to combine these 4 functions into 1
function moveUp(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    if(shuffling==false){
        //console.log(currentPosition);//these help test postioning 
        animateMove(tile, "up", position);
    }else{
        position = position - 100;
        tile.style.top = position + "px";
        //console.log(currentPosition); //these help test postioning 
    }
    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
    
    // Iterate Moves Counter
    userMoves++;
    document.getElementById('moves').innerHTML = 'Moves: ' + userMoves;
}

function moveDown(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    if(shuffling==false){
        //console.log(currentPosition);//these help test postioning 
        animateMove(tile, "down", position);
    }else{
        position = position + 100;
        tile.style.top = position + "px";
        //console.log(currentPosition);//these help test postioning 
    }
    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;

    // Iterate Moves Counter
    userMoves++;
    document.getElementById('moves').innerHTML = 'Moves: ' + userMoves;
}

function moveRight(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    if(shuffling==false){
        //console.log(currentPosition);//these help test postioning 
        animateMove(tile, "right", position);
    }else{
        position = position + 100;
        tile.style.left = position + "px";
        //console.log(currentPosition);//these help test postioning 
    }
    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
    
    // Iterate Moves Counter
    userMoves++;
    document.getElementById('moves').innerHTML = 'Moves: ' + userMoves;
}

function moveLeft(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    if(shuffling==false){
        //console.log(currentPosition);//these help test postioning 
        animateMove(tile, "left", position);
    }else{
        position = position - 100;
        tile.style.left = position + "px";
        //console.log(currentPosition);//these help test postioning 
    }

    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
    
    // Iterate Moves Counter
    userMoves++;
    document.getElementById('moves').innerHTML = 'Moves: ' + userMoves;
}
function animateMove(tile, direction, currentPosition){
    moving = true;
    shuffleButton.disabled = true;
    var newPosition = currentPosition;
    var sign;
    if(direction == "left" || direction == "up"){
        newPosition = newPosition - 100;
        sign = -1;
    }
    else{
        newPosition = newPosition + 100;
        sign = 1;
    }

    var position = parseInt(currentPosition);
    var animate = setInterval(animate, 1);

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
                //console.log(position + " " + newPosition);
            }
        }
    }
}

function animateShuffling(){}

const shuffleButton = document.querySelector('#shuffle')
shuffleButton.addEventListener('click', shufflePieces)

function shufflePieces() {
    shuffling = true;
    // move pieces randomly for a predetermined number of moves
    const numberOfMoves = 500
    
    
    for (let i = 0; i <= numberOfMoves; i++) {
        //Execute one of the possible moves based on a random value
        // create an array of all moveable pieces
        let moveablePieces = document.querySelectorAll(".moveablePiece");
        console.log(moveablePieces)
        const randomValue = Math.floor(Math.random() * moveablePieces.length)
        // move a random item from the list of moveablePieces
        moveTile.call(moveablePieces[randomValue])
    }
    // Clear Moves Counter
    userMoves = 0
    document.getElementById('moves').innerHTML = 'Moves: ' + userMoves
    shuffling = false;
}

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

function closeMe(){

   		x=document.getElementById("winning");
   		x.src = "";

	}

function reset(){ //resets the game board

    tilePlacement = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; //reset tile position in array

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