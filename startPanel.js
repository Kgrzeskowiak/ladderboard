class StartPanel extends Panel{
    constructor(application, db)
    {
        super(application, db);
        this.name = "StartPanel"
        this.db = db;
    }
    show(root)
    {
      var gameSettingsObject = [];
      var template = document.querySelector("#StartPage");
      var templateClone = document.importNode(template.content, true);
      var configurationButton = templateClone.querySelector("[data-name='ConfigurationPanelButton']");
      var gameHandler = templateClone.querySelector("[data-name='GameHandler']");
      var startGameButton = gameHandler.querySelector("[data-name='StartGame']");
      var stopGameButton = gameHandler.querySelector("[data-name='StopGame']");
      root.appendChild(templateClone);
      gameSettingsObject.push(
        {
            selectElement: document.querySelector("[data-name='TeamA']").children[0],
            errorElement: document.querySelector("[data-name='TeamA']").children[1]
        });
        gameSettingsObject.push(
        {
            selectElement: document.querySelector("[data-name='TeamB']").children[0],
            errorElement: document.querySelector("[data-name='TeamB']").children[1]
        });
      this.setTeamsToDropdown(gameSettingsObject);
      var match = new MatchHandler();
      configurationButton.addEventListener("click", event =>
    {
        this.app.sendAction("ConfigurationPanelRequested");
        clock = null;   
    })
    startGameButton.addEventListener("click", event =>
    {
        if (this.validateConfigration(gameSettingsObject, gameHandler.querySelector("input").value) == true)
        {
        match.matchStart(gameDuration, SelectedTeams);
        
        }
    })
    stopGameButton.addEventListener("click", event =>
    {
        match.matchStop();
    })
    }
    setTeamsToDropdown(gameSettingsObject)
    {
        var teamList = this.db.getTeams();
        teamList.forEach(team => 
            {
                var teamName = team.name;
                gameSettingsObject.forEach(object =>
                    {
                        var option = document.createElement("option");
                        option.text = teamName;
                        (object.selectElement).add(option)
                    })
            });
    }
    validateConfigration(gameSettingsObject, gameDuration)
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
        gameSettingsObject.forEach(team =>
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