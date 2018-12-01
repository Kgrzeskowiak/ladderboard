class Application {
  constructor(root, db) {
    this.panels = {};
    this.root = root;
    this.activePanel = null;
    this.db = db;
  }
  sendAction(actionName, matchData) {
    var newPanel = null;
    if (actionName == "ConfigurationPanelRequested") {
      newPanel = this.panels["ConfigurationPanel"];
    }
    if (actionName == "ChartPanelRequested") {
      newPanel = this.panels["ChartPanel"];
    }
    if (actionName == "StartPanelRequested") {
      newPanel = this.panels["StartPanel"];
    }
    if (actionName == "GameStarted") {
      newPanel = this.panels["MatchPanel"];
    }
    this.activePanel.remove(this.root);
    this.activePanel = newPanel;
    newPanel.show(this.root, matchData);
  }
  registerPanel(panel) {
    this.panels[panel.name] = panel;
  }
  start() {
    this.panels["StartPanel"].show(this.root);
    this.activePanel = this.panels["StartPanel"];
    var navBar = document.querySelector("nav");
    var navBarLogo = navBar.querySelector(".navbar-brand");
    var chartPanelLink = navBar.querySelector("[data-name='ChartPanelButton']");
    var startPanelLink = navBar.querySelector(
      "[data-name='StartPanelButton']"
    );
    var configurationPanelLink = navBar.querySelector(
      "[data-name='ConfigurationPanelButton']"
    );
    chartPanelLink.addEventListener("click", event => {
      this.sendAction("ChartPanelRequested");
      navBarLogo.firstElementChild.remove();
      navBarLogo.appendChild(document.createElement("i"));
      navBarLogo.firstElementChild.classList.add("fas", "fa-chart-bar", "fa-2x");
    });
    startPanelLink.addEventListener("click", event => {
      this.sendAction("StartPanelRequested");
      navBarLogo.firstElementChild.remove();
      navBarLogo.appendChild(document.createElement("i"));
      navBarLogo.firstElementChild.classList.add("far", "fa-futbol", "fa-2x");
    });
    configurationPanelLink.addEventListener("click", event => {
      this.sendAction("ConfigurationPanelRequested");
      navBarLogo.firstElementChild.remove();
      navBarLogo.appendChild(document.createElement("i"));
      navBarLogo.firstElementChild.classList.add("fas", "fa-cogs", "fa-2x")
    });
  }
}
