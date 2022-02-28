/*jshint loopfunc: true */

window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg +
        ' Script: ' + url +
        ' Line: ' + lineNumber +
        ' Column: ' + column +
        ' StackTrace: ' + errorObj);
};

// settings
// var gridW = 7;
// var gridH = 11;
var gridW = 5;
var gridH = 8;
var playerSize = 25;
var initialSpeed = 50;
var debug = false;
var font = 'PressStart2P';
var fontFactor = 0.5;

var practice = false;
var url = 'https://rotaractmora.org/awurudu-backend/api/user/score/update';

var goals = [
    { name: 'Cast4 Online Aurudu', distance: 5000 }
    /*{ name: 'Medium', distance: 845 },
    { name: 'Hard', distance: 1471 },
    { name: 'Triglav', distance: 2864 },
    { name: 'Kališče', distance: 1534 },
    { name: 'Insane', distance: 1673 }*/
];

// globals
var browserW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var browserH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var mainEl = document.querySelector('.main');
var msgEl = document.querySelector('.msg');

var debugEl = document.querySelector('.debug');
if (debug) {
    debugEl.style.visibility = 'visible';
}

// calculate canvas size
var ratioW = browserW / gridW;
var ratioH = browserH / gridH;
var unit = Math.min(ratioW, ratioH);
var w = gridW * unit;
var h = gridH * unit;

// canvas
var canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = w;
canvas.height = h;

msgEl.style.width = (w - unit) + 'px';

// game
var distance = 0;
var score = 0;
var lives = 3;
var speed = initialSpeed;
var gameGridY = -2 * unit;
var gameGrid = [];
var gridBuffer = 5;
var paused = true;
var win = false;

var goalNo = random(0, goals.length - 1);
var goalDistance = goals[goalNo].distance;
var goalName = goals[goalNo].name;

// objects
var o = {
    coin: {
        name: 'coin',
        value: 10,
        life: 0,
        color: 'orange',
        // imgSrc: 'img/coin.png',
        imgSrc: 'img/pizza.png',
        img: new Image(),
        soundSrc: 'sound/coin.ogg'
    },
    rock: {
        name: 'rock',
        value: 0,
        life: -1,
        color: 'gray',
        imgSrc: 'img/rock.png',
        img: new Image(),
        soundSrc: 'sound/crash.ogg'
    },
    tree: {
        name: 'tree',
        value: 0,
        life: -1,
        color: 'green',
        imgSrc: 'img/tree.png',
        img: new Image(),
        soundSrc: 'sound/crash.ogg'
    },
    water: {},
    coffee: {
        name: 'coffee',
        value: 0,
        life: 0,
        color: 'brown',
        imgSrc: 'img/coffee.png',
        img: new Image(),
        powerTime: 30 * 20,
        soundSrc: 'sound/coin.ogg'
    },
    rope: {},
    ladder: {},
    life: {},
    poison: {
        name: 'poison',
        value: 0,
        life: 0,
        color: 'red'
    }
};

var player = {
    x: Math.floor(gridW / 2),
    y: gridH - 1.5,

    imgSrc: 'img/player_f.png',
    img: new Image(),
    imgHandsUpSrc: 'img/player_f_hands_up.png',
    imgHandsUp: new Image(),

    handsUpDuration: 15,
    handsUpTime: 0,

    powerMaxTime: 30 * 20,
    powerTime: 0,

    draw: function() {
        if (paused) {
            this.handsUpTime = (this.handsUpTime + 1) % (this.handsUpDuration * 2);
        }

        if (this.powerTime >= 0) {
            this.powerTime -= 1;
        }

        ctx.beginPath();
        if (this.handsUpTime >= this.handsUpDuration) {
            ctx.drawImage(player.imgHandsUp, player.x * unit, player.y * unit, unit, unit);
        } else {
            ctx.drawImage(player.img, player.x * unit, player.y * unit, unit, unit);
        }
        ctx.closePath();
    },
    moveLeft: function() {
        if (this.x - 1 >= 0) {
            this.x -= 1;
        }
    },
    moveRight: function() {
        if (this.x + 1 < gridW) {
            this.x += 1;
        }
    }
};

