var myGamePiece;
var myScore;
var myTime;
var time = 0;
var clicks = 0;

var practice = false;
var url = 'https://rotaractmora.org/awurudu-backend/api/user/score/update';

var browserW = Math.min(document.documentElement.clientWidth, 650);
var browserH = Math.min(document.documentElement.clientHeight, 450);
var fontSize = Math.max(30 * browserW / 650, 18);

function startGame() {
    myGameArea.start();
    myGamePiece = new component(40, 90, "person.png", (browserW - 100) / 2, 450, "image");
    myScore = new component(`${fontSize}px`, "Consolas", "black", browserW - (200 * browserW / 650), 40, "text");
    myTime = new component(`${fontSize}px`, "Consolas", "black", browserW - (200 * browserW / 650), 50 + fontSize, "text");

    const urlParams = new URLSearchParams(window.location.search);
    const practiceParam = urlParams.get('practice');

    if (practiceParam === 'true') {
        practice = true;
    }
}

function restart() {
    clicks = 0;
    time = 0;
    startGame();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = browserW;
        this.canvas.height = browserH;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        this.timer = null;
    },
    stop: async function() {
        clearInterval(this.interval);
        clearInterval(this.timer);

        const finalScore = parseFloat(((6000 / (time / 1000)) + (10000 / clicks)).toFixed(2));

        document.getElementById("restart-btn").style.display = "block";
        document.getElementById("marks").innerText = `Winner\n${clicks} tries in ${(time / 1000)} seconds.\nYou earned ${finalScore} points`;

        if (!practice) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = document.cookie.match(new RegExp('(^| )token=([^;]+)'))[2];

                const res = await (await fetch(url, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        _id: user._id,
                        game: 'LissanaGasa',
                        score: finalScore,
                        time: (time / 1000),
                        click: clicks
                    })
                })).json();

                console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
    },
    clear: function() {
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
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);

        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
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
    myTime.text = "Time : " + (time / 1000).toFixed(2);
    myTime.update();
    if (myGamePiece.y <= 70) {
        myGameArea.stop();
    } else {
        myGamePiece.newPos();
    }
    myGamePiece.update();
}

function accelerate() {
    clicks++;
    myGamePiece.gravitySpeed = -0.7; //speed increase by a click

    if (clicks === 1) {
        console.log('Timer initialized');
        myGameArea.timer = setInterval(() => {
            time += 10;
        }, 10);
    }
}