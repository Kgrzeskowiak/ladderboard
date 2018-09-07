class Database
{
    constructor()
{
    this._teamList = [];
    this.id = 0;
}
addNewTeam(newName)
{
    this._teamList.push({id : this.id++, name : newName});
}
getTeams()
{
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
}
getDataFromDynamo()
{
        var Promise1 = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "https://o6f3mpwcoj.execute-api.us-east-2.amazonaws.com/default/ladderBoardDB?TableName=foo");
          xhr.setRequestHeader("x-api-key", "WIO0OAQobm80UkTV7jSNJ69qdVktLFmu6QRuc9a6");
          xhr.onload = () => resolve(xhr.responseText);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();
        });
        Promise1.then(function(value) {
            console.log(value);
        });
    }
};
