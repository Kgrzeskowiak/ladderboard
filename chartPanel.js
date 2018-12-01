class ChartPanel extends Panel {
  constructor(application, teamsDb, matchDb) {
    super(application);
    this.name = "ChartPanel";
    this.teamsDb = teamsDb;
    this.matchDb = matchDb;
    this.myChart = "";
    
  }
  show(root) {
    var template = document.querySelector("#ResultsPage");
    var templateClone = document.importNode(template.content, true);
    root.appendChild(templateClone);
    this.myChart = this.chartInitialise();
    var table = root.querySelector("table");
    var tbody = root.querySelector("tbody");
    this.createResultsTable(table, tbody);

  }
  createResultsTable(tableRef, tbody) {
    var asynchPrepare = this.prepareResults();
    asynchPrepare.then(winnerList => {
      let teams = Object.getOwnPropertyNames(winnerList);
      teams.forEach(item => {
        var teamName = this.teamsDb.getTeamName(item);
        let newRow = tableRef.insertRow();
        newRow.insertCell().appendChild(document.createTextNode(teamName));
        newRow
          .insertCell()
          .appendChild(document.createTextNode(winnerList[item]));
        tbody.appendChild(newRow);
        this.addData(this.myChart,teamName,winnerList[item]);
      }); 
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
  chartInitialise()
  {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Liczba wygranych meczy",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    return myChart;
  }
addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
}
