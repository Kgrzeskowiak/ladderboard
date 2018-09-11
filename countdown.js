class Countdown{
    constructor()
    {
    }
initializeClock(gameDuration, action)
{
    var clock = document.getElementById("clockdiv")
    var minutes = clock.querySelector(".minutes");
    var seconds = clock.querySelector(".seconds"); 
    var startCounting = setInterval(counting, 1000);
    gameDuration = Math.floor(gameDuration * 60);
        function counting()
        {
        gameDuration = gameDuration -1;
        minutes.innerHTML = Math.floor(gameDuration / 60);
        seconds.innerHTML = Math.floor(gameDuration % 60);
            if (gameDuration <= 0)
            {
            clearInterval(startCounting);
            }
            if (action == "stop")
            {
            clearInterval(startCounting -1);
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;
            }
        }
} 
}
 
