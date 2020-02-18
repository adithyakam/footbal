const button = document.querySelector(".standing");
const tableDiv = document.querySelector(".Standing_table");

Standings = (teams, tableDiv) => {
  tableDiv.innerHTML = "";

  var table = document.createElement("table");
  table.className = "gridtable";
  var tblbdy = document.createElement("tbody");

  var thead = document.createElement("thead");
  var headRow = document.createElement("tr");
  [
    "Name",
    "played",
    "goalsfor",
    "goalsagainst",
    "goalsdifference",
    "win",
    "draw",
    "loss",
    "total"
  ].forEach(function(el) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(el));
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);
  teams.forEach(team => {
    var tblrw = document.createElement("tr");
    let i = 0;
    for (var o in team) {
      i++;
      if (i === 2) {
        continue;
      } else {
        var tbltd = document.createElement("td");
        tbltd.appendChild(document.createTextNode(team[o]));
        tblrw.appendChild(tbltd);
      }
    }
    tblbdy.appendChild(tblrw);
  });

  table.appendChild(tblbdy);
  tableDiv.appendChild(table);
};

button.addEventListener("click", e => {
  e.preventDefault();
  let form = document.forms[0];
  let formData = new FormData(form);
  let search = new URLSearchParams(formData);
  let queryString = search.toString();
  console.log(queryString);
  fetch(
    "https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?" +
      queryString +
      "&s=1920"
  )
    .then(res => res.json())
    .then(teams => Standings(teams.table, tableDiv))
    .catch(err => console.log(err));
});
