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
        window.addEventListener('keydown', function(e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    this.newPos = function (){
      this.x += this.speedX;
      this.y += this.speedY;
    }
}
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if(myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1 }
    if(myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1 }
    if(myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1 }
    if(myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1 }

    // redGamePiece.x += 1;
    // yellowGamePiece.x += 1;
    // yellowGamePiece.y += 1;
    // blueGamePiece.x += 1;
    // blueGamePiece.y -= 1;

  //  redGamePiece.update();
  //  yellowGamePiece.update();
  //  blueGamePiece.update();
}
function moveUp(){
  myGamePiece.speedY -= 1;
}
function moveDown(){
  myGamePiece.speedY +=1;
}
function moveLeft(){
  myGamePiece.speedX -=1;
}
function moveRight(){
  myGamePiece.speedX +=1;
}
function stopMove(){
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

startGame();
