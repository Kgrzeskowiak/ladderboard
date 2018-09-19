class Countdown{
    constructor()
    {
        var clock = document.getElementById("clockdiv");
        this.minutes = clock.querySelector(".minutes");
        this.seconds = clock.querySelector(".seconds"); 
        this.counter;
        this.endMatchEvent = new EventEmmiter();
    }
startTimer(gameDuration)
{
    gameDuration = Math.floor(gameDuration * 60);
    this.counter = setInterval(() =>
    {
    this.minutes.innerHTML = Math.floor(gameDuration / 60);
    this.seconds.innerHTML = Math.floor(gameDuration % 60);
    gameDuration = gameDuration - 1;
        if (gameDuration <= 0)
        {
        clearInterval(this.counter);
        this.seconds.innerHTML = 0;
        this.endMatchEvent.emit();
        }
    }, 1000);
}
stopTimer()
{
    clearInterval(this.counter);
    this.minutes.innerHTML = 0;
    this.seconds.innerHTML = 0;
}
}
