class StartPanel extends Panel{
    constructor(application, db)
    {
        super(application, db);
        this.name = "StartPanel"
        this.db = db;
    }
    show(root)
    {
      var template = document.querySelector("#StartPage");
      var templateClone = document.importNode(template.content, true);
      var configurationButton = templateClone.querySelector("[data-name='ConfigurationPanelButton']");
      var gameHandler = templateClone.querySelector("[data-name='GameHandler']");
      var startGameButton = gameHandler.querySelector("[data-name='StartGame']");
      var stopGameButton = gameHandler.querySelector("[data-name='StopGame']");
      var teamA = templateClone.querySelector("[data-name='TeamA']");
      var teamB = templateClone.querySelector("[data-name='TeamB']");
      root.appendChild(templateClone);
      this.setTeamsToDropdown(teamA,teamB);
      var match = new MatchHandler();
      configurationButton.addEventListener("click", event =>
    {
        this.app.sendAction("ConfigurationPanelRequested");
        clock = null;   
    })
    startGameButton.addEventListener("click", event =>
    {
        var gameDuration = gameHandler.querySelector("input").value;
        var SelectedTeams = this.collectTeams(teamA,teamB);
        if (this.validateConfigration(gameDuration,SelectedTeams) == true)
        {
        match.matchStart(gameDuration, SelectedTeams);
        
        }
    })
    stopGameButton.addEventListener("click", event =>
    {
        match.matchStop();
    })
    }
    collectTeams(teamA,teamB)
    {
        var teams = {a:teamA.value, b:teamB.value}
        return teams;
    }
    setTeamsToDropdown(teamA,teamB)
    {
        var teamList = this.db.getTeams();
        teamList.forEach(team => 
            {
                var optionA = document.createElement("option");
                var optionB = document.createElement("option");
                optionA.text = team.name;
                optionB.text = team.name
                teamA.add(optionA);
                teamB.add(optionB);
            });
    }
    validateConfigration(gameDuration,SelectedTeams)
    {
        var flag = true;
        var time = parseInt(gameDuration)
        if (isNaN(time))
        {
            flag = false;
        }
        else
        {
            flag = true;
        }
        switch (true)
        {
            case SelectedTeams.a == "":
            console.log("A nie może być puste");
            flag = false;
            case SelectedTeams.b == "":
            console.log("B nie może być puste");
            flag = false;
            case SelectedTeams.a == SelectedTeams.b:
            console.log("równe wartości");
            flag = false;
        }
        return flag;
    } 
};