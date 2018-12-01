class Countdown {
  constructor() {
    var clock = document.getElementById("clockdiv");
    this.counterDisplay = clock.querySelector(".counterDisplay");
    this.counter;
    this.endMatchEvent = new EventEmitter();
  }
  startTimer(gameDuration) {
    gameDuration = Math.floor(gameDuration * 60);
    this.counter = setInterval(() => {
      gameDuration--
      var seconds = Math.floor(gameDuration % 60);
      var minutes = Math.floor(gameDuration / 60);
      if (seconds < 10)
      {
        seconds = "0" + seconds;
      }
      if (minutes < 10)
      {
        minutes = "0" + minutes;
      }
      this.counterDisplay.innerHTML = minutes + "m" + ":" + seconds + "s"
      if (gameDuration === 0) {
        clearInterval(this.counter);
        this.endMatchEvent.emit();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.counter);
    this.minutes.innerHTML = 0;
    this.seconds.innerHTML = 0;
  }
}
