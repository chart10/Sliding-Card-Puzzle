// Aryan Asalkhou, Alex Diaz, Christian Hart, Jamie Kouttu

// Tile Placement Array represents the location of each tile on the board
// VERY IMPORTANT: The array INDEX is the tile!
// VERY IMPORTANT: The VALUE is the location on the board
let tilePlacement = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

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

// Add Event Listeners to each Tile on the board
let tiles = document.querySelectorAll(".tile");
//console.log(tiles);
tiles.forEach(tile => {
    //console.log(tile.id);
    tile.addEventListener("click", moveTile);
});

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
        findMoveablePieces();
    }
}


// TODO: Lots of duplicate lines. Try to combine these 4 functions into 1
function moveUp(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    position = position - 100;
    tile.style.top = position + "px";

    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

function moveDown(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    position = position + 100;
    tile.style.top = position + "px";

    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

function moveRight(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    position = position + 100;
    tile.style.left = position + "px"; 

    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

function moveLeft(tile, id, currentPosition){
    // Change CSS styling for selected Tile
    var position = parseInt(currentPosition);
    position = position - 100;
    tile.style.left = position + "px";

    // Update tilePlacement Array
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

//TODO: shuffle here
const shuffleButton = document.querySelector('#shuffle')
shuffleButton.addEventListener('click', shufflePieces)

function shufflePieces() {
    // move pieces randomly for a predetermined number of moves
    const numberOfMoves = 1000
    
    
    for (let i = 0; i <= numberOfMoves; i++) {
        //Execute one of the possible moves based on a random value
        // create an array of all moveable pieces
        let moveablePieces = document.querySelectorAll(".moveablePiece");
        console.log(moveablePieces)
        const randomValue = Math.floor(Math.random() * moveablePieces.length)
        // move a random item from the list of moveablePieces
        moveTile.call(moveablePieces[randomValue])
    }
}