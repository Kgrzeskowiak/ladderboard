class StartPanel extends Panel{
    constructor(application)
    {
        super(application);
        this.name = "StartPanel"
    }

    show(root)
    {
      var template = document.querySelector("#StartPage");
      var templateClone = document.importNode(template.content, true);
      var configurationButton = templateClone.querySelector("[data-name='ConfigurationPanelButton']");
      var gameHandler = templateClone.querySelector("[data-name='GameHandler']");
      var startGameButton = gameHandler.querySelector("[data-name='StartGame']");
      var stopGameButton = gameHandler.querySelector("[data-name='StopGame']")
      root.appendChild(templateClone);
      var clock = new Countdown()
      configurationButton.addEventListener("click", event =>
    {
        this.app.sendAction("ConfigurationPanelRequested");
        clock = null;   
    })
    startGameButton.addEventListener("click", event =>
    {
        var gameDuration = gameHandler.querySelector("input").value;
        clock.initializeClock(gameDuration, "start");
    })
    stopGameButton.addEventListener("click", event =>
    {
        clock.initializeClock(0,"stop");
    })
      
    }
};