// All code should be written in this file.
let playerOneMoveOneType;
let playerOneMoveOneValue;

let playerOneMoveTwoType;
let playerOneMoveTwoValue;

let playerOneMoveThreeType;
let playerOneMoveThreeValue;

let playerTwoMoveOneType;
let playerTwoMoveOneValue;

let playerTwoMoveTwoType;
let playerTwoMoveTwoValue;

let playerTwoMoveThreeType;
let playerTwoMoveThreeValue;

let playerOneWins  = 0;
let playerTwoWins  = 0;

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType,
    moveTwoValue, moveThreeType, moveThreeValue) {
    if (!moveOneType || !moveOneValue || !moveTwoType || !moveTwoValue ||
        !moveThreeType || !moveThreeValue) {
        return;
    }

    if (!isValidMoveType(moveOneType) ||
        !isValidMoveType(moveTwoType) ||
        !isValidMoveType(moveThreeType)) {
        return;
    }

    if (!isValidMoveValue(moveOneValue) ||
        !isValidMoveValue(moveTwoValue) ||
        !isValidMoveValue(moveThreeValue)) {
        return;
    }

    if ((moveOneValue + moveTwoValue + moveThreeValue) > 99) {
        return;
    }

    if (player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    } else if (player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    } else {
        return;
    }
}

function isValidMoveType(moveType) {
    return (moveType === 'rock') ||
        (moveType === 'paper') ||
        (moveType === 'scissors');
}

function isValidMoveValue(moveValue) {
    return (moveValue >= 1) && (moveValue <= 99);
}



const getMoveWinner = (playerOneMoveType, playerOneMoveValue, playerTwoMoveType, playerTwoMoveValue) => {
    // Play one round, using move type and move value pairs

    // Check that moves and values are valid
    if (!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType || !playerTwoMoveValue) {
        return null;
    } 

    // Deal with matching moves, use Values to determine winner
    if (playerOneMoveType === playerTwoMoveType) {
        return resolveTie(playerOneMoveValue, playerTwoMoveValue);
    }

    // Deal with differing moves
    if (playerOneMoveType === 'rock') {
        if (playerTwoMoveType === 'scissors') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'paper') {
        if (playerTwoMoveType === 'rock') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else {
        if (playerTwoMoveType === 'paper') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    }

};

const resolveTie = (playerOneMoveValue, playerTwoMoveValue) => {
    if (playerOneMoveValue > playerTwoMoveValue) {
        return 'Player One';
    } else if (playerOneMoveValue < playerTwoMoveValue) {
        return 'Player Two';
    } else {
        return 'Tie';
    }
};

const getRoundWinner = (gameRound) => {
    /*if (!playerOneMoveOneType || !playerOneMoveTwoType ||
        !playerOneMoveThreeType || !playerOneMoveOneValue ||
        !playerOneMoveTwoValue || !playerOneMoveThreeValue ||
        !playerTwoMoveOneType || !playerTwoMoveTwoType ||
        !playerTwoMoveThreeType || !playerTwoMoveOneValue ||
        !playerTwoMoveTwoValue || !playerTwoMoveThreeValue) {
        return null;
    }*/

    // Check round, then compare games	
    switch (gameRound) {
        case 1:
            return getMoveWinner(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
        case 2:
            return getMoveWinner(playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue);
        case 3:
            return getMoveWinner(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
        default:
            return null;
    }
};

const getGameWinner = () => {
    if (!playerOneMoveOneType || !playerOneMoveTwoType ||
        !playerOneMoveThreeType || !playerOneMoveOneValue ||
        !playerOneMoveTwoValue || !playerOneMoveThreeValue ||
        !playerTwoMoveOneType || !playerTwoMoveTwoType ||
        !playerTwoMoveThreeType || !playerTwoMoveOneValue ||
        !playerTwoMoveTwoValue || !playerTwoMoveThreeValue) {
        return null;
    }

    const roundOneWin = getRoundWinner(1);
    const roundTwoWin = getRoundWinner(2);
    const roundThreeWin = getRoundWinner(3);

    if (roundOneWin === 'Player One') {
        playerOneWins = (playerOneWins + 1) || 1;
    } else if (roundOneWin === 'Player Two') {
        playerTwoWins = (playerTwoWins + 1) || 1;
    }

    if (roundTwoWin === 'Player One') {
        playerOneWins = (playerOneWins + 1) || 1;
    } else if (roundTwoWin === 'Player Two') {
        playerTwoWins = (playerTwoWins + 1) || 1;
    }

    if (roundThreeWin === 'Player One') {
        playerOneWins = (playerOneWins + 1) || 1;
    } else if (roundThreeWin === 'Player Two') {
        playerTwoWins = (playerTwoWins + 1) || 1;
    }

    if (playerOneWins > playerTwoWins) {
        return 'Player One';
    } else if (playerOneWins < playerTwoWins) {
        return 'Player Two';
    } else {
        return 'Tie';
    }
};

const setComputerMoves = () => {
    // Decide move one Type
    const moveOneType = getMove();
    const moveTwoType = getMove();
    const moveThreeType = getMove();

    // Decide on Values, fixed for now
    const moveOneValue = 33;
    const moveTwoValue = 33;
    const moveThreeValue = 33;

    // Assign Player Two Moves
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveThreeType = moveThreeType;

    // Assign Player Two Values
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeValue = moveThreeValue;

};

const getRandom = () => {
    return Math.floor(Math.random() * 3);
};

const getMove = () => {
    switch (getRandom()) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
        default:
            return null;
    }
};

