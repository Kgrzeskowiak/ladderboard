class Panel{
    constructor(application)
    {
        this.app = application;
        this.params = {to:""}
    }
    show()
    {

    }
    remove(root)
    {
        while (root.firstElementChild)
       {
           root.removeChild(root.firstElementChild);
       }
    }
    buttonEventHandler(root,destination)
    {
        this.remove(root);
        this.params.to = destination;
        this.app.sendAction(this.params);
    }
}
class PanelA extends Panel{
    constructor(application)
    {
        super(application);
        this.name = "PanelA"
    }

    show(root)
    {
      root.innerHTML = "<p>Jesteś na formularzu A</p><br><button>Przejdź do konfiguracji</button>"
      var button = document.querySelector("button");
    
      button.addEventListener("click", event =>
    {
        this.buttonEventHandler(root,"PanelB");   
    })
    }
};
class PanelB extends Panel
{
constructor(application)
{
    super(application);
    this.name = "PanelB"
}

    show(root)
    {
        var template = document.querySelector("#ConfigurationPage");
        var templateClone = document.importNode(template.content, true);
        root.appendChild(templateClone);
        var buttonC = document.getElementById("PanelC")
        var buttonA = document.getElementById("PanelA")
        var addTeamButton = document.getElementById("AddNewTeam");
        var tableRef = document.getElementsByTagName("table")
        buttonC.addEventListener("click", event => 
    {
        this.buttonEventHandler(root, "PanelC")
    })
        buttonA.addEventListener("click", event =>
    {
        this.buttonEventHandler(root, "PanelA")
    })
    addTeamButton.addEventListener("click", event =>
    {
        var row = tableRef[0].insertRow();
        row.insertCell().appendChild(document.createTextNode(document.querySelector("input").value))
    })

    }
};
class PanelC extends Panel
{
constructor(application)
{
    super(application);
    this.name = "PanelC"
}

    show(root)
    {
        root.innerHTML = "<p>Jesteś na formularzu C</p><br><button>Skocz na formularz A</button>"
        var button = document.querySelector("button");
        button.addEventListener("click", event => 
    {
        this.remove(root);
        this.params.to = "PanelA"
        this.app.sendAction(this.params);
    })
    }
};