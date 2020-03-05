const button = document.querySelector(".submit");
const tableDiv = document.querySelector(".nfixtures");

nextFixtures = (fixtures, tableDiv) => {
  const maindiv = document.createElement("div");
  tableDiv.className = "mx-auto text-center  font-weight-bold";

  fixtures.forEach(fixture => {
    tableDiv.innerHTML = "";

    const vs = document.createElement("span");

    const textDiv = document.createElement("span");
    const textDiv2 = document.createElement("span");
    const imgDiv = document.createElement("span");
    const imgDiv2 = document.createElement("span");

    const con = document.createElement("div");
    const container = document.createElement("div");

    const DateDiv = document.createElement("div");
    const timeDIv = document.createElement("div");
    const localTime = document.createElement("div");

    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

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
            img2.src = ar;
          }
          i++;
        });
      })
      .catch(err => console.log(err));

    textDiv.appendChild(document.createTextNode(fixture.strHomeTeam));
    vs.appendChild(document.createTextNode(" vs "));
    textDiv2.appendChild(document.createTextNode(fixture.strAwayTeam));
    DateDiv.appendChild(document.createTextNode(fixture.dateEvent));
    timeDIv.appendChild(document.createTextNode(fixture.strTime + " CET"));
    localTime.appendChild(
      document.createTextNode("Local TIme: " + fixture.strTimeLocal)
    );

    imgDiv.appendChild(img1);
    imgDiv2.appendChild(img2);

    imgDiv.appendChild(textDiv).appendChild(vs);
    textDiv2.appendChild(imgDiv2);

    imgDiv.appendChild(textDiv2);

    imgDiv
      .appendChild(DateDiv)
      .appendChild(timeDIv)
      .appendChild(localTime);

    con.appendChild(imgDiv);
    con.className = "mx-auto text-center container border border-dark";
    container.className = "mx-auto text-center container";

    container.appendChild(con);

    container.style.margin = "1.5rem";

    maindiv.appendChild(container);
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
