const button = document.querySelector("button");
const searchDiv = document.querySelector(".searchPlayer");

nextfixture = team_id => {
  console.log(team_id);
  fetch(
    `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team_id}`
  )
    .then(ele => ele.json())
    .then(res => {
      console.log(res);
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
