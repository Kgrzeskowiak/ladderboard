class Application {
  constructor(root, db) {
    this.panels = {};
    this.root = root;
    this.activePanel = null;
    this.db = db;
  }
  sendAction(actionName, matchParameters) {
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
    newPanel.show(this.root, matchParameters);
  }
  registerPanel(panel) {
    this.panels[panel.name] = panel;
  }
  start() {
    this.panels["StartPanel"].show(this.root);
    this.activePanel = this.panels["StartPanel"];
  }
}
