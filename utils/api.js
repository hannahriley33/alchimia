import { tiles } from '../data/tiles.js';

//add user to local storage
export function saveUser(user) {
    const json = JSON.stringify(user);
    //turn user info into string and set in LS
    localStorage.setItem('user', json);
}
//get user from local storage
export function getUser() {
    const json = localStorage.getItem('user');
    //get user data from LS
    if (!json) return null;
    //if none return null
    const user = JSON.parse(json);
    //parse user info
    return user;
}

export function getGameState() {
    //if gameState exists in localStorage, set gameState to that function, else initialize and set it to new gameState
    const gameStateData = localStorage.getItem('gameState') ? JSON.parse(localStorage.getItem('gameState')) : initializeGameState();

    if (!gameStateData) return;

    return gameStateData;
    
}

export function initializeGameState() {
    
    const riverTiles = tiles;
    const maxColumns = 12;
    const maxRows = 8;
    let gameState = [];

    for (let i = 0; i < maxRows; i++) {
        //make new array for every row in grid array
        gameState.push(new Array());
        //make null placeholder for each cell in grid
        for (let j = 0; j < maxColumns; j++) {
            gameState[i].push(null);
        }
    } 

    gameState[2][3] = riverTiles['73'].id;
    gameState[2][4] = riverTiles['74'].id;
    gameState[2][5] = riverTiles['76'].id;
    gameState[3][5] = riverTiles['77'].id;
    gameState[4][5] = riverTiles['83'].id;
    gameState[5][5] = riverTiles['79'].id;
    gameState[5][6] = riverTiles['81'].id;
    gameState[5][7] = riverTiles['84'].id;
    

    gameState = JSON.stringify(gameState);
    localStorage.setItem('gameState', gameState);
    return JSON.parse(gameState);
}

export function updateGameState(gameState) {
    const stringyGameState = JSON.stringify(gameState);
    localStorage.setItem('gameState', stringyGameState);
}

export function getPlacedTiles() {
    let placedTiles = localStorage.getItem('placedTiles');
    //if placedTiles exists in localStorage, set placedTiles to that function, else initialize and set it to new placedTiles
    placedTiles = placedTiles ? JSON.parse(placedTiles) : {};
    return placedTiles;
}

export function updatePlacedTiles(lastPlacedTile) {
    let placedTiles = getPlacedTiles();

    placedTiles[lastPlacedTile.id] = {
        id: lastPlacedTile.id,
        sides: lastPlacedTile.sides,
        rotation: lastPlacedTile.rotation
    };
    localStorage.setItem('placedTiles', JSON.stringify(placedTiles));
}

export function initializePlacedTiles() {
    localStorage.setItem('placedTiles', {});
}

export function getAdjacentTiles(row, column) {
    //filler
    const gameState = getGameState();
    const placedTiles = getPlacedTiles();

    const top = gameState[row - 1][column] ? gameState[row - 1][column] : null;
    const right = gameState[row][column + 1] ? gameState[row][column + 1] : null;
    const bottom = gameState[row + 1][column] ? gameState[row + 1][column] : null;
    const left = gameState[row][column - 1] ? gameState[row][column - 1] : null;

    const topSide = top ? placedTiles[top].sides[2] : null;
    const rightSide = right ? placedTiles[right].sides[3] : null;
    const bottomSide = bottom ? placedTiles[bottom].sides[0] : null;
    const leftSide = left ? placedTiles[left].sides[1] : null;

    return [topSide, rightSide, bottomSide, leftSide];
}

export function checkAdjacentsMatch(adjacentSides, placedTile) {
    let match;
    // console.log(placedTile.sides);
    // console.log(adjacentSides);

    adjacentSides.map((side, i) => {
        // console.log(side);
        // console.log(placedTile.sides[i]);
        // console.log(side == null || side === placedTile.sides[i]);
        if (side == null || side === placedTile.sides[i]) {
            if (match === false) {
                match = false;
            } else {
                match = true;
            }
        } else {
            match = false;
            return match;
        }
    });

    return match;
}