
var myGamePiece;
var myScore;
var clicks = 0;




function startGame() {
    myGameArea.start();
    myGamePiece = new component(40, 90, "person.png", 275, 450, "image");
    myScore = new component("30px", "Consolas", "black", 450, 40, "text");
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 650;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
    },
    stop: function () {
        clearInterval(this.interval);
        document.getElementById("marks").innerText = "Winner\n" + clicks + " tries";
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);

        }
        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.speedY = 0;
        }
    }
}

function updateGameArea() {
    myGamePiece.gravity = 0.05;
    myGameArea.clear();
    myScore.text = "Trys : " + clicks;
    myScore.update();
    if (myGamePiece.y <= 70) {
        myGameArea.stop();
    }
    else {
        myGamePiece.newPos();
    }
    myGamePiece.update();
}

function accelerate() {
    clicks++;
    myGamePiece.gravitySpeed = -0.7;//speed increase by a click
}



