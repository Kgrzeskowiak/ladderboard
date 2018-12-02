class DatabaseTeamController {
  constructor() {
    this._teamList = [];
    this.tempId = [];
    this.id = 0;
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
  getTeamName(teamId)
  {
    var team = this._teamList.find(function(element){
      return element.id == teamId
    })
    return team.name;
  }
  addTeam(team) {
    var requestAsynch = this.addTeamToDb(team);
    requestAsynch.then(() => {
      this._teamList.push({ id: parseInt(this.id), name: team });
    });
    return requestAsynch;
  }
  editTeam(newTeamName, oldValue) {
    var requestAsynch = this.editTeamInDb(oldValue, newTeamName);
    requestAsynch.then(() => {
      var teamIdx = this._teamList.findIndex(function(element) {
        return element.name == oldValue;
      });
      console.log(this._teamList);
      this._teamList[teamIdx].name = newTeamName
  
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

  editTeamInDb(oldTeam, newTeam) {
    function findTeam(element) {
      return element.name == oldTeam;
    }
    var idxTeam = this._teamList.findIndex(findTeam);
    var PromiseRemoval = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", apiAdress);
      xhr.setRequestHeader("x-api-key", apiKey);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      var jsonResult = {
        TableName: "foo",
        Item: { id: (this._teamList[idxTeam].id).toString(), TeamName: newTeam.toString() }
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
      var jsonInput = {
        TableName: "foo",
        Item: { id: this.id.toString(), TeamName: newName.toString()}
      };
      xhr.send(JSON.stringify(jsonInput));
    });
    return PromiseAddTeam;
  }
}
