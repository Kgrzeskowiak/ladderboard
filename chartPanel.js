class ChartPanel extends Panel {
  constructor(application, teamsDb, matchDb) {
    super(application);
    this.name = "ChartPanel";
    this.teamsDb = teamsDb;
    this.matchDb = matchDb;
  }

  show(root) {
    var template = document.querySelector("#ResultsPage");
    var templateClone = document.importNode(template.content, true);
    root.appendChild(templateClone);
    var table = root.querySelector("table");
    // root.innerHTML =
    //   "<p>Jesteś na formularzu C</p><br><button>Skocz na formularz A</button>";
    // var button = root.querySelector("button");
    this.createResultsTable(table);
    // button.addEventListener("click", event => {
    //   this.app.sendAction("StartPanelRequested");
    // });
  }
  createResultsTable()
  {
    var asynchPrepare = this.prepareResults()
    asynchPrepare.then((results) => 
    {
      console.log(results)
    })
  }
  prepareResults()
  {
    var requestAsynch = this.matchDb.getMatches();
    requestAsynch = requestAsynch.then(results => 
    {
      var resultsSummary = this.resultsSummary(results.Items)
      return resultsSummary;
  
    })
    return requestAsynch
  }
  resultsSummary(results)
  {
    var winnerList = [];
    var overallResults = [];
    results.forEach(match => {
      var teamResults = {matchId : "", winnerId: "", date: "",};
        if (match.resultTeamA > match.resultTeamB)
        {
          teamResults.winnerId = match.idTeamA;
          winnerList.push(match.idTeamA);
          teamResults.matchId = match.id;
          teamResults.date = match.date;
        }
        else 
        {
          teamResults.winnerId = match.idTeamB;
          winnerList.push(match.idTeamB);
          teamResults.matchId = match.id;
          teamResults.date = match.date;
        }
        overallResults.push(teamResults);
        
    });
    var winnerList = (new Set(winnerList))
  }
}
