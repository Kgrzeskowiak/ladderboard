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
    var tbody = root.querySelector("tbody");
    this.createResultsTable(table, tbody);
  }
  createResultsTable(tableRef,tbody) {
    var asynchPrepare = this.prepareResults();
    asynchPrepare.then(winnerList => {
      let teams = Object.getOwnPropertyNames(winnerList)
      teams.forEach(item => {
        let teamName = this.teamsDb.getTeamName(item)
        let newRow = tableRef.insertRow()
        newRow.insertCell().appendChild(document.createTextNode(teamName))
        newRow.insertCell().appendChild(document.createTextNode(winnerList[item]))
        tbody.appendChild(newRow)
      })
    });
  }
  prepareResults() {
    var requestAsynch = this.matchDb.getMatches();
    requestAsynch = requestAsynch.then(results => {
      var resultsSummary = this.resultsSummary(results.Items);
      return resultsSummary;
    });
    return requestAsynch;
  }
  resultsSummary(results) {
    var overallResults = [];
    results.forEach(match => {
      var teamResults = { matchId: "", winnerId: "", date: "" };
      if (match.resultTeamA > match.resultTeamB) {
        teamResults.winnerId = match.idTeamA;
        teamResults.matchId = match.id;
        teamResults.date = match.date;
      } else {
        teamResults.winnerId = match.idTeamB;
        teamResults.matchId = match.id;
        teamResults.date = match.date;
      }
      overallResults.push(teamResults);
    });
    let winCount = {};
    overallResults.forEach(match => {
      if (!(match.winnerId in winCount)) {
        winCount[match.winnerId] = 0;
      }
      winCount[match.winnerId]++;
    });
    return winCount;
  }
}
