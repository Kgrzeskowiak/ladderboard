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
            inputTeamA: document.querySelector("[data-name='TeamA']"),
            inputTeamB: document.querySelector("[data-name='TeamB']")
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
       // var inputParameters = this.getInputParameters(gameSettingsObject, gameHandler.querySelector("input").value);
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
    getInputParameters(gameSettingsObject,gameDuration)
    {
        var inputParameters = [];
    }
    setTeamsToDropdown(gameSettingsObject)
    {
        var teamList = this.db.getTeams();
        teamList.forEach(team => 
            {
                var optionA = document.createElement("option");
                var optionB = document.createElement("option");
                optionA.text = team.name;
                optionB.text = team.name; 
                gameSettingsObject[0].inputTeamA.children[0].add(optionA);
                gameSettingsObject[0].inputTeamB.children[0].add(optionB);
            });
    }
    validateConfigration(gameSettingsObject, gameDuration)
    {
        //przenieść je do obiektu głównego
        var valueTeamA = gameSettingsObject[0].inputTeamA.children[0].value;
        var errorTeamA = gameSettingsObject[0].inputTeamA.children[1];
        var valueTeamB = gameSettingsObject[0].inputTeamB.children[0].value;
        var errorTeamB = gameSettingsObject[0].inputTeamB.children[1];
        var validationCorrect = true;
        var time = parseInt(gameDuration)
        if (isNaN(time)) //dorobić ostrzezenie, pomyslec jak wyjebc gore ifów majac obiekt
        {
            validationCorrect = true;
        }
        else
        {
            validationCorrect = false;
        }
        if (valueTeamA == "")
        {
            errorTeamA.classList.add("invalid");
            validationCorrect = false;
        }
        else
        {
            errorTeamA.classList.remove("invalid");
            validationCorrect = true;
        }
        if (valueTeamB == "")
        {
            errorTeamB.classList.add("invalid");
            validationCorrect = false;
        }
        else
        {
            errorTeamB.classList.remove("invalid");
            validationCorrect = true;
        }
        if (valueTeamA == valueTeamB)
        {
            errorTeamA.classList.add("invalid");
            errorTeamB.classList.add("invalid");
        }
        return validationCorrect;
    } 
};