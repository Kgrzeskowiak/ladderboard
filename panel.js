class Panel{
    constructor(application)
    {
        this.app = application;
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
      root.innerHTML = "<p>XXX</p>"  
    }
};
class PanelB extends Panel{};
class PanelC extends Panel{};