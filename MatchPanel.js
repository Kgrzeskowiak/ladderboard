class MatchPanel extends Panel {
  constructor(application, db) {
    super(application);
    this.name = "MatchPanel";
    this.db = db;
    this.secondRound = false;
    this.matchEnded = false;
    this.matchParameters = null;
    this.matchResults = null;
  }
  show(root, matchParameters) {
    this.matchParameters = matchParameters;
    var template = document.querySelector("#MatchPage");
    var templateClone = document.importNode(template.content, true);
    root.appendChild(templateClone);
    this.clock = new Countdown();
    this.matchStart(
      this.matchParameters.gameDuration,
      this.matchParameters.teamA,
      this.matchParameters.teamB
    );
  }
  matchStart() {
    this.clock.startTimer(this.matchParameters.gameDuration);
    this.clock.endMatchEvent.addListener(() => {
      if (this.clock.endMatchEvent.handlers.length > 0) {
        this.clock.endMatchEvent.handlers.splice(1);
        console.log(this.clock.endMatchEvent);
      }
      if (this.secondRound == false && this.matchEnded == false) {
        this.startSecondRound();
      }
      if (this.secondRound && this.matchEnded == false) {
        this.showMatchEndedModal();
      }
    });
  }
  startSecondRound() {
    $("#secondRoundModal").modal("show");
    document.querySelector("#confirmButton").addEventListener("click", () => {
      this.secondRound = true;
      this.matchStart(
        this.matchParameters.gameDuration,
        this.matchParameters.teamA,
        this.matchParameters.teamB
      );
    });
  }
  showMatchEndedModal() {
    var modal = document.querySelector("#matchEndedModal");
    var saveResultButton = modal.querySelector("[data-name='saveResultButton");
    var startOverTimeButton = modal.querySelector(
      "[data-name='startOverTimeButton']"
    );
    var divTeamA = modal.querySelector("[data-name='teamA']");
    var divTeamB = modal.querySelector("[data-name='teamB']");
    var inputA = divTeamA.querySelector("input");
    var inputB = divTeamB.querySelector("input");
    divTeamA.querySelector("span").innerHTML = this.matchParameters.TeamA;
    divTeamB.querySelector("span").innerHTML = this.matchParameters.TeamB;
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
      console.log("koniec gry");
    });
    startOverTimeButton.addEventListener("click", event => {
      this.startOverTime();
    });
  }
  startOverTime() {
    this.secondRound = false;
    this.matchParameters.gameDuration = 1;
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