function generateCoins() {
    var objX = Math.floor(Math.random() * gridW);
    for (var i = 0; i < 2 + Math.floor(Math.random() * 5); i++) {
        gameGrid[gameGrid.length] = new Array(gridW);
        gameGrid[gameGrid.length - 1][objX] = o.coin;
    }
    gameGrid[gameGrid.length] = new Array(gridW);
}

function generateRocks() {
    for (var i = 0; i < 1; i++) {
        var objX = Math.floor(Math.random() * gridW);
        gameGrid[gameGrid.length] = new Array(gridW);
        gameGrid[gameGrid.length - 1][objX] = o.rock;
    }
    gameGrid[gameGrid.length] = new Array(gridW);
}

function generateTrees() {
    for (var i = 0; i < 3; i++) {
        var objX = Math.floor(Math.random() * gridW);
        gameGrid[gameGrid.length] = new Array(gridW);
        gameGrid[gameGrid.length - 1][objX] = o.tree;
    }
    gameGrid[gameGrid.length] = new Array(gridW);
}

function generateRandomObject() {
    var objX = Math.floor(Math.random() * gridW);
    var obj = null;
    switch (random(0, 3)) {
        case 0:
            obj = o.coin;
            break;
        case 1:
            obj = o.rock;
            break;
        case 2:
            obj = o.tree;
            break;
        case 3:
            obj = o.coffee;
            break;
            // case 3: obj = o.poison; break;
    }
    gameGrid[gameGrid.length] = new Array(gridW);
    gameGrid[gameGrid.length - 1][objX] = obj;
}

var soundsInitialized = false;
var soundsPool = [
    new Audio('sound/coin.ogg'),
    new Audio('sound/coin.ogg'),
    new Audio('sound/coin.ogg'),
    new Audio('sound/coin.ogg'),
    new Audio('sound/coin.ogg')
];

function playSound(src) {
    for (var i = 0; i < soundsPool.length; i++) {
        if (soundsPool[i].paused) {
            //soundsPool[i].src = src;
            soundsPool[i].play();
            return;
        }
    }
}

var soundsInitializedCrash = false;
var soundsPoolCrash = [
    new Audio('sound/crash.ogg'),
    new Audio('sound/crash.ogg'),
    new Audio('sound/crash.ogg')
];

function playSoundCrash(src) {
    for (var i = 0; i < soundsPoolCrash.length; i++) {
        if (soundsPoolCrash[i].paused) {
            //soundsPoolCrash[i].src = src;
            soundsPoolCrash[i].play();
            return;
        }
    }
}

