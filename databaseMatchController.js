class DatabaseMatchController {
    constructor(teamsDb) {
        this.matchResult = "";
        this.teamsDb = teamsDb;
        this.teamList = this.teamsDb.getTeams()
    }
getMatches()
{
    var GetResults = new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest(); 
    xhr.open("GET", apiAdressResults);
    xhr.setRequestHeader("x-api-key", apiKey);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send()
    })
    GetResults = GetResults.then(matchListJSON => {
        var _matchList = JSON.parse(matchListJSON)
        return _matchList
    })
    return GetResults;
}
getIdForNewMatch()
{
    var asynchRequest = this.getMatches();
    asynchRequest = asynchRequest.then(matchListParsed =>
        {
            var ids = matchListParsed.Items.map(element => element.id)
            let max = Math.max(...ids);
            return max
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    return asynchRequest
}
getTeamId(teamName)
{
    var idx = this.teamList.findIndex(element => 
        {
            if(teamName == element.name)
            {
            return element;
            }
        })
    return this.teamList[idx].id;
}
getCurrentDate()
{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear(); 
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (dd+'-'+mm+'-'+yyyy);       
}
addResultToDb(matchData){
    var id = 0;
    var asynchRequest = this.getIdForNewMatch()
    asynchRequest = asynchRequest.then(matchId =>
    {
        id = matchId + 1
    })
    asynchRequest.then(() => {
    var promiseAddNewResult = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", apiAdressResults);
        xhr.setRequestHeader("x-api-key", apiKey);
        xhr.onload = () => resolve(xhr.responseText)
        xhr.onerror = () => reject(xhr.statusText);
        var jsonInput = {
            TableName: "results",
            Item : { id:id, idTeamA: this.getTeamId(matchData.nameTeamA), resultTeamA: matchData.resultTeamA, idTeamB : this.getTeamId(matchData.nameTeamB), resultTeamB: matchData.resultTeamB, date: this.getCurrentDate()}
        };
        xhr.send(JSON.stringify(jsonInput));
    })
    return promiseAddNewResult;
})
}
}