class StartPanel extends Panel {
  constructor(application, db) {
    super(application, db);
    this.name = "StartPanel";
    this.db = db;
  }
  show(root) {
    var teamInputsObject = [];
    var template = document.querySelector("#StartPage");
    var templateClone = document.importNode(template.content, true);
    var gameHandler = templateClone.querySelector("[data-name='GameHandler']");
    var startGameButton = gameHandler.querySelector("[data-name='StartGame']");
    root.appendChild(templateClone);

    teamInputsObject.push({
      selectElement: document.querySelector("[data-name='TeamA']").children[0],
      errorElement: document.querySelector("[data-name='TeamA']").children[1]
    });
    teamInputsObject.push({
      selectElement: document.querySelector("[data-name='TeamB']").children[0],
      errorElement: document.querySelector("[data-name='TeamB']").children[1]
    });
    this.setTeamsToDropdown(teamInputsObject);
    startGameButton.addEventListener("click", event => {
      if (this.validateConfigration(teamInputsObject, 0.05) == true) {
        var matchData = {
          gameDuration: 0.05,
          nameTeamA: teamInputsObject[0].selectElement.value,
          nameTeamB: teamInputsObject[1].selectElement.value,
          resultTeamA : "",
          resultTeamB : "",
        };
        this.app.sendAction("GameStarted", matchData);
      }
    });
  }
  setTeamsToDropdown(teamInputsObject) {
    var teamList = this.db.getTeams();
    teamList.forEach(team => {
      var teamName = team.name;
      teamInputsObject.forEach(object => {
        var option = document.createElement("option");
        option.text = teamName;
        object.selectElement.add(option);
      });
    });
  }
  validateConfigration(teamInputsObject) {
    var validationCorrect = true;
    teamInputsObject.forEach(team => {
      if (team.selectElement.value == "") {
        team.errorElement.classList.add("invalid");
        validationCorrect = false;
      } else {
        team.errorElement.classList.remove("invalid");
        validationCorrect = true;
      }
    });
    return validationCorrect;
  }
}
