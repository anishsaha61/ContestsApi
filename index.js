const express = require("express");
const fs = require("fs");
const path = require("path");
const request_promise = require("request-promise");
const corn = require("node-cron");
const collectData = require("./collectData").collectData;
const convertToJSON = require("./convertToJSON").convertToJSON;

const app = express();

const site = "https://codechef.com";
const requestObject = {
  uri: `${site}/contests`,
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
  },
  gzip: true,
};
request_promise(requestObject)
  .then((response) => collectData(response, site))
  .then(convertToJSON);
corn.schedule("*/59 * * * *", () => {
  request_promise(requestObject)
    .then((response) => collectData(response, site))
    .then(convertToJSON);
});
//Route: /codechef
//Utility: Send a json file containing all contests
app.get("/codechef", (req, res, next) => {
  var options = {
    root: __dirname,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile("contests.json", options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log(`Sent: contests.json`);
    }
  });
});
//Route: /codechef/future
//Utility: Send a json file containing details about upcoming contests
app.get("/codechef/future", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let contests = fs.readFileSync("./contests.json");
  contests = JSON.parse(contests);
  contests = {
    Last_Updated: contests.Last_Updated,
    data: contests.Future_Contests,
  };
  res.send(contests);
});
//Route: /codechef/current
//Utility: Send a json file containing details about ongoing contests
app.get("/codechef/live", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let contests = fs.readFileSync("./contests.json");
  contests = JSON.parse(contests);
  contests = {
    Last_Updated: contests.Last_Updated,
    data: contests.Current_Contests,
  };
  res.send(contests);
});
//Route: /codechef/past
//Utility: Send a json file containing details about past contests
app.get("/codechef/past", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let contests = fs.readFileSync("./contests.json");
  contests = JSON.parse(contests);
  contests = {
    Last_Updated: contests.Last_Updated,
    data: contests.Past_Contests,
  };
  res.send(contests);
});
//Route: 404
//Utility: Send a instruction for the api when n a route that is not found
app.use((req, res, next)=>{
  var options = {
    root: __dirname,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(404);

  res.sendFile("error.html", options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log(`Sent: erroe.html`);
    }
  });
})
const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Listening to port ${PORT}`);
