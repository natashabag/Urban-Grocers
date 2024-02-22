// eslint-disable-next-line no-undef
const config = require("../config");

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
//TEST 1 - RESPONSE STATUS
test("Should show 200 code when deleting a cart", async () => {
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
    //TESTING DELETE REQUEST STATUS
    const response = await fetch(`${config.API_URL}/api/v1/orders/${cartID}`, {
      method: "DELETE",
    });
    actualStatus = response.status;
  } catch (error) {
    console.error(error);
  }
  expect(actualStatus).toBe(200);
});

//TEST-2 RESPONSE BODY
test(`Should be a {"ok": true} JSON response to deleting the cart`, async () => {
  let responseBody;
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
    //TESTING DELETE REQUEST STATUS
    responseBody = await fetch(`${config.API_URL}/api/v1/orders/${cartID}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
  const data = await responseBody.json();
  expect(data).toEqual({
    ok: true,
  });
});
