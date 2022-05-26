const dotenv = require("dotenv");
dotenv.config();
const geoNameUser = process.env.GEONAME_USER;
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

console.log(`GEONAME_USER is ${geoNameUser}`);
console.log(`WEATHERBIT_API_KEY is ${weatherbitApiKey}`);
console.log(`PIXABAY_API_KEY is ${pixabayApiKey}`);
//const apiKey = "3eabaf5d75c7f886efbcf969f96255cc&units=imperial";
const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
// Setup empty JS object to act as endpoint for all routes

let geoData = {};
let weatherData = {};
let pixaBayData = {};
let serverData = {};

const path = require("path");
const express = require("express");
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

// GeoNames
app.post("/serverData", async (req, res) => {
  const location = req.body.location;
  const date = req.body.selDate;
  console.log("location = ", location);

  const geoUrl =
    "http://api.geonames.org/searchJSON?q=" +
    location +
    "&maxRows=10&username=" +
    geoNameUser;
  //console.log("geoUrl = ", geoUrl);

  const geoGetData = await fetch(geoUrl);
  //console.log("*******  geoGetData = ", geoGetData);
  try {
    const geoJsonData = await geoGetData.json();
    //console.log("geoJsonData = ", geoJsonData);
    geoData = {
      lng: geoJsonData.geonames[0].lng,
      lat: geoJsonData.geonames[0].lat,
      city: geoJsonData.geonames[0].city_name,
    };
  } catch (error) {
    console.log("Error: ", error);
  }

  // WeatherBit
  const weatherBitUrl =
    "http://api.weatherbit.io/v2.0/forecast/daily?lat=" +
    geoData.lat +
    "&lon=" +
    geoData.lng +
    "&key=" +
    weatherbitApiKey +
    "&units=M";
  // console.log("weatherBitUrl = ", weatherBitUrl);
  const weatherBitGetData = await fetch(weatherBitUrl);

  try {
    const weatherBitJsonData = await weatherBitGetData.json();
    weatherData = {
      temp: weatherBitJsonData.data[0].temp,
      maxTemp: weatherBitJsonData.data[0].max_temp,
      minTemp: weatherBitJsonData.data[0].min_temp,
      precip: weatherBitJsonData.data[0].precip,
    };
    //console.log("****** ", weatherData);
  } catch (error) {
    console.log("Error: ", error);
  }

  // Pixabay
  const picabayUrl =
    "https://pixabay.com/api/?key=" +
    pixabayApiKey +
    "&q=$" +
    location +
    "&image_type=photo&pretty=true";
  console.log("picabayUrl = ", picabayUrl);

  const pixabayGetData = await fetch(picabayUrl);
  //console.log("*******  pixabayGetData = ", pixabayGetData);
  try {
    const pixabayJsonData = await pixabayGetData.json();
    // console.log("pixabayJsonData = ", pixabayJsonData);
    pixaBayData = {
      picture: pixabayJsonData.hits[0].webformatURL,
      tags: pixabayJsonData.hits[0].tags,
    };
  } catch (error) {
    console.log("Error: ", error);
  }

  serverData = {
    destination: geoData.city,
    date: date,
    temp: weatherData.temp,
    maxTemp: weatherData.maxTemp,
    minTemp: weatherData.minTemp,
    precip: weatherData.precip,
    picture: pixaBayData.picture,
    tags: pixaBayData.tags,
  };
  console.log("*** serverData = ", serverData);
  res.send(serverData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
