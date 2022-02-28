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
        health: 0,
        level: 8,
        started: false,
        ended: false,
        startTime: "",
        elapsedTime: "",
        seconds: "00",
    },
    methods: {
        start: function() {
            self = this;
            this.startTime = Date.now();
            this.started = true;
            setInterval(function() {
                self.regenerate();
            }, 750);
            setInterval(function() {
                self.countTimer();
            }, 10);
        },
        punch: async function() {
            if (this.started == true && this.health < 100) {
                this.health += 5;
                if (this.health >= 100) {
                    this.ended = true;
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
                                    game: 'BaloonPipirima',
                                    score: (1000 / (this.elapsedTime / 1000))
                                })
                            })).json();

                            console.log(res);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            } else {
                alert("Game Not Yet Started !");
            }

        },
        regenerate: function() {
            if (this.health >= 10 && this.ended == false) {
                this.health -= parseInt(this.level);
            }
        },
        restart: function() {
            this.health = 0;
            this.ended = false;
            this.started = false;
            this.seconds = "00";
            this.startTime = "";
            this.elapsedTime = "";

        },
        countTimer: function() {
            if (this.started == true && this.ended == false) {
                this.elapsedTime = Date.now() - this.startTime;
                this.seconds = (this.elapsedTime / 1000).toFixed(3);
            }
        },

    },
});