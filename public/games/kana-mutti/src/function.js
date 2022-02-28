var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var boundryl = 80; //left boundry for rope
var boundryr = 850; //right boundry for rope
var rand = 0;
var muttiCount = 5; //mutti count  (5 or 6 is prefered)  
var chances = 3; //number of chances
var cursorX = null,
    cursorY = null;
var reqID, startReqID, score = 0,
    oldscore = 0,
    time = 0,
    muttiScore = 0;
var isMobile = false;
var speedfactor = 5; //speed factor (4 or 5 is prefered)
var win = false,
    startScore = 5;

var practice = false;
var url = 'https://rotaractmora.org/awurudu-backend/api/user/score/update';

canvas.width = 1000;
canvas.height = 720;

var background = new Image();
background.src = 'src/bg.jpg';

var startBg = new Image();
startBg.src = 'src/start.jpg';

var mutti = new Image();
mutti.src = 'src/mutti.png';

var mutti_a = new Image();
mutti_a.src = 'src/mutti_a.png';

var blueMuttiImg = new Image();
blueMuttiImg.src = 'src/bluemutti.png';

var bat = new Image();
bat.src = 'src/bamboo-bat.png';

var life = new Image();
life.src = 'src/dot.png';

muttiArr = [];
muttiPos = [];
a = [];
scoreArr = Array(muttiCount).fill(0);

var blueMutti;

start();
detectDevice();
if (isMobile) $('#mobile').css('display', 'block');
$('#start').on('click', function() {
    if ($(this).html() == 'Restart') {
        chances = 3;
        score = 0,
            oldscore = 0,
            time = 0,
            muttiScore = 0;
        startScore = 5;
        win = false;
        rand = 0;
        speedfactor = 5;
        for (var i = 0; i < muttiCount; i++) {
            scoreArr[i] = 0
        }

        canvas.removeEventListener('click', clickEventListner);

        start();
        detectDevice();
        if (isMobile) $('#mobile').css('display', 'block');
    }
    $(this).css('display', 'none');
    $('#game').css('cursor', 'none');
    cancelAnimationFrame(startReqID)
    initGame();
    animate();
});

function start() {
    startReqID = requestAnimationFrame(start);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(startBg, 0, 0);

    const urlParams = new URLSearchParams(window.location.search);
    const practiceParam = urlParams.get('practice');

    if (practiceParam === 'true') {
        practice = true;
    }
}

function detectDevice() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
}

function initGame() {
    context.drawImage(background, 0, 0);
    for (var i = 0; i < muttiCount; i++) {
        muttiArr[i] = mutti;
        muttiPos[i] = ((boundryr - boundryl) / muttiCount) * i + boundryl;
        do {
            rand = Math.floor(Math.random() * 10) % speedfactor; //change 5 for speed factor
        } while (rand == 0);
        a[i] = rand;
    }
    blueMutti = Math.floor(Math.random() * 10) % muttiCount;
    for (var i = 0; i < muttiCount; i++) {
        rand = Math.floor(Math.random() * 10) % muttiCount;
        if (scoreArr[rand] == 0) {
            if (rand == blueMutti) {
                scoreArr[rand] = 100;
            } else {
                scoreArr[rand] = startScore;
                startScore *= 2;
            }
        } else {
            i--;
            continue;
        }
    }

    canvas.addEventListener('click', clickEventListner);

    setInterval(function() {
        time++;
    }, 1);

    $('#game').mousemove(function(event) {
        cursorX = event.offsetX;
        cursorY = event.offsetY;
    });
}

function animate() {
    reqID = requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background, 0, 0);

    for (var i = 0; i < chances; i++) {
        context.drawImage(life, 10 + i * (32 + 10), 10);
    }

    for (var i = 0; i < muttiArr.length; i++) {
        if (muttiArr[i] == null)
            muttiArr[i] = mutti;
        context.drawImage(muttiArr[i], muttiPos[i] + a[i], 160);
        muttiPos[i] += a[i];
        if (muttiPos[i] + a[i] > boundryr || muttiPos[i] < boundryl)
            a[i] = -a[i];
    }

    if (!isMobile && cursorX && cursorY) context.drawImage(bat, cursorX, cursorY);
    context.font = "50px Calibri";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Score : " + score.toFixed(2), 850, 60);

    if (win) {
        cancelAnimationFrame(reqID);
        $('#game').css('cursor', 'default');
        context.font = "200px Calibri";
        context.fillStyle = "green";
        context.textAlign = "center";
        context.fillText("You won", canvas.width / 2, canvas.height / 2);
        context.font = "50px Calibri";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Your score : " + score.toFixed(2), canvas.width / 2, (canvas.height / 2) + 150);
        saveData();
    }

    if (chances == 0) {
        cancelAnimationFrame(reqID);
        $('#game').css('cursor', 'default');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(background, 0, 0);
        context.font = "200px Calibri";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("You lost", canvas.width / 2, canvas.height / 2);
        context.font = "50px Calibri";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Your score : " + score.toFixed(2), canvas.width / 2, (canvas.height / 2) + 150);
        saveData();
    }
}

function clickEventListner(event) {
    var x = event.offsetX,
        y = event.offsetY;
    chances--;
    if (x > boundryl && x < boundryr && y > 240 && y < 310) {
        for (var i = muttiPos.length - 1; i >= 0; i--) {
            if (x > muttiPos[i] + 2 && x < muttiPos[i] + 61) {
                muttiArr[i] = mutti_a;

                //=========================Score algorithm===========================
                oldscore = (100 / (time / 1000)) + scoreArr[i];
                if (score < oldscore)
                    score = oldscore;

                if (muttiScore < scoreArr[i])
                    muttiScore = scoreArr[i];
                //===================================================================

                if (i == blueMutti) {
                    muttiArr[i] = blueMuttiImg;
                    win = true;
                }
                break;
            }
        }
    }
}

async function saveData() {
    $('#start').css('display', 'block');
    $('#start').html('Restart');
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
                    game: 'kanaMuttiya',
                    score: score,
                    time: (time / 1000),
                    maxMutti: muttiScore
                })
            })).json();

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}