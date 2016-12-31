var myGamePiece;
var myObstacles= [];
var myScore;
var myBackground;
var mySound;

function startGame() {
  myGameArea.start();
    // myGamePiece = new component(20, 10, "red", 10, 120);
    myGamePiece = new component(30, 30, "smiley.gif", 10, 120, "image");
    // myObstacle = new component(10, 200, "green", 300, 120);
    myScore = new component("30px", "helvetica", "black", 280, 40, "text");
    myBackground = new component(656, 270, "portland.jpg", 0, 0, "background");
    // mySound = new sound("bounce.mp3");

}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        // this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 100);
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
      return true;}
      else{
        return false;
      }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (this.type == "image" || this.type == "background") {
     this.image = new Image();
     this.image.src = color;
   }
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
        // ctx.fillStyle = color;
        if(this.type == "text"){
          ctx.fillStyle = color;
          ctx.font = this.width + " " + this.height;
          ctx.fillText(this.text, this.x, this.y);

        }
        if(this.type =="image" || this.type == "background"){
          ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width,
          this.height);
          if (this.type == "background") {
                ctx.drawImage(this.image,
                this.x + this.width, this.y, this.width, this.height);
            }
        }
        else{
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    this.newPos = function (){
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.type == "background") {
        console.log(this.x);
            if (this.x < -(this.width)) {
                this.x = 0;
                // console.log("i ran");
            }
        }
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
      if(myGamePiece.crashWith(myObstacles[i])){
        myGameArea.stop();
        // mySound.play();
        return;
      }
    }
    myGameArea.clear();
    myBackground.newPos();
    myBackground.speedX -= .1;
    myBackground.update();
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
      myScore.text="SCORE: " + myGameArea.frameNo;
      myScore.update()


      myGamePiece.newPos();
      myGamePiece.update();
}



// function sound(src) {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     this.sound.setAttribute("preload", "auto");
//     this.sound.setAttribute("controls", "none");
//     this.sound.style.display = "none";
//     document.body.appendChild(this.sound);
//     this.play = function(){
//         this.sound.play();
//     }
//     this.stop = function(){
//         this.sound.pause();
//     }
// }





function moveUp(){
  myGamePiece.image.src = "angry.gif";

  myGamePiece.speedY -= 1;
}
function moveDown(){
  myGamePiece.image.src = "angry.gif";

  myGamePiece.speedY +=1;
}
function moveLeft(){
  myGamePiece.image.src = "angry.gif";

  myGamePiece.speedX -=1;
}
function moveRight(){
  myGamePiece.image.src = "angry.gif";

  myGamePiece.speedX +=1;
}
function stopMove(){
   myGamePiece.image.src = "smiley.gif";
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

startGame();
