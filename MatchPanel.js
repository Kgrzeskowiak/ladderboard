class MatchPanel extends Panel {
  constructor(application, teamDb, matchDb) {
    super(application);
    this.name = "MatchPanel";
    this.db = teamDb;
    this.secondRound = false;
    this.matchEnded = false;
    this.matchData = null;
    this.matchDb = matchDb;
  }
  show(root, matchData) {
    this.matchData = matchData;
    var template = document.querySelector("#MatchPage");
    var templateClone = document.importNode(template.content, true);
    root.appendChild(templateClone);
    this.clock = new Countdown();
    this.matchStart(
      this.matchData.gameDuration
    );
   
  }
  matchStart() {
    this.clock.startTimer(this.matchData.gameDuration);
    this.clock.endMatchEvent.addListener(() => {
      if (this.clock.endMatchEvent.handlers.length > 0) {
        this.clock.endMatchEvent.handlers.splice(1);
      }
      if (this.secondRound == false && this.matchEnded == false) {
        this.startSecondRound();
      }
      if (this.secondRound && this.matchEnded == false) {
        this.showMatchEndedModal(this.matchData);
      }
    });
  }
  startSecondRound() {
    $("#secondRoundModal").modal("show");
    document.querySelector("#confirmButton").addEventListener("click", () => {
      this.secondRound = true;
      this.matchStart(
        this.matchData.gameDuration
      );
    });
  }
  showMatchEndedModal() {
    var modal = document.querySelector("#matchEndedModal");
    var saveResultButton = modal.querySelector("[data-name='saveResultButton");
    var startOverTimeButton = modal.querySelector( "[data-name='startOverTimeButton']");
    var divTeamA = modal.querySelector("[data-name='teamA']");
    var divTeamB = modal.querySelector("[data-name='teamB']");
    var inputA = divTeamA.querySelector("input");
    var inputB = divTeamB.querySelector("input");
    divTeamA.querySelector("span").innerHTML = this.matchData.nameTeamA;
    divTeamB.querySelector("span").innerHTML = this.matchData.nameTeamB;
    $("#matchEndedModal").modal("show");
    $(document).on("shown.bs.modal", "#matchEndedModal", function() {
      inputA.focus();
    });
    inputA.addEventListener("change", event => {
      this.validate(inputA, inputB, saveResultButton, startOverTimeButton);
    });
    inputB.addEventListener("change", event => {
      this.validate(inputA, inputB, saveResultButton, startOverTimeButton);
    });
    saveResultButton.addEventListener("click", event => {
      this.matchData.resultTeamA = parseInt(inputA.value);
      this.matchData.resultTeamB = parseInt(inputB.value);
      this.matchDb.addResultToDb(this.matchData);
    });
    startOverTimeButton.addEventListener("click", event => {
      this.startOverTime();
    });
  }
  startOverTime() {
    this.secondRound = false;
    this.matchData.gameDuration = 1;
    this.clock.startTimer(1);
  }
  validate(inputA, inputB, saveResultButton, startOverTimeButton) {
    if (inputA.value == "" || inputB.value == "") {
      saveResultButton.disabled = true;
    } else {
      saveResultButton.disabled = false;
    }
    {
      if (inputA.value == inputB.value) {
        startOverTimeButton.disabled = false;
      } else {
        startOverTimeButton.disabled = true;
      }
    }
  }
}
