class Database
{
    constructor()
{
    this._teamList = [];
    this.id = 0;
    this.getTeamsFromDb();
}
addNewTeam(newName)
{
    this._teamList.push({id : this.id++, name : newName});
    this.addTeamToDb(this._teamList[this._teamList.length-1])
}
getTeams(teams)
{
    var teamList = JSON.parse(teams)
    console.log(teamList);
    teamList.Items.forEach(team =>
    {
        this._teamList.push({id : team.id, name : team.TeamName});
    })
    return this._teamList;
};
removeTeam(team)
{
    function findTeam(element)
    {
        return element.name == team;
    }
    var idxTeam = this._teamList.findIndex(findTeam)
    this._teamList.splice(idxTeam,1);
    document.getElementById("output").innerHTML
}
getTeamsFromDb()
{
        var Promise1 = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "https://o6f3mpwcoj.execute-api.us-east-2.amazonaws.com/default/ladderBoardDB?TableName=foo");
          xhr.setRequestHeader("x-api-key", apiKey);
          xhr.onload = () => resolve(xhr.responseText);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
        });
        Promise1.then(value => {
            var teamList = JSON.parse(value)
            console.log(teamList);
            this._teamList = [];
            teamList.Items.forEach(team =>
            {
                this._teamList.push({id : team.id, name : team.TeamName});
            })
        })
        return this._teamList;
        };
addTeamToDb(team)
{
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://o6f3mpwcoj.execute-api.us-east-2.amazonaws.com/default/ladderBoardDB?TableName=foo");
    xhr.setRequestHeader("x-api-key", apiKey);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonResult = 
    {
    "TableName": "foo", 
    "Item": {"id":team.id.toString(),"TeamName":team.name.toString()}
    }
    xhr.send(JSON.stringify(jsonResult));
   
}
};
