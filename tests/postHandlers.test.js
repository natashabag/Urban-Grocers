// eslint-disable-next-line no-undef
const config = require("../config");

const requestBody = {
  ids: [1, 4, 44],
};
// TEST 1 - RESPONSE STATUS
test("response status 200 when checking the quantity of goods", async () => {
  let actualStatus;
  try {
    const response = await fetch(`${config.API_URL}/api/v1/warehouses/amount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    actualStatus = response.status;
  } catch (error) {
    console.error(error);
  }
  expect(actualStatus).toBe(200);
});

// TEST 2 - RESPONSE BODY - STORES
test("goods shown for all four stores", async () => {
  let response;
  try {
    response = await fetch(`${config.API_URL}/api/v1/warehouses/amount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error(error);
  }
  const data = await response.json();
  const newData = Object.entries(data);
  expect(newData.length).toEqual(4);
});

// TEST 3 - RESPONSE BODY - DELIVERY TIME
const requestBodyDelivery = {
  deliveryTime: 9,
  productsCount: 10,
  productsWeight: 11,
};

test("min delivery time is less then max delivery time", async () => {
  let responseDelivery;
  try {
    responseDelivery = await fetch(`${config.API_URL}/speedy/v1/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBodyDelivery),
    });
  } catch (error) {
    console.error(error);
  }
  const delivery = await responseDelivery.json();
  const minTime = delivery["toBeDeliveredTime"]["min"];
  const maxTime = delivery["toBeDeliveredTime"]["max"];
  expect(minTime).toBeLessThan(maxTime);
});
