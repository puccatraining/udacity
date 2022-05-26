import { checkValue } from "./checkValue";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  const location = document.getElementById("location").value;
  const selDate = document.getElementById("selDate").value;
  console.log("location = ", location);
  console.log("date = ", selDate);

  console.log("::: Form Submitted :::", location);
  if (checkValue(location, selDate)) {
    await fetch("http://localhost:8081/serverData", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: location, date: selDate }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("formHandler-res", res);
        updateUI(res);
      });
  } else {
    alert("Both location and date are required!");
  }
}

// Update UI
function updateUI(res) {
  console.log("I am in updateUI");
  document.getElementById("city").innerHTML = `Destination: ${res.destination}`;
  document.getElementById("tripDate").innerHTML = `Date: ${res.date}`;
  document.getElementById("maxTemp").innerHTML = `Max Temp: ${res.maxTemp}`;
  document.getElementById("minTemp").innerHTML = `Min Temp: ${res.minTemp}`;
  document.getElementById("precip").innerHTML = `Precipitations: ${res.precip}`;
  document.getElementById(
    "img"
  ).innerHTML = `<img src="${res.picture}" alt="${res.tags}" width="460px" >`;
}

export { handleSubmit, updateUI };
