const button = document.querySelector("button");
const searchDiv = document.querySelector(".searchPlayer");

const player = (players, searchDiv) => {
  const mainDiv = document.createElement("div");
  if (players == null) {
    const divq = document.createElement("div");

    divq.appendChild(document.createTextNode("No player FOund"));
    searchDiv.appendChild(divq);
  } else {
    players.forEach(player => {
      searchDiv.innerHTML = "";

      const img = document.createElement("img");
      const imgDiv = document.createElement("div");
      const team = document.createElement("div");
      const dob = document.createElement("div");
      const birthLocation = document.createElement("div");
      const desc = document.createElement("p");
      const leg = document.createElement("div");
      const positon = document.createElement("div");
      const ht = document.createElement("div");
      const wg = document.createElement("div");

      img.src = player.strCutout + "\\preview";
      team.appendChild(document.createTextNode("Team : " + player.strTeam));
      dob.appendChild(document.createTextNode("DOB : " + player.dateBorn));
      birthLocation.appendChild(
        document.createTextNode("Birth Location: " + player.strBirthLocation)
      );
      desc.appendChild(
        document.createTextNode("Desription : " + player.strDescriptionEN)
      );
      leg.appendChild(
        document.createTextNode("Strong foot : " + player.strSide)
      );
      positon.appendChild(
        document.createTextNode("Position : " + player.strPosition)
      );
      ht.appendChild(document.createTextNode("Height : " + player.strHeight));
      wg.appendChild(document.createTextNode("Weight : " + player.strWeight));

      imgDiv.appendChild(img);
      imgDiv
        .appendChild(team)
        .appendChild(dob)
        .appendChild(birthLocation)
        .appendChild(desc)
        .appendChild(leg)
        .appendChild(positon)
        .appendChild(ht)
        .appendChild(wg);

      mainDiv.appendChild(imgDiv);

      searchDiv.appendChild(mainDiv);
    });
  }
};

button.addEventListener("click", e => {
  e.preventDefault();

  const pName = document.querySelector("input").value;
  document.querySelector("input").value = "";

  const name = pName.replace(" ", "_");

  fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${name}`)
    .then(res => res.json())
    .then(res => {
      player(res.player, searchDiv);
    })
    .catch(err => console.log(err));
});
