import { request } from "express";

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  const formText = document.getElementById("name").value;
  console.log("formText = ", formText);

  //Client.checkForName(formText);
  //if (Client.validateURL(formText)) {
  //  console.log("::: Form Submitted :::");
  //}

  if (Client.validateURL(formText)) {
    console.log("::: Form Submitted :::");
    fetch("http://localhost:8081/serverData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: formText }),
    })
      .then((res) => res.json())
      .then(function (res) {
        // update UI.
      });
  } else {
    alert("Invalid Submission!");
  }
}

const subBttn = document.getElementById("submit");
if (subBttn) {
  subBttn.addEventListener("click", handleSubmit);
}

const uiData = async () => {
  const uiReq = await fetch("http://localhost:8081/serverData");
  try {
    const newData = await uiReq.json();
    console.log("newData = ", newData);
    // write to index.html
    document.getElementById(
      "agreement"
    ).innerHTML = `Agreement: ${newData.agreement}`;
    document.getElementById(
      "confidence"
    ).innerHTML = `Confidence: ${newData.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${newData.irony}`;
    document.getElementById("model").innerHTML = `Model: ${newData.model}`;
    document.getElementById(
      "score_tag"
    ).innerHTML = `Score Tag: ${newData.score_tag}`;
  } catch (error) {
    console.log("Error: ", error);
  }
};
export { handleSubmit };
