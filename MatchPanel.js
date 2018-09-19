class MatchPanel extends Panel
{
   constructor(application,db)
   {
       super(application);
       this.name = "MatchPanel";
       this.db = db;
       this.secondHalf = false;
       this.matchEnded = false;
       this.matchParameters = "";
       this.matchResults = "";
   }
show(root, matchParameters)
{
    this.matchParameters = matchParameters;
    var template = document.querySelector("#MatchPage");
    var templateClone = document.importNode(template.content, true);
    this.matchResults = templateClone.querySelector("[data-name='results']");
    root.appendChild(templateClone);
    this.clock = new Countdown();
    this.matchStart(this.matchParameters.gameDuration, this.matchParameters.teamA, this.matchParameters.teamB);
}
matchStart(gameDuration, teamA, teamB)
{
    this.clock.startTimer(gameDuration);
    this.clock.endMatchEvent.addListener(() =>
        {
            if (this.secondHalf == false && this.matchEnded == false)
            {
            this.secondHalf = confirm("Rozpocząć rundę drugą?");
            }
            if (this.secondHalf && this.matchEnded == false)
            {
            this.matchStart(this.matchParameters.gameDuration, this.matchParameters.teamA, this.matchParameters.teamB);
            this.secondHalf = false;
            this.matchEnded = true;
            this.matchResults.classList.remove("hide");
            console.log("koniec drugiej połowy");
            }
        })
}
matchStop()
{
    this.clock.stopTimer();
}
};

