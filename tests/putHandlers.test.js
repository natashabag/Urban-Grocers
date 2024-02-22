// eslint-disable-next-line no-undef
const config = require("../config");

// TEST 1 - RESPONSE STATUS - GROCERY PRICE CHANGE TEST
const requestBodyPrice = {
  price: 15,
};

test("Should show 200 code when changing price", async () => {
  let actualStatus;
  try {
    const response = await fetch(`${config.API_URL}/api/v1/products/6`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBodyPrice),
    });
    actualStatus = response.status;
  } catch (error) {
    console.error(error);
  }
  expect(actualStatus).toBe(200);
});

// TEST 2 - RESPONSE STATUS - ADDING GROCERIES TO THE CART TEST
const requestBody = {
  productsList: [
    {
      id: 1,
      quantity: 1,
    },
  ],
};
const requestBodyCart = {
  productsList: [
    {
      id: 1,
      quantity: 2,
    },
    {
      id: 5,
      quantity: 2,
    },
    {
      id: 3,
      quantity: 1,
    },
  ],
};

test("Should show 200 code when adding groceries", async () => {
  let actualStatus;
  try {
    //CREATING A SHOPPING CART
    const responseCart = await fetch(`${config.API_URL}/api/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBodyCart),
    });
    const cart = await responseCart.json();
    let cartID = cart["id"];
    //TESTING PUT REQUEST
    const response = await fetch(`${config.API_URL}/api/v1/orders/${cartID}`, {
      method: "PUT",
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

//COMMENT TO THE PREVIOUS TEST: A product will be added to the order and response status code "200 OK" will be shown if the product we are trying to add is available in the warehouse that we have been assigned to after creating the order. However, it will show an error if the product is available in other warehouses. KNOWN BUG https://nataliabagramian.atlassian.net/browse/NBP4-11

// TEST 3 - RESPONSE BODY - PRICE
test("Should have finalCost more than 0 in JSON response body", async () => {
  let finalCost;
  try {
    //CREATING A SHOPPING CART
    const responseCart = await fetch(`${config.API_URL}/api/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBodyCart),
    });
    const cart = await responseCart.json();
    let cartID = cart["id"];
    //PUT REQUEST
    const response = await fetch(`${config.API_URL}/api/v1/orders/${cartID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const actualResponse = await response.json();
    finalCost = actualResponse["finalCost"];
  } catch (error) {
    console.error(error);
  }
  expect(finalCost).toBeGreaterThan(0);
});
