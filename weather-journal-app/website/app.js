/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "3eabaf5d75c7f886efbcf969f96255cc&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const middleURL = ",us&appid="; // <--- to only search in US
const serverData = {};
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

function performAction(e) {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const userFeeling = document.getElementById("feelings").value;
  console.log("zip = ", zip);

  if (zip.value !== "") {
    getData(baseURL, zip, apiKey).then(function (data) {
      console.log("***** data =", data);
      postData("/add", {
        temp: data.main.temp,
        date: newDate,
        content: userFeeling,
      }).then((data) => updateUI());
    });
  }
}
// get request.
const getData = async (baseURL, zip, apiKey) => {
  const url = baseURL + zip + middleURL + apiKey;
  console.log("url = ", url);
  const request = await fetch(url);
  try {
    const all = await request.json();
    console.log("all = ", all);
    return all;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", data = {}) => {
  console.log("url = ", url);
  console.log("postData = ", data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log("newData = ", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async (url) => {
  const request = await fetch("/all");
  try {
    createRpt(await request.json());
  } catch (error) {
    console.log("error", error);
  }
};

const createRpt = (allData) => {
  console.log("allData  = ", allData);
  // Write updated data to DOM elements
  document.getElementById("content").innerHTML = allData.content;
  document.getElementById("date").innerHTML = allData.date;
  document.getElementById("temp").innerHTML =
    Math.round(allData.temp) + "degrees";
};

document.querySelector(".submit").addEventListener("click", performAction);
