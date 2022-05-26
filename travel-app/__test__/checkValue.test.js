import "@babel/polyfill";
import { checkValue } from "../src/client/js/checkValue";

describe("Testing for invalid url", () => {
  test("Return the function return false", () => {
    const textVal = " ";
    const dateVal = "";
    const response = checkValue(textVal, dateVal);
    console.log("response = ", response);
    expect(response).toBeFalsy();
  });
});

describe("Testing for valid url", () => {
  test("Return the function return true", () => {
    const textVal = "Baltimore";
    const dateVal = new Date();
    const response = checkValue(textVal, dateVal);
    console.log("response = ", response);
    expect(response).toBeTruthy();
  });
});
