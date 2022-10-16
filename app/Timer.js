import { UI } from './UI.js';

export class Timer extends UI {
    element = null;
    interval = null;
    numberOfSeconds = 0;
    maxNumberOfSeconds = 12;
    
    init() {
        this.element = this.getElement(this.UiSelectors.timer)
    }

    startTimer() {
        this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    resetTimer() {
        this.numberOfSeconds = 0;
        this.setTimerValue(this.numberOfSeconds);
        this.stopTimer();
        this.startTimer();
    }

    stopTimer() {
        clearInterval(this.interval);
        this.numberOfSeconds = 0;
        this.setTimerValue(this.numberOfSeconds);
    }

    updateTimer() {
        this.numberOfSeconds++;
        this.numberOfSeconds <= this.maxNumberOfSeconds ?
        this.setTimerValue(this.numberOfSeconds) : this.stopTimer();
    }

    setTimerValue(value) {
        this.element.textContent = value;
    }
}