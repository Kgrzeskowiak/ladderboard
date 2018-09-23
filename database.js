class Database {
  constructor() {
    this._teamList = [];
    this.tempId = [];
    this.id = 0;
    this.matchParameters = "";
  }
  initializeDb() {
    var requestAsynch = this.getTeamsFromDb();
    requestAsynch.then(JsonTeamList => {
      var teamList = JSON.parse(JsonTeamList);
      this.updateLocalTeamList(teamList);
    });
    return requestAsynch;
  }
  updateLocalTeamList(teamList) {
    teamList.Items.forEach(team => {
      this._teamList.push({ id: parseInt(team.id), name: team.TeamName });
    });
  }
  getTeams() {
    return this._teamList;
  }
  addTeam(team) {
    this.id += 1;
    var requestAsynch = this.addTeamToDb(team);
    requestAsynch.then(() => {
      this._teamList.push({ id: parseInt(this.id), name: team });
    });
    return requestAsynch;
  }
  removeTeam(teamName) {
    var requestAsynch = this.removeTeamFromDb(teamName);
    requestAsynch.then(() => {
      var teamIdx = this._teamList.findIndex(function(element) {
        return element.name == teamName;
      });
      this._teamList.splice(teamIdx, 1);
      console.log(this._teamList);
    });
    return requestAsynch;
  }
  getNewId() {
    let ids = this._teamList.map(team => team.id);
    let max = Math.max(...ids);
    if (max > 0) {
      this.id = max + 1;
      return this.id;
    } else {
      this.id = 1;
      return this.id;
    }
  }
  removeTeamFromDb(team) {
    function findTeam(element) {
      return element.name == team;
    }
    var idxTeam = this._teamList.findIndex(findTeam);
    var PromiseRemoval = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", apiAdress);
      xhr.setRequestHeader("x-api-key", apiKey);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      var jsonResult = {
        TableName: "foo",
        Key: { id: this._teamList[idxTeam].id.toString() }
      };
      xhr.send(JSON.stringify(jsonResult));
    });
    return PromiseRemoval;
  }
  getTeamsFromDb() {
    var Promise1 = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", apiAdress);
      xhr.setRequestHeader("x-api-key", apiKey);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
    return Promise1;
  }
  addTeamToDb(newName) {
    var PromiseAddTeam = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", apiAdress);
      xhr.setRequestHeader("x-api-key", apiKey);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      var jsonResult = {
        TableName: "foo",
        Item: { id: this.id.toString(), TeamName: newName.toString() }
      };
      xhr.send(JSON.stringify(jsonResult));
    });
    return PromiseAddTeam;
  }
}
