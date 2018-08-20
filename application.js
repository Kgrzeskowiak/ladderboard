class Application
{
constructor(root){
    this.panels = [];
    this.root = root;
}
    sendAction(params)
    {
        function searchPanel(element)
        {
            if(element.name == params.to)
            {
            return element
            }
        }
        var xxx = this.panels(searchPanel);
        //to niestety nie chodzi. Szukam sposobu jak uzyskac wlasciwy adres nowego obiektu.
      
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