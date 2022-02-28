var practice = false;
var url = 'https://rotaractmora.org/awurudu-backend/api/user/score/update';

const urlParams = new URLSearchParams(window.location.search);
const practiceParam = urlParams.get('practice');

if (practiceParam === 'true') {
    practice = true;
}

var app = new Vue({
    el: "#app",
    data: {
        health1: 100,
        health2: 100,
        level: 5,
        started: false,
        ended1: false,
        ended2: false,
        startTime: "",
        elapsedTime: "",
        seconds: "00",
        regenerateTimerFunc: null,
        regenerateTimerInterval: 750,
        countTimerFunc: null,
        classPlayer: false
    },
    methods: {
        start: function() {
            self = this;
            this.startTime = Date.now();
            this.started = true;
            this.regenerateTimerFunc = setInterval(function() {
                self.regenerate();
            }, this.regenerateTimerInterval);
            this.countTimerFunc = setInterval(function() {
                self.countTimer();
            }, 100);
        },


        punch: function() {
            if (this.started == true) {
                if (this.ended2 == false && this.ended1 == false) {
                    this.level += 1;
                    this.health1 = this.health1 - 5 >= 0 ? this.health1 - 5 : 0;
                    this.classPlayer = !this.classPlayer;

                    if (this.health1 <= 0) self.won();
                    if (this.health2 < 0) self.lost();
                }
            } else {
                alert("Game Not Yet Started !");
            }

        },
        regenerate: function() {
            if (this.started == true) {
                if (this.ended2 == false && this.ended1 == false) {
                    this.health2 = this.health2 - parseInt(this.level) >= 0 ? this.health2 - parseInt(this.level) : 0;
                    document.getElementById('bot').classList.toggle('bot_p2');

                    if (this.health2 <= 0) self.lost();
                    if (this.health1 <= 0) self.won();
                }
            } else {
                alert("Game Not Yet Started !");
            }
        },
        restart: function() {
            clearInterval(this.regenerateTimerFunc);
            clearInterval(this.countTimerFunc);

            this.health2 = 100;
            this.health1 = 100;
            this.ended1 = false;
            this.ended2 = false;
            this.started = false;
            this.seconds = "00";
            this.startTime = "";
            this.elapsedTime = "";
            this.classPlayer = false;
            this.level = 5;
            this.regenerateTimerFunc = null;
            this.regenerateTimerInterval = 500;
            this.countTimerFunc = null;
            this.classPlayer = false;

        },
        countTimer: function() {
            if (this.started == true && this.ended1 == false && this.ended2 == false) {
                this.elapsedTime = Date.now() - this.startTime;
                this.seconds = (this.elapsedTime / 1000).toFixed(3);
            }
        },
        won: async function() {
            this.ended1 = true;
            this.$refs.audio.play();

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
                            game: 'KottaPora',
                            score: parseFloat((1000 / (this.elapsedTime / 1000)).toFixed(3))
                        })
                    })).json();

                    console.log(res);
                } catch (err) {
                    console.log(err);
                }
            }
            clearInterval(this.regenerateTimerFunc);
            clearInterval(this.countTimerFunc);
        },
        lost: function() {
            this.ended2 = true;
            this.$refs.booaudio.play();
            clearInterval(this.regenerateTimerFunc);
            clearInterval(this.countTimerFunc);
        }
    },
});