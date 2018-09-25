class DatabaseMatchController {
    constructor(teamsDB) {
        this.matchResult = "";
        this.teamsDB = teamsDB;
        this.teamList = this.teamsDB.getTeams()
    }
getTeamId(teamName)
{
    var idx = this.teamList.findIndex(element => 
        {
            teamName == element.name
            return element;
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
    var promiseAddNewResult = new Promise((resolve, reject) => {
        console.log(this.teamList)
        console.log(this.getCurrentDate())
        const xhr = new XMLHttpRequest();
        xhr.open("POST", apiAdressResults);
        xhr.setRequestHeader("x-api-key", apiKey);
        xhr.onload = () => resolve(xhr.responseText)
        xhr.onerror = () => reject(xhr.statusText);
        var jsonInput = {
            TableName: "results",
            Item : { id:2, idTeamA: this.getTeamId(matchData.nameTeamA), teamNameA: matchData.nameTeamA, resultTeamA: matchData.resultTeamA, idTeamB : this.getTeamId(matchData.nameTeamB), teamNameB: matchData.nameTeamB, resultTeamB: matchData.resultTeamB, date: this.getCurrentDate()}
        };
        xhr.send(JSON.stringify(jsonInput));
    })
    return promiseAddNewResult;
}
}