// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

// Start up an instance of app

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Get route
app.get("/all", sendData);

function sendData(req, res) {
  console.log("GET ==> Before /all" + projectData);
  res.send(projectData);
}

// Post route
app.post("/add", postData);

function postData(req, res) {
  projectData = req.body;

  res.send(projectData);
}