// draw functions
function drawGameGrid() {
    for (var y = 0; y < gameGrid.length; y++) {
        if (gameGrid[y]) {
            for (var x = 0; x < gameGrid[y].length; x++) {
                var object = gameGrid[y][x];

                if (object) {
                    var pX = player.x * unit;
                    var pY = player.y * unit;
                    var oX = x * unit;
                    var oY = gameGridY - y * unit;

                    ctx.beginPath();
                    if (object.img) {
                        ctx.imageSmoothingEnabled = false;
                        // ctx.webkitImageSmoothingEnabled = false;
                        // ctx.mozImageSmoothingEnabled = false;
                        ctx.drawImage(object.img, oX, oY, unit, unit);
                    } else {
                        ctx.rect(oX, oY, unit, unit);
                    }
                    ctx.fillStyle = object.color;
                    ctx.fill();
                    ctx.closePath();

                    // detect colision
                    var depth = 0.3 * unit;

                    if (!(
                            pX >= oX + unit - depth ||
                            pX + unit - depth <= oX ||
                            pY >= oY + unit - depth ||
                            pY + unit - depth <= oY
                        )) {

                        if (object.value) {
                            score += object.value;
                        }
                        if (object.soundSrc) {
                            if (object.soundSrc == 'sound/coin.ogg') {
                                playSound(object.soundSrc);
                            } else if (object.soundSrc == 'sound/crash.ogg') {
                                playSoundCrash(object.soundSrc);
                            }
                        }
                        if (object.powerTime) {
                            player.powerTime = object.powerTime;
                        }

                        gameGrid[y][x] = null;

                        if (player.powerTime <= 0) {
                            if (object.life < 0) {
                                lives += object.life;
                                speed = 0;
                            }

                            // game over
                            if (lives === 0) {
                                speed = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    if (!paused) {
        if (distance >= goalDistance) {
            player.y -= 0.05;

            if (player.y <= 1.5) {
                win = true;
                paused = true;
            }
        }

        gameGridY += speed / 1000 * (unit + (player.powerTime > 0 ? unit : 0));

        // destroying grid row
        if (gameGridY >= gridH * unit) {
            gameGrid = gameGrid.splice(1, gameGrid.length);
            gameGridY -= unit;

            if (Math.floor((distance + 1) / 50) != Math.floor(distance / 50)) {
                speed += 5;
            }
            distance++;
            score++;
        }

        if (speed < initialSpeed) {
            speed += 0.5;
        }

        if (distance >= goalDistance - gridBuffer - gridH) {
            // stop creating object when on top
        } else {
            // creating grid rows
            if (gameGrid.length < gridH + gridBuffer) {
                switch (random(0, 3)) {
                    case 0:
                        generateCoins();
                        break;
                    case 1:
                        generateRocks();
                        break;
                    case 2:
                        generateTrees();
                        break;
                    case 3:
                        generateRandomObject();
                        break;
                    default:
                        console.log('Not enough generators');
                }
            }
        }
    }
}

async function draw() {

    ctx.clearRect(0, 0, w, h);
    drawGameGrid();
    player.draw();

    // game over
    if ((lives === 0 || win) && !paused) {
        paused = true;

        var bestScore = Math.max(score, parseInt(localStorage.getItem('bestScore_' + goalName)) || 0);

        localStorage.setItem('bestScore_' + goalName, bestScore);

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
                        game: 'GamaHarahaDiwima',
                        score: score
                    })
                })).json();

                console.log(res);
            } catch (err) {
                console.log(err);
            }
        }

        ctx.beginPath();
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, h / 2 - unit, w, unit * 2);
        ctx.closePath();

        ctx.beginPath();

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';

        if (win) {
            ctx.font = fontFactor * unit / 1.5 + 'px ' + font;
            ctx.fillText(goalName, w / 2, h / 2 - unit / 3);
            ctx.fillText('preplezan(a)!', w / 2, h / 2 + unit / 20);
            ctx.font = fontFactor * unit / 2 + 'px ' + font;
            ctx.fillText('SCORE: ' + bestScore, w / 2, h / 2 + unit / 2);
        } else {
            ctx.font = fontFactor * unit / 1.5 + 'px ' + font;
            ctx.fillText('GAME OVER', w / 2, h / 2 + unit / 20);
            ctx.font = fontFactor * unit / 2 + 'px ' + font;
            ctx.fillText('SCORE: ' + bestScore, w / 2, h / 2 + unit / 2);
        }

        ctx.closePath();
    }

    if (debug) {
        debugEl.innerHTML = '<pre>' +
            'gameGridY:      ' + charPad(Math.round(gameGridY), 5) + '\n' +
            'speed:          ' + charPad(Math.round(speed), 5) + '\n' +
            'gameGrid.length:' + charPad(Math.round(gameGrid.length), 5) + '\n' +
            'player.x,y:     ' + player.x + ',' + player.y + '\n' +
            '</pre>';
    }

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.font = fontFactor * unit / 2 + 'px ' + font;
    ctx.fillText('TOP: ' + Math.max(0, goalDistance - distance) + 'm', unit / 8, unit / 2);
    ctx.fillText('POINTS:   ' + score, unit / 8, unit / 1.25);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.textAlign = 'right';
    ctx.font = fontFactor * unit / 2 + 'px ' + font;
    ctx.fillText(charPad('', lives, '♥'), gridW * unit - unit / 8, unit / 2);
    ctx.closePath();

    if (player.powerTime > 0) {
        var p = player.powerTime / player.powerMaxTime;

        ctx.beginPath();
        ctx.fillStyle = p <= 0.25 ? 'red' : (p <= 0.50 ? 'orange' : 'lime');
        ctx.fillRect(unit / 2, unit, (gridW * unit - unit) * p, unit / 4);
        ctx.closePath();
    }

    requestAnimationFrame(draw);
}

