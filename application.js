class Application
{
constructor(root){
    this.panels = {};
    this.root = root;
}
    sendAction(params)
    {
          this.panels[params.to].show(this.root)
    }
    registerPanel(panel)
    {
       this.panels[panel.name] = panel
    }
    start()
    {
        this.panels["PanelA"].show(this.root);
    }
}