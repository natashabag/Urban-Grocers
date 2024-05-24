# Urban Grocers Web API Testing (JavaScript + Jest)

Urban Grocers API testing

# Description

This project is design to test Urban Grocers API to ensure accuracy of response statuses and response bodies. 

# Test Coverage:
## DELETE REQUESTS:
Should show 200 code when deleting a cart
Should be a {"ok": true} JSON response to deleting the cart
## GET REQUESTS:
Should show 200 code when getting the list of deliveries
Should have 4 delivery services
## POST REQUESTS:
Should show 200 code when checking the quantity of goods
Should show all four stores in JSON response body
Should display that max delivery time is biger than min delivery time
## PUT REQUESTS:
Should show 200 code when changing price
Should show 200 code when adding groceries
Should have finalCost more than 0 in JSON response body
# Documentation source used
apiDoc
Swagger

# Instructions on how to run the tests

You can run the tests using "npx jest" and the handler document name, for example "npx jest putHandlers.test.js"
