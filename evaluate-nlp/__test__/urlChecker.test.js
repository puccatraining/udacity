import { urlChecker } from "../src/client/js/urlChecker";

describe("Testing for invalid url", () => {
  test("Return the function return false", () => {
    const url = "//api.aylien.com/api/v1/classify";
    const response = urlChecker(url);
    console.log("response = ", response);
    expect(response).toBeFalsy();
  });
});

describe("Testing for valid url", () => {
  test("Return the function return true", () => {
    const url = "https://api.aylien.com/api/v1/classify";
    const response = urlChecker(url);
    console.log("response = ", response);
    expect(response).toBeTruthy();
  });
});
