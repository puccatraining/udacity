import { urlChecker } from "./urlChecker";

async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  Client.checkForName(formText);

  console.log("::: Form Submitted :::", formText);
  if (urlChecker(formText)) {
    await fetch("http://localhost:8081/serverData", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: formText }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("formHandler-res", res);
        updateUI(res);
      });
  } else {
    alert("Enter valid URL!");
  }
}

// Update UI
function updateUI(res) {
  console.log("I am in updateUI");
  document.getElementById(
    "agreement"
  ).innerHTML = `Agreement: ${res.agreement}`;
  document.getElementById(
    "confidence"
  ).innerHTML = `Confidence: ${res.confidence}`;
  document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
  document.getElementById("model").innerHTML = `Model: ${res.model}`;
  document.getElementById("score_tag").innerHTML = `Scor Tag: ${res.score_tag}`;
}

export { handleSubmit, updateUI };
