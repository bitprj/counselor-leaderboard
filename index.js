import express from 'express';
var app = express();
var router = express.Router();
import fetch from 'node-fetch'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'ejs');
app.set('views', __dirname);

// this is just setting up configuration for where all the files are.
const path = __dirname;

//__dirname is the current directory we are in. Remember that every website literally has a computer running behind it!
app.use('/', router);
app.use('/assets', express.static(path + '/assets'))

// this is telling the website WHERE all of our "asset" files are. Asset files include CSS for styling, JS for Bootstrap to make it pretty, and images.

router.get('/', function (req, res) {
    res.sendFile(path + '/pages/index.html');
});

router.get('/api/leaderboard', async function (req, res) {
    const gqlrequest = `
    query getCount {
        users_progress(order_by: {startTime: desc}, where: {repoName: {_eq: "${users[i].repo_name}"}, user: {_eq: "${users[i].username}"}}) {
          count
          title
          repo
        }
      }     
    `;

    /*
    query getCount {
  users_progress(where: {startTime: {_gt: "2022-05-01T16:51:19.000Z"}}, order_by: {count: desc}, limit: 1) {
    user
    count
  }
}

query getCount2 {
  users_progress(where: {startTime: {_gt: "2022-05-01T16:51:19.000Z"}, user: {_neq: "emsesc"}}, order_by: {count: desc}, limit: 1) {
    user
    count
  }
}

query getCount3 {
  users_progress(where: {startTime: {_gt: "2022-05-01T16:51:19.000Z"}, user: {_neq: "emsesc"}, _and: {user: {_neq: "macbarnes04"}}}, order_by: {count: desc}, limit: 1) {
    user
    count
  }
}
*/


    var topTen = await queryData(gqlrequest);
    res.send(topTen);
});

const queryData = async (queryString) => {
    const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
    const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
  
    console.log(queryString);
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

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));