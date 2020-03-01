const button = document.querySelector("button");
const searchDiv = document.querySelector(".searchPlayer");
const tableDiv = document.querySelector(".nextFixtures");
const tableDiv2 = document.querySelector(".lastFixtures");

dispFixtures = (fixtures, tableDiv) => {
  const maindiv = document.createElement("div");
  const head = document.createElement("div");
  head.className = "cen";

  head.appendChild(document.createTextNode("Next Fixyture"));

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

    DateDiv.className = "cen";
    con.className = "cen";

    imgDiv.appendChild(img1);
    imgDiv2.appendChild(img2);

    imgDiv.appendChild(textDiv).appendChild(vs);
    textDiv2.appendChild(imgDiv2);

    imgDiv.appendChild(textDiv2);

    con
      .appendChild(imgDiv)
      .appendChild(DateDiv)
      .appendChild(timeDIv)
      .appendChild(localTime);

    con.style.border = "1px solid black";
    con.style.width = "80%";

    container.appendChild(con);

    container.style.margin = "auto auto";

    container.style.margin = "1.5rem";

    maindiv.appendChild(container);
  });
  tableDiv.appendChild(head).appendChild(maindiv);
};

dispLastFixtures = (fixtures, tableDiv) => {
  const maindiv = document.createElement("div");

  const head = document.createElement("div");
  head.className = "cen";

  head.appendChild(document.createTextNode("Last Fixyture"));

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
    const result = document.createElement("div");

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
    result.appendChild(
      document.createTextNode(
        fixture.intHomeScore + " : " + fixture.intAwayScore
      )
    );

    DateDiv.className = "cen";
    con.className = "cen";

    imgDiv.appendChild(img1);
    imgDiv2.appendChild(img2);

    imgDiv.appendChild(textDiv).appendChild(vs);
    textDiv2.appendChild(imgDiv2);

    imgDiv.appendChild(textDiv2);

    con
      .appendChild(imgDiv)
      .appendChild(result)
      .appendChild(DateDiv)
      .appendChild(timeDIv);

    con.style.border = "1px solid black";
    con.style.width = "80%";

    container.appendChild(con);

    container.style.margin = "auto auto";

    container.style.margin = "1.5rem";

    maindiv.appendChild(container);
  });
  tableDiv.appendChild(head).appendChild(maindiv);
};

nextfixture = team_id => {
  console.log(team_id);
  fetch(
    `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team_id}`
  )
    .then(ele => ele.json())
    .then(res => {
      dispFixtures(res.events, tableDiv);
    })
    .catch(err => console.log(err));
};

prevfixture = team_id => {
  console.log(team_id);
  fetch(
    `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${team_id}`
  )
    .then(ele => ele.json())
    .then(res => {
      dispLastFixtures(res.results, tableDiv2);
    })
    .catch(err => console.log(err));
};

Team = teams => {
  let arr = [];
  teams.forEach(ele => {
    arr.push(ele.idTeam);
  });

  return arr[0];
};

getTeamId = name => {
  fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${name}`)
    .then(res => res.json())
    .then(team => {
      let team_id = Team(team.teams);
      console.log(team_id);
      nextfixture(team_id);
      prevfixture(team_id);
    })
    .catch(err => console.log(err));
};

button.addEventListener("click", e => {
  e.preventDefault();

  const pName = document.querySelector("input").value;
  document.querySelector("input").value = "";

  const name = pName.replace(" ", "_");

  getTeamId(name);
});
