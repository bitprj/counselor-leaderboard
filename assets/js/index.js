window.onload = async () => {
  console.log("index.js was loaded...");

  let body = document.getElementById("table-body");
  
  var users = await fetch("/api/leaderboard");
  users = await users.json();
  users = users.topUsers;
  console.log(users);

  for (let i = 0; i < 10; i++) {
    let github = users[i].user;
    let stepName = users[i].title;
    let stepNumber = users[i].count;
    let repository = users[i].repoLink;
    let started = users[i].startTime.substring(0, 10);

    let row = document.createElement("tr");
    let valIndex = document.createElement("th");
    valIndex.setAttribute("scope", "row");
    valIndex.textContent = i + 1;

    let valGithub = document.createElement("td");
    valGithub.textContent = github;

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
    row.appendChild(valStepname);
    row.appendChild(valStepnumber);
    row.appendChild(valRepo);
    row.appendChild(valStarted);

    body.append(row);
  }
};
