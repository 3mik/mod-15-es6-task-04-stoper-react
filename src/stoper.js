function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};


class Stopwatch {
    constructor(display, list) {
        this.running = false;
        this.display = display;
        this.list = list;
        this.reset();
        this.print(this.times);
        
    }

    //helper methods

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    
    //main methods
    
    print() {
        this.display.innerText = this.format(this.times);
    }


    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
    

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    clear() {
        this.stop();
        this.reset();
        this.print();
    }

    addToList() {
        let item = document.createElement("li");
        item.innerHTML = this.format(this.times);
        this.list.appendChild(item)
    }

    empytList() {
        while( this.list.firstChild ){
            this.list.removeChild( this.list.firstChild );
          }
    }

}
const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results') );

var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.clear());

var addButton = document.getElementById('list');
addButton.addEventListener('click', () => stopwatch.addToList());

var emptyListButton = document.getElementById('remove');
emptyListButton.addEventListener('click', () => stopwatch.empytList());