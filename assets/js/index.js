window.onload = () => {
  console.log("index.js was loaded...");

  let body = document.getElementById("table-body");

  // SAMPLE DATA
  let name = "Ganning Xu";
  let github = "@ganning127";
  let stepName = "Getting started with serverless";
  let stepNumber = 2;
  let repository = "https://github.com/ganning127/bp-serverless";
  let started = "5/12/22";

  for (let i = 0; i < 10; i++) {
    let row = document.createElement("tr");
    let valIndex = document.createElement("th");
    valIndex.setAttribute("scope", "row");
    valIndex.textContent = i + 1;

    let valName = document.createElement("td");
    valName.textContent = name;

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
    row.appendChild(valName);
    row.appendChild(valGithub);
    row.appendChild(valStepname);
    row.appendChild(valStepnumber);
    row.appendChild(valRepo);
    row.appendChild(valStarted);

    body.append(row);
  }
};
