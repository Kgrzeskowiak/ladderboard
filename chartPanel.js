class ChartPanel extends Panel
{
constructor(application)
{
    super(application);
    this.name = "ChartPanel"
}

    show(root)
    {
        root.innerHTML = "<p>Jesteś na formularzu C</p><br><button>Skocz na formularz A</button>"
        var button = root.querySelector("button");
        button.addEventListener("click", event => 
    {
        this.app.sendAction("StartPanelRequested");
    })
    }
};