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
        var addTeamButton = templateClone.querySelector("[data-name='AddTeamButton']");
        root.appendChild(templateClone);
        var loader = document.querySelector("[data-name='loader']")
        loader.classList.remove("loading");
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
        var promise = this.db.addTeamToDb(root.querySelector("input").value);
        promise = promise.then(() =>
        {
        this.refreshTable(root);
        })
    })
    }
    refreshTable(root,loader)
    {
        var loader = root.querySelector("[data-name='loader']")
        loader.classList.add("loading");
        var teamList = this.db.getTeamsFromDb();
        teamList = teamList.then(teamList =>
        {
        teamList = JSON.parse(teamList)
        teamList = teamList.Items;
        loader.classList.remove("loading");
        var tableRef = root.querySelector("table");
        var tbody = tableRef.querySelector("tbody");
        var rowsList = [];
        while (tbody.firstElementChild)
        {
           tbody.removeChild(tbody.firstElementChild)
        }
        if (teamList.length > 0)
        {
        teamList.forEach(team => {
        var row = tableRef.insertRow();
        row.insertCell().appendChild(document.createTextNode(team.TeamName))
        tbody.appendChild(row);
        var removeButton = row.insertCell().appendChild(document.createElement("button"));
        removeButton.classList.add("btn");
        removeButton.appendChild(document.createElement("i"));
        (removeButton.firstElementChild).classList.add('fa' ,'fa-trash');
        rowsList.push(
            {
                teamName : row.childNodes[0].textContent,
                button : removeButton
            }
        )
        
        removeButton.addEventListener("click", event => 
        {
            this.sendTeamForRemoval(rowsList, removeButton);
            this.refreshTable(root);
        })
        })
        };
    })};
    sendTeamForRemoval(rowsList, removeButton)
    {
        rowsList.forEach(row => 
            {
                if (row.button == removeButton)
                {
                    this.db.removeTeam(row.teamName)
                }
            }) 
    }
};