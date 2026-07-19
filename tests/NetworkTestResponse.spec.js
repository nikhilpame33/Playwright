const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./API/APIUtils');
const loginPayload = { userEmail: "KYadav@gmail.com", userPassword: "KYadav@1" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }
let response;
const fakePayloadOrders = { data: [], message: "No Orders" }

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload)
});


test.beforeEach(async () => {

});


// Create order is successcl
test("@Place the order", async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    const products = page.locator('.card-body')
    await page.goto("https://rahulshettyacademy.com/client/")
    // route the page for mocking the 'no data found message'
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request()) // Real responce
            let body = JSON.stringify(fakePayloadOrders); // Mocking responce send to browser
            route.fulfill(
                {
                    response,
                    body,
                }
            )
            // Intercepting response - API Response ->{playwright  fake response} -> browser
        }

    );

    await page.locator("[routerlink='/dashboard/myorders']").first().click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent())

});


// Verify if the order created is showing in history page
// Precondition - Create order

