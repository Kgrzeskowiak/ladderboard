class ConfigurationPanel extends Panel {
  constructor(application, db, loader) {
    super(application);
    this.name = "ConfigurationPanel";
    this.db = db;
    this.loader = loader;
    this.addTeamButton = "";
  }
  //osobna klaska do template'ow 
  //tworzenie elementow do template
  show(root) {
    var template = document.querySelector("#ConfigurationPage");
    var templateClone = document.importNode(template.content, true);
    this.addTeamButton = templateClone.querySelector(
      "[data-name='AddTeamButton']"
    );
    root.appendChild(templateClone);
    this.refreshTable(root);
    this.addTeamButton.addEventListener("click", event => {
      let rowData = this.createEditableRow(root);
      rowData.removeButton.addEventListener("click", event => {
        while (rowData.row.firstElementChild) {
          rowData.row.removeChild(rowData.row.firstElementChild);
        }
      });
      rowData.addButton.addEventListener("click", () => {
        var promise = this.db.addTeam(root.querySelector("input").value);
        promise = promise.then(() => {
          this.refreshTable(root);
        });
      });
    });
  }
  createEditableRow(root) {
    let tableRef = root.querySelector("table");
    let row = tableRef.insertRow();
    let input = document.createElement("input");
    row.insertCell().appendChild(input);
    input.setAttribute("style", "width:100px");
    let addButton = row
      .insertCell()
      .appendChild(document.createElement("button"));
    let actionCell = row.cells[1];
    addButton.classList.add("btn");
    addButton.appendChild(document.createElement("i"));
    addButton.firstElementChild.classList.add("fas", "fa-plus-square");
    let removeButton = actionCell.appendChild(document.createElement("button"));
    removeButton.classList.add("btn");
    removeButton.appendChild(document.createElement("i"));
    removeButton.firstElementChild.classList.add("fa", "fa-trash");
    var rowData = {
      addButton: addButton,
      removeButton: removeButton,
      row: row
    };
    return rowData;
  }
  refreshTable(root) {
    var teamList = this.db.getTeams();
    var tableRef = root.querySelector("table");
    var tbody = tableRef.querySelector("tbody");
    var rowsList = [];
    //this.loader.add(root);
    while (tbody.firstElementChild) {
      tbody.removeChild(tbody.firstElementChild);
    }
    if (teamList.length > 0) {
      teamList.forEach(team => {
        var row = tableRef.insertRow();
        row.insertCell().appendChild(document.createTextNode(team.name));
        tbody.appendChild(row);
        var editButton = row
          .insertCell()
          .appendChild(document.createElement("button"));
        editButton.classList.add("btn");
        editButton.appendChild(document.createElement("i"));
        editButton.firstElementChild.classList.add("far", "fa-edit");
        rowsList.push({
          team: row.childNodes[0].textContent,
          button: editButton
        });
        editButton.addEventListener("click", event => {
          this.editExistingTeam(editButton,root);
        });
      });
    }
 
    this.loader.remove(root);
  }
  editExistingTeam(editButton,root)
  {
    //this.loader.add(root)
    this.addTeamButton.classList.add("hide");
    var currentRow = editButton.parentElement.parentElement;
    var oldValue = currentRow.childNodes[0].textContent;
    while (currentRow.firstElementChild) {
      currentRow.firstElementChild.remove();
    }
    var tempInput = currentRow.appendChild(document.createElement("input"));
    tempInput.value = oldValue;
    let addButton = currentRow
      .insertCell()
      .appendChild(document.createElement("button"));
    addButton.classList.add("btn");
    addButton.appendChild(document.createElement("i"));
    addButton.firstElementChild.classList.add("fas", "fa-plus-square");
    addButton.addEventListener("click", event => {
      var requestAsync = this.db.editTeam(tempInput.value, oldValue);
      requestAsync.then(() => {
        this.refreshTable(root);
      });
    });
  }
}
