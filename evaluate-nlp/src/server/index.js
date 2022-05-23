const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.MC_API_KEY;
console.log(`MC_API_ID is ${apiKey}`);
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?";
const testURL =
  "https://api.meaningcloud.com/sentiment-2.1?key=7b8e66a3a74fc9fed8f5e73fb1a7b2f5&url=https://api.aylien.com/api/v1/classify&lang=en";
console.log("testURL = ", testURL);
const serverData = {};

const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");
const { response } = require("express");

app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve("src/client/views/index.html"));
});

console.log("mockAPIResponse = ", JSON.stringify(mockAPIResponse));
app.get("/test", function (req, res) {
  res.json(mockAPIResponse);
});

app.post("/serverData", async (req, res) => {
  const formUrl = req.body.url;
  console.log(
    "url = ",
    baseURL + "key=" + apiKey + "&url=" + formUrl + "&lang=en"
  );
  const url = baseURL + "key=" + apiKey + "&url=" + formUrl + "&lang=en";
  const mcData = await fetch(url);
  console.log("*******  mcData = , mcData");
  try {
    const rtnData = await mcData.json();
    res.send(rtnData);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/* app.get("/serverData", (req, res) => {
  res.send(serverData);
}); */

/* app.post("/serverData", async (req, res) => {
  const url = req.body.input;
  console.log("url = ", url);
  console.log("url = ", baseURL + "key=" + apiKey + "&url=" + url + "&lang=en");
  const resData = await fetch(testURL);
  console.log("resData = ", resData);
  try {
    const mcData = await resData.json();
    console.log(mcData);
    const nlpData = {
      agreement: mcData.agreement,
      confidence: mcData.confidence,
      irony: mcData.irony,
      model: mcData.model,
      score_tag: mcData.score_tag,
    };
    serverData = nlpData;
    console.log("serverData = ", serverData);
    res.send(serverData);
  } catch (error) {
    console.log("error: ", error);
  }
}); */

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