function unpause(e) {
    paused = false;
    showMain();
    draw();
}

// handlers
function keyDownHandler(e) {
    var key = ('' + e.key).toUpperCase();

    if (key == 'ARROWLEFT') {
        player.moveLeft();
    }
    if (key == 'ARROWRIGHT') {
        player.moveRight();
    }
    //console.log('DOWN:', key);
}

function keyUpHandler(e) {
    var key = ('' + e.key).toUpperCase();
}

function mouseDownHandler(e) {
    // hack for playing sound on android / ipad without user action
    var i;

    if (!soundsInitialized) {
        soundsInitialized = true;
        for (i = 0; i < soundsPool.length; i++) {
            (function() {
                var sound = soundsPool[i];
                sound.volume = 0;
                var play = sound.play();
                if (play && play.then) {
                    sound.play().then(function() {
                        setTimeout(function() {
                            sound.volume = 1;
                        }, 1000);
                    }).catch(err => console.log(err));
                } else {
                    setTimeout(function() {
                        sound.volume = 1;
                    }, 1000);
                }
            })(i);
        }
    }
    if (!soundsInitializedCrash) {
        soundsInitializedCrash = true;
        for (i = 0; i < soundsPoolCrash.length; i++) {
            (function() {
                var sound = soundsPoolCrash[i];
                sound.volume = 0;
                var play = sound.play();
                if (play && play.then) {
                    sound.play().then(function() {
                        setTimeout(function() {
                            sound.volume = 1;
                        }, 1000);
                    });
                } else {
                    setTimeout(function() {
                        sound.volume = 1;
                    }, 1000);
                }
            })(i);
        }
    }

    if (initialized) {
        if (lives === 0) {
            location.reload();
        } else if (win) {
            location.reload();
        } else if (paused) {
            unpause();
        } else {
            if (e.clientX <= browserW / 2) {
                player.moveLeft();
            } else {
                player.moveRight();
            }
        }
    }
}

function mouseUpHandler(e) {
    //
}

function touchStartHandler(e) {
    var touch = e.changedTouches[0];

    e.preventDefault();
    mouseDownHandler(touch);
}

function touchEndHandler(e) {
    var touch = e.changedTouches[0];

    e.preventDefault();
    mouseUpHandler(touch);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousedown', mouseDownHandler, false);
document.addEventListener('mouseup', mouseUpHandler, false);
document.addEventListener('touchstart', touchStartHandler, false);
document.addEventListener('touchend', touchEndHandler, false);

// common
function random(from, to) {
    return from + Math.floor(Math.random() * (to + 1 - from));
}

function randomArr(from, to, count) {
    return (new Array(count)).map(function() {
        return random(from, to);
    });
}

function charPad(text, size, char) {
    var s = text + "";
    while (s.length < size) s = (char || ' ') + s;
    return s;
}

function showMsg(msg) {
    msgEl.innerHTML = msg;
    msgEl.style.display = 'inline-block';
    mainEl.style.display = 'none';
}

function showMain() {
    msgEl.style.display = 'none';
    mainEl.style.display = 'inline-block';
}

// main
var initialized = false;
var counter = 6;

function start() {
    const urlParams = new URLSearchParams(window.location.search);
    const practiceParam = urlParams.get('practice');

    if (practiceParam === 'true') {
        practice = true;
    }

    if (--counter === 0) {
        showMsg(
            '<h2>Gama Haraha Diwiima</h2>' +
            '<br><br><b>High Score <br>' + goalName + '(' + goalDistance + 'm)</b>'
        );
        initialized = true;
    }
}
player.img.onload = start;
player.imgHandsUp.onload = start;
o.coin.img.onload = start;
o.rock.img.onload = start;
o.tree.img.onload = start;
o.coffee.img.onload = start;

player.img.src = player.imgSrc;
player.imgHandsUp.src = player.imgHandsUpSrc;
o.coin.img.src = o.coin.imgSrc;
o.rock.img.src = o.rock.imgSrc;
o.tree.img.src = o.tree.imgSrc;
o.coffee.img.src = o.coffee.imgSrc;