import express from "express";
var app = express();
var router = express.Router();
import fetch from "node-fetch";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "dotenv";
pkg.config();

const ISOdate = "2022-06-13T13:26:00.000Z";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("view engine", "ejs");
app.set("views", __dirname);

// this is just setting up configuration for where all the files are.
const path = __dirname;

//__dirname is the current directory we are in. Remember that every website literally has a computer running behind it!
app.use("/", router);
app.use("/assets", express.static(path + "/assets"));

// this is telling the website WHERE all of our "asset" files are. Asset files include CSS for styling, JS for Bootstrap to make it pretty, and images.

router.get("/", function (req, res) {
  res.sendFile(path + "/pages/index.html");
});

router.get("/api/leaderboard", async function (req, res) {
  var users = [];
  var gqlrequest = `
    query getCount {
        users_progress(where: {startTime: {_gt: "${ISOdate}"}}, order_by: {count: desc}, limit: 1) {
            user
            count
            repo
            title
            startTime
        }
    }`;

  for (var i = 0; i < 40; i++) {
    var user = await queryData(gqlrequest);
    if (user.data && user.data.users_progress[0]) {
      var onTrack = checkProgress(user.data.users_progress[0].count);
      users.push({
        user: user.data.users_progress[0].user,
        count: user.data.users_progress[0].count,
        repoLink: user.data.users_progress[0].repo,
        title: user.data.users_progress[0].title,
        startTime: user.data.users_progress[0].startTime,
        onTrack: onTrack
      });
      console.log(
        "Added " + user.data.users_progress[0].user + " to leaderboard"
      );
      console.log("Count: " + user.data.users_progress[0].count);
    } else {
      break;
    }

    gqlrequest = createRequest(users);
  }
  console.log(users);
  res.send({ topUsers: users });
});

const queryData = async (queryString) => {
  const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
  const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;

  //   console.log(queryString);
  const data = await fetch(HASURA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query: queryString }),
  });
  const responseData = await data.json();

  return responseData;
};

const createRequest = (users) => {
  var gqlrequest = "";

  if (users.length > 0) {
    gqlrequest = `
        query getCount {
            users_progress(where: {startTime: {_gt: "${ISOdate}"}, user: {_neq: "${users[0].user}"},`;
    for (var i = 1; i < users.length; i++) {
      gqlrequest += ` _and: {user: {_neq: "${users[i].user}"},`;
    }

    gqlrequest = gqlrequest.slice(0, -1);
    for (var i = 0; i < users.length - 1; i++) {
      gqlrequest += "}";
    }

    gqlrequest += `} order_by: {count: desc}, limit: 1) {
                user
                count
                repo
                title
                startTime
            }
        }`;
  }

  return gqlrequest;
};

const checkProgress = (stepNum) => {
  let onTrack = true;
  var startTime = new Date(ISOdate);
  var currentTime = new Date();
  var daysSinceStart = (currentTime.getTime() - startTime.getTime()) / (1000 * 3600 * 24);

  if (daysSinceStart > 28 && stepNum < 63) {
    onTrack = false;
  } else if (daysSinceStart > 21 && stepNum < 47) {
    onTrack = false;
  } else if (daysSinceStart > 14 && stepNum < 29) {
    onTrack = false;
  } else if (daysSinceStart > 7 && stepNum < 12) {
    onTrack = false;
  }

  // returns true if they are on track
  return (onTrack)
};

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
