# Student Leaderboard

### Tools
* Deployed on Heroku

## Details
* Pulls Top 10 students with the highest number of steps completed
* Only queries for students within a specific time frame (ex: during the camp)

## Badges
Top-performing students in the curriculum are awarded badges to reflect their performance. Currently, badges are shown for:

| Badge      | Description |
| ----------- | ----------- |
| ![](https://user-images.githubusercontent.com/69332964/175657884-9cad6055-b9b6-4afa-aa23-9f6ac2ac9edc.svg)      | Top 4 students farthest in the curriculum.       |
| ![](https://user-images.githubusercontent.com/69332964/175657885-64fb198e-e770-459b-9fae-a4145c60c6bd.svg)   | On track in the curriculum based based on the current week number        |

## To Use
* Change `ISOdate` for specific time frame
* `/api/leaderboard` endpoint in backend returns object of top ten users

```
{"topUsers": ["example", "example", "example", "example", "example", "example", "example", "example", "example", "example"]};
```
