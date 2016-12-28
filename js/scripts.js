var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 10, "red", 10, 120);

    redGamePiece = new component(75, 75, "red", 10, 10);
    yellowGamePiece = new component(75, 75, "yellow", 50, 60);
    blueGamePiece = new component(75, 75, "blue", 10, 110);

}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
// startGame();
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.x += 1;
    myGamePiece.y +=.2;

    redGamePiece.x += 1;
    yellowGamePiece.x += 1;
    yellowGamePiece.y += 1;
    blueGamePiece.x += 1;
    blueGamePiece.y -= 1;



    myGamePiece.update();

    redGamePiece.update();
   yellowGamePiece.update();
   blueGamePiece.update();
}

startGame();
