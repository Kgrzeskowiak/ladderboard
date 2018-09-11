class Database
{
    constructor()
{
    this._teamList = [];
    this.tempId = [];
    this.id = 0;
}
getNewId()
{
    this.tempId = [];
    this._teamList.forEach(team =>
    {
        this.tempId.push(team.id);
        this.tempId.sort((a, b) => b - a);
        this.id = this.tempId[0];
    })
    if (this.tempId.length >0)
    { return (this.tempId[0]+1);}
    else 
    { return 1; }
}
updateLocalTeamList(teamList)
{
    teamList = JSON.parse(teamList)
    this._teamList = [];
    teamList.Items.forEach(team =>
    {
        this._teamList.push({id : parseInt(team.id), name : team.TeamName});
    })
    return this._teamList;
}
removeTeam(team)
{
    function findTeam(element)
    {
        return element.name == team;
    }
    var idxTeam = this._teamList.findIndex(findTeam)
    var Promise1 = new Promise((resolve, reject) => 
    {   
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", apiAdress);
        xhr.setRequestHeader("x-api-key", apiKey);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        var jsonResult = 
        {
        "TableName": "foo", 
        "Key": {"id": this._teamList[idxTeam].id.toString()}
        }
        xhr.send(JSON.stringify(jsonResult));
        this.getTeamsFromDb();
    })
}
getTeamsFromDb()
{
    var Promise1 = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", apiAdress);
        xhr.setRequestHeader("x-api-key", apiKey);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
        });
        Promise1.then(teamList => {
            return this.updateLocalTeamList(teamList);
        })
        return Promise1;
        };
addTeamToDb(newName)
{
    var id = this.getNewId()
    var PromiseAddTeam = new Promise((resolve, reject) => 
    {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiAdress);
    xhr.setRequestHeader("x-api-key", apiKey);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    var jsonResult = 
    {
    "TableName": "foo", 
    "Item": {"id": id.toString(),"TeamName":newName.toString()}
    }
    xhr.send(JSON.stringify(jsonResult));
   // this.getTeamsFromDb();
    });
    return PromiseAddTeam;
}
};
