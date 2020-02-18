const button = document.querySelector(".submit");
const tableDiv = document.querySelector(".nfixtures");

nextFixtures = (fixtures, tableDiv) => {
  const maindiv = document.createElement("div");

  fixtures.forEach(fixture => {
    tableDiv.innerHTML = "";

    const div = document.createElement("div");
    const Imagediv = document.createElement("div");

    const div1 = document.createElement("span");
    const div2 = document.createElement("span");
    const DateDiv = document.createElement("div");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    const t1 = document.createElement("span");
    const t2 = document.createElement("span");
    const vs = document.createElement("span");
    const vs2 = document.createElement("span");

    img1.className = "imag";
    img2.className = "imag";

    const Home = fixture.strHomeTeam.replace(" ", "_");
    const Away = fixture.strAwayTeam.replace(" ", "_");

    fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${Home}`)
      .then(res => res.json())
      .then(Teams => {
        let i = 0;
        Teams.teams.forEach(element => {
          if (i === 0) {
            ar = element.strTeamBadge + "\\preview";
            img1.src = ar;
          }
          i++;
        });
      })
      .catch(err => console.log(err));

    const modName = fixture.strAwayTeam.replace(" ", "_");

    fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${Away}`)
      .then(res => res.json())
      .then(Teams => {
        let i = 0;
        Teams.teams.forEach(element => {
          if (i === 0) {
            ar = element.strTeamBadge + "\\preview";
            // console.log(ar);
            img2.src = ar;
          }
          i++;
        });
      })
      .catch(err => console.log(err));
    vs2.appendChild(document.createTextNode("    "));

    div1.appendChild(img1);
    div2.appendChild(img2);
    div1.appendChild(vs2);
    div1.appendChild(div2);
    Imagediv.appendChild(div1);

    t1.appendChild(document.createTextNode(fixture.strHomeTeam));
    vs.appendChild(document.createTextNode(" vs "));
    t2.appendChild(document.createTextNode(fixture.strAwayTeam));
    DateDiv.appendChild(document.createTextNode(fixture.dateEvent));

    t1.appendChild(vs);
    t1.appendChild(t2);

    div.appendChild(t1);
    Imagediv.appendChild(div);
    div.appendChild(DateDiv);
    maindiv.appendChild(Imagediv);
  });
  tableDiv.appendChild(maindiv);
};

button.addEventListener("click", e => {
  e.preventDefault();
  let form = document.forms[0];
  let formData = new FormData(form);
  let search = new URLSearchParams(formData);
  let queryString = search.toString();
  console.log(queryString);
  fetch(
    `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?${queryString}`
  )
    .then(res => res.json())
    .then(fixtures => nextFixtures(fixtures.events, tableDiv))
    .catch(err => console.log(err));
});
