let initialMyQueenX = -1;
let initialMyQueenY = -1;

const setInitialMyQueenPosition = function(queen) {
    if (queen === null) {
        return;
    }

    if (initialMyQueenX === -1 & initialMyQueenY === -1) {
        initialMyQueenX = queen.x;
        initialMyQueenY = queen.y;
    }
}
