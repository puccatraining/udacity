import { formHandler } from "../src/client/js/formHandler";

describe("Testing the formHandler ", () => {
  test("Testing the function not exists", () => {
    expect(formHandler).not.toBeDefined();
  });
});
