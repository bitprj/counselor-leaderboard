# Student Leaderboard

### Tools
* Deployed on Heroku

## Details
* Pulls Top 10 students with the highest number of steps completed
* Only queries for students within a specific time frame (ex: during the camp)

## To Use
* Change `ISOdate` for specific time frame
* `/api/leaderboard` endpoint in backend returns object of top ten users

```
{"topUsers": ["example", "example", "example", "example", "example", "example", "example", "example", "example", "example"}
```
