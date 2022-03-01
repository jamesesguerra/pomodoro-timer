'use strict';

class Timer {
    constructor(minutes, seconds) {
        this.seconds = seconds;
        this.minutes = minutes;
    }

    startTimer() {
        this.timerID = setInterval(() => {
            this.updateSec();
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.timerID);
    }

    updateSec() {
        if (this.seconds == 0) {
            this.seconds = 60;
        }
        this.seconds -= 1;
        if (this.seconds == 59) {
            this.updateMin();
        }
        this.checkYourself();
        this.displayTime();
    }

    updateMin() {
        this.minutes -= 1;
    }

    displayTime() {
        const secStr = this.seconds > 9 ? this.seconds : '0' + this.seconds.toString();
        const minStr = this.minutes > 9 ? this.minutes : '0' + this.minutes.toString();
        time.textContent = `${minStr}:${secStr}`
    }

    checkYourself() {
        if (this.minutes < 0) {
            if (pomodoro.classList.contains('active')) {
                console.log('in here')
                changeTimer(timers[1]);
            } else {
                changeTimer(timers[0]);
            }
        }
    }
}


const timer = new Timer(25, 0);
timer.displayTime();

const pomodoro = document.querySelector('.pomodoro');
pomodoro.classList.add('active');
const shortBreak = document.querySelector('.shortBreak');
const longBreak = document.querySelector('.longBreak');
const container = document.querySelector('.container');
const containerApp = document.querySelector('.container__app');

// button
let isActive = false;
const start = document.querySelector('button');

const timers = [{
    name: pomodoro, 
    minutes: 25,
    bgColor: '#A45C40',
    appColor: '#C38370',
    btnBg: '#F6EEE0',
    btnColor: '#A45C40'
},
    {name: shortBreak, 
    minutes: 5,
    bgColor: '#60A3D9',
    appColor: '#BFD7ED',
    btnBg: '#0074B7',
    btnColor: 'white',
}, 
    {name: longBreak, 
    minutes: 15,
    bgColor: '#065A82',
    appColor: '#1C7293',
    btnBg: '#9EB3C2',
    btnColor: '#065A82'
}];

const changeTimer = timerName => {
    timer.stopTimer();
    timer.minutes = timerName.minutes;
    timer.seconds = 0;
    timer.displayTime();
    isActive = false;
    start.textContent = 'start';
    start.style.backgroundColor = timerName.btnBg;
    start.style.color = timerName.btnColor;
    render(timerName.minutes);
    container.style.backgroundColor = timerName.bgColor;
    containerApp.style.backgroundColor = timerName.appColor;
}

timers.forEach(timerOption => {
    timerOption.name.addEventListener('click', e => {
        changeTimer(timerOption);
    })
})

start.addEventListener('click', () => {
    if (isActive) {
        start.textContent = 'start';
        timer.stopTimer();
        isActive = false;
        start.style.transform = 'scale(1)';
    } else {
        start.textContent = 'stop';
        timer.startTimer();
        isActive = true;
        start.style.transform = 'scale(0.95)';
    }
})

const render = (minutes) => {
    if (minutes == 25) {
        shortBreak.classList.remove('active');
        pomodoro.classList.add('active');
        longBreak.classList.remove('active');
    } else if (minutes == 5) {
        shortBreak.classList.add('active');
        pomodoro.classList.remove('active');
        longBreak.classList.remove('active');
    } else {
        shortBreak.classList.remove('active');
        pomodoro.classList.remove('active');
        longBreak.classList.add('active');
    }
}

//intersection observer
const options = {
    root: null,
    threshold: .5,
    // rootMargin: '0% 0% -50px 0%',
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    })
}, options);
const cards = document.querySelectorAll('.info__cards__card');
cards.forEach(card => {
    observer.observe(card);
})

