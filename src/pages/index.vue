<template>
    <div class="container">
        <div class="header row">
            <h3 class="text-muted col-md-8">Hanging Man</h3>
            <div class="col-md-4 text-right">
                <timer-setup v-if="!userTime" @set-time="setTime"></timer-setup>
                <div v-else>
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-success" v-if="!isRunning" @click="start">START</button>
                        </div>
                        <div class="col">
                            <timer :time="prettyTime" class="mt-2"></timer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <main class="row content" v-show="show">
            <div class="col-md-12" v-if="userLoss">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <h5 class="alert-heading">
                        Lost :( Try again
                    </h5>
                    <hr>
                    <p class="mb-0">
                        <button class="btn btn-success" @click="restart">RESTART</button>
                    </p>
                    <button type="button" class="close" data-dismiss="alert">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Help this man to guess the correct word:</h3>
                    </div>
                    <div class="panel-body text-center" :class="{'disable': userLoss}">
                        <div class="keyboard">
                            <button class="btn btn-default" @click="userWord+='A'">A</button>
                            <button class="btn btn-default" @click="userWord+='B'">B</button>
                            <button class="btn btn-default" @click="userWord+='C'">C</button>
                            <button class="btn btn-default" @click="userWord+='D'">D</button>
                            <button class="btn btn-default" @click="userWord+='E'">E</button>
                            <button class="btn btn-default" @click="userWord+='F'">F</button>
                            <button class="btn btn-default" @click="userWord+='G'">G</button>
                            <button class="btn btn-default" @click="userWord+='H'">H</button>
                            <button class="btn btn-default" @click="userWord+='I'">I</button>
                            <button class="btn btn-default" @click="userWord+='J'">J</button>
                            <button class="btn btn-default" @click="userWord+='K'">K</button>
                            <button class="btn btn-default" @click="userWord+='L'">L</button>
                            <button class="btn btn-default" @click="userWord+='M'">M</button>
                            <button class="btn btn-default" @click="userWord+='N'">N</button>
                            <button class="btn btn-default" @click="userWord+='O'">O</button>
                            <button class="btn btn-default" @click="userWord+='P'">P</button>
                            <button class="btn btn-default" @click="userWord+='Q'">Q</button>
                            <button class="btn btn-default" @click="userWord+='R'">R</button>
                            <button class="btn btn-default" @click="userWord+='S'">S</button>
                            <button class="btn btn-default" @click="userWord+='T'">T</button>
                            <button class="btn btn-default" @click="userWord+='U'">U</button>
                            <button class="btn btn-default" @click="userWord+='V'">V</button>
                            <button class="btn btn-default" @click="userWord+='W'">W</button>
                            <button class="btn btn-default" @click="userWord+='X'">X</button>
                            <button class="btn btn-default" @click="userWord+='Y'">Y</button>
                            <button class="btn btn-default" @click="userWord+='Z'">Z</button>
                        </div>
                        <img :src="image" alt="">
                        <br><br>
                        <div class="form-group">
                            <label>Correct letters:
                                <input type="text" class="form-control answer-field" :value="word" readonly>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Wrong letters:
                                <input type="text" class="form-control" v-model="userWord">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import Timer from '../components/Timer'
    import TimerSetup from '../components/TimerSetup'

    export default {
        data() {
            return {
                word: '',
                image: '',
                minutes: 0,
                seconds: 0,
                show: false,
                timer: null,
                userLoss: false,
                userTime: 0,
                userWord: '',
                userChances: 10,
                isRunning: false,
                image1: './assets/images/hm3.gif',
                image2: './assets/images/hm10.gif',
                words: [
                    '‫‪DOG', 'BOOK', 'BAG', 'SHOP', 'APPLE', 'HOUSE', 'LIBRARY', 'OFFICE'
                ],
            }
        },
        mounted() {
            this.word = this.words[Math.floor(Math.random() * this.words.length)];
        },
        components: {
            Timer,
            TimerSetup,
        },
        computed: {
            prettyTime() {
                let time = this.userTime / 60;
                let minutes = parseInt(time);
                let seconds = Math.round((time - minutes) * 60);
                return minutes + ':' + seconds
            }
        },
        methods: {
            start() {
                this.show = true;
                this.isRunning = true;
                if (!this.timer) {
                    this.timer = setInterval(() => {
                        if (this.userTime > 0) {
                            this.userTime--
                        } else {
                            clearInterval(this.timer)
                        }
                    }, 1000)
                }
            },
            restart() {
                this.reset();
                this.start();
            },
            setTime(payload) {
                this.userTime = (payload.minutes * 60 + payload.seconds)
            },
            check() {
                if (this.userWord === this.word) {
                    this.image = this.image1;
                } else if (this.userWord !== this.word) {
                    this.image = this.image2;
                }
            },
            reset() {
                this.setTime({
                    minutes: 10,
                    seconds: 0
                });
                this.show = false;
                this.userWord = '';
                this.userChances = 10;
                this.userLoss = false;
                this.isRunning = false;
                clearInterval(this.timer);
                this.word = this.words[Math.floor(Math.random() * this.words.length)];
            }
        },
        watch: {
            userWord: {
                handler: function (word) {
                    if (!this.word.includes(word.toUpperCase())) {
                        this.userChances--
                    }
                },
            },
            userChances: {
                handler: function (chances) {
                    if (chances === 0) {
                        this.userLoss = true;
                    }
                }
            },
            userTime: {
                handler: function (time) {
                    if (time === 0) {
                        this.userLoss = true;
                    }
                }
            },
        }
    };
</script>
