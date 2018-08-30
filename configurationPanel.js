class ConfigurationPanel extends Panel
{
constructor(application,db)
{
    super(application);
    this.name = "ConfigurationPanel";
    this.db = db;
}

    show(root)
    {
        var template = document.querySelector("#ConfigurationPage"); //w przyszlosci pozbierac template do jednego obiektu
        var templateClone = document.importNode(template.content, true);
        var buttonC = templateClone.querySelector("[data-name='ChartPanelButton']");
        var buttonA = templateClone.querySelector("[data-name='StartPanelButton']");
        var addTeamButton = templateClone.getElementById("AddNewTeam"); //poprawic idki na data
        root.appendChild(templateClone);
        this.refreshTable(root);
        buttonC.addEventListener("click", event => 
    {
        this.app.sendAction("ChartPanelRequested")
    })
        buttonA.addEventListener("click", event =>
    {
        this.app.sendAction("StartPanelRequested")
    })
    addTeamButton.addEventListener("click", event =>
    {
        this.db.addNewTeam(root.querySelector("input").value);
        this.refreshTable(root);
    })
    }
    refreshTable(root)
    {
        var teamList = this.db.returnTeams();
        var tableRef = root.querySelector("table");
        var tbody = tableRef.querySelector("tbody");
        while (tbody.firstElementChild)
        {
           tbody.removeChild(tbody.firstElementChild)
        }
        if (teamList.length > 0)
        {
        teamList.forEach(team => {
        var row = tableRef.insertRow();
        row.insertCell().appendChild(document.createTextNode(team.name))
        tbody.appendChild(row);
        var removeButton = row.insertCell().appendChild(document.createElement("button"));
        removeButton.classList.add("btn");
        removeButton.appendChild(document.createElement("i"));
        (removeButton.firstElementChild).classList.add('fa' ,'fa-trash');
        })
        };
            
    }
};