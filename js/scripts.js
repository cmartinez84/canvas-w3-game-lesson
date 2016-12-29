var myGamePiece;
var myObstacles= [];

function startGame() {
  myGameArea.start();
    myGamePiece = new component(20, 10, "red", 10, 120);
    myObstacle = new component(10, 200, "green", 300, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        // this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.frameNo = 0;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function (){
      clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if (myGameArea.frameNo % n == 0) {
      // console.log("yo");
      return true;}
      else{
        // console.log("false");
        return false;
      }
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
    },
    this.crashWith = function(otherobj){
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.y + otherobj.height);
      var crash = true;
      if( (mybottom < othertop) ||
          (mytop > otherbottom) ||
          (myright < otherleft) ||
          (myleft > otherright)){
              crash = false;
          }
      return crash;
    }
  }



function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i++){
      console.log("running ob");
      if(myGamePiece.crashWith(myObstacles[i])){
        myGameArea.stop();
        return;
      }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;

    if((myGameArea.frameNo == 1) || everyinterval(150)){
      x = myGameArea.canvas.width;
      minWidth = 3;
      maxWidth = 200;
      width = Math.floor(Math.random()*(maxWidth-minWidth +1) +minWidth);
      minWidth = 3;
      maxWidth = 200;
      width2 = Math.floor(Math.random()*(maxWidth-minWidth +1) +minWidth);
      minHeight = 20;
      maxHeight = 200;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      minGap = 50;
      maxGap = 200;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      myObstacles.push(new component(width2, height, "green", x, 0));
      myObstacles.push(new component(width, x - height - gap, "green", x, height + gap));
      console.log(myObstacles.length);
    }

      for (i=0; i<myObstacles.length;  i++){
        myObstacles[i].x -= 1;
        myObstacles[i].update();
      }
      // myObstacle.update();
      myGamePiece.newPos();
      myGamePiece.update();

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
