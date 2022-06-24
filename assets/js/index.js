let num = 10;
let users = [];
let prevLength = users.length;
let spinner = document.getElementById("spinner");
window.onload = async () => {
  console.log("index.js was loaded...");
  spinner.classList.remove("hidden");
  const data = await queryForUsers();
  populateTable(data, num);
  spinner.classList.add("hidden");
};

const queryForUsers = async () => {
  users = await fetch("/api/leaderboard");
  users = await users.json();
  users = users.topUsers;

  return users;
};

const populateTable = (users, numToShow) => {
  let body = document.getElementById("table-body");
  body.replaceChildren();

  for (let i = 0; i < numToShow; i++) {
    try {
      let github = users[i].user;
      let stepName = users[i].title;
      let stepNumber = users[i].count;
      let repository = users[i].repoLink;
      let started = users[i].startTime.substring(0, 10);
      let onTrack = users[i].onTrack;

      let row = document.createElement("tr");
      let valIndex = document.createElement("th");
      valIndex.setAttribute("scope", "row");
      valIndex.textContent = i + 1;

      let valGithub = document.createElement("td");
      valGithub.textContent = github;

      let valBadges = document.createElement("td");
      if (onTrack) {
        valBadges.innerHTML = `<img src="https://user-images.githubusercontent.com/69332964/175657885-64fb198e-e770-459b-9fae-a4145c60c6bd.svg" alt="" style="width:auto; height:auto;">`;
      }

      if (i + 1 <= 4) {
        valBadges.innerHTML += `<img src="https://user-images.githubusercontent.com/69332964/175657884-9cad6055-b9b6-4afa-aa23-9f6ac2ac9edc.svg" alt="" style="width:auto; height:auto;">`;
      }

      let valStepname = document.createElement("td");
      valStepname.textContent = stepName;

      let valStepnumber = document.createElement("td");
      valStepnumber.textContent = stepNumber;

      let valRepo = document.createElement("td");
      let aLink = document.createElement("a");
      aLink.setAttribute("href", repository);
      aLink.setAttribute("target", "_blank");
      aLink.textContent = repository;
      valRepo.appendChild(aLink);

      let valStarted = document.createElement("td");
      valStarted.textContent = started;

      row.appendChild(valIndex);
      row.appendChild(valGithub);
      row.appendChild(valBadges);
      row.appendChild(valStepname);
      row.appendChild(valStepnumber);
      row.appendChild(valRepo);
      row.appendChild(valStarted);

      body.append(row);
    } catch (e) {}
  }
};

document.getElementById("see-more").addEventListener("click", () => {
  num += 10;

  populateTable(users, num);
  let tableLength = document.getElementById("table-body").childElementCount;
  if (tableLength === users.length) {
    document.getElementById("see-more").remove();
  }
});
