// eslint-disable-next-line no-undef
const config = require("../config");
//TEST 1 - RESPONSE STATUS
test("Should show 200 code when getting the list of deliveries", async () => {
  let actualStatus;
  try {
    const response = await fetch(`${config.API_URL}/api/v1/couriers`);
    actualStatus = response.status;
  } catch (error) {
    console.error(error);
  }
  expect(actualStatus).toBe(200);
});
// TEST 2 - RESPONSE BODY
test("Should have 4 delivery services", async () => {
  let responseBody;
  try {
    responseBody = await fetch(`${config.API_URL}/api/v1/couriers`);
  } catch (error) {
    console.error(error);
  }
  const data = await responseBody.json();
  const countServices = data.length;
  expect(countServices).toBe(4);
});
