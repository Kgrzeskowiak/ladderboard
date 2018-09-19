class StartPanel extends Panel{
    constructor(application, db)
    {
        super(application, db);
        this.name = "StartPanel";
        this.db = db;
    }
    show(root)
    {
      var teamInputsObject = [];
      var template = document.querySelector("#StartPage");
      var templateClone = document.importNode(template.content, true);
      var configurationButton = templateClone.querySelector("[data-name='ConfigurationPanelButton']");
      var gameHandler = templateClone.querySelector("[data-name='GameHandler']");
      var startGameButton = gameHandler.querySelector("[data-name='StartGame']");
      var stopGameButton = gameHandler.querySelector("[data-name='StopGame']");
      root.appendChild(templateClone);
      teamInputsObject.push(
        {
            selectElement: document.querySelector("[data-name='TeamA']").children[0],
            errorElement: document.querySelector("[data-name='TeamA']").children[1]
        });
        teamInputsObject.push(
        {
            selectElement: document.querySelector("[data-name='TeamB']").children[0],
            errorElement: document.querySelector("[data-name='TeamB']").children[1]
        });
      this.setTeamsToDropdown(teamInputsObject);
      configurationButton.addEventListener("click", event =>
    {
        this.app.sendAction("ConfigurationPanelRequested"); 
    })
    startGameButton.addEventListener("click", event =>
    {
        var gameDuration = gameHandler.querySelector("input").value
        if (this.validateConfigration(teamInputsObject, gameDuration) == true)
        {
        this.db.setMatchParameters(gameDuration, teamInputsObject);
        this.app.sendAction("MatchPanelRequested");
        }
    })
    stopGameButton.addEventListener("click", event =>
    {
        match.matchStop();
    })
    }
    setTeamsToDropdown(teamInputsObject)
    {
        var teamList = this.db.getTeams();
        teamList.forEach(team => 
            {
                var teamName = team.name;
                teamInputsObject.forEach(object =>
                    {
                        var option = document.createElement("option");
                        option.text = teamName;
                        (object.selectElement).add(option)
                    })
            });
    }
    validateConfigration(teamInputsObject, gameDuration)
    {
        var validationCorrect = true;
        var time = parseInt(gameDuration)
        if (isNaN(time))
        {
            validationCorrect = true;
        }
        else
        {
            validationCorrect = false;
        }
        teamInputsObject.forEach(team =>
            {
                if (team.selectElement.value == "")
                {
                    team.errorElement.classList.add("invalid");
                    validationCorrect = false;
                }
                else
                {
                    team.errorElement.classList.remove("invalid");
                    validationCorrect = true;
                }
            })
        return validationCorrect;
    } 
};