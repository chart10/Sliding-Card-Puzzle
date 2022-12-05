// Aryan Asalkhou, Alex Diaz, Christian Hart, Jamie Kouttu

// index is the tile, value is the location on the board
let tilePlacement = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

// represents which directions a tile has adjacent tiles in: [up, down, right, left]
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
    [1, 0, 0, 1] //position 15: up, left
];

let tiles = document.querySelectorAll(".tile");
console.log(tiles);

//TODO: shuffle here
tiles.forEach(tile => {
    console.log(tile.id);
    tile.addEventListener("click", moveTile);
});

findMoveablePieces();

function findMoveablePieces(){
    var clear = document.querySelectorAll(".moveablepiece");
    for(var i = 0; i < clear.length; i++){ //removes moveablepiece from all tiles that have it
        var tile = clear[i];
        tile.classList.remove(".moveablepiece");
    }

    var emptyTile = tilePlacement[15];
    var adjacent = movement[emptyTile];
    var adjacentTileIndex;
    var adjacentTile;

    if(movement[emptyTile][0] == 1){ //if has adjacent tile above
        adjacentTileIndex = tilePlacement.indexOf(emptyTile - 4);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablepiece");
        console.log(adjacentTile);
    }

    if(movement[emptyTile][1] == 1){ //if has adjacent tile below
        adjacentTileIndex = tilePlacement.indexOf(emptyTile + 4);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablepiece");
        console.log(adjacentTile);
    }

    if(movement[emptyTile][2] == 1){ //if has adjacent tile to the right
        adjacentTileIndex = tilePlacement.indexOf(emptyTile + 1);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablepiece");
        console.log(adjacentTile);
    }

    if(movement[emptyTile][3] == 1){ //if has adjacent tile to the left
        adjacentTileIndex = tilePlacement.indexOf(emptyTile - 1);
        adjacentTile = document.getElementById("tile" + (adjacentTileIndex+1));
        adjacentTile.classList.add("moveablepiece");
        console.log(adjacentTile);
    }
}

function moveTile(){
    console.log(this);
    if(this.classList.contains("moveablepiece")){ //if the clicked tile is a moveable piece, move it
        var tileID = this.id.substring(4); //gets tile ID number
        console.log(tileID);
        var ID = parseInt(tileID); //parses as integer
        var placement = tilePlacement[ID-1];
        var tilestyle = window.getComputedStyle(this);
        console.log(placement);

        console.log(movement[placement]);
        if(movement[placement][0] == 1){ //if empty tile is above, move up
            if(placement-4 == tilePlacement[15]){
                moveUp(this, ID, tilestyle.getPropertyValue("top"));
                console.log("up");
            }
        }
        if(movement[placement][1] == 1){ //if empty tile is below, move down
            if(placement+4 == tilePlacement[15]){
                moveDown(this, ID, tilestyle.getPropertyValue("top"));
                console.log("down");
            }
        }
        if(movement[placement][2] == 1){ //if empty tile is right, move right
            if(placement+1 == tilePlacement[15]){
                moveRight(this, ID, tilestyle.getPropertyValue("left"));
                console.log("right");
            }
        }
        if(movement[placement][3] == 1){ //is empty tile is left, move left
            if(placement-1 == tilePlacement[15]){
                moveLeft(this, ID, tilestyle.getPropertyValue("left"));
                console.log("left");
            }
        }
        findMoveablePieces();
    }
}

function moveUp(tile, id, currentPosition){
    var position = parseInt(currentPosition);
    position = position - 100;
    tile.style.top = position + "px";

    //once tile moved, swap stored positions of tiles
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

function moveDown(tile, id, currentPosition){
    var position = parseInt(currentPosition);
    position = position + 100;
    tile.style.top = position + "px";

    //once tile moved, swap stored positions of tiles
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

function moveRight(tile, id, currentPosition){
    var position = parseInt(currentPosition);
    position = position + 100;
    tile.style.left = position + "px"; 

    //once tile moved, swap stored positions of tiles
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}

function moveLeft(tile, id, currentPosition){
    var position = parseInt(currentPosition);
    position = position - 100;
    tile.style.left = position + "px";

    //once tile moved, swap stored positions of tiles
    var swap = tilePlacement[id-1]; 
    tilePlacement[id-1] = tilePlacement[15];
    tilePlacement[15] = swap;
}