class MatchHandler
{
   constructor()
   {
       this.clock = new Countdown();
   }
matchStart(gameDuration,teams)
{
    this.clock.startTimer(gameDuration);
    console.log(teams);
}
matchStop()
{
    this.clock.stopTimer();
}
}
