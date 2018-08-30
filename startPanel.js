class StartPanel extends Panel{
    constructor(application)
    {
        super(application);
        this.name = "StartPanel"
    }

    show(root)
    {
      root.innerHTML = "<p>Jesteś na formularzu A</p><br><button>Przejdź do konfiguracji</button>"
      var button = root.querySelector("button");
    
      button.addEventListener("click", event =>
    {
        this.app.sendAction("ConfigurationPanelRequested");   
    })
    }
};