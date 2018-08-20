class Panel{
    constructor(application)
    {
        this.app = application;
        this.params = {from:"", to:""}
    }
    show()
    {

    }
    remove()
    {
        
    }
}
class PanelA extends Panel{
    show(root)
    {
      root.innerHTML = "<p>Jesteś na formularzu A</p><br><button>Skocz na formularz B</button>"
      var button = document.querySelector("button");
      button.addEventListener("click", event =>
    {
        this.params.to = PanelB
        this.app.sendAction(this.params);
        this.remove(root);
    })
    }
    remove(root)
    {
       while (root.firstElementChild)
       {
           root.removeChild(root.firstElementChild);
       }
    }
};
class PanelB extends Panel
{
    show(root)
    {
        root.innerHTML = "<p>Jesteś na formularzu B</p><br><button>Skocz na formularz C</button>"
        var button = document.querySelector("button");
        button.addEventListener("click", event => 
    {
        this.app.sendAction(this.params);
    })
    }
};
class PanelC extends Panel{};