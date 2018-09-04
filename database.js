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
returnTeams()
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
};
