class Application
{
constructor(root){
    this.panels = [];
    this.root = root;
}
    sendAction()
    {

    }
    registerPanel(app)
    {
        this.panels.push(app);
    }
    start()
    {
      this.panels[0].show(this.root);  
    }
}