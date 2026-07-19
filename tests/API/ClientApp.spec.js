const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./APIUtils');
const loginPayload = {userEmail: "KYadav@gmail.com", userPassword: "KYadav@1"}
const orderPayload = {orders:[{country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
let response;

test.beforeAll( async () =>  
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload)
});


test.beforeEach(async () =>
{

});


// Create order is successcl
test("@Place the order", async({page}) => {

   page.addInitScript(value => {
    window.localStorage.setItem('token',value);
   },response.token);
    const products = page.locator('.card-body')
    await page.goto("https://rahulshettyacademy.com/client/")
    // Ensure that order is booked
    await page.locator("[routerlink='/dashboard/myorders']").first().click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr");
    for (let i=0; i<await rows.count();++i)
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent()
        if(response.orderId.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click();
            break; 

        }
    }
    const summaryOrderId = await page.locator(".col-text").textContent()
    expect(response.orderId.includes(summaryOrderId)).toBeTruthy();

});


// Verify if the order created is showing in history page
// Precondition - Create order

